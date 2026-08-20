const fs = require('fs');
let code = fs.readFileSync('src/components/TrackDetail.tsx', 'utf8');

code = code.replace(/onDelete\?: \(\) => void;/g, "onAbandon?: () => void;");
code = code.replace(/onDelete=/g, "onAbandon=");
code = code.replace(
  '<span className="text-red-500">Delete Track</span>',
  '<span className="text-red-500">Abandon Commitment</span>'
);
code = code.replace(
  "onClick={() => onDelete?.()}",
  "onClick={() => onAbandon?.()}"
);

// We also need the Track Completion Ceremony here
// If track.status === 'completed', we should render the ceremony view
const ceremonyView = `
  if (track.status === 'completed') {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center animate-fade-in space-y-4">
        <h2 className="text-sm font-semibold tracking-[0.2em] text-zinc-500 uppercase">100 Hours</h2>
        <h1 className="text-3xl font-display text-zinc-900 dark:text-white mt-2 mb-6">{track.topic}</h1>
        
        <p className="text-zinc-600 dark:text-zinc-400">
          <span className="font-semibold text-zinc-900 dark:text-white">100h 00m</span> invested<br/>
          Final output delivered.
        </p>

        {track.completedAt && (
          <p className="text-sm text-zinc-500 mt-8">
            Completed {new Date(track.completedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        )}

        <button 
          onClick={onBack}
          className="mt-12 text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
        >
          Archive Track
        </button>
      </div>
    );
  }
`;

code = code.replace(
  "if (!track) return null;",
  "if (!track) return null;\n" + ceremonyView
);

fs.writeFileSync('src/components/TrackDetail.tsx', code);
