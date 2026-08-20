const fs = require('fs');
let code = fs.readFileSync('src/components/TrackDetail.tsx', 'utf8');

code = code.replace(
  '{isDoneHours && !track.outputDelivered ? (',
  '{isDoneHours && !track.outputDelivered && track.status === "active" ? ('
);

fs.writeFileSync('src/components/TrackDetail.tsx', code);

// Same for TrackCard
let cardCode = fs.readFileSync('src/components/TrackCard.tsx', 'utf8');
cardCode = cardCode.replace(
  '{isDoneHours && !track.outputDelivered ? (',
  '{isDoneHours && !track.outputDelivered && track.status === "active" ? ('
);
fs.writeFileSync('src/components/TrackCard.tsx', cardCode);

