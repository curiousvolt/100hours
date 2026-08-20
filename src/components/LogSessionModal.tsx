import { useState } from 'react';
import { Modal } from './Modal';
import { Track } from '../types';

interface LogSessionModalProps {
  track: Track | null;
  onClose: () => void;
  onSave: (minutes: number, note: string, nextSteps: string | undefined, date: number) => void;
}

export function LogSessionModal({ track, onClose, onSave }: LogSessionModalProps) {
  const [minutesStr, setMinutesStr] = useState('');
  const [note, setNote] = useState('');
  const [nextSteps, setNextSteps] = useState('');

  const handleSave = () => {
    const minutes = parseInt(minutesStr, 10);
    if (isNaN(minutes) || minutes <= 0 || !note.trim()) return;
    onSave(minutes, note.trim(), nextSteps.trim() || undefined, Date.now()); // Using current date for v1 simplicity
    setMinutesStr('');
    setNote('');
    setNextSteps('');
    onClose();
  };

  if (!track) return null;

  return (
    <Modal isOpen={!!track} onClose={onClose} title="Log Manual Session">
      <div className="space-y-6">
        <div>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">Track: <span className="text-zinc-900 dark:text-white font-medium">{track.topic}</span></p>
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Minutes spent
          </label>
          <input
            type="number"
            min="1"
            value={minutesStr}
            onChange={(e) => setMinutesStr(e.target.value)}
            placeholder="e.g. 45"
            className="w-full bg-zinc-100/40 dark:bg-black/40 border border-zinc-300/50 dark:border-zinc-700/50 rounded-xl px-4 py-3 text-zinc-900 dark:text-white focus:outline-none focus:border-white transition-colors"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            What did you accomplish? <span className="text-zinc-500">(Required)</span>
          </label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="I finished the graph traversal module..."
            className="w-full bg-zinc-100/40 dark:bg-black/40 border border-zinc-300/50 dark:border-zinc-700/50 rounded-xl px-4 py-3 text-zinc-900 dark:text-white focus:outline-none focus:border-white transition-colors min-h-[80px] resize-none"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            What should you pick up next time? <span className="text-zinc-500">(Optional)</span>
          </label>
          <textarea
            value={nextSteps}
            onChange={(e) => setNextSteps(e.target.value)}
            placeholder="Start with Dijkstra's algorithm..."
            className="w-full bg-zinc-100/40 dark:bg-black/40 border border-zinc-300/50 dark:border-zinc-700/50 rounded-xl px-4 py-3 text-zinc-900 dark:text-white focus:outline-none focus:border-white transition-colors min-h-[60px] resize-none"
          />
        </div>
        <div className="pt-2 flex justify-end space-x-3">
          <button onClick={onClose} className="px-5 py-2.5 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors">
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!minutesStr || isNaN(parseInt(minutesStr, 10)) || parseInt(minutesStr, 10) <= 0 || !note.trim()}
            className="bg-zinc-900 dark:bg-white text-white dark:text-black px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Save Session
          </button>
        </div>
      </div>
    </Modal>
  );
}
