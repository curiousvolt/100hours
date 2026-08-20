const fs = require('fs');
let code = fs.readFileSync('src/components/ActiveTimerOverlay.tsx', 'utf8');

code = code.replace(
  "import { Square } from 'lucide-react';",
  "import { Square, Play, Pause } from 'lucide-react';"
);

code = code.replace(
  "onStop: (note: string) => void;",
  "onStop: (note: string, nextSteps?: string) => void;\n  onPause: (auto: boolean) => void;\n  onResume: () => void;"
);

code = code.replace(
  "export function ActiveTimerOverlay({ timer, track, onStop }: ActiveTimerOverlayProps) {",
  "export function ActiveTimerOverlay({ timer, track, onStop, onPause, onResume }: ActiveTimerOverlayProps) {"
);

code = code.replace(
  "const [note, setNote] = useState('');",
  "const [note, setNote] = useState('');\n  const [nextSteps, setNextSteps] = useState('');"
);

code = code.replace(
  "setElapsed(Date.now() - timer.startTime);",
  "const additional = timer.pausedAt ? 0 : (Date.now() - timer.startTime);\n      setElapsed((timer.accumulatedMs || 0) + additional);"
);

code = code.replace(
  "const update = () => {",
  "const update = () => {\n      // Check for 90-minute limit\n      if (!timer.pausedAt) {\n        const additional = Date.now() - timer.startTime;\n        const totalMs = (timer.accumulatedMs || 0) + additional;\n        if (additional >= 90 * 60 * 1000) {\n          onPause(true);\n        }\n      }"
);

code = code.replace(
  "return () => clearInterval(interval);",
  "return () => clearInterval(interval);\n  }, [timer, onPause]);\n\n  useEffect(() => {\n    const handleVisibilityChange = () => {\n      if (document.hidden && timer && !timer.pausedAt) {\n        onPause(true);\n      }\n    };\n    document.addEventListener('visibilitychange', handleVisibilityChange);\n    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);\n  }, [timer, onPause]);"
);

// We need to modify the UI as well. The stop button block and the stopping block.
// I'll do this via file overwrite since it's cleaner.

fs.writeFileSync('src/components/ActiveTimerOverlay.tsx', code);
