const fs = require('fs');
let code = fs.readFileSync('src/components/TrackDetail.tsx', 'utf8');

code = code.replace(
  '<button \n          onClick={() => { onArchive?.(); }}\n          className="mt-12 text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"\n        >\n          Archive Track\n        </button>',
  '{track.status === "active" && (\n          <button \n            onClick={() => { onArchive?.(); }}\n            className="mt-12 text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"\n          >\n            Archive Track\n          </button>\n        )}'
);

fs.writeFileSync('src/components/TrackDetail.tsx', code);
