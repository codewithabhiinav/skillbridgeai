import type { DataState } from '../context/DataContext';

const STORAGE_KEY = 'skillbridge-demo-state';

type PersistedState = Pick<
  DataState,
  'students' | 'opportunities' | 'applications' | 'assessmentResults'
>;

export function loadPersistedState(): Partial<PersistedState> | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as Partial<PersistedState>;
  } catch {
    return null;
  }
}

export function savePersistedState(state: PersistedState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Ignore quota / private browsing errors in demo mode
  }
}

export function clearPersistedState(): void {
  localStorage.removeItem(STORAGE_KEY);
}
