import { useState, useEffect, useCallback } from 'react';
import { Track, Session, ActiveTimer } from './types';

interface StoreData {
  tracks: Track[];
  sessions: Session[];
}

const STORAGE_KEY = '100hours_data';
const TIMER_KEY = '100hours_timer';

export function useStore() {
  const [data, setData] = useState<StoreData>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed.tracks) {
          parsed.tracks = parsed.tracks.map((t: any) => ({
            ...t,
            commitmentTitle: t.commitmentTitle || 'Final Output',
          }));
        }
        return parsed;
      } catch (e) {
        console.error('Failed to parse local storage', e);
      }
    }
    return { tracks: [], sessions: [] };
  });

  const [activeTimer, setActiveTimer] = useState<ActiveTimer | null>(() => {
    const stored = localStorage.getItem(TIMER_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.error('Failed to parse timer local storage', e);
      }
    }
    return null;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    if (activeTimer) {
      localStorage.setItem(TIMER_KEY, JSON.stringify(activeTimer));
    } else {
      localStorage.removeItem(TIMER_KEY);
    }
  }, [activeTimer]);

  const addTrack = useCallback((topic: string, commitmentTitle: string, commitment: string) => {
    setData((prev) => {
      const activeCount = prev.tracks.filter(t => t.status === 'active').length;
      if (activeCount >= 5) {
        alert('5 active tracks max — archive or finish one first. If it\'s not worth a spot in your top 5, it\'s not worth tracking.');
        return prev;
      }
      const newTrack: Track = {
        id: crypto.randomUUID(),
        topic,
        commitmentTitle,
        commitment,
        createdAt: Date.now(),
        status: 'active',
        totalMinutes: 0,
        outputDelivered: false,
      };
      return { ...prev, tracks: [newTrack, ...prev.tracks] };
    });
  }, []);

  const updateCommitment = useCallback((trackId: string, newCommitment: string) => {
    setData((prev) => ({
      ...prev,
      tracks: prev.tracks.map((track) => {
        if (track.id === trackId && track.commitment !== newCommitment) {
          return {
            ...track,
            commitment: newCommitment,
          };
        }
        return track;
      }),
    }));
  }, []);

  const deliverOutput = useCallback((trackId: string, outputLink?: string) => {
    setData((prev) => ({
      ...prev,
      tracks: prev.tracks.map((track) => {
        if (track.id === trackId) {
          return {
            ...track,
            outputDelivered: true,
            outputLink,
            status: track.totalMinutes >= 6000 ? 'completed' : 'active',
            completedAt: track.totalMinutes >= 6000 ? Date.now() : track.completedAt,
          };
        }
        return track;
      }),
    }));
  }, []);

  const addSession = useCallback((trackId: string, minutes: number, note: string, nextSteps: string | undefined, source: 'timer' | 'manual', date: number = Date.now()) => {
    setData((prev) => {
      const newSession: Session = {
        id: crypto.randomUUID(),
        trackId,
        minutes,
        note,
        nextSteps,
        date,
        source,
      };
      
      const updatedTracks = prev.tracks.map((track) => {
        if (track.id === trackId) {
          const newTotal = track.totalMinutes + minutes;
          return {
            ...track,
            totalMinutes: newTotal,
            status: (newTotal >= 6000 && track.outputDelivered) ? 'completed' as const : track.status,
            completedAt: (newTotal >= 6000 && track.outputDelivered) ? Date.now() : track.completedAt
          };
        }
        return track;
      });

      return {
        tracks: updatedTracks,
        sessions: [newSession, ...prev.sessions],
      };
    });
  }, []);

    const abandonTrack = useCallback((trackId: string) => {
    setData((prev) => ({
      ...prev,
      tracks: prev.tracks.map(t => t.id === trackId ? { ...t, status: 'abandoned' as const } : t)
    }));
  }, []);

    const archiveTrack = useCallback((trackId: string) => {
    setData((prev) => ({
      ...prev,
      tracks: prev.tracks.map(t => t.id === trackId ? { ...t, status: 'archived' as const } : t)
    }));
  }, []);

  const deleteTrack = useCallback((trackId: string) => {
    setData((prev) => ({
      tracks: prev.tracks.filter(t => t.id !== trackId),
      sessions: prev.sessions.filter(s => s.trackId !== trackId),
    }));
  }, []);

  const startTimer = useCallback((trackId: string) => {
    setActiveTimer({ trackId, startTime: Date.now() });
  }, []);

  const pauseTimer = useCallback((autoPaused = false) => {
    setActiveTimer((prev) => {
      if (!prev || prev.pausedAt) return prev;
      const now = Date.now();
      const additional = now - prev.startTime;
      return {
        ...prev,
        pausedAt: now,
        accumulatedMs: (prev.accumulatedMs || 0) + additional,
        autoPaused
      };
    });
  }, []);

  const resumeTimer = useCallback(() => {
    setActiveTimer((prev) => {
      if (!prev || !prev.pausedAt) return prev;
      return {
        ...prev,
        startTime: Date.now(),
        pausedAt: undefined,
        autoPaused: false
      };
    });
  }, []);

  const stopTimer = useCallback((note: string, nextSteps?: string) => {
    if (!activeTimer) return;
    const additional = activeTimer.pausedAt ? 0 : (Date.now() - activeTimer.startTime);
    const totalMs = (activeTimer.accumulatedMs || 0) + additional;
    const elapsedMinutes = Math.floor(totalMs / 60000);
    if (elapsedMinutes > 0) {
      addSession(activeTimer.trackId, elapsedMinutes, note, nextSteps, 'timer', Date.now());
    }
    setActiveTimer(null);
  }, [activeTimer, addSession]);

  const cancelTimer = useCallback(() => {
    setActiveTimer(null);
  }, []);

  const exportData = useCallback(() => {
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `100hours-export-${new Date().toISOString().slice(0,10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [data]);

  const importData = useCallback((jsonString: string) => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.tracks && Array.isArray(parsed.tracks) && parsed.sessions && Array.isArray(parsed.sessions)) {
        parsed.tracks = parsed.tracks.map((t: any) => ({
          ...t,
          commitmentTitle: t.commitmentTitle || 'Final Output',
        }));
        setData(parsed);
        return true;
      }
      return false;
    } catch (e) {
      console.error('Failed to parse import data', e);
      return false;
    }
  }, []);

  return {
    data,
    activeTimer,
    addTrack,
    updateCommitment,
    deliverOutput,
    addSession,
    abandonTrack,
    archiveTrack,
    deleteTrack,
    startTimer,
    stopTimer,
    cancelTimer,
    pauseTimer,
    resumeTimer,
    exportData,
    importData
  };
}
