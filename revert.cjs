const fs = require('fs');

const classesToRemove = [
  'dark:bg-zinc-950', 'dark:bg-zinc-950/80', 'dark:bg-zinc-900', 'dark:bg-zinc-900/50', 
  'dark:bg-zinc-900/90', 'dark:bg-zinc-800', 'dark:bg-zinc-800/50', 'dark:bg-zinc-800/80',
  'dark:bg-zinc-700', 'dark:bg-zinc-700/50', 'dark:bg-zinc-950/40', 'dark:text-white',
  'dark:text-zinc-100', 'dark:text-zinc-200', 'dark:text-zinc-300', 'dark:text-zinc-400',
  'dark:border-zinc-900', 'dark:border-zinc-800', 'dark:border-zinc-800/50', 
  'dark:border-zinc-800/60', 'dark:border-zinc-700', 'dark:border-zinc-700/50',
  'dark:border-white/20', 'dark:border-white/10', 'dark:bg-white/5', 'dark:bg-white/10',
  'dark:bg-white/20', 'dark:text-white/70', 'dark:hover:text-white', 'dark:hover:bg-zinc-800',
  'dark:hover:bg-zinc-200', 'dark:hover:text-zinc-200', 'dark:hover:text-red-400',
  'dark:bg-white', 'dark:text-black', 'dark:selection:bg-white/20', 'dark:selection:bg-zinc-800',
  'dark:selection:text-white', 'dark:text-zinc-500', 'dark:bg-black/40', 'dark:hover:text-black'
];

const reverseMappings = {
  'bg-white': 'bg-zinc-950',
  'bg-white/80': 'bg-zinc-950/80',
  'bg-zinc-50': 'bg-zinc-900',
  'bg-zinc-50/50': 'bg-zinc-900/50',
  'bg-zinc-50/90': 'bg-zinc-900/90',
  'bg-zinc-100': 'bg-zinc-800',
  'bg-zinc-100/50': 'bg-zinc-800/50',
  'bg-zinc-100/80': 'bg-zinc-800/80',
  'bg-zinc-200': 'bg-zinc-700',
  'bg-zinc-200/50': 'bg-zinc-700/50',
  'bg-white/40': 'bg-zinc-950/40',
  'text-black': 'text-white',
  'text-zinc-900': 'text-zinc-100',
  'text-zinc-800': 'text-zinc-200',
  'text-zinc-700': 'text-zinc-300',
  'text-zinc-600': 'text-zinc-400',
  'border-zinc-200': 'border-zinc-800',
  'border-zinc-200/50': 'border-zinc-800/50',
  'border-zinc-200/60': 'border-zinc-800/60',
  'border-zinc-300': 'border-zinc-700',
  'border-zinc-300/50': 'border-zinc-700/50',
  'border-black/20': 'border-white/20',
  'border-black/10': 'border-white/10',
  'bg-black/5': 'bg-white/5',
  'bg-black/10': 'bg-white/10',
  'bg-black/20': 'bg-white/20',
  'text-black/70': 'text-white/70',
  'hover:text-black': 'hover:text-white',
  'hover:bg-zinc-100': 'hover:bg-zinc-800',
  'hover:bg-zinc-800': 'hover:bg-zinc-200',
  'hover:text-zinc-800': 'hover:text-zinc-200',
  'hover:text-red-600': 'hover:text-red-400',
  'bg-black': 'bg-white',
  'selection:bg-black/20': 'selection:bg-white/20',
  'selection:bg-zinc-200': 'selection:bg-zinc-800',
  'selection:text-black': 'selection:text-white',
  'bg-zinc-100/40': 'bg-black/40'
};

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let newContent = content;

  // Find all class strings
  newContent = newContent.replace(/className=(["'])(.*?)\1/g, (match, quote, classes) => {
     let classList = classes.split(/\s+/).filter(c => c.trim().length > 0);
     
     // Remove all dark: classes
     classList = classList.filter(c => !c.startsWith('dark:'));
     
     // Revert light mode mappings back to dark mode counterparts
     classList = classList.map(c => reverseMappings[c] || c);
     
     // Deduplicate
     classList = [...new Set(classList)];

     return `className=${quote}${classList.join(' ')}${quote}`;
  });

  if (content !== newContent) {
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`Reverted ${filePath}`);
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
