import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Link as LinkIcon, Users, Calendar, Filter } from 'lucide-react';

export const AcademicianCollaboration: React.FC = () => {
  const { collaborations } = useData();
  const [filter, setFilter] = useState('all');

  const filteredCollabs = filter === 'all' 
    ? collaborations 
    : collaborations.filter(c => c.type === filter);

  const types = Array.from(new Set(collaborations.map(c => c.type)));

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-text-light)]">Collaboration Hub</h1>
          <p className="text-[var(--color-text-secondary)]">Manage your active network and joint initiatives</p>
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-[var(--color-text-secondary)]" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-[var(--color-bg-secondary)] border border-[var(--color-border-dark)] rounded-lg px-4 py-2 text-[var(--color-text-light)] focus:outline-none focus:border-[var(--color-accent)] capitalize"
          >
            <option value="all">All Collaborations</option>
            {types.map(t => (
              <option key={t} value={t}>{t.replace('-', ' ')}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredCollabs.map(collab => (
          <div key={collab.id} className="bg-[var(--color-bg-card-dark)] p-6 rounded-xl border border-[var(--color-border-dark)] shadow-sm hover:border-[var(--color-accent)] transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400">
                  <LinkIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-[var(--color-text-light)]">{collab.title}</h3>
                  <p className="text-sm text-[var(--color-text-secondary)] capitalize">{collab.type.replace('-', ' ')}</p>
                </div>
              </div>
              <span className={`px-2.5 py-1 text-xs rounded-full border font-medium ${
                collab.status === 'open' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 
                collab.status === 'in-progress' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 
                'bg-gray-500/10 text-gray-400 border-gray-500/20'
              }`}>
                {collab.status.replace('-', ' ')}
              </span>
            </div>
            
            <p className="text-[var(--color-text-secondary)] text-sm mb-6 line-clamp-2">
              {collab.description}
            </p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-[var(--color-bg-secondary)] p-3 rounded-lg border border-[var(--color-border-dark)]">
                <p className="text-xs text-[var(--color-text-secondary)] mb-1">Initiator</p>
                <p className="text-sm font-medium text-[var(--color-text-light)]">{collab.initiator}</p>
              </div>
              <div className="bg-[var(--color-bg-secondary)] p-3 rounded-lg border border-[var(--color-border-dark)]">
                <p className="text-xs text-[var(--color-text-secondary)] mb-1">Target</p>
                <p className="text-sm font-medium text-[var(--color-text-light)]">{collab.target}</p>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-[var(--color-border-dark)] pt-4">
              <div className="flex items-center text-sm text-[var(--color-text-secondary)]">
                <Users className="w-4 h-4 mr-1.5" /> {collab.participants} Participants
              </div>
              <div className="flex items-center text-sm text-[var(--color-text-secondary)]">
                <Calendar className="w-4 h-4 mr-1.5" /> {collab.duration}
              </div>
              <button className="text-[var(--color-accent)] hover:text-cyan-400 text-sm font-medium">
                View Workspace
              </button>
            </div>
          </div>
        ))}
        {filteredCollabs.length === 0 && (
          <div className="col-span-full py-12 text-center text-[var(--color-text-secondary)]">
            No collaborations found.
          </div>
        )}
      </div>
    </div>
  );
};
export default AcademicianCollaboration;
