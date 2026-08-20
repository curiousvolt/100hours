const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(
  "import { DeleteTrackModal } from './components/DeleteTrackModal';",
  "import { AbandonTrackModal } from './components/AbandonTrackModal';"
);

code = code.replace(/<DeleteTrackModal/g, "<AbandonTrackModal");
code = code.replace(/deleteModalTrack/g, "abandonModalTrack");
code = code.replace(/setDeleteModalTrack/g, "setAbandonModalTrack");
code = code.replace(/onDelete=\{\(\) => \{/g, "onAbandon={() => {");
code = code.replace(/store\.deleteTrack/g, "store.abandonTrack");
code = code.replace("setIsDataMenuOpen(false);\n            setDeleteModalTrack(null);", "setIsDataMenuOpen(false);\n            setAbandonModalTrack(null);");
code = code.replace("onClose={() => setDeleteModalTrack(null)}", "onClose={() => setAbandonModalTrack(null)}");


fs.writeFileSync('src/App.tsx', code);
