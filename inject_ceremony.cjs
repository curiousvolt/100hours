const fs = require('fs');
let code = fs.readFileSync('src/components/TrackDetail.tsx', 'utf8');

const ceremonyView = `
  if (track.status === 'completed') {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex-1 flex flex-col items-center justify-center py-20 text-center space-y-6"
      >
        <h2 className="text-sm font-semibold tracking-[0.2em] text-zinc-500 uppercase">100 Hours</h2>
        <h1 className="text-4xl md:text-5xl font-display text-zinc-900 dark:text-white mt-2 mb-6">{track.topic}</h1>
        
        <p className="text-lg text-zinc-600 dark:text-zinc-400">
          <span className="font-semibold text-zinc-900 dark:text-white">100h 00m</span> invested<br/>
          Final output delivered.
        </p>

        {track.outputLink && (
          <a 
            href={track.outputLink.startsWith('http') ? track.outputLink : 'https://' + track.outputLink} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center space-x-2 text-zinc-900 dark:text-white font-medium hover:underline bg-zinc-100 dark:bg-zinc-800/50 px-5 py-3 rounded-xl transition-colors mt-4"
          >
            <LinkIcon size={16} />
            <span>View Final Output</span>
          </a>
        )}

        {track.completedAt && (
          <p className="text-sm text-zinc-500 mt-8 pt-8">
            Completed {new Date(track.completedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        )}

        <button 
          onClick={onBack}
          className="mt-12 text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
        >
          Back to Dashboard
        </button>
      </motion.div>
    );
  }
`;

code = code.replace(
  '  return (\n    <motion.div',
  ceremonyView + '\n  return (\n    <motion.div'
);

fs.writeFileSync('src/components/TrackDetail.tsx', code);
