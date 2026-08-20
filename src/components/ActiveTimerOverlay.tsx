import { useState, useEffect } from 'react';
import { ActiveTimer, Track } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { Square, Play, Pause } from 'lucide-react';

interface ActiveTimerOverlayProps {
  timer: ActiveTimer | null;
  track?: Track;
  onStop: (note: string, nextSteps?: string) => void;
  onPause: (auto: boolean) => void;
  onResume: () => void;
}

export function ActiveTimerOverlay({ timer, track, onStop, onPause, onResume }: ActiveTimerOverlayProps) {
  const [elapsed, setElapsed] = useState(0);
  const [isStopping, setIsStopping] = useState(false);
  const [note, setNote] = useState('');
  const [nextSteps, setNextSteps] = useState('');

  useEffect(() => {
    if (!timer) {
      setElapsed(0);
      setIsStopping(false);
      setNote('');
      return;
    }

    const update = () => {
      // Check for 90-minute limit
      if (!timer.pausedAt) {
        const additional = Date.now() - timer.startTime;
        const totalMs = (timer.accumulatedMs || 0) + additional;
        if (additional >= 90 * 60 * 1000) {
          onPause(true);
        }
      }
      const additional = timer.pausedAt ? 0 : (Date.now() - timer.startTime);
      setElapsed((timer.accumulatedMs || 0) + additional);
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [timer, onPause]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && timer && !timer.pausedAt) {
        onPause(true);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [timer, onPause]);

  if (!timer || !track) return null;

  const seconds = Math.floor((elapsed / 1000) % 60);
  const minutes = Math.floor((elapsed / 60000) % 60);
  const hours = Math.floor(elapsed / 3600000);

  const formatTime = (h: number, m: number, s: number) => {
    if (h > 0) {
      return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    }
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleStopClick = () => {
    setIsStopping(true);
  };

  const handleSave = () => {
    if (!note.trim()) return;
    onStop(note, nextSteps.trim() || undefined);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-md"
      >
        <div className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-300/50 dark:border-zinc-700/50 p-4 rounded-[24px] shadow-2xl flex flex-col space-y-4">
          {timer.autoPaused && !isStopping && (
            <div className="bg-orange-500/10 text-orange-600 dark:text-orange-400 p-3 rounded-xl text-sm font-medium flex items-center justify-between">
              <span>Session auto-paused for inactivity.</span>
              <button 
                onClick={onResume}
                className="bg-orange-500 text-white px-3 py-1 rounded-lg hover:bg-orange-600 transition-colors"
              >
                Resume
              </button>
            </div>
          )}
          {!isStopping ? (
            <div className="flex items-center justify-between px-2">
              <div className="flex flex-col">
                <span className="text-xs text-zinc-600 dark:text-zinc-400 font-medium tracking-wide uppercase">{track.topic}</span>
                <div className="flex items-center space-x-3">
                  <span className={`text-3xl font-display tabular-nums tracking-tight ${timer.pausedAt ? 'text-zinc-400 dark:text-zinc-500' : 'text-zinc-900 dark:text-white'}`}>
                    {formatTime(hours, minutes, seconds)}
                  </span>
                  {timer.pausedAt && (
                    <span className="text-xs font-semibold text-zinc-500 uppercase tracking-widest bg-zinc-200/50 dark:bg-zinc-800/50 px-2 py-1 rounded-md">Paused</span>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {!timer.autoPaused && (
                  <button
                    onClick={() => timer.pausedAt ? onResume() : onPause(false)}
                    className="w-12 h-12 bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white rounded-full flex items-center justify-center transition-colors"
                    aria-label={timer.pausedAt ? "Resume Timer" : "Pause Timer"}
                  >
                    {timer.pausedAt ? <Play size={18} fill="currentColor" /> : <Pause size={18} fill="currentColor" />}
                  </button>
                )}
                <button
                  onClick={handleStopClick}
                  className="w-14 h-14 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-full flex items-center justify-center transition-colors"
                  aria-label="Stop Timer"
                >
                  <Square size={20} fill="currentColor" />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col space-y-4">
              <div>
                <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                  {formatTime(hours, minutes, seconds)} invested.
                </p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  What did you accomplish? <span className="text-zinc-500 font-normal">(Required)</span>
                </label>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  autoFocus
                  placeholder="I finished the graph traversal module..."
                  className="w-full bg-zinc-100/40 dark:bg-black/40 border border-zinc-300/50 dark:border-zinc-700/50 rounded-xl p-3 text-sm text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-500 min-h-[60px] resize-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  What should you pick up next time? <span className="text-zinc-500 font-normal">(Optional)</span>
                </label>
                <textarea
                  value={nextSteps}
                  onChange={(e) => setNextSteps(e.target.value)}
                  placeholder="Start with Dijkstra's algorithm..."
                  className="w-full bg-zinc-100/40 dark:bg-black/40 border border-zinc-300/50 dark:border-zinc-700/50 rounded-xl p-3 text-sm text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-500 min-h-[40px] resize-none"
                />
              </div>
              <div className="flex space-x-2 pt-2">
                <button
                  onClick={() => setIsStopping(false)}
                  className="flex-1 bg-zinc-200/50 dark:bg-zinc-800/50 text-zinc-700 dark:text-zinc-300 py-2.5 rounded-xl text-sm font-medium hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={!note.trim()}
                  className="flex-1 bg-zinc-900 dark:bg-white text-white dark:text-black py-2.5 rounded-xl text-sm font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Save Session
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
