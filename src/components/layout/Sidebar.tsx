import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard, Brain, ClipboardCheck, BookOpen, Briefcase,
  FileText, UserCircle, FolderOpen, Users, Building2, BarChart3,
  GraduationCap, TrendingUp, Factory, FileBarChart, Lightbulb,
  FlaskConical, Handshake, Award, LogOut, Zap
} from 'lucide-react';

const navConfig = {
  student: [
    { label: 'Dashboard', path: '/student', icon: LayoutDashboard, end: true },
    { label: 'My Skills', path: '/student/skills', icon: Brain },
    { label: 'Assessment', path: '/student/assessment', icon: ClipboardCheck },
    { label: 'Learning', path: '/student/learning', icon: BookOpen },
    { label: 'Opportunities', path: '/student/opportunities', icon: Briefcase },
    { label: 'Applications', path: '/student/applications', icon: FileText },
    { label: 'Portfolio', path: '/student/portfolio', icon: FolderOpen },
    { label: 'Profile', path: '/student/profile', icon: UserCircle },
  ],
  recruiter: [
    { label: 'Dashboard', path: '/recruiter', icon: LayoutDashboard, end: true },
    { label: 'Jobs', path: '/recruiter/jobs', icon: Briefcase },
    { label: 'Internships', path: '/recruiter/internships', icon: GraduationCap },
    { label: 'Candidates', path: '/recruiter/candidates', icon: Users },
    { label: 'Shortlist', path: '/recruiter/shortlist', icon: Award },
    { label: 'Post Opportunity', path: '/recruiter/post', icon: FileText },
    { label: 'Company Profile', path: '/recruiter/company', icon: Building2 },
  ],
  institution: [
    { label: 'Dashboard', path: '/institution', icon: LayoutDashboard, end: true },
    { label: 'Students', path: '/institution/students', icon: Users },
    { label: 'Skill Analytics', path: '/institution/analytics', icon: BarChart3 },
    { label: 'Internships', path: '/institution/internships', icon: Briefcase },
    { label: 'Placements', path: '/institution/placements', icon: TrendingUp },
    { label: 'Industry', path: '/institution/industry', icon: Factory },
    { label: 'Reports', path: '/institution/reports', icon: FileBarChart },
  ],
  academician: [
    { label: 'Dashboard', path: '/academician', icon: LayoutDashboard, end: true },
    { label: 'Opportunities', path: '/academician/opportunities', icon: Lightbulb },
    { label: 'FDP', path: '/academician/fdp', icon: BookOpen },
    { label: 'Research', path: '/academician/research', icon: FlaskConical },
    { label: 'Projects', path: '/academician/projects', icon: FolderOpen },
    { label: 'Collaboration', path: '/academician/collaboration', icon: Handshake },
  ],
};

const roleLabels = {
  student: 'Student',
  recruiter: 'Recruiter',
  institution: 'Institution',
  academician: 'Academician',
};

export default function Sidebar() {
  const { role, user, logout } = useAuth();

  if (!role) return null;

  const links = navConfig[role] || [];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <Zap size={24} style={{ color: 'var(--color-accent)' }} />
        <div className="sidebar-logo">
          SKILL<span>BRIDGE</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        <div className="sidebar-section-label">{roleLabels[role]} Panel</div>
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.end}
              className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            >
              <Icon size={20} />
              <span>{link.label}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px', marginBottom: '8px' }}>
          <div className="avatar" style={{ 
            background: 'linear-gradient(135deg, var(--color-accent), var(--color-accent-blue))',
            width: '36px', height: '36px', fontSize: '0.8rem'
          }}>
            {user?.name?.split(' ').map(n => n[0]).join('').slice(0, 2)}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 'var(--font-size-sm)', fontWeight: 600, color: 'var(--color-text-light)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {user?.name}
            </div>
            <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
              {roleLabels[role]}
            </div>
          </div>
        </div>
        <button 
          className="sidebar-link" 
          onClick={logout}
          style={{ width: '100%', border: 'none', background: 'none', cursor: 'pointer' }}
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
