import PageShell from '../components/PageShell'
import { motion } from 'framer-motion'

export default function Work() {
  const cards = [
    { title: 'Animated UI Kit', tag: 'UI' },
    { title: 'Data Viz System', tag: 'Charts' },
    { title: '3D Product Teasers', tag: '3D' },
    { title: 'Realtime Dashboards', tag: 'Realtime' },
    { title: 'Brand Microsites', tag: 'Web' },
    { title: 'Storytelling Pages', tag: 'Motion' },
  ]

  return (
    <PageShell>
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="mb-10">
          <h2 className="text-3xl md:text-4xl font-bold">Featured Work</h2>
          <p className="text-slate-300 mt-2">A snapshot of interactive projects and concepts.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((c, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="group rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900 to-slate-800 p-6 hover:from-slate-800 hover:to-slate-700 transition-all">
              <div className="text-xs uppercase tracking-wider text-cyan-300/80">{c.tag}</div>
              <h3 className="mt-2 text-xl font-semibold group-hover:text-white">{c.title}</h3>
              <div className="mt-6 h-28 rounded-xl bg-[radial-gradient(200px_circle_at_30%_20%,rgba(56,189,248,0.3),transparent_60%)]" />
            </motion.div>
          ))}
        </div>
      </section>
    </PageShell>
  )
}
