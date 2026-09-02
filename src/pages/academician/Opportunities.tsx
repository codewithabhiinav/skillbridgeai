import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { MapPin, Calendar, Clock, Filter, Briefcase } from 'lucide-react';

export const AcademicianOpportunities: React.FC = () => {
  const { academicianOpportunities } = useData();
  const [filterType, setFilterType] = useState<string>('all');

  const filteredOpps = filterType === 'all' 
    ? academicianOpportunities 
    : academicianOpportunities.filter(o => o.type === filterType);

  const types = Array.from(new Set(academicianOpportunities.map(o => o.type)));

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-text-light)]">Academic Opportunities</h1>
          <p className="text-[var(--color-text-secondary)]">Discover FDPs, research grants, and industry projects</p>
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-[var(--color-text-secondary)]" />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="bg-[var(--color-bg-secondary)] border border-[var(--color-border-dark)] rounded-lg px-4 py-2 text-[var(--color-text-light)] focus:outline-none focus:border-[var(--color-accent)] capitalize"
          >
            <option value="all">All Types</option>
            {types.map(t => (
              <option key={t} value={t}>{t.replace('-', ' ')}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredOpps.map(opp => (
          <div key={opp.id} className="bg-[var(--color-bg-card-dark)] p-6 rounded-xl border border-[var(--color-border-dark)] shadow-sm hover:border-[var(--color-accent)] transition-all flex flex-col h-full">
            <div className="flex justify-between items-start mb-4">
              <span className="px-3 py-1 text-xs rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 capitalize font-medium">
                {opp.type.replace('-', ' ')}
              </span>
              <span className={`px-2 py-1 text-xs rounded-md border ${opp.workMode === 'remote' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'}`}>
                {opp.workMode}
              </span>
            </div>
            
            <h3 className="font-bold text-lg text-[var(--color-text-light)] mb-1 leading-tight">{opp.title}</h3>
            <p className="text-[var(--color-accent)] text-sm font-medium mb-4 flex items-center">
              <Briefcase className="w-4 h-4 mr-1.5" /> {opp.organization}
            </p>
            
            <p className="text-[var(--color-text-secondary)] text-sm mb-4 line-clamp-2 flex-grow">
              {opp.description}
            </p>

            <div className="space-y-2 mb-6 border-t border-[var(--color-border-dark)] pt-4">
              <div className="flex items-center text-sm text-[var(--color-text-secondary)]">
                <MapPin className="w-4 h-4 mr-2" /> {opp.location}
              </div>
              <div className="flex items-center text-sm text-[var(--color-text-secondary)]">
                <Clock className="w-4 h-4 mr-2" /> {opp.duration}
              </div>
              <div className="flex items-center text-sm text-amber-400">
                <Calendar className="w-4 h-4 mr-2" /> Deadline: {new Date(opp.deadline).toLocaleDateString()}
              </div>
            </div>

            <button className="w-full py-2 bg-[var(--color-accent)] hover:bg-cyan-600 text-white rounded-lg font-medium transition-colors mt-auto">
              Apply / Register
            </button>
          </div>
        ))}
        
        {filteredOpps.length === 0 && (
          <div className="col-span-full py-12 text-center text-[var(--color-text-secondary)]">
            No opportunities found for the selected type.
          </div>
        )}
      </div>
    </div>
  );
};
export default AcademicianOpportunities;
