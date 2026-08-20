const fs = require('fs');
let code = fs.readFileSync('src/components/TrackDetail.tsx', 'utf8');

code = code.replace(
  'title="Delete Track"',
  'title={track.status === "active" ? "Abandon Track" : "Delete Track"}'
);

fs.writeFileSync('src/components/TrackDetail.tsx', code);
