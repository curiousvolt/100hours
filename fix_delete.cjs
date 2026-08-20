const fs = require('fs');
let code = fs.readFileSync('src/components/DeleteTrackModal.tsx', 'utf8');

code = code.replace(/AbandonTrackModal/g, 'DeleteTrackModal');
code = code.replace(/Abandon Commitment\?/g, 'Delete Track?');
code = code.replace(/abandon <strong/g, 'permanently delete <strong');
code = code.replace(/Abandon in/g, 'Delete in');
code = code.replace(/Abandon Commitment/g, 'Delete Track');

fs.writeFileSync('src/components/DeleteTrackModal.tsx', code);
