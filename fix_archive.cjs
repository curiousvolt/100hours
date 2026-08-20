const fs = require('fs');

let trackDetail = fs.readFileSync('src/components/TrackDetail.tsx', 'utf8');
trackDetail = trackDetail.replace("onAbandon?: () => void;", "onAbandon?: () => void;\n  onArchive?: () => void;");
trackDetail = trackDetail.replace("onClick={onBack}\n          className=\"mt-12", "onClick={() => { onArchive?.(); onBack(); }}\n          className=\"mt-12");
fs.writeFileSync('src/components/TrackDetail.tsx', trackDetail);

let appTsx = fs.readFileSync('src/App.tsx', 'utf8');
appTsx = appTsx.replace("onAbandon={() => setAbandonModalTrack(getTrack(currentTrackId))}", "onAbandon={() => setAbandonModalTrack(getTrack(currentTrackId))}\n          onArchive={() => { store.archiveTrack(currentTrackId); setCurrentView('home'); }}");
fs.writeFileSync('src/App.tsx', appTsx);
