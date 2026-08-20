const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(
  "import { AbandonTrackModal } from './components/AbandonTrackModal';",
  "import { AbandonTrackModal } from './components/AbandonTrackModal';\nimport { DeleteTrackModal } from './components/DeleteTrackModal';"
);

code = code.replace(
  "const [abandonModalTrack, setAbandonModalTrack] = useState<Track | null>(null);",
  "const [abandonModalTrack, setAbandonModalTrack] = useState<Track | null>(null);\n  const [deleteModalTrack, setDeleteModalTrack] = useState<Track | null>(null);"
);

// update onDelete in TrackDetail mapping
code = code.replace(
  "onDelete={(id) => setAbandonModalTrack(getTrack(id))}",
  "onDelete={(id) => {\n                const tr = getTrack(id);\n                if (tr?.status === 'active') {\n                  setAbandonModalTrack(tr);\n                } else {\n                  setDeleteModalTrack(tr);\n                }\n              }}"
);

// update the rendered modals
const modalsStr = `<AbandonTrackModal
        track={abandonModalTrack}
        onClose={() => setAbandonModalTrack(null)}
        onConfirm={(id) => {
          store.abandonTrack(id);
          setCurrentView('home');
        }}
      />
      <DeleteTrackModal
        track={deleteModalTrack}
        onClose={() => setDeleteModalTrack(null)}
        onConfirm={(id) => {
          store.deleteTrack(id);
          setCurrentView('home');
        }}
      />`;

code = code.replace(
  /<AbandonTrackModal[\s\S]*?\/>/,
  modalsStr
);

fs.writeFileSync('src/App.tsx', code);
