const fs = require('fs');
let code = fs.readFileSync('src/components/TrackDetail.tsx', 'utf8');

code = code.replace(
  '            ) : (\n              <>\n                <button',
  '            ) : track.status === "active" ? (\n              <>\n                <button'
);

code = code.replace(
  '                  <span>Log Manual Session</span>\n                </button>\n              </>\n            )}',
  '                  <span>Log Manual Session</span>\n                </button>\n              </>\n            ) : null}'
);

fs.writeFileSync('src/components/TrackDetail.tsx', code);
