import React, { useState, useRef } from 'react';
import { useStore } from './store';
import { Track } from './types';
import { TrackCard } from './components/TrackCard';
import { TrackDetail } from './components/TrackDetail';
import { CreateTrackModal } from './components/CreateTrackModal';
import { LogSessionModal } from './components/LogSessionModal';
import { EditCommitmentModal } from './components/EditCommitmentModal';
import { ActiveTimerOverlay } from './components/ActiveTimerOverlay';
import { ReleaseNotes } from './components/ReleaseNotes';
import { AbandonTrackModal } from './components/AbandonTrackModal';
import { DeleteTrackModal } from './components/DeleteTrackModal';
import { Plus, Target, Download, Upload, Database, ChevronDown, Moon, Sun } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const store = useStore();
  const { tracks, sessions } = store.data;
  
  const activeTracks = tracks.filter(t => t.status === 'active');
  const archivedTracks = tracks.filter(t => t.status !== 'active');

  const [currentView, setCurrentView] = useState<string>('home'); // 'home', 'release-notes', or trackId
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [logModalTrack, setLogModalTrack] = useState<Track | null>(null);
  const [editModalTrack, setEditModalTrack] = useState<Track | null>(null);
  const [abandonModalTrack, setAbandonModalTrack] = useState<Track | null>(null);
  const [deleteModalTrack, setDeleteModalTrack] = useState<Track | null>(null);
  const [isDataMenuOpen, setIsDataMenuOpen] = useState(false);
  const [isArchivedCollapsed, setIsArchivedCollapsed] = useState(false);

  // Initialize dark mode from localStorage or system preference
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return true;
  });

  // Apply dark mode class to HTML element
  React.useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const getTrack = (id: string) => tracks.find(t => t.id === id) || null;
  const activeTrackDetail = (currentView !== 'home' && currentView !== 'release-notes') ? getTrack(currentView) : null;

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const success = store.importData(event.target?.result as string);
      if (success) {
        alert('Data imported successfully!');
        setCurrentView('home');
      } else {
        alert('Failed to import data. Invalid file format.');
      }
    };
    reader.readAsText(file);
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 flex flex-col selection:bg-black/20 dark:selection:bg-white/20">
      <header className="border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-2">
          <div 
            className="flex items-center space-x-2 sm:space-x-3 cursor-pointer group shrink overflow-hidden"
            onClick={() => setCurrentView('home')}
          >
            <div className="w-10 h-10 bg-black dark:bg-white text-white dark:text-black rounded-full flex items-center justify-center group-hover:bg-zinc-800 dark:group-hover:bg-zinc-200 transition-colors shrink-0">
              <Target size={20} strokeWidth={2.5} />
            </div>
            <div className="hidden min-[360px]:block truncate">
              <h1 className="text-lg sm:text-xl font-bold tracking-tight font-semibold tracking-tight text-zinc-900 dark:text-white group-hover:text-zinc-800 transition-colors truncate">100 Hours</h1>
              <p className="text-[10px] sm:text-xs text-zinc-500 font-sans tracking-wide truncate">DEEP LEARNING COMMITMENT</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-1.5 sm:space-x-4 shrink-0">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="h-10 w-10 text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white rounded-full transition-colors flex items-center justify-center bg-zinc-50/50 dark:bg-zinc-900/50 border border-zinc-200/50 dark:border-zinc-800/50 shrink-0"
              title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            <input 
              type="file" 
              accept=".json" 
              className="hidden" 
              ref={fileInputRef} 
              onChange={handleImport}
            />
            
            <div className="relative">
              <button
                onClick={() => setIsDataMenuOpen(!isDataMenuOpen)}
                className="h-10 text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white w-10 sm:w-auto p-0 sm:px-4 rounded-full transition-colors flex items-center justify-center sm:gap-2 bg-zinc-50/50 dark:bg-zinc-900/50 border border-zinc-200/50 dark:border-zinc-800/50 shrink-0"
                title="Data Options"
              >
                <Database size={16} />
                <span className="hidden sm:inline text-sm font-medium">Data</span>
                <ChevronDown size={14} className={`hidden sm:block transition-transform ${isDataMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isDataMenuOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 w-48 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-xl overflow-hidden z-50 py-1"
                  >
                    <button
                      onClick={() => { fileInputRef.current?.click(); setIsDataMenuOpen(false); }}
                      className="w-full text-left px-4 py-3 hover:bg-zinc-100 dark:hover:bg-zinc-800 flex items-center space-x-3 text-sm text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white transition-colors"
                    >
                      <Upload size={16} />
                      <span>Import Data</span>
                    </button>
                    <button
                      onClick={() => { store.exportData(); setIsDataMenuOpen(false); }}
                      className="w-full text-left px-4 py-3 hover:bg-zinc-100 dark:hover:bg-zinc-800 flex items-center space-x-3 text-sm text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white transition-colors"
                    >
                      <Download size={16} />
                      <span>Export Data</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="w-px h-6 bg-zinc-100 dark:bg-zinc-800 mx-1 hidden sm:block"></div>
            <button
              onClick={() => setIsCreateOpen(true)}
              className="bg-zinc-900 dark:bg-white text-white dark:text-black w-10 h-10 sm:w-auto sm:h-10 p-0 sm:px-5 rounded-full text-sm font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 shrink-0"
            >
              <Plus size={16} />
              <span className="hidden sm:inline">New Track</span>
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <AnimatePresence mode="wait">
          {currentView === 'release-notes' ? (
            <motion.div
              key="release-notes"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <ReleaseNotes onBack={() => setCurrentView('home')} />
            </motion.div>
          ) : currentView === 'home' ? (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="space-y-16">
                <section>
                  {activeTracks.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-32 px-4 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-3xl text-center">
                      <Target size={48} className="text-zinc-700 dark:text-zinc-300 mb-6" />
                      <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white mb-2">Nothing tracked yet.</h2>
                      <p className="text-zinc-600 dark:text-zinc-400 mb-8 max-w-md">Pick one thing and commit to it. Not physics, but quantum mechanics. Define a real finish line.</p>
                      <button
                        onClick={() => setIsCreateOpen(true)}
                        className="bg-zinc-900 dark:bg-white text-white dark:text-black px-6 py-3 rounded-full text-sm font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
                      >
                        Start a Track
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {activeTracks.map(track => (
                        <TrackCard
                          key={track.id}
                          track={track}
                          onClick={(id) => setCurrentView(id)}
                          onStartTimer={(id) => {
                            if (store.activeTimer) {
                              alert("Another timer is currently running.");
                              return;
                            }
                            store.startTimer(id);
                          }}
                        />
                      ))}
                    </div>
                  )}
                </section>

                {archivedTracks.length > 0 && (
                  <section>
                    <div 
                      className="flex items-center space-x-3 mb-6 cursor-pointer group w-fit" 
                      onClick={() => setIsArchivedCollapsed(!isArchivedCollapsed)}
                    >
                      <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white flex items-center space-x-3 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors">
                        <span>Archived</span>
                        <span className="bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs px-2.5 py-1 rounded-full font-sans">{archivedTracks.length}</span>
                      </h2>
                      <ChevronDown size={24} className={`text-zinc-400 transition-transform duration-300 ${isArchivedCollapsed ? '-rotate-90' : ''}`} />
                    </div>
                    
                    <AnimatePresence initial={false}>
                      {!isArchivedCollapsed && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {archivedTracks.map(track => (
                        <div 
                          key={track.id} 
                          onClick={() => setCurrentView(track.id)}
                          className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/60 rounded-[20px] p-6 flex flex-col justify-between items-start cursor-pointer hover:bg-zinc-50 transition-colors"
                        >
                          <div className="mb-4">
                            <h3 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-white mb-1">{track.topic}</h3>
                            <h4 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-1">{track.commitmentTitle}</h4>
                            <p className="text-sm text-zinc-500 line-clamp-2">{track.commitment}</p>
                          </div>
                          <div className="w-full flex justify-between items-end mt-auto">
                            <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
                              {Math.floor(track.totalMinutes / 60)}<span className="text-sm font-sans text-zinc-500 font-normal ml-1">h</span>
                            </span>
                            {track.outputLink && (
                              <a href={track.outputLink} onClick={(e) => e.stopPropagation()} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-zinc-900 dark:text-white hover:text-black dark:hover:text-white transition-colors border border-black/20 dark:border-white/20 px-3 py-1.5 rounded-lg bg-black/5 dark:bg-white/5">
                                View Output
                              </a>
                            )}
                          </div>
                        </div>
                      ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </section>
                )}
              </div>
            </motion.div>
          ) : activeTrackDetail ? (
            <motion.div
              key={`track-${activeTrackDetail.id}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <TrackDetail
                track={activeTrackDetail}
                sessions={sessions}
                onBack={() => setCurrentView('home')}
                onStartTimer={(id) => {
                  if (store.activeTimer) {
                    alert("Another timer is currently running.");
                    return;
                  }
                  store.startTimer(id);
                }}
                onLogManual={(id) => setLogModalTrack(getTrack(id))}
                onEditCommitment={(id) => setEditModalTrack(getTrack(id))}
                onDelete={(id) => {
                  const tr = getTrack(id);
                  if (tr?.status === 'active') {
                    setAbandonModalTrack(tr);
                  } else {
                    setDeleteModalTrack(tr);
                  }
                }}
                onDeliver={store.deliverOutput}
                onArchive={() => {
                  store.archiveTrack(activeTrackDetail.id);
                  setCurrentView("home");
                }}
              />
            </motion.div>
          ) : (
            <motion.div
              key="not-found"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="text-center py-20 text-zinc-600 dark:text-zinc-400">
                Track not found. <button onClick={() => setCurrentView('home')} className="text-zinc-900 dark:text-white underline ml-2">Go back</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="border-t border-zinc-200 dark:border-zinc-800 py-8 mt-auto">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-center gap-3 md:gap-4 text-sm text-zinc-500 font-sans">
          <button 
            onClick={() => setCurrentView('release-notes')}
            className="hover:text-black dark:hover:text-white transition-colors"
          >
            Release Notes
          </button>
          <span className="hidden md:inline">&bull;</span>
          <span>
            Made with ❤️ by <a href="https://curiousvolt.is-a.dev" target="_blank" rel="noopener noreferrer" className="text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors">@curiousvolt</a>
          </span>
        </div>
      </footer>

      {/* Overlays and Modals */}
      <ActiveTimerOverlay
        timer={store.activeTimer}
        track={store.activeTimer ? getTrack(store.activeTimer.trackId) || undefined : undefined}
        onStop={(note, nextSteps) => store.stopTimer(note, nextSteps)}
        onPause={(auto) => store.pauseTimer(auto)}
        onResume={() => store.resumeTimer()}
      />

      <CreateTrackModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onSave={(topic, commitmentTitle, commitment) => {
          store.addTrack(topic, commitmentTitle, commitment);
          // Auto-navigate to home to see the new track if not there
          setCurrentView('home');
        }}
      />

      <LogSessionModal
        track={logModalTrack}
        onClose={() => setLogModalTrack(null)}
        onSave={(mins, note, date) => {
          if (logModalTrack) store.addSession(logModalTrack.id, mins, note, 'manual', date);
        }}
      />

      <EditCommitmentModal
        track={editModalTrack}
        onClose={() => setEditModalTrack(null)}
        onSave={(commitment) => {
          if (editModalTrack) store.updateCommitment(editModalTrack.id, commitment);
        }}
      />

      <AbandonTrackModal
        track={abandonModalTrack}
        onClose={() => setAbandonModalTrack(null)}
        onConfirm={(id) => {
          store.abandonTrack(id);
          setCurrentView('home');
        }}
      />
      <DeleteTrackModal
        track={deleteModalTrack}
        onClose={() => setDeleteModalTrack(null)}
        onConfirm={(id) => {
          store.deleteTrack(id);
          setCurrentView('home');
        }}
      />
    </div>
  );
}
