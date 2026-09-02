import React from 'react';
import { useAuth } from '../../context/AuthContext';
import type { Academician } from '../../types';
import { BookOpen, Users, Lightbulb, Link as LinkIcon, Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AcademicianDashboard: React.FC = () => {
  const { user } = useAuth();
  const academician = user as Academician;

  const stats = [
    { label: 'Available Opportunities', value: '24', icon: BookOpen, color: 'text-cyan-500' },
    { label: 'FDP Programs', value: '8', icon: Users, color: 'text-purple-500' },
    { label: 'Research Projects', value: '12', icon: Lightbulb, color: 'text-amber-500' },
    { label: 'Active Collaborations', value: '3', icon: LinkIcon, color: 'text-green-500' }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="bg-gradient-to-r from-[var(--color-bg-card-dark)] to-[var(--color-bg-secondary)] p-8 rounded-2xl border border-[var(--color-border-dark)] shadow-sm">
        <h1 className="text-3xl font-bold text-[var(--color-text-light)] mb-2">
          Welcome back, {academician?.name || 'Professor'}
        </h1>
        <p className="text-[var(--color-text-secondary)] text-lg">
          {academician?.designation || 'Faculty Member'} at {academician?.institution || 'University'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-[var(--color-bg-card-dark)] p-5 rounded-xl border border-[var(--color-border-dark)] shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-[var(--color-text-secondary)]">{stat.label}</p>
                <p className="text-3xl font-bold mt-2 text-[var(--color-text-light)]">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-lg bg-[var(--color-bg-secondary)]`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[var(--color-bg-card-dark)] rounded-xl border border-[var(--color-border-dark)] shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-[var(--color-text-light)]">Upcoming FDPs</h3>
            <Link to="/academician/fdp" className="text-[var(--color-accent)] text-sm hover:underline flex items-center">
              View All <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="flex gap-4 p-4 rounded-lg bg-[var(--color-bg-secondary)] border border-[var(--color-border-dark)]">
                <div className="bg-purple-500/20 text-purple-400 p-3 rounded-lg flex flex-col items-center justify-center min-w-[60px]">
                  <span className="text-xs font-bold uppercase">SEP</span>
                  <span className="text-xl font-bold">1{i}</span>
                </div>
                <div>
                  <h4 className="font-semibold text-[var(--color-text-light)]">Advanced AI & ML Workshop</h4>
                  <p className="text-sm text-[var(--color-text-secondary)] mt-1 flex items-center">
                    <Calendar className="w-3 h-3 mr-1" /> IIT Bombay (Remote)
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[var(--color-bg-card-dark)] rounded-xl border border-[var(--color-border-dark)] shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-[var(--color-text-light)]">Active Collaborations</h3>
            <Link to="/academician/collaboration" className="text-[var(--color-accent)] text-sm hover:underline flex items-center">
              View All <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="flex gap-4 p-4 rounded-lg bg-[var(--color-bg-secondary)] border border-[var(--color-border-dark)] items-center">
                <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400">
                  <LinkIcon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-[var(--color-text-light)]">Industry Project with TechCorp</h4>
                  <p className="text-sm text-[var(--color-text-secondary)] mt-1">In Progress • 3 Participants</p>
                </div>
                <span className="px-2.5 py-1 text-xs rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
                  Active
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default AcademicianDashboard;
