import { motion } from "motion/react"

export default function AuthLeftPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="hidden md:flex flex-col justify-center items-center w-1/2 bg-gradient-to-b from-[#1e3a8a] to-[#3b82f6] text-white p-10 rounded-[40px]"
    >
      <h1 className="text-3xl font-bold mb-2">Welcome to Leadshike</h1>
      <p className="text-sm mb-16 text-center opacity-90">
        Your Gateway to Effortless Client Management.
      </p>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex flex-col items-center text-center"
      >
        <h2 className="text-2xl font-semibold mb-2">
          Seamless Client Management
        </h2>
        <p className="text-sm max-w-xs opacity-90">
          Effortlessly work together with your team in real-time.
        </p>
      </motion.div>

      <div className="mt-4 text-white text-2xl font-bold tracking-widest">
        • •
      </div>
    </motion.div>
  );
}
