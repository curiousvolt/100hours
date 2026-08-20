import { FC } from 'react';
import { Track } from '../types';
import { LinearProgress } from './LinearProgress';
import { Play, ChevronRight, CheckCircle2, Link as LinkIcon } from 'lucide-react';

interface TrackCardProps {
  track: Track;
  onClick: (trackId: string) => void;
  onStartTimer: (trackId: string) => void;
}

export const TrackCard: FC<TrackCardProps> = ({
  track,
  onClick,
  onStartTimer,
}) => {
  const hours = Math.floor(track.totalMinutes / 60);
  const progress = Math.min(track.totalMinutes / 6000, 1);
  const isDoneHours = track.totalMinutes >= 6000;

  return (
    <div 
      onClick={() => onClick(track.id)}
      className={`bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/60 rounded-[24px] p-6 relative overflow-hidden flex flex-col backdrop-blur-xl transition-all hover:bg-zinc-50 hover:border-zinc-300 group cursor-pointer ${track.status !== "active" ? "opacity-60 saturate-50" : ""}`}
    >
      
      <div className="absolute top-6 right-6 flex space-x-2">
        {track.status === 'completed' && (
          <span className="bg-zinc-200/50 dark:bg-zinc-800/50 text-zinc-700 dark:text-zinc-300 px-2 py-1 rounded text-xs font-semibold uppercase tracking-wider">Completed</span>
        )}
        {track.status === 'abandoned' && (
          <span className="bg-red-500/10 text-red-600 dark:text-red-400 px-2 py-1 rounded text-xs font-semibold uppercase tracking-wider">Abandoned</span>
        )}
      </div>
      <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-4 group-hover:translate-x-0 duration-300 flex items-center justify-center">

        <ChevronRight className="text-zinc-500" size={20} />
      </div>

      <div className="mb-10 pr-8">
        <h3 className="text-3xl font-display text-zinc-900 dark:text-white leading-tight mb-4">
          {track.topic}
        </h3>
        <div className="flex flex-col space-y-1.5 border-l-2 border-zinc-200 dark:border-zinc-800 pl-3">
          <span className="text-[10px] font-bold tracking-widest uppercase text-zinc-400 dark:text-zinc-500">
            Final Output
          </span>
          <h4 className="text-sm font-medium text-zinc-600 dark:text-zinc-400 leading-snug">
            {track.commitmentTitle}
          </h4>
        </div>
      </div>

      <div className="mt-auto space-y-5">
        <div className="space-y-2">
          <div className="flex justify-between items-end">
            <span className="text-3xl font-display text-zinc-900 dark:text-white tracking-tighter leading-none">
              {hours}<span className="text-base font-sans text-zinc-500 font-normal ml-1">h</span>
            </span>
            <span className="text-xs font-semibold tracking-wider uppercase text-zinc-500">
              / 100h
            </span>
          </div>
          <LinearProgress progress={progress} height={6} />
        </div>

        
        {track.outputDelivered && track.outputLink && (
          <a
            href={track.outputLink.startsWith('http') ? track.outputLink : 'https://' + track.outputLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex-1 bg-zinc-100 dark:bg-zinc-800/50 text-zinc-900 dark:text-white px-4 py-3 rounded-xl text-sm font-semibold flex items-center justify-center space-x-2 border border-zinc-200 dark:border-zinc-700/50 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
          >
            <LinkIcon size={16} />
            <span>View Output</span>
          </a>
        )}
        <div className="flex gap-2 relative z-10" onClick={(e) => e.stopPropagation()}>

          {isDoneHours && !track.outputDelivered && track.status === "active" ? (
            <div className="flex-1 bg-black/10 dark:bg-white/10 text-zinc-900 dark:text-white px-4 py-3 rounded-xl text-sm font-semibold flex items-center justify-center space-x-2 border border-black/20 dark:border-white/20">
              <CheckCircle2 size={16} />
              <span>Ready to Deliver</span>
            </div>
          ) : track.status === "active" ? (
            <button
              onClick={() => onStartTimer(track.id)}
              className="flex-1 bg-zinc-900 dark:bg-white text-white dark:text-black px-4 py-3 rounded-xl text-sm font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors flex items-center justify-center space-x-2 shadow-lg shadow-white/5"
            >
              <Play size={16} fill="currentColor" />
              <span>Start Session</span>
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};
