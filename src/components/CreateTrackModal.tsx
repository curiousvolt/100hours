import { useState } from 'react';
import { Modal } from './Modal';

interface CreateTrackModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (topic: string, commitmentTitle: string, commitment: string) => void;
}

export function CreateTrackModal({ isOpen, onClose, onSave }: CreateTrackModalProps) {
  const [topic, setTopic] = useState('');
  const [commitmentTitle, setCommitmentTitle] = useState('');
  const [confirmation, setConfirmation] = useState('');

  const requiredConfirmation = `I commit to 100 hours of ${topic.trim() || '...'}`;
  const isConfirmed = topic.trim().length > 0 && confirmation === requiredConfirmation;

  const handleSave = () => {
    if (!isConfirmed) return;
    onSave(topic.trim(), commitmentTitle.trim() || 'Final Output', '');
    setTopic('');
    setCommitmentTitle('');
    setConfirmation('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="New Track">
            <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-zinc-900 dark:text-white mb-2">
            What will you spend your next 100 hours on?
          </label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g. Data Structures and Algorithms"
            className="w-full bg-zinc-100/40 dark:bg-black/40 border border-zinc-300/50 dark:border-zinc-700/50 rounded-xl px-4 py-3 text-zinc-900 dark:text-white focus:outline-none focus:border-white transition-colors text-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-zinc-900 dark:text-white mb-2">
            What will exist when these 100 hours are over? <span className="text-zinc-500 font-normal">(Optional initially)</span>
          </label>
          <input
            type="text"
            value={commitmentTitle}
            onChange={(e) => setCommitmentTitle(e.target.value)}
            placeholder="e.g. Build and deploy a compiler"
            className="w-full bg-zinc-100/40 dark:bg-black/40 border border-zinc-300/50 dark:border-zinc-700/50 rounded-xl px-4 py-3 text-zinc-900 dark:text-white focus:outline-none focus:border-white transition-colors"
          />
        </div>
        {topic.trim() && (
          <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800">
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-3">
              Type the following to confirm:
              <br/>
              <span className="text-zinc-900 dark:text-white font-semibold select-all mt-1 block">{requiredConfirmation}</span>
            </label>
            <input
              type="text"
              value={confirmation}
              onChange={(e) => setConfirmation(e.target.value)}
              placeholder="I commit to 100 hours of..."
              className="w-full bg-zinc-100/40 dark:bg-black/40 border border-zinc-300/50 dark:border-zinc-700/50 rounded-xl px-4 py-3 text-zinc-900 dark:text-white focus:outline-none focus:border-white transition-colors"
            />
          </div>
        )}
        <div className="pt-2 flex justify-end space-x-3">
          <button onClick={onClose} className="px-5 py-2.5 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors">
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!isConfirmed}
            className="bg-zinc-900 dark:bg-white text-white dark:text-black px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Create
          </button>
        </div>
      </div>
    </Modal>
  );
}
