const fs = require('fs');
let code = fs.readFileSync('src/components/AbandonTrackModal.tsx', 'utf8');

code = code.replace(/DeleteTrackModal/g, "AbandonTrackModal");
code = code.replace(/Delete Track/g, "Abandon Commitment");
code = code.replace(/Delete/g, "Abandon");
code = code.replace(/delete/g, "abandon");

code = code.replace(
  "Are you sure you want to abandon this track? This action cannot be undone.",
  "You invested {Math.floor(track.totalMinutes / 60)}h {track.totalMinutes % 60}m into this track.\n          Are you sure you want to abandon it?"
);
code = code.replace(
  "text-red-600 hover:text-red-700 dark:text-red-500 dark:hover:text-red-400",
  "text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300"
);
code = code.replace(
  "bg-red-600 hover:bg-red-700 text-white",
  "bg-red-500 hover:bg-red-600 text-white"
);
code = code.replace(/onDelete/g, "onAbandon");

fs.writeFileSync('src/components/AbandonTrackModal.tsx', code);
