export interface Track {
  id: string;
  topic: string;
  commitmentTitle: string;
  commitment: string;
  createdAt: number;
  completedAt?: number;
  status: 'active' | 'archived' | 'completed' | 'abandoned';
  totalMinutes: number;
  outputDelivered: boolean;
  outputLink?: string;
}

export interface Session {
  id: string;
  trackId: string;
  minutes: number;
  note: string;
  nextSteps?: string;
  date: number;
  source: 'timer' | 'manual';
}

export interface ActiveTimer {
  trackId: string;
  startTime: number;
  pausedAt?: number;
  accumulatedMs?: number;
  autoPaused?: boolean;
}
