import { motion } from 'motion/react';

interface ArcProgressProps {
  progress: number; // 0 to 1
  size?: number;
  strokeWidth?: number;
}

export function ArcProgress({ progress, size = 120, strokeWidth = 8 }: ArcProgressProps) {
  const center = size / 2;
  const radius = center - strokeWidth;
  const circumference = 2 * Math.PI * radius;
  // Let's make it a 3/4 circle (270 degrees)
  const arcLength = circumference * 0.75;
  const offset = arcLength - progress * arcLength;

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        className="rotate-[135deg]"
        viewBox={`0 0 ${size} ${size}`}
      >
        {/* Background arc */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="transparent"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          className="text-zinc-100 dark:text-zinc-800"
          strokeDasharray={`${arcLength} ${circumference}`}
          strokeDashoffset="0"
        />
        {/* Foreground arc */}
        <motion.circle
          cx={center}
          cy={center}
          r={radius}
          fill="transparent"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          className="text-zinc-900 dark:text-white drop-shadow-[0_0_8px_rgba(0,0,0,0.1)] dark:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]"
          initial={{ strokeDasharray: `${arcLength} ${circumference}`, strokeDashoffset: arcLength }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </svg>
    </div>
  );
}
