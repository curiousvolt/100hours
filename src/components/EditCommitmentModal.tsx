import { useState, useEffect } from 'react';
import { PenLine } from 'lucide-react';
import { Modal } from './Modal';
import { Track } from '../types';

interface EditCommitmentModalProps {
  track: Track | null;
  onClose: () => void;
  onSave: (commitment: string) => void;
}

export function EditCommitmentModal({ track, onClose, onSave }: EditCommitmentModalProps) {
  const [commitment, setCommitment] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (track) {
      setCommitment(track.commitment);
      setIsEditing(false);
    }
  }, [track]);

  const handleSave = () => {
    if (!commitment.trim()) return;
    onSave(commitment.trim());
    onClose();
  };

  if (!track) return null;

  return (
    <Modal isOpen={!!track} onClose={onClose} title="Final Output Details">
      
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-display text-zinc-900 dark:text-white mb-2">{track.commitmentTitle}</h3>
          <p className="text-sm text-zinc-500">For track: {track.topic}</p>
        </div>

        {!isEditing ? (
          <div className="space-y-4">
            <div className="bg-zinc-50/50 dark:bg-zinc-900/50 border border-zinc-200/60 dark:border-zinc-800/60 rounded-xl p-4 min-h-[120px]">
              <p className="text-zinc-700 dark:text-zinc-300 whitespace-pre-wrap">{track.commitment}</p>
            </div>
            <div className="pt-2 flex justify-end space-x-3">
              <button onClick={onClose} className="px-5 py-2.5 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors">
                Close
              </button>
              <button
                onClick={() => setIsEditing(true)}
                className="bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors flex items-center space-x-2"
              >
                <PenLine size={16} />
                <span>Edit Brief</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Detailed Brief
              </label>
              <textarea
                value={commitment}
                onChange={(e) => setCommitment(e.target.value)}
                className="w-full bg-zinc-100/40 dark:bg-black/40 border border-zinc-300/50 dark:border-zinc-700/50 rounded-xl px-4 py-3 text-zinc-900 dark:text-white focus:outline-none focus:border-white transition-colors min-h-[120px] resize-none"
              />
            </div>
            <div className="pt-2 flex justify-end space-x-3">
              <button onClick={() => { setIsEditing(false); setCommitment(track.commitment); }} className="px-5 py-2.5 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors">
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={!commitment.trim() || commitment.trim() === track.commitment}
                className="bg-zinc-900 dark:bg-white text-white dark:text-black px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Update
              </button>
            </div>
          </div>
        )}
      </div>
</Modal>
  );
}
