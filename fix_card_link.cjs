const fs = require('fs');
let code = fs.readFileSync('src/components/TrackCard.tsx', 'utf8');

code = code.replace(
  "import { Play, ChevronRight, CheckCircle2 } from 'lucide-react';",
  "import { Play, ChevronRight, CheckCircle2, Link as LinkIcon } from 'lucide-react';"
);

const linkView = `
        {track.outputDelivered && track.outputLink && (
          <a
            href={track.outputLink.startsWith('http') ? track.outputLink : 'https://' + track.outputLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex-1 bg-zinc-100 dark:bg-zinc-800/50 text-zinc-900 dark:text-white px-4 py-3 rounded-xl text-sm font-semibold flex items-center justify-center space-x-2 border border-zinc-200 dark:border-zinc-700/50 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
          >
            <LinkIcon size={16} />
            <span>View Output</span>
          </a>
        )}
        <div className="flex gap-2 relative z-10" onClick={(e) => e.stopPropagation()}>
`;

code = code.replace(
  '<div className="flex gap-2 relative z-10" onClick={(e) => e.stopPropagation()}>',
  linkView
);

fs.writeFileSync('src/components/TrackCard.tsx', code);
