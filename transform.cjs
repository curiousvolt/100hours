const fs = require('fs');
const path = require('path');

const mappings = {
  'bg-zinc-950': 'bg-white dark:bg-zinc-950',
  'bg-zinc-950/80': 'bg-white/80 dark:bg-zinc-950/80',
  'bg-zinc-900': 'bg-zinc-50 dark:bg-zinc-900',
  'bg-zinc-900/50': 'bg-zinc-50/50 dark:bg-zinc-900/50',
  'bg-zinc-900/90': 'bg-zinc-50/90 dark:bg-zinc-900/90',
  'bg-zinc-800': 'bg-zinc-100 dark:bg-zinc-800',
  'bg-zinc-800/50': 'bg-zinc-100/50 dark:bg-zinc-800/50',
  'bg-zinc-800/80': 'bg-zinc-100/80 dark:bg-zinc-800/80',
  'bg-zinc-700': 'bg-zinc-200 dark:bg-zinc-700',
  'bg-zinc-700/50': 'bg-zinc-200/50 dark:bg-zinc-700/50',
  'bg-zinc-950/40': 'bg-white/40 dark:bg-zinc-950/40',
  'text-white': 'text-black dark:text-white',
  'text-zinc-100': 'text-zinc-900 dark:text-zinc-100',
  'text-zinc-200': 'text-zinc-800 dark:text-zinc-200',
  'text-zinc-300': 'text-zinc-700 dark:text-zinc-300',
  'text-zinc-400': 'text-zinc-600 dark:text-zinc-400',
  'border-zinc-900': 'border-zinc-200 dark:border-zinc-900',
  'border-zinc-800': 'border-zinc-200 dark:border-zinc-800',
  'border-zinc-800/50': 'border-zinc-200/50 dark:border-zinc-800/50',
  'border-zinc-800/60': 'border-zinc-200/60 dark:border-zinc-800/60',
  'border-zinc-700': 'border-zinc-300 dark:border-zinc-700',
  'border-zinc-700/50': 'border-zinc-300/50 dark:border-zinc-700/50',
  'border-white/20': 'border-black/20 dark:border-white/20',
  'border-white/10': 'border-black/10 dark:border-white/10',
  'bg-white/5': 'bg-black/5 dark:bg-white/5',
  'bg-white/10': 'bg-black/10 dark:bg-white/10',
  'bg-white/20': 'bg-black/20 dark:bg-white/20',
  'text-white/70': 'text-black/70 dark:text-white/70',
  'hover:text-white': 'hover:text-black dark:hover:text-white',
  'hover:bg-zinc-800': 'hover:bg-zinc-100 dark:hover:bg-zinc-800',
  'hover:bg-zinc-200': 'hover:bg-zinc-800 dark:hover:bg-zinc-200',
  'hover:text-zinc-200': 'hover:text-zinc-800 dark:hover:text-zinc-200',
  'hover:text-red-400': 'hover:text-red-600 dark:hover:text-red-400',
  'bg-white': 'bg-black dark:bg-white',
  'text-black': 'text-white dark:text-black',
  'selection:bg-white/20': 'selection:bg-black/20 dark:selection:bg-white/20',
  'selection:bg-zinc-800': 'selection:bg-zinc-200 dark:selection:bg-zinc-800',
  'selection:text-white': 'selection:text-black dark:selection:text-white',
  'text-zinc-500': 'text-zinc-500 dark:text-zinc-500',
  'bg-black/40': 'bg-zinc-100/40 dark:bg-black/40'
};

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let newContent = content;

  const keys = Object.keys(mappings).sort((a, b) => b.length - a.length);

  keys.forEach(key => {
    // Escape slashes for regex
    const escapedKey = key.replace(/\//g, '\\/');
    // Regex explanation:
    // (?<!dark:) - not preceded by dark:
    // (?<![\w-]) - not preceded by a word character or hyphen
    // (escapedKey) - the exact key
    // (?![\w-]) - not followed by a word character or hyphen
    const regex = new RegExp(`(?<!dark:)(?<![\\w-])(${escapedKey})(?![\\w-])`, 'g');
    newContent = newContent.replace(regex, mappings[key]);
  });

  if (content !== newContent) {
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`Updated ${filePath}`);
  }
}

const files = [
  'src/App.tsx',
  'src/main.tsx',
  'src/components/ArcProgress.tsx',
  'src/components/TrackCard.tsx',
  'src/components/ActiveTimerOverlay.tsx',
  'src/components/Modal.tsx',
  'src/components/CreateTrackModal.tsx',
  'src/components/LogSessionModal.tsx',
  'src/components/EditCommitmentModal.tsx',
  'src/components/LinearProgress.tsx',
  'src/components/TrackDetail.tsx',
  'src/components/ReleaseNotes.tsx',
  'src/components/DeleteTrackModal.tsx',
  'src/index.css'
];

files.forEach(f => {
  if (fs.existsSync(f)) {
    processFile(f);
  }
});
