const fs = require('fs');
let code = fs.readFileSync('src/components/TrackDetail.tsx', 'utf8');

const oldStr = `        {track.status === "active" && (
          <button 
            onClick={() => { onArchive?.(); }}
            className="mt-12 text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
          >
            Archive Track
          </button>
        )}
      </motion.div>`;

const newStr = `      </motion.div>`;

code = code.replace(oldStr, newStr);

fs.writeFileSync('src/components/TrackDetail.tsx', code);
