const fs = require('fs');
let code = fs.readFileSync('src/store.ts', 'utf8');

const archiveTrackStr = `  const archiveTrack = useCallback((trackId: string) => {
    setData((prev) => ({
      ...prev,
      tracks: prev.tracks.map(t => t.id === trackId ? { ...t, status: 'archived' as const } : t)
    }));
  }, []);`;

code = code.replace("const deleteTrack = ", archiveTrackStr + "\n\n  const deleteTrack = ");
code = code.replace("abandonTrack,\n    deleteTrack,", "abandonTrack,\n    archiveTrack,\n    deleteTrack,");

fs.writeFileSync('src/store.ts', code);
