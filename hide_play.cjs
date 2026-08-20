const fs = require('fs');
let code = fs.readFileSync('src/components/TrackCard.tsx', 'utf8');

code = code.replace(
  '{!isDoneHours ? (',
  '{!isDoneHours && track.status === \'active\' ? ('
);

fs.writeFileSync('src/components/TrackCard.tsx', code);
