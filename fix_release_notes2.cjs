const fs = require('fs');
let code = fs.readFileSync('src/components/ReleaseNotes.tsx', 'utf8');

// 1. Change V1.0 list style
code = code.replace(
  '<div className="grid gap-6">',
  '<div className="space-y-10 mt-8">'
);

// We need to replace all instances of the card styling in the V1.0 section
code = code.replace(
  /className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200\/60 dark:border-zinc-800\/60 p-8 rounded-2xl"/g,
  'className="space-y-2"'
);

// 2. Change The Rules section
const oldRules = `<section className="space-y-6">
          <h2 className="text-3xl font-display text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-800 pb-4">The Rules</h2>
          <p className="text-lg text-zinc-700 dark:text-zinc-300">100 Hours deliberately has very few rules:</p>
          <ul className="space-y-3 text-xl font-medium text-zinc-900 dark:text-white">
            <li className="flex items-center space-x-3"><span className="w-2 h-2 rounded-full bg-black dark:bg-white" /> <span>Pick something.</span></li>
            <li className="flex items-center space-x-3"><span className="w-2 h-2 rounded-full bg-black dark:bg-white" /> <span>Commit 100 hours.</span></li>
            <li className="flex items-center space-x-3"><span className="w-2 h-2 rounded-full bg-black dark:bg-white" /> <span>Do the work.</span></li>
            <li className="flex items-center space-x-3"><span className="w-2 h-2 rounded-full bg-black dark:bg-white" /> <span>Reflect on the work.</span></li>
            <li className="flex items-center space-x-3"><span className="w-2 h-2 rounded-full bg-black dark:bg-white" /> <span>Ship something.</span></li>
          </ul>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 pt-2">That's it.</p>
        </section>`;

const newRules = `<section className="space-y-8">
          <h2 className="text-3xl font-display text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-800 pb-4">The Rules</h2>
          <p className="text-lg text-zinc-700 dark:text-zinc-300">100 Hours deliberately has very few rules.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 md:gap-4 pt-4">
            <div className="flex flex-col space-y-2">
              <span className="text-5xl font-display text-zinc-200 dark:text-zinc-800">01</span>
              <span className="text-xl font-medium text-zinc-900 dark:text-white">Pick something.</span>
            </div>
            <div className="flex flex-col space-y-2">
              <span className="text-5xl font-display text-zinc-200 dark:text-zinc-800">02</span>
              <span className="text-xl font-medium text-zinc-900 dark:text-white">Commit 100 hours.</span>
            </div>
            <div className="flex flex-col space-y-2">
              <span className="text-5xl font-display text-zinc-200 dark:text-zinc-800">03</span>
              <span className="text-xl font-medium text-zinc-900 dark:text-white">Do the work.</span>
            </div>
            <div className="flex flex-col space-y-2">
              <span className="text-5xl font-display text-zinc-200 dark:text-zinc-800">04</span>
              <span className="text-xl font-medium text-zinc-900 dark:text-white">Reflect on it.</span>
            </div>
            <div className="flex flex-col space-y-2">
              <span className="text-5xl font-display text-zinc-200 dark:text-zinc-800">05</span>
              <span className="text-xl font-medium text-zinc-900 dark:text-white">Ship something.</span>
            </div>
          </div>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 pt-4">That's it.</p>
        </section>`;

code = code.replace(oldRules, newRules);

fs.writeFileSync('src/components/ReleaseNotes.tsx', code);
