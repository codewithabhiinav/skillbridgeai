import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import type { User, UserRole, Student, Recruiter, Institution, Academician } from '../types';
import { useData } from './DataContext';

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  role: UserRole | null;
  isDemoMode: boolean;
}

interface AuthContextType extends AuthState {
  login: (user: User, demoMode?: boolean) => void;
  logout: () => void;
  switchRole: (role: UserRole) => void;
  refreshStudentUser: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

export function isStudent(user: User | null): user is Student {
  return user?.role === 'student';
}
export function isRecruiter(user: User | null): user is Recruiter {
  return user?.role === 'recruiter';
}
export function isInstitution(user: User | null): user is Institution {
  return user?.role === 'institution';
}
export function isAcademician(user: User | null): user is Academician {
  return user?.role === 'academician';
}

interface AuthProviderProps {
  children: ReactNode;
  demoUsers: Record<Exclude<UserRole, 'student'>, User> & { student?: Student };
}

const AUTH_SESSION_KEY = 'skillbridge-demo-role';

function AuthProviderInner({ children, demoUsers }: AuthProviderProps) {
  const { getDemoStudent } = useData();

  const [state, setState] = useState<AuthState>(() => {
    const savedRole = sessionStorage.getItem(AUTH_SESSION_KEY) as UserRole | null;
    if (!savedRole || savedRole === 'student') {
      return { isAuthenticated: false, user: null, role: null, isDemoMode: false };
    }
    const demoUser = demoUsers[savedRole as Exclude<UserRole, 'student'>];
    if (!demoUser) {
      return { isAuthenticated: false, user: null, role: null, isDemoMode: false };
    }
    return { isAuthenticated: true, user: demoUser, role: savedRole, isDemoMode: true };
  });

  useEffect(() => {
    const savedRole = sessionStorage.getItem(AUTH_SESSION_KEY);
    if (savedRole === 'student' && !state.isAuthenticated) {
      const student = getDemoStudent();
      setState({ isAuthenticated: true, user: student, role: 'student', isDemoMode: true });
    }
  }, [getDemoStudent, state.isAuthenticated]);

  const persistRole = (role: UserRole | null) => {
    if (role) sessionStorage.setItem(AUTH_SESSION_KEY, role);
    else sessionStorage.removeItem(AUTH_SESSION_KEY);
  };

  const login = useCallback((user: User, demoMode = false) => {
    persistRole(user.role);
    setState({
      isAuthenticated: true,
      user,
      role: user.role,
      isDemoMode: demoMode,
    });
  }, []);

  const logout = useCallback(() => {
    persistRole(null);
    setState({
      isAuthenticated: false,
      user: null,
      role: null,
      isDemoMode: false,
    });
  }, []);

  const switchRole = useCallback((role: UserRole) => {
    const demoUser = role === 'student' ? getDemoStudent() : demoUsers[role];
    if (demoUser) {
      persistRole(role);
      setState({
        isAuthenticated: true,
        user: demoUser,
        role,
        isDemoMode: true,
      });
    }
  }, [demoUsers, getDemoStudent]);

  const refreshStudentUser = useCallback(() => {
    setState(prev => {
      if (prev.role !== 'student') return prev;
      return { ...prev, user: getDemoStudent() };
    });
  }, [getDemoStudent]);

  return (
    <AuthContext.Provider value={{ ...state, login, logout, switchRole, refreshStudentUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function AuthProvider({ children, demoUsers }: AuthProviderProps) {
  return <AuthProviderInner demoUsers={demoUsers}>{children}</AuthProviderInner>;
}
