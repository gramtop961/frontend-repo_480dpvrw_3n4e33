import PageShell from '../components/PageShell'
import { motion } from 'framer-motion'

export default function Gallery() {
  const items = new Array(9).fill(0).map((_, i) => i)
  return (
    <PageShell>
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold">Motion Gallery</h2>
          <p className="text-slate-300 mt-2">A playful set of animated cards and hover effects.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((i) => (
            <motion.div key={i} whileHover={{ y: -6 }} className="rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900 to-slate-800 p-6">
              <div className="h-40 rounded-xl bg-[radial-gradient(240px_160px_at_50%_50%,rgba(56,189,248,0.35),transparent_60%)]" />
              <h3 className="mt-4 font-semibold">Interactive Card {i + 1}</h3>
              <p className="text-slate-300 text-sm mt-1">Hover to lift and glow.</p>
            </motion.div>
          ))}
        </div>
      </section>
    </PageShell>
  )
}
