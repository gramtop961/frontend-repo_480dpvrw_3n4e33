import { Link, NavLink } from 'react-router-dom'
import { Menu, X, Rocket, PanelsTopLeft, Sparkles, Image as ImageIcon, Mail } from 'lucide-react'
import { useState } from 'react'

const navItems = [
  { to: '/', label: 'Home', icon: Rocket },
  { to: '/work', label: 'Work', icon: Sparkles },
  { to: '/playground', label: 'Playground', icon: PanelsTopLeft },
  { to: '/gallery', label: 'Gallery', icon: ImageIcon },
  { to: '/contact', label: 'Contact', icon: Mail },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mt-4 rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-xl shadow-lg">
          <div className="flex items-center justify-between px-4 py-3">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="size-9 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white shadow-[0_0_20px_rgba(59,130,246,0.5)]">
                <Rocket size={18} />
              </div>
              <div className="text-white font-semibold tracking-tight group-hover:text-cyan-200 transition-colors">Vibe Studio</div>
            </Link>

            <nav className="hidden md:flex items-center gap-2">
              {navItems.map(({ to, label, icon: Icon }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) => `inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all ${isActive ? 'bg-white/10 text-white' : 'text-slate-300 hover:text-white hover:bg-white/5'}`}
                >
                  <Icon size={16} /> {label}
                </NavLink>
              ))}
              <a href="/test" className="ml-2 inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-all">Test</a>
            </nav>

            <button onClick={() => setOpen(!open)} className="md:hidden text-white/80 hover:text-white p-2">
              {open ? <X /> : <Menu />}
            </button>
          </div>

          {open && (
            <div className="md:hidden border-t border-white/10 px-2 py-2">
              {navItems.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) => `block w-full px-3 py-2 rounded-lg text-sm ${isActive ? 'bg-white/10 text-white' : 'text-slate-300 hover:text-white hover:bg-white/5'}`}
                >
                  {label}
                </NavLink>
              ))}
              <a href="/test" className="block w-full px-3 py-2 rounded-lg text-sm text-slate-300 hover:text-white hover:bg-white/5">Test</a>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
