import { useState, useEffect } from 'react';
import { Modal } from './Modal';
import { Track } from '../types';

interface AbandonTrackModalProps {
  track: Track | null;
  onClose: () => void;
  onConfirm: (trackId: string) => void;
}

export function AbandonTrackModal({ track, onClose, onConfirm }: AbandonTrackModalProps) {
  const [countdown, setCountdown] = useState(9);

  useEffect(() => {
    if (!track) {
      setCountdown(9);
      return;
    }
    const timer = setInterval(() => {
      setCountdown((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [track]);

  if (!track) return null;

  return (
    <Modal isOpen={!!track} onClose={onClose} title="Abandon Commitment?">
      <div className="space-y-6">
        <div className="text-zinc-700 dark:text-zinc-300">
          <p>Are you absolutely sure you want to abandon <strong className="text-zinc-900 dark:text-white">{track.topic}</strong>?</p>
          <p className="text-sm mt-2 text-zinc-600 dark:text-zinc-400">This action cannot be undone. All logged sessions will be permanently lost.</p>
        </div>
        <div className="pt-2 flex justify-end space-x-3">
          <button 
            onClick={onClose} 
            className="px-5 py-2.5 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm(track.id);
              onClose();
            }}
            disabled={countdown > 0}
            className="bg-red-500/10 text-red-500 px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-red-500 hover:text-black dark:hover:text-white transition-colors disabled:opacity-50 disabled:bg-zinc-100 disabled:text-zinc-500 disabled:cursor-not-allowed"
          >
            {countdown > 0 ? `Abandon in ${countdown}s` : 'Abandon Commitment'}
          </button>
        </div>
      </div>
    </Modal>
  );
}
