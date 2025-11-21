import PageShell from '../components/PageShell'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

// We will use Pyodide (Python in WebAssembly) which is available via CDN.
// No npm package needed; we load it dynamically in the browser.

export default function Playground() {
  const [pyodideReady, setPyodideReady] = useState(false)
  const [output, setOutput] = useState('')
  const [running, setRunning] = useState(false)
  const pyodideRef = useRef(null)
  const editorRef = useRef(null)

  // Simple in-place syntax highlighting for Python using contenteditable + <code> markup
  const highlight = (code) => {
    const keywords = /\b(False|class|finally|is|return|None|continue|for|lambda|try|True|def|from|nonlocal|while|and|del|global|not|with|as|elif|if|or|yield|assert|else|import|pass|break|except|in|raise)\b/g
    const numbers = /\b(0x[\da-fA-F]+|\d+(?:\.\d+)?)\b/g
    const strings = /("[^"]*"|'[^']*')/g
    const comments = /(#[^\n]*)/g
    return code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(comments, '<span class="text-slate-400">$1</span>')
      .replace(strings, '<span class="text-emerald-400">$1</span>')
      .replace(keywords, '<span class="text-cyan-300">$1</span>')
      .replace(numbers, '<span class="text-orange-300">$1</span>')
  }

  useEffect(() => {
    const loadPyodide = async () => {
      try {
        const s = document.createElement('script')
        s.src = 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js'
        s.onload = async () => {
          // global loadPyodide is provided by the script
          // eslint-disable-next-line no-undef
          const pyodide = await loadPyodide({ indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/' })
          pyodideRef.current = pyodide
          setPyodideReady(true)
        }
        document.body.appendChild(s)
      } catch (e) {
        console.error('Failed to load Pyodide', e)
      }
    }
    loadPyodide()
  }, [])

  const runCode = async () => {
    if (!pyodideReady || !pyodideRef.current) return
    setRunning(true)

    // Extract plain text from the contenteditable area
    const code = editorRef.current?.innerText || ''

    // Capture stdout/stderr
    const stdout = []
    const stderr = []
    const originalStdout = pyodideRef.current.runPython

    try {
      // Redirect Python prints by using Python code wrapper
      const wrapped = `\nimport sys\nimport io\n_stdout = io.StringIO()\n_stderr = io.StringIO()\n_sys_stdout = sys.stdout\n_sys_stderr = sys.stderr\nsys.stdout = _stdout\nsys.stderr = _stderr\n\n__result = None\ntry:\n    __result = exec(\n'''${code.replace(/\\/g, '\\\\').replace(/`/g, '\\`')}'''\n    )\nexcept Exception as e:\n    import traceback\n    traceback.print_exc()\nfinally:\n    sys.stdout = _sys_stdout\n    sys.stderr = _sys_stderr\n\n_out = _stdout.getvalue()\n_err = _stderr.getvalue()\n(_out, _err)`

      const [out, err] = pyodideRef.current.runPython(wrapped)
      setOutput((out || '') + (err || ''))
    } catch (e) {
      setOutput(String(e))
    } finally {
      setRunning(false)
    }
  }

  const starter = `# Welcome to the Python Playground\nprint('Hello from Python!')\n\n# Try writing any Python code below.\nfor i in range(3):\n    print('Line', i+1)`

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerText === '') {
      editorRef.current.innerText = starter
      editorRef.current.innerHTML = highlight(starter)
    }
  }, [])

  const onInput = () => {
    const text = editorRef.current.innerText
    editorRef.current.innerHTML = highlight(text)
    placeCaretAtEnd(editorRef.current)
  }

  const placeCaretAtEnd = (el) => {
    const range = document.createRange()
    const sel = window.getSelection()
    range.selectNodeContents(el)
    range.collapse(false)
    sel.removeAllRanges()
    sel.addRange(range)
  }

  return (
    <PageShell>
      <section className="mx-auto max-w-7xl px-4 py-14">
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold">Interactive Python Playground</h2>
          <p className="text-slate-300 mt-2">Type Python on the left, run it instantly, and see the output below.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="rounded-2xl border border-white/10 bg-slate-950/60">
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
              <div className="text-sm text-slate-300">Python 3 (WebAssembly)</div>
              <div className="text-xs">
                {pyodideReady ? <span className="text-emerald-400">Ready</span> : <span className="text-yellow-300">Loading runtime…</span>}
              </div>
            </div>

            <div className="p-3">
              <div
                ref={editorRef}
                contentEditable
                onInput={onInput}
                spellCheck={false}
                className="min-h-[320px] font-mono text-[13px] leading-6 rounded-xl bg-gradient-to-b from-slate-900 to-slate-950 outline-none p-4 text-slate-200 shadow-inner"
                style={{ whiteSpace: 'pre', overflowWrap: 'normal', overflowX: 'auto' }}
              />

              <div className="flex items-center gap-3 pt-3">
                <button onClick={runCode} disabled={!pyodideReady || running} className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 disabled:opacity-60 text-slate-900 font-semibold">
                  {running ? 'Running…' : 'Run ▶'}
                </button>
                <button onClick={() => { setOutput('') }} className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-white">Clear Output</button>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.05 }} className="rounded-2xl border border-white/10 bg-slate-950/60">
            <div className="px-4 py-3 border-b border-white/10 text-sm text-slate-300">Output</div>
            <pre className="p-4 min-h-[320px] text-[13px] leading-6 font-mono text-slate-200 whitespace-pre-wrap">{output || '—'}</pre>
          </motion.div>
        </div>
      </section>
    </PageShell>
  )
}
