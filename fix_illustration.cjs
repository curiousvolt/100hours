const fs = require('fs');
let code = fs.readFileSync('src/components/ReleaseNotes.tsx', 'utf8');

// Add imports
code = code.replace(
  "import { ArrowLeft } from 'lucide-react';",
  "import { ArrowLeft, Target, XSquare, Hourglass, Sparkles } from 'lucide-react';"
);

const oldBlock = `<p className="font-medium text-zinc-900 dark:text-white text-xl py-4">100 Hours is a small attempt to interrupt that loop.</p>
            <div className="space-y-2 text-lg font-medium text-zinc-800 dark:text-zinc-200">
              <p>Pick the skill.</p>
              <p>Close the resource tab.</p>
              <p>Put in the hours.</p>
              <p>Make something.</p>
            </div>`;

const newBlock = `<div className="my-16 py-12 border-y border-zinc-200 dark:border-zinc-800">
              <h3 className="text-2xl md:text-3xl font-display text-zinc-900 dark:text-white text-center mb-12">
                100 Hours is a small attempt to interrupt that loop.
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 relative">
                
                <div className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/60 p-6 rounded-[24px] flex flex-col items-center text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-zinc-200/50 dark:bg-zinc-800/50 flex items-center justify-center text-zinc-600 dark:text-zinc-400">
                    <Target size={24} />
                  </div>
                  <div>
                    <div className="text-xs font-semibold tracking-widest uppercase text-zinc-500 mb-1">Step 01</div>
                    <div className="text-lg font-medium text-zinc-900 dark:text-white">Pick the skill.</div>
                  </div>
                </div>

                <div className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/60 p-6 rounded-[24px] flex flex-col items-center text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-zinc-200/50 dark:bg-zinc-800/50 flex items-center justify-center text-zinc-600 dark:text-zinc-400">
                    <XSquare size={24} />
                  </div>
                  <div>
                    <div className="text-xs font-semibold tracking-widest uppercase text-zinc-500 mb-1">Step 02</div>
                    <div className="text-lg font-medium text-zinc-900 dark:text-white">Close the tab.</div>
                  </div>
                </div>

                <div className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/60 p-6 rounded-[24px] flex flex-col items-center text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-zinc-200/50 dark:bg-zinc-800/50 flex items-center justify-center text-zinc-600 dark:text-zinc-400">
                    <Hourglass size={24} />
                  </div>
                  <div>
                    <div className="text-xs font-semibold tracking-widest uppercase text-zinc-500 mb-1">Step 03</div>
                    <div className="text-lg font-medium text-zinc-900 dark:text-white">Put in the hours.</div>
                  </div>
                </div>

                <div className="bg-zinc-900 dark:bg-white border border-zinc-900 dark:border-white p-6 rounded-[24px] flex flex-col items-center text-center space-y-4 shadow-xl shadow-zinc-900/5 dark:shadow-white/5 transform hover:-translate-y-1 transition-transform">
                  <div className="w-12 h-12 rounded-full bg-white/10 dark:bg-black/10 flex items-center justify-center text-white dark:text-black">
                    <Sparkles size={24} />
                  </div>
                  <div>
                    <div className="text-xs font-semibold tracking-widest uppercase text-zinc-400 dark:text-zinc-500 mb-1">Step 04</div>
                    <div className="text-lg font-medium text-white dark:text-black">Make something.</div>
                  </div>
                </div>

              </div>
            </div>`;

code = code.replace(oldBlock, newBlock);

fs.writeFileSync('src/components/ReleaseNotes.tsx', code);
