const fs = require('fs');
let code = fs.readFileSync('src/types.ts', 'utf8');

code = code.replace(
  "export interface ActiveTimer {\n  trackId: string;\n  startTime: number;\n}",
  "export interface ActiveTimer {\n  trackId: string;\n  startTime: number;\n  pausedAt?: number;\n  accumulatedMs?: number;\n  autoPaused?: boolean;\n}"
);

fs.writeFileSync('src/types.ts', code);
