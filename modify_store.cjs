const fs = require('fs');
let code = fs.readFileSync('src/store.ts', 'utf8');

code = code.replace(
  "status: track.totalMinutes >= 6000 ? 'archived' : 'active',",
  "status: track.totalMinutes >= 6000 ? 'completed' : 'active',"
);

code = code.replace(
  "addSession = useCallback((trackId: string, minutes: number, note: string, source: 'timer' | 'manual', date: number = Date.now()) => {",
  "addSession = useCallback((trackId: string, minutes: number, note: string, nextSteps: string | undefined, source: 'timer' | 'manual', date: number = Date.now()) => {"
);

code = code.replace(
  "note,\n        date,",
  "note,\n        nextSteps,\n        date,"
);

code = code.replace(
  "status: (newTotal >= 6000 && track.outputDelivered) ? 'archived' as const : track.status",
  "status: (newTotal >= 6000 && track.outputDelivered) ? 'completed' as const : track.status"
);

code = code.replace(
  "stopTimer = useCallback((note: string) => {",
  "stopTimer = useCallback((note: string, nextSteps?: string) => {"
);

code = code.replace(
  "addSession(activeTimer.trackId, elapsedMinutes, note, 'timer', Date.now());",
  "addSession(activeTimer.trackId, elapsedMinutes, note, nextSteps, 'timer', Date.now());"
);

const abandonTrackStr = `  const abandonTrack = useCallback((trackId: string) => {
    setData((prev) => ({
      ...prev,
      tracks: prev.tracks.map(t => t.id === trackId ? { ...t, status: 'abandoned' as const } : t)
    }));
  }, []);`;

code = code.replace("const deleteTrack = ", abandonTrackStr + "\n\n  const deleteTrack = ");
code = code.replace("addSession,\n    deleteTrack,", "addSession,\n    abandonTrack,\n    deleteTrack,");

fs.writeFileSync('src/store.ts', code);
