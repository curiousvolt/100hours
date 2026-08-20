import { useState } from 'react';
import { Track, Session } from '../types';
import { ArcProgress } from './ArcProgress';
import { Play, Plus, CheckCircle2, Trash2, Link as LinkIcon, PenLine, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';

interface TrackDetailProps {
  track: Track;
  sessions: Session[];
  onBack: () => void;
  onStartTimer: (trackId: string) => void;
  onLogManual: (trackId: string) => void;
  onEditCommitment: (trackId: string) => void;
  onDelete: (trackId: string) => void;
  onDeliver: (trackId: string, link: string) => void;
  onArchive?: () => void;
}

export function TrackDetail({
  track,
  sessions,
  onBack,
  onStartTimer,
  onLogManual,
  onEditCommitment,
  onDelete,
  onDeliver,
  onArchive,
}: TrackDetailProps) {
  const [showDeliverPrompt, setShowDeliverPrompt] = useState(false);
  const [deliverLink, setDeliverLink] = useState('');

  const hours = Math.floor(track.totalMinutes / 60);
  const progress = Math.min(track.totalMinutes / 6000, 1);
  const isDoneHours = track.totalMinutes >= 6000;
  
  const trackSessions = sessions.filter(s => s.trackId === track.id).sort((a, b) => b.date - a.date);


  if (track.status === 'completed') {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex-1 flex flex-col items-center justify-center py-20 text-center space-y-6"
      >
        <h2 className="text-sm font-semibold tracking-[0.2em] text-zinc-500 uppercase">100 Hours</h2>
        <h1 className="text-4xl md:text-5xl font-display text-zinc-900 dark:text-white mt-2 mb-6">{track.topic}</h1>
        
        <p className="text-lg text-zinc-600 dark:text-zinc-400">
          <span className="font-semibold text-zinc-900 dark:text-white">100h 00m</span> invested<br/>
          Final output delivered.
        </p>

        {track.outputLink && (
          <a 
            href={track.outputLink.startsWith('http') ? track.outputLink : 'https://' + track.outputLink} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center space-x-2 text-zinc-900 dark:text-white font-medium hover:underline bg-zinc-100 dark:bg-zinc-800/50 px-5 py-3 rounded-xl transition-colors mt-4"
          >
            <LinkIcon size={16} />
            <span>View Final Output</span>
          </a>
        )}

        {track.completedAt && (
          <p className="text-sm text-zinc-500 mt-8 pt-8">
            Completed {new Date(track.completedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        )}

      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-12"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <button 
          onClick={onBack}
          className="text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white flex items-center space-x-2 transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Back to Dashboard</span>
        </button>
        <button 
          onClick={() => onDelete(track.id)}
          className="text-zinc-600 dark:text-zinc-400 hover:text-red-600 dark:hover:text-red-400 p-2 transition-colors"
          title={track.status === "active" ? "Abandon Track" : "Delete Track"}
        >
          <Trash2 size={18} />
        </button>
      </div>

      {/* Main Track Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="md:col-span-1 flex flex-col items-center">
          <div className="relative">
            <ArcProgress progress={progress} size={220} strokeWidth={12} />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-5xl font-display text-zinc-900 dark:text-white tracking-tighter">
                {hours}<span className="text-xl font-sans text-zinc-500 font-normal ml-1">h</span>
              </span>
              <span className="text-sm font-semibold tracking-wider uppercase text-zinc-500 mt-1">/ 100h</span>
            </div>
          </div>
          
          <div className="w-full mt-10 flex flex-col gap-3">
            {isDoneHours && !track.outputDelivered && track.status === "active" ? (
              <div className="bg-black/10 dark:bg-white/10 border border-black/20 dark:border-white/20 rounded-xl p-4 w-full">
                {!showDeliverPrompt ? (
                  <div className="text-center space-y-4">
                    <p className="text-sm text-zinc-800 dark:text-zinc-200">
                      <strong className="text-zinc-900 dark:text-white block mb-1">100 hours logged!</strong> 
                      Time to deliver your output.
                    </p>
                    <button
                      onClick={() => setShowDeliverPrompt(true)}
                      className="w-full bg-zinc-900 dark:bg-white text-white dark:text-black px-4 py-3 rounded-xl text-sm font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors flex items-center justify-center space-x-2"
                    >
                      <CheckCircle2 size={16} />
                      <span>Mark Delivered</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <p className="text-sm text-zinc-700 dark:text-zinc-300">Link to output (optional):</p>
                    <div className="relative">
                      <LinkIcon size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                      <input
                        type="url"
                        value={deliverLink}
                        onChange={(e) => setDeliverLink(e.target.value)}
                        placeholder="https://..."
                        className="w-full bg-zinc-100/40 dark:bg-black/40 border border-zinc-300 dark:border-zinc-700 rounded-lg pl-9 pr-4 py-2 text-sm text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-500"
                      />
                    </div>
                    <button
                      onClick={() => onDeliver(track.id, deliverLink)}
                      className="w-full bg-zinc-900 dark:bg-white text-white dark:text-black px-4 py-2 rounded-lg text-sm font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
                    >
                      Complete Track
                    </button>
                  </div>
                )}
              </div>
            ) : track.status === "active" ? (
              <>
                <button
                  onClick={() => onStartTimer(track.id)}
                  className="w-full bg-zinc-900 dark:bg-white text-white dark:text-black px-4 py-4 rounded-xl font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors flex items-center justify-center space-x-2 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                >
                  <Play size={18} fill="currentColor" />
                  <span>Start Live Session</span>
                </button>
                <button
                  onClick={() => onLogManual(track.id)}
                  className="w-full bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 px-4 py-4 rounded-xl font-medium hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <Plus size={18} />
                  <span>Log Manual Session</span>
                </button>
              </>
            ) : null}
          </div>
        </div>

        <div className="md:col-span-2 space-y-8">
          <div>
            <h1 className="text-4xl font-display text-zinc-900 dark:text-white mb-6">{track.topic}</h1>
            
            {/* Animated Commitment Card */}
            <motion.div 
              className="bg-gradient-to-br from-zinc-100/80 to-zinc-200/50 dark:from-zinc-800/40 dark:to-zinc-900/80 border border-zinc-200 dark:border-zinc-700/50 rounded-3xl p-8 relative overflow-hidden group cursor-pointer"
              onClick={() => onEditCommitment(track.id)}
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                <PenLine className="text-zinc-600 dark:text-zinc-400" size={18} />
              </div>
              <div className="absolute -top-32 -right-32 w-64 h-64 bg-black/5 dark:bg-white/5 rounded-full blur-3xl pointer-events-none group-hover:bg-black/10 transition-colors duration-500" />
              
              <h3 className="text-sm font-semibold tracking-widest uppercase text-zinc-500 mb-4 flex items-center space-x-2">
                <span>Final Output</span>
              </h3>
              <h4 className="text-2xl text-zinc-900 dark:text-white font-display">
                {track.commitmentTitle}
              </h4>
            </motion.div>
          </div>

          
          {track.outputDelivered && track.outputLink && (
            <div className="pt-8 border-t border-zinc-200/50 dark:border-zinc-800/50">
              <h3 className="text-sm font-semibold tracking-widest uppercase text-zinc-500 mb-4 flex items-center space-x-2">
                <span>Final Output Delivered</span>
                <CheckCircle2 size={16} className="text-green-500" />
              </h3>
              <a 
                href={track.outputLink.startsWith('http') ? track.outputLink : 'https://' + track.outputLink} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center space-x-2 text-zinc-900 dark:text-white font-medium hover:underline bg-zinc-100 dark:bg-zinc-800/50 px-4 py-3 rounded-xl transition-colors"
              >
                <LinkIcon size={16} />
                <span>{track.outputLink}</span>
              </a>
            </div>
          )}

          <div className="pt-8 border-t border-zinc-200/50 dark:border-zinc-800/50">
            {/* Sessions List */}

            <div>
              <h3 className="text-sm font-semibold tracking-widest uppercase text-zinc-500 mb-6">
                Sessions ({trackSessions.length})
              </h3>
              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                {trackSessions.length === 0 ? (
                  <p className="text-zinc-500 text-sm italic">No sessions logged yet.</p>
                ) : (
                  trackSessions.map(session => (
                    <div key={session.id} className="bg-zinc-50/50 dark:bg-zinc-900/50 border border-zinc-200/60 dark:border-zinc-800/60 rounded-xl p-4">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">{new Date(session.date).toLocaleDateString()}</span>
                        <span className="text-xs font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 px-2.5 py-1 rounded-md">
                          {session.minutes} min {session.source === 'timer' && '⏱️'}
                        </span>
                      </div>
                      <p className="text-sm text-zinc-700 dark:text-zinc-300">{session.note}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
