const fs = require('fs');
let code = fs.readFileSync('src/components/TrackDetail.tsx', 'utf8');

const outputDeliveredView = `
          {track.outputDelivered && track.outputLink && (
            <div className="pt-8 border-t border-zinc-200/50 dark:border-zinc-800/50">
              <h3 className="text-sm font-semibold tracking-widest uppercase text-zinc-500 mb-4 flex items-center space-x-2">
                <span>Final Output Delivered</span>
                <CheckCircle2 size={16} className="text-green-500" />
              </h3>
              <a 
                href={track.outputLink.startsWith('http') ? track.outputLink : 'https://' + track.outputLink} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center space-x-2 text-zinc-900 dark:text-white font-medium hover:underline bg-zinc-100 dark:bg-zinc-800/50 px-4 py-3 rounded-xl transition-colors"
              >
                <LinkIcon size={16} />
                <span>{track.outputLink}</span>
              </a>
            </div>
          )}

          <div className="pt-8 border-t border-zinc-200/50 dark:border-zinc-800/50">
            {/* Sessions List */}
`;

code = code.replace(
  '<div className="pt-8 border-t border-zinc-200/50 dark:border-zinc-800/50">\n            {/* Sessions List */}',
  outputDeliveredView
);

fs.writeFileSync('src/components/TrackDetail.tsx', code);
