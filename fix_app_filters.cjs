const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(
  "const archivedTracks = tracks.filter(t => t.status === 'archived');",
  "const archivedTracks = tracks.filter(t => t.status !== 'active');"
);

fs.writeFileSync('src/App.tsx', code);
