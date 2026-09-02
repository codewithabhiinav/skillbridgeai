import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import type { Student } from '../types';

/** Returns the live student record from shared app state (not a stale auth snapshot). */
export function useStudent(): Student {
  const { user } = useAuth();
  const { getStudentById } = useData();
  const student = user ? getStudentById(user.id) : undefined;
  if (!student) {
    throw new Error('Student profile not found in application state');
  }
  return student;
}
