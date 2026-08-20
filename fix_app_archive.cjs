const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(
  'onDeliver={store.deliverOutput}',
  'onDeliver={store.deliverOutput}\n              onArchive={() => {\n                store.archiveTrack(activeTrackDetail.id);\n                setCurrentView("home");\n              }}'
);

fs.writeFileSync('src/App.tsx', code);
