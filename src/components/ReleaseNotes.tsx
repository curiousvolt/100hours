import { ArrowLeft, Target, XSquare, Hourglass, Sparkles, BookOpen } from 'lucide-react';
import { motion } from 'motion/react';

interface ReleaseNotesProps {
  onBack: () => void;
}

export function ReleaseNotes({ onBack }: ReleaseNotesProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto space-y-12 pb-20 px-2 sm:px-0"
    >
      <button 
        onClick={onBack}
        className="text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white flex items-center space-x-2 transition-colors sticky top-6 z-10 bg-white/80 dark:bg-black/80 backdrop-blur px-4 py-2 sm:-ml-4 rounded-full w-fit shadow-sm sm:shadow-none border border-zinc-200/50 dark:border-zinc-800/50 sm:border-transparent"
      >
        <ArrowLeft size={16} />
        <span className="text-sm font-medium">Back</span>
      </button>

      <div className="space-y-12">
        <header className="space-y-4 text-center border-b border-zinc-200 dark:border-zinc-800 pb-10">
          <div className="w-14 h-14 bg-black dark:bg-white text-white dark:text-black rounded-2xl mx-auto flex items-center justify-center mb-6">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-7 h-7">
              <circle cx="12" cy="12" r="10" />
              <circle cx="12" cy="12" r="6" />
              <circle cx="12" cy="12" r="2" />
            </svg>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">100 Hours</h1>
          <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 font-medium">A commitment device for deep learning.</p>
        </header>

        <section className="space-y-4 text-zinc-700 dark:text-zinc-300">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">The Idea</h2>
          <p className="leading-relaxed">
            100 hours is long enough to go beyond the basics, but short enough to feel finite. It's not about mastering a skill—it's about giving yourself enough focused time to actually learn it well, without getting stuck in the endless "tutorial hell" of finding resources.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-800 pb-3">The Rules</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { num: '01', title: 'Pick something.' },
              { num: '02', title: 'Commit 100 hrs.' },
              { num: '03', title: 'Do the work.' },
              { num: '04', title: 'Reflect on it.' },
              { num: '05', title: 'Ship something.' }
            ].map((rule) => (
              <div key={rule.num} className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/60 p-4 rounded-2xl flex flex-col items-center sm:items-start text-center sm:text-left space-y-1">
                <span className="text-3xl font-bold tracking-tight text-zinc-300 dark:text-zinc-700">{rule.num}</span>
                <span className="text-sm font-semibold text-zinc-900 dark:text-white">{rule.title}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-800 pb-3">Core Philosophy</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2 p-5 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl">
              <h3 className="font-semibold text-zinc-900 dark:text-white">Max 5 Tracks</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Curiosity is infinite, but attention isn't. Finish or archive old tracks before starting new ones.</p>
            </div>
            <div className="space-y-2 p-5 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl">
              <h3 className="font-semibold text-zinc-900 dark:text-white">Reflect & Journal</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Jot down what you actually learned after every session to create a chronological learning journal.</p>
            </div>
            <div className="space-y-2 p-5 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl">
              <h3 className="font-semibold text-zinc-900 dark:text-white">Final Output Required</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">100 hours alone isn't enough. The track is only complete when you ship a real project, post, or prototype.</p>
            </div>
            <div className="space-y-2 p-5 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl">
              <h3 className="font-semibold text-zinc-900 dark:text-white">Local-First</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Your data lives entirely in your browser. No accounts, no backend, complete privacy.</p>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">Advice</h2>
          <div className="bg-black dark:bg-white text-white dark:text-black p-6 sm:p-8 rounded-3xl">
            <p className="text-lg font-medium leading-relaxed">
              Spend your first hour planning, and your next 99 hours executing.
            </p>
            <p className="opacity-80 mt-4 text-sm sm:text-base leading-relaxed">
              Fix your curriculum at the very beginning. Pick one primary resource. Once you make that decision, close all other tabs. Do not look for "better" resources. Execution over optimization.
            </p>
          </div>
        </section>

      </div>
    </motion.div>
  );
}
