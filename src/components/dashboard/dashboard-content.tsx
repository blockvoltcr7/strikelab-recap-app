
import { motion } from 'framer-motion';

const Dashboard = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      className="m-2 flex flex-1 overflow-hidden"
    >
      <div className="flex h-full w-full flex-1 flex-col gap-4 rounded-xl border border-border bg-card p-6 text-card-foreground dark:border-sidebar-border md:p-8">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="flex gap-4"
        >
          {[...new Array(4)].map((_, i) => (
            <motion.div
              key={`stat-block-${i}`}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.3 + (i * 0.1) }}
              className="h-24 w-full rounded-lg bg-muted text-muted-foreground flex items-center justify-center shadow-sm"
            >
              <span className="text-sm">Stat Block {i + 1}</span>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.5 }}
          className="flex flex-1 gap-4"
        >
          {[...new Array(2)].map((_, i) => (
            <motion.div
              key={`content-block-${i}`}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.5 + (i * 0.1) }}
              className="h-full w-full rounded-lg bg-muted text-muted-foreground flex items-center justify-center shadow-sm"
            >
              <span className="text-sm">Content Block {i + 1}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
