const fs = require('fs');
let code = fs.readFileSync('src/components/ReleaseNotes.tsx', 'utf8');

// 1. We insert points 8, 9, 10, 11 into the V1.0 list
const point7 = `            <div className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/60 p-8 rounded-2xl">
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-3">7. Abandon a Commitment</h3>
              <p className="text-zinc-600 dark:text-zinc-400">Allow users to consciously abandon a track without simply deleting its history. The point isn't to punish quitting. It's to make quitting a conscious decision rather than an invisible reset.</p>
            </div>`;

const newPoints = `            <div className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/60 p-8 rounded-2xl">
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-3">8. Chronological Learning Journal</h3>
              <p className="text-zinc-600 dark:text-zinc-400">Session notes are turned into a chronological learning journal that makes the entire 100-hour journey readable.</p>
            </div>
            
            <div className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/60 p-8 rounded-2xl">
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-3">9. Continue Where You Left Off</h3>
              <p className="text-zinc-600 dark:text-zinc-400">When starting a new session, you can see what happened in the previous one so you can immediately continue your progress.</p>
            </div>
            
            <div className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/60 p-8 rounded-2xl">
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-3">10. Final Retrospective</h3>
              <p className="text-zinc-600 dark:text-zinc-400 mb-4">After completing a track, reflect on the journey:</p>
              <ul className="list-disc pl-5 space-y-1 text-zinc-600 dark:text-zinc-400">
                <li>What did you learn?</li>
                <li>What can you do now that you couldn't do before?</li>
                <li>What did you build?</li>
                <li>What would you do differently?</li>
              </ul>
            </div>
            
            <div className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/60 p-8 rounded-2xl">
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-3">11. Clear Destination Setup</h3>
              <p className="text-zinc-600 dark:text-zinc-400 mb-2">When creating a track, you're asked:</p>
              <blockquote className="border-l-4 border-zinc-300 dark:border-zinc-700 pl-4 italic text-zinc-700 dark:text-zinc-300">"What do you want to be able to do after 100 hours?"</blockquote>
              <p className="text-zinc-600 dark:text-zinc-400 mt-2">This makes the destination and output clear before the timer even starts.</p>
            </div>`;

code = code.replace(point7, point7 + '\n' + newPoints);

// 2. We remove the V1.1 section entirely
const v11Start = `<section className="space-y-8">
          <h2 className="text-3xl font-display text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-800 pb-4">V1.1 — Where It Could Go</h2>`;
const v11End = `</section>

        <section className="space-y-6">
          <h2 className="text-3xl font-display text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-800 pb-4">Beyond V1.1</h2>`;

const v11Regex = /<section className="space-y-8">\s*<h2 className="text-3xl font-display text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-800 pb-4">V1\.1 — Where It Could Go<\/h2>[\s\S]*?<\/section>\s*<section className="space-y-6">\s*<h2 className="text-3xl font-display text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-800 pb-4">Beyond V1\.1<\/h2>/;

code = code.replace(v11Regex, `<section className="space-y-6">
          <h2 className="text-3xl font-display text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-800 pb-4">Beyond V1.0</h2>`);

fs.writeFileSync('src/components/ReleaseNotes.tsx', code);
