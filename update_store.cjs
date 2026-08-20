const fs = require('fs');
let code = fs.readFileSync('src/store.ts', 'utf8');

const pauseLogic = `  const pauseTimer = useCallback((autoPaused = false) => {
    setActiveTimer((prev) => {
      if (!prev || prev.pausedAt) return prev;
      const now = Date.now();
      const additional = now - prev.startTime;
      return {
        ...prev,
        pausedAt: now,
        accumulatedMs: (prev.accumulatedMs || 0) + additional,
        autoPaused
      };
    });
  }, []);

  const resumeTimer = useCallback(() => {
    setActiveTimer((prev) => {
      if (!prev || !prev.pausedAt) return prev;
      return {
        ...prev,
        startTime: Date.now(),
        pausedAt: undefined,
        autoPaused: false
      };
    });
  }, []);`;

code = code.replace(
  "  const stopTimer = useCallback((note: string, nextSteps?: string) => {",
  pauseLogic + "\n\n  const stopTimer = useCallback((note: string, nextSteps?: string) => {"
);

code = code.replace(
  "const elapsedMinutes = Math.floor((Date.now() - activeTimer.startTime) / 60000);",
  "const additional = activeTimer.pausedAt ? 0 : (Date.now() - activeTimer.startTime);\n    const totalMs = (activeTimer.accumulatedMs || 0) + additional;\n    const elapsedMinutes = Math.floor(totalMs / 60000);"
);

code = code.replace("cancelTimer,", "cancelTimer,\n    pauseTimer,\n    resumeTimer,");

fs.writeFileSync('src/store.ts', code);
