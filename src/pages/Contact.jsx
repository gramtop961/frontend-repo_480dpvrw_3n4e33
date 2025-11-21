import PageShell from '../components/PageShell'
import { motion } from 'framer-motion'
import { useState } from 'react'

export default function Contact() {
  const [sent, setSent] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <PageShell>
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold">Let’s work together</h2>
          <p className="text-slate-300 mt-2">Tell us about your project and we’ll get back to you.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.form onSubmit={submit} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="rounded-2xl border border-white/10 bg-slate-950/60 p-6">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-slate-300">Name</label>
                <input required className="mt-1 w-full rounded-lg bg-white/5 border border-white/10 p-3 outline-none focus:ring-2 ring-cyan-400" />
              </div>
              <div>
                <label className="text-sm text-slate-300">Email</label>
                <input required type="email" className="mt-1 w-full rounded-lg bg-white/5 border border-white/10 p-3 outline-none focus:ring-2 ring-cyan-400" />
              </div>
            </div>
            <div className="mt-4">
              <label className="text-sm text-slate-300">Project details</label>
              <textarea rows={6} required className="mt-1 w-full rounded-lg bg-white/5 border border-white/10 p-3 outline-none focus:ring-2 ring-cyan-400"></textarea>
            </div>
            <button className="mt-5 px-5 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold">Send</button>
            {sent && <p className="text-emerald-400 text-sm mt-3">Thanks! We’ll be in touch.</p>}
          </motion.form>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.05 }} className="rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900 to-slate-800 p-6">
            <h3 className="font-semibold">Why choose us</h3>
            <ul className="mt-3 space-y-2 text-slate-300 text-sm">
              <li>• Motion-driven design</li>
              <li>• Performance-minded builds</li>
              <li>• Cohesive, modern aesthetic</li>
              <li>• Clear collaboration</li>
            </ul>
          </motion.div>
        </div>
      </section>
    </PageShell>
  )
}
