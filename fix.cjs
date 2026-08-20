const fs = require('fs');

const fixes = {
  'text-white dark:text-black dark:text-white': 'text-black dark:text-white',
  'hover:text-white dark:text-black dark:hover:text-white dark:text-black dark:text-white': 'hover:text-black dark:hover:text-white',
  'hover:text-white dark:text-black dark:hover:text-white': 'hover:text-black dark:hover:text-white',
  'hover:bg-zinc-100 dark:hover:bg-zinc-100 dark:bg-zinc-800': 'hover:bg-zinc-100 dark:hover:bg-zinc-800',
  'text-black dark:text-white dark:text-black': 'text-white dark:text-black',
  'bg-white dark:bg-black dark:bg-white': 'bg-black dark:bg-white',
  'bg-black dark:bg-white dark:bg-black': 'bg-white dark:bg-black',
  'bg-white/10 dark:bg-black/10 dark:bg-white/10': 'bg-black/10 dark:bg-white/10',
  'bg-black/10 dark:bg-white/10 dark:bg-black/10': 'bg-white/10 dark:bg-black/10',
  'bg-white/20 dark:bg-black/20 dark:bg-white/20': 'bg-black/20 dark:bg-white/20',
  'bg-black/20 dark:bg-white/20 dark:bg-black/20': 'bg-white/20 dark:bg-black/20',
  'bg-zinc-50 dark:bg-white dark:bg-zinc-950': 'bg-white dark:bg-zinc-950',
  'text-zinc-700 dark:text-zinc-300 hover:text-white dark:text-black dark:hover:text-white dark:text-black dark:text-white': 'text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white'
};

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let newContent = content;

  Object.keys(fixes).forEach(key => {
    newContent = newContent.split(key).join(fixes[key]);
  });

  // A generic cleanup for multiple dark: classes that are identical or mangled
  // For example: dark:text-black dark:text-white -> dark:text-white
  newContent = newContent.replace(/dark:text-black dark:text-white/g, 'dark:text-white');
  newContent = newContent.replace(/dark:hover:text-white dark:text-black dark:text-white/g, 'dark:hover:text-white');
  newContent = newContent.replace(/hover:bg-zinc-100 dark:hover:bg-zinc-100 dark:bg-zinc-800/g, 'hover:bg-zinc-100 dark:hover:bg-zinc-800');

  if (content !== newContent) {
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`Fixed ${filePath}`);
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
];

files.forEach(f => {
  if (fs.existsSync(f)) {
    processFile(f);
  }
});
