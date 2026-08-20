import { ArrowLeft, Target, XSquare, Hourglass, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface ReleaseNotesProps {
  onBack: () => void;
}

export function ReleaseNotes({ onBack }: ReleaseNotesProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto space-y-12 pb-20"
    >
      <button 
        onClick={onBack}
        className="text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white flex items-center space-x-2 transition-colors sticky top-6 z-10 bg-white/80 dark:bg-black/80 backdrop-blur px-4 py-2 -ml-4 rounded-full w-fit"
      >
        <ArrowLeft size={16} />
        <span>Back to Dashboard</span>
      </button>

      <div className="space-y-16">
        <header className="space-y-6 text-center border-b border-zinc-200 dark:border-zinc-800 pb-12">
          <div className="w-16 h-16 bg-black dark:bg-white text-white dark:text-black rounded-2xl mx-auto flex items-center justify-center mb-8">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8">
              <circle cx="12" cy="12" r="10" />
              <circle cx="12" cy="12" r="6" />
              <circle cx="12" cy="12" r="2" />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-display text-zinc-900 dark:text-white">100 Hours</h1>
          <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 font-display">Release Notes & Product Philosophy</p>
          
          <div className="flex items-center justify-center gap-4 text-sm text-zinc-500 font-mono mt-8">
            <span>Version 1.0</span>
            <span>&bull;</span>
            <span>20 August 2026</span>
            <span>&bull;</span>
            <span>Authors: Aman & ChatGPT</span>
          </div>
        </header>

        <section className="space-y-6 prose dark:prose-invert prose-zinc max-w-none text-zinc-700 dark:text-zinc-300">
          <h2 className="text-3xl font-display text-zinc-900 dark:text-white">The Idea</h2>
          <p>
            We live in a world where almost anything can be learned from the internet. Kunal Shah has spoken about becoming an "absolute learning machine" — developing the ability to learn a complex topic in as little as 24 hours.
          </p>
          <p>
            It's a powerful idea. But 24 hours can sometimes be just enough to understand the basics. You watch a few videos. Read some articles. Bookmark a course. Find another tutorial. Then another. And suddenly, instead of learning, you're stuck in the resource-finding loop.
          </p>
          <p>
            That's where 100 Hours comes from.
          </p>
          <p>
            100 hours is long enough to go beyond the basics, but short enough to feel finite. It gives you enough time to actually practice, struggle, build, make mistakes, and produce something real — without turning learning a skill into a multi-year commitment.
          </p>
          <p className="text-xl font-medium text-zinc-900 dark:text-white pt-4">
            100 Hours is not about mastering a skill. It's about giving yourself enough focused time to actually learn it well.
          </p>
        </section>

        <section className="space-y-8">
          <h2 className="text-3xl font-display text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-800 pb-4">V1.0 — The Core</h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">The first version is intentionally simple.</p>
          
          <div className="space-y-10 mt-8">
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-3">1. Commit to a Track</h3>
              <p className="text-zinc-600 dark:text-zinc-400">Choose something you genuinely want to learn. Commit 100 hours to it. Once created, the track name is locked. You don't get to constantly move the goalposts.</p>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-3">2. Maximum 5 Active Tracks</h3>
              <p className="text-zinc-600 dark:text-zinc-400">You can have a maximum of 5 active tracks. If something new comes along, you have to make a choice: Finish something. Archive something. Or don't start it. The constraint exists because curiosity is unlimited, but attention isn't.</p>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-3">3. Track Your Time</h3>
              <p className="text-zinc-600 dark:text-zinc-400">Start a live session or log a session manually. Every session contributes toward the same 100-hour commitment. 1 hour. 17 hours. 63 hours. 99 hours. The number is a reminder that you made a commitment — not a score.</p>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-3">4. Reflect After Every Session</h3>
              <p className="text-zinc-600 dark:text-zinc-400 mb-4">When you stop a live session, you must write a short note. Not: <em className="italic">"Studied DSA."</em> But: <em className="italic">"Implemented binary search and finally understood why the boundary conditions work."</em></p>
              <p className="text-zinc-600 dark:text-zinc-400">The purpose isn't documentation for its own sake. It's to ask: What did I actually accomplish with that time?</p>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-3">5. Finish With a Real Output</h3>
              <p className="text-zinc-600 dark:text-zinc-400 mb-4">100 hours alone does not complete a track. You also need a Final Output. It could be:</p>
              <ul className="list-disc pl-5 space-y-1 text-zinc-600 dark:text-zinc-400 mb-4">
                <li>A project</li>
                <li>A blog post</li>
                <li>A video</li>
                <li>A talk</li>
                <li>A portfolio piece</li>
                <li>A research report</li>
                <li>A working prototype</li>
              </ul>
              <p className="text-zinc-600 dark:text-zinc-400">Anything tangible that demonstrates what those 100 hours became. The goal isn't to collect hours. The goal is to turn hours into something.</p>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-3">6. Local-First by Design</h3>
              <p className="text-zinc-600 dark:text-zinc-400">100 Hours does not require an account or backend. Your data lives in your browser. You can export it as JSON and import it whenever you want. Your learning history belongs to you.</p>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-3">7. Abandon a Commitment</h3>
              <p className="text-zinc-600 dark:text-zinc-400">Allow users to consciously abandon a track without simply deleting its history. The point isn't to punish quitting. It's to make quitting a conscious decision rather than an invisible reset.</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-3">8. Chronological Learning Journal</h3>
              <p className="text-zinc-600 dark:text-zinc-400">Session notes are turned into a chronological learning journal that makes the entire 100-hour journey readable.</p>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-3">9. Continue Where You Left Off</h3>
              <p className="text-zinc-600 dark:text-zinc-400">When starting a new session, you can see what happened in the previous one so you can immediately continue your progress.</p>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-3">10. Final Retrospective</h3>
              <p className="text-zinc-600 dark:text-zinc-400 mb-4">After completing a track, reflect on the journey:</p>
              <ul className="list-disc pl-5 space-y-1 text-zinc-600 dark:text-zinc-400">
                <li>What did you learn?</li>
                <li>What can you do now that you couldn't do before?</li>
                <li>What did you build?</li>
                <li>What would you do differently?</li>
              </ul>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-3">11. Clear Destination Setup</h3>
              <p className="text-zinc-600 dark:text-zinc-400 mb-2">When creating a track, you're asked:</p>
              <blockquote className="border-l-4 border-zinc-300 dark:border-zinc-700 pl-4 italic text-zinc-700 dark:text-zinc-300">"What do you want to be able to do after 100 hours?"</blockquote>
              <p className="text-zinc-600 dark:text-zinc-400 mt-2">This makes the destination and output clear before the timer even starts.</p>
            </div>
          </div>
        </section>

        <section className="space-y-8">
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
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-display text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-800 pb-4">What 100 Hours Is Not</h2>
          <p className="text-lg text-zinc-700 dark:text-zinc-300">100 Hours is intentionally not:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-zinc-600 dark:text-zinc-400">
            <ul className="space-y-2 list-disc pl-5">
              <li>A social network</li>
              <li>A habit tracker</li>
              <li>A Pomodoro timer</li>
              <li>A streak tracker</li>
              <li>A leaderboard</li>
            </ul>
            <ul className="space-y-2 list-disc pl-5">
              <li>An achievement system</li>
              <li>An AI productivity coach</li>
              <li>A place to collect courses</li>
              <li>A place to endlessly organize your learning</li>
            </ul>
          </div>
          <div className="bg-zinc-100 dark:bg-zinc-800/50 p-6 rounded-2xl mt-6">
            <p className="text-lg font-medium text-zinc-900 dark:text-white">There are no badges. No streaks. No confetti. No productivity score.</p>
            <p className="text-zinc-600 dark:text-zinc-400 mt-2">The reward is the skill and the thing you built.</p>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-display text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-800 pb-4">Beyond V1.0</h2>
          <p className="text-lg text-zinc-700 dark:text-zinc-300 font-medium">The product should evolve around one question:</p>
          <blockquote className="text-xl md:text-2xl font-display text-zinc-900 dark:text-white text-center py-8">
            "Does this help someone learn deeply, or does it just help them manage learning?"
          </blockquote>
          <p className="text-zinc-600 dark:text-zinc-400">
            If a feature adds complexity without improving the first outcome, it probably doesn't belong. Future ideas may come from people actually using 100 Hours. If you have an idea, criticism, or something you'd like to see built, reach out. The product should be shaped by people who are actually trying to learn something.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-display text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-800 pb-4">Advice from the Author</h2>
          <div className="prose dark:prose-invert prose-zinc max-w-none text-zinc-700 dark:text-zinc-300 space-y-4">
            <p className="text-xl font-medium text-zinc-900 dark:text-white">
              Spend your first hour planning, and your next 99 hours executing.
            </p>
            <p>
              The biggest trap in learning is resource-hopping. You start a YouTube tutorial, get bored halfway, switch to a Udemy course, read a Medium article, and suddenly 10 hours have passed but you haven't actually learned or built anything.
            </p>
            <p>
              My advice: Fix your curriculum at the very beginning. Pick one primary resource—one book, one course, or one project-based roadmap. Decide exactly what you will follow. Once you make that decision, close all other tabs. Do not look for "better" resources. Just follow the plan you made for the next 99 hours. Execution over optimization.
            </p>
          </div>
        </section>

        <section className="space-y-6 pt-12 border-t border-zinc-200 dark:border-zinc-800">
          <h2 className="text-3xl font-display text-zinc-900 dark:text-white mb-6">The Philosophy</h2>
          <div className="prose dark:prose-invert prose-zinc max-w-none text-zinc-700 dark:text-zinc-300 space-y-4">
            <p>The internet has made knowledge incredibly accessible. The problem isn't always access to information anymore. The problem is knowing when to stop consuming information and start doing the work.</p>
            <p>There will always be another course. Another YouTube video. Another thread. Another tutorial. Another "best resources to learn X" list.</p>
            <div className="my-16 py-12 border-y border-zinc-200 dark:border-zinc-800">
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
            </div>
            
            <div className="mt-12 p-8 bg-black dark:bg-white text-white dark:text-black rounded-3xl text-center">
              <h3 className="text-2xl font-display mb-4">100 Hours</h3>
              <p className="text-lg opacity-90 mb-6">A commitment device for people who want to learn deeply.</p>
              <p className="opacity-80 max-w-xl mx-auto">
                Not everything needs 10,000 hours. Not everything can be learned in 24 hours. But sometimes, 100 focused hours is enough to find out what you're capable of.
              </p>
            </div>
          </div>
        </section>

      </div>
    </motion.div>
  );
}
