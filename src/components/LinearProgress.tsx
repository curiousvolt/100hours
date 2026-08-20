import { motion } from 'motion/react';

interface LinearProgressProps {
  progress: number; // 0 to 1
  height?: number;
  className?: string;
}

export function LinearProgress({ progress, height = 8, className = '' }: LinearProgressProps) {
  const clampedProgress = Math.min(Math.max(progress, 0), 1);

  return (
    <div 
      className={`w-full bg-zinc-100/50 dark:bg-zinc-800/50 rounded-full overflow-hidden relative ${className}`} 
      style={{ height }}
    >
      <motion.div
        className="absolute top-0 left-0 bottom-0 bg-gradient-to-r from-zinc-600 to-zinc-900 dark:from-zinc-400 dark:to-white rounded-full shadow-[0_0_10px_rgba(0,0,0,0.2)] dark:shadow-[0_0_10px_rgba(255,255,255,0.3)]"
        initial={{ width: 0 }}
        animate={{ width: `${clampedProgress * 100}%` }}
        transition={{ duration: 1, ease: 'easeOut' }}
      />
    </div>
  );
}
