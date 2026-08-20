const fs = require('fs');
let code = fs.readFileSync('src/components/TrackDetail.tsx', 'utf8');

// 1. Fix Log Manual Session hover state
code = code.replace(
  'className="w-full bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 px-4 py-4 rounded-xl font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors flex items-center justify-center space-x-2"',
  'className="w-full bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 px-4 py-4 rounded-xl font-medium hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors flex items-center justify-center space-x-2"'
);

// 2. Fix Animated Commitment Card light mode colors
code = code.replace(
  'className="bg-gradient-to-br from-zinc-800/40 to-zinc-900/80 border border-zinc-300/50 dark:border-zinc-700/50 rounded-3xl p-8 relative overflow-hidden group cursor-pointer"',
  'className="bg-gradient-to-br from-zinc-100/80 to-zinc-200/50 dark:from-zinc-800/40 dark:to-zinc-900/80 border border-zinc-200 dark:border-zinc-700/50 rounded-3xl p-8 relative overflow-hidden group cursor-pointer"'
);

fs.writeFileSync('src/components/TrackDetail.tsx', code);
