import Hero from '../components/Hero'
import PageShell from '../components/PageShell'
import { motion } from 'framer-motion'

export default function Home() {
  return (
    <PageShell>
      <Hero />

      <section className="relative py-20">
        <div className="absolute inset-0 bg-[radial-gradient(600px_circle_at_50%_0%,rgba(56,189,248,0.15),transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl px-4 grid md:grid-cols-3 gap-6">
          {[
            { title: 'Motion-first', desc: 'Smooth microinteractions and page transitions throughout.' },
            { title: 'Responsive', desc: 'Layouts adapt beautifully from mobile to desktop.' },
            { title: 'Interactive', desc: 'Live Python coding playground with real-time output.' },
          ].map((f, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
              <h3 className="text-xl font-semibold">{f.title}</h3>
              <p className="text-slate-300 mt-2">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </PageShell>
  )
}
