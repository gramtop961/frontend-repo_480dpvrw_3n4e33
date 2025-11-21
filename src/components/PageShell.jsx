import { motion, AnimatePresence } from 'framer-motion'
import Navbar from './Navbar'

export default function PageShell({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.35 }}
          className="pt-24"
        >
          {children}
        </motion.main>
      </AnimatePresence>
    </div>
  )
}
