const fs = require('fs');
let code = fs.readFileSync('src/components/TrackDetail.tsx', 'utf8');

code = code.replace(
  '<h4 className="text-2xl text-zinc-900 dark:text-white font-display mb-2">\n                {track.commitmentTitle}\n              </h4>\n              <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed">\n                "{track.commitment}"\n              </p>',
  '<h4 className="text-2xl text-zinc-900 dark:text-white font-display">\n                {track.commitmentTitle}\n              </h4>'
);

fs.writeFileSync('src/components/TrackDetail.tsx', code);
