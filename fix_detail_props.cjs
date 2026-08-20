const fs = require('fs');
let code = fs.readFileSync('src/components/TrackDetail.tsx', 'utf8');

code = code.replace(
  'onDeliver: (trackId: string, link: string) => void;',
  'onDeliver: (trackId: string, link: string) => void;\n  onArchive?: () => void;'
);

code = code.replace(
  'onDeliver,\n}: TrackDetailProps)',
  'onDeliver,\n  onArchive,\n}: TrackDetailProps)'
);

code = code.replace(
  'onClick={onBack}\n          className="mt-12 text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"\n        >\n          Back to Dashboard',
  'onClick={() => { onArchive?.(); }}\n          className="mt-12 text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"\n        >\n          Archive Track'
);

fs.writeFileSync('src/components/TrackDetail.tsx', code);
