const fs = require('fs');
let code = fs.readFileSync('src/components/TrackCard.tsx', 'utf8');

const badges = `
      <div className="absolute top-6 right-6 flex space-x-2">
        {track.status === 'completed' && (
          <span className="bg-zinc-200/50 dark:bg-zinc-800/50 text-zinc-700 dark:text-zinc-300 px-2 py-1 rounded text-xs font-semibold uppercase tracking-wider">Completed</span>
        )}
        {track.status === 'abandoned' && (
          <span className="bg-red-500/10 text-red-600 dark:text-red-400 px-2 py-1 rounded text-xs font-semibold uppercase tracking-wider">Abandoned</span>
        )}
      </div>
      <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-4 group-hover:translate-x-0 duration-300 flex items-center justify-center">
`;

code = code.replace(
  '<div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-4 group-hover:translate-x-0 duration-300">',
  badges
);
code = code.replace(
  '<div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-4 group-hover:translate-x-0 duration-300 flex items-center justify-center">\n        <ChevronRight className="text-zinc-500" size={20} />\n      </div>',
  '<div className="absolute top-1/2 -translate-y-1/2 right-6 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-4 group-hover:translate-x-0 duration-300 flex items-center justify-center">\n        <ChevronRight className="text-zinc-500" size={20} />\n      </div>'
);

fs.writeFileSync('src/components/TrackCard.tsx', code);
