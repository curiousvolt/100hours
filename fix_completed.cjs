const fs = require('fs');
let code = fs.readFileSync('src/store.ts', 'utf8');

code = code.replace(
  "status: track.totalMinutes >= 6000 ? 'completed' : 'active',",
  "status: track.totalMinutes >= 6000 ? 'completed' : 'active',\n            completedAt: track.totalMinutes >= 6000 ? Date.now() : track.completedAt,"
);

code = code.replace(
  "status: (newTotal >= 6000 && track.outputDelivered) ? 'completed' as const : track.status",
  "status: (newTotal >= 6000 && track.outputDelivered) ? 'completed' as const : track.status,\n            completedAt: (newTotal >= 6000 && track.outputDelivered) ? Date.now() : track.completedAt"
);

fs.writeFileSync('src/store.ts', code);

let types = fs.readFileSync('src/types.ts', 'utf8');
types = types.replace(
  "createdAt: number;",
  "createdAt: number;\n  completedAt?: number;"
);
fs.writeFileSync('src/types.ts', types);
