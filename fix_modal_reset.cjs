const fs = require('fs');
let code = fs.readFileSync('src/components/EditCommitmentModal.tsx', 'utf8');

code = code.replace(
  '      setCommitment(track.commitment);\n    }',
  '      setCommitment(track.commitment);\n      setIsEditing(false);\n    }'
);

fs.writeFileSync('src/components/EditCommitmentModal.tsx', code);
