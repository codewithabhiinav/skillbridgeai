import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  GraduationCap, Building2, Landmark, BookOpen, 
  Zap, ArrowRight, Sparkles 
} from 'lucide-react';
import type { UserRole } from '../types';
import CoderCredit from '../components/layout/CoderCredit';

const roles: { role: UserRole; icon: typeof GraduationCap; label: string; sublabel: string; desc: string; color: string; bg: string }[] = [
  {
    role: 'student',
    icon: GraduationCap,
    label: 'Student',
    sublabel: 'Arjun Sharma',
    desc: 'Explore skill assessment, gap analysis, learning paths, and internship matching.',
    color: 'var(--color-accent)',
    bg: 'rgba(6, 182, 212, 0.08)',
  },
  {
    role: 'recruiter',
    icon: Building2,
    label: 'Industry / Recruiter',
    sublabel: 'Priya Nair — Razorpay',
    desc: 'Post opportunities, view AI-ranked candidates, and manage hiring pipeline.',
    color: 'var(--color-accent-blue)',
    bg: 'rgba(59, 130, 246, 0.08)',
  },
  {
    role: 'institution',
    icon: Landmark,
    label: 'Institution',
    sublabel: 'IIT Bombay Admin',
    desc: 'Monitor student readiness, skill analytics, placement trends, and industry collaboration.',
    color: 'var(--color-accent-purple)',
    bg: 'rgba(139, 92, 246, 0.08)',
  },
  {
    role: 'academician',
    icon: BookOpen,
    label: 'Academician',
    sublabel: 'Dr. Ramesh Iyer',
    desc: 'Browse FDP programs, research collaborations, guest lectures, and industry projects.',
    color: 'var(--color-accent-green)',
    bg: 'rgba(16, 185, 129, 0.08)',
  },
];

export default function DemoLogin() {
  const navigate = useNavigate();
  const { switchRole } = useAuth();

  const handleDemoLogin = (role: UserRole) => {
    switchRole(role);
    navigate(`/${role}`);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--color-bg-primary)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px',
    }}>
      {/* Logo */}
      <div style={{ 
        display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px',
        cursor: 'pointer',
      }} onClick={() => navigate('/')}>
        <Zap size={32} style={{ color: 'var(--color-accent)' }} />
        <span style={{ fontSize: '1.5rem', fontWeight: 900, color: 'white' }}>
          SKILL<span style={{ color: 'var(--color-accent)' }}>BRIDGE</span> AI
        </span>
      </div>

      {/* Badge */}
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: '6px 16px',
        background: 'rgba(6, 182, 212, 0.1)',
        borderRadius: 'var(--radius-full)',
        border: '1px solid rgba(6, 182, 212, 0.2)',
        marginBottom: '32px',
        fontSize: 'var(--font-size-xs)',
        color: 'var(--color-accent)',
        fontWeight: 600,
      }}>
        <Sparkles size={14} />
        Hackathon Demo Mode
      </div>

      <h2 style={{ color: 'white', fontSize: 'var(--font-size-2xl)', marginBottom: '8px', textAlign: 'center' }}>
        Choose Your Role
      </h2>
      <p style={{ color: 'var(--color-text-muted)', marginBottom: '40px', textAlign: 'center', maxWidth: '500px' }}>
        Select a role to explore the platform with pre-loaded demo data. Each role provides a unique dashboard experience.
      </p>

      {/* Role Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '20px',
        maxWidth: '1100px',
        width: '100%',
      }}>
        {roles.map((r) => (
          <button
            key={r.role}
            onClick={() => handleDemoLogin(r.role)}
            style={{
              background: 'var(--color-bg-secondary)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--color-border-dark)',
              padding: '32px 28px',
              textAlign: 'left',
              cursor: 'pointer',
              transition: 'all 0.25s ease',
              position: 'relative',
              overflow: 'hidden',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = r.color;
              (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
              (e.currentTarget as HTMLElement).style.boxShadow = `0 12px 24px rgba(0,0,0,0.2), 0 0 0 1px ${r.color}30`;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-border-dark)';
              (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
              (e.currentTarget as HTMLElement).style.boxShadow = 'none';
            }}
          >
            <div style={{
              width: '52px',
              height: '52px',
              borderRadius: 'var(--radius-md)',
              background: r.bg,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '20px',
            }}>
              <r.icon size={24} style={{ color: r.color }} />
            </div>
            <div style={{ color: 'white', fontWeight: 700, fontSize: 'var(--font-size-lg)', marginBottom: '4px' }}>
              {r.label}
            </div>
            <div style={{ color: r.color, fontSize: 'var(--font-size-sm)', fontWeight: 500, marginBottom: '12px' }}>
              {r.sublabel}
            </div>
            <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)', lineHeight: 1.6, marginBottom: '20px' }}>
              {r.desc}
            </p>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 18px',
              borderRadius: 'var(--radius-sm)',
              background: r.bg,
              color: r.color,
              fontWeight: 600,
              fontSize: 'var(--font-size-sm)',
            }}>
              Login as {r.label} <ArrowRight size={16} />
            </div>
          </button>
        ))}
      </div>

      <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-xs)', marginTop: '40px', textAlign: 'center' }}>
        All data shown is synthetic demo data for demonstration purposes.
      </p>
      <p style={{ marginTop: '16px', textAlign: 'center' }}>
        <CoderCredit />
      </p>
    </div>
  );
}
