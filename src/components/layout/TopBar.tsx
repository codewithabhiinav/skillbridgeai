import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Bell, Users, GraduationCap, Building2, BookOpen, ArrowLeftRight } from 'lucide-react';
import type { UserRole } from '../../types';

const roleConfig: Record<UserRole, { label: string; icon: React.ReactNode; color: string }> = {
  student: { label: 'Student', icon: <GraduationCap size={16} />, color: 'var(--color-accent)' },
  recruiter: { label: 'Recruiter', icon: <Building2 size={16} />, color: 'var(--color-accent-blue)' },
  institution: { label: 'Institution', icon: <Users size={16} />, color: 'var(--color-accent-purple)' },
  academician: { label: 'Academician', icon: <BookOpen size={16} />, color: 'var(--color-accent-green)' },
};

interface TopBarProps {
  title?: string;
}

export default function TopBar({ title }: TopBarProps) {
  const { isDemoMode, role, switchRole } = useAuth();
  const navigate = useNavigate();

  const handleRoleSwitch = (newRole: UserRole) => {
    switchRole(newRole);
    navigate(`/${newRole}`);
  };

  return (
    <>
      {isDemoMode && (
        <div className="demo-banner">
          🎯 HACKATHON DEMO MODE — SIH 2026 | Team DOOMED MINDS | Problem: SIH26044
        </div>
      )}
      <div className="topbar">
        <div className="topbar-left">
          {title && <h1 className="topbar-title">{title}</h1>}
        </div>
        <div className="topbar-right">
          {isDemoMode && (
            <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
              <ArrowLeftRight size={14} style={{ color: 'var(--color-text-muted)' }} />
              <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', marginRight: '4px' }}>Switch:</span>
              {(Object.keys(roleConfig) as UserRole[]).map((r) => {
                const cfg = roleConfig[r];
                const isActive = r === role;
                return (
                  <button
                    key={r}
                    onClick={() => handleRoleSwitch(r)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '4px 10px',
                      borderRadius: 'var(--radius-full)',
                      fontSize: 'var(--font-size-xs)',
                      fontWeight: 600,
                      background: isActive ? `${cfg.color}15` : 'transparent',
                      color: isActive ? cfg.color : 'var(--color-text-muted)',
                      border: isActive ? `1.5px solid ${cfg.color}40` : '1.5px solid transparent',
                      cursor: 'pointer',
                      transition: 'all var(--transition-fast)',
                    }}
                  >
                    {cfg.icon}
                    {cfg.label}
                  </button>
                );
              })}
            </div>
          )}
          <button className="btn-icon btn-ghost" style={{ position: 'relative' }}>
            <Bell size={20} />
            <span style={{
              position: 'absolute', top: '6px', right: '6px',
              width: '8px', height: '8px', borderRadius: '50%',
              background: 'var(--color-accent-red)',
            }} />
          </button>
        </div>
      </div>
    </>
  );
}
