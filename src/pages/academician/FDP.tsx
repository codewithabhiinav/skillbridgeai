import React from 'react';
import { useData } from '../../context/DataContext';
import { MapPin, Calendar, Clock, BookOpen } from 'lucide-react';

export const AcademicianFDP: React.FC = () => {
  const { academicianOpportunities } = useData();
  const fdpOpps = academicianOpportunities.filter(o => o.type === 'fdp');

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[var(--color-text-light)]">Faculty Development Programs</h1>
        <p className="text-[var(--color-text-secondary)]">Enhance your skills with industry-led FDPs</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {fdpOpps.map(opp => (
          <div key={opp.id} className="bg-[var(--color-bg-card-dark)] p-6 rounded-xl border border-[var(--color-border-dark)] shadow-sm hover:border-[var(--color-accent-purple)] transition-all flex flex-col h-full">
            <div className="w-12 h-12 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center mb-4">
              <BookOpen className="w-6 h-6" />
            </div>
            
            <h3 className="font-bold text-lg text-[var(--color-text-light)] mb-1 leading-tight">{opp.title}</h3>
            <p className="text-[var(--color-accent)] text-sm font-medium mb-4">{opp.organization}</p>
            
            <p className="text-[var(--color-text-secondary)] text-sm mb-4 line-clamp-2 flex-grow">
              {opp.description}
            </p>

            <div className="space-y-2 mb-6 border-t border-[var(--color-border-dark)] pt-4">
              <div className="flex items-center text-sm text-[var(--color-text-secondary)]">
                <MapPin className="w-4 h-4 mr-2" /> {opp.location} ({opp.workMode})
              </div>
              <div className="flex items-center text-sm text-[var(--color-text-secondary)]">
                <Clock className="w-4 h-4 mr-2" /> {opp.duration}
              </div>
              <div className="flex items-center text-sm text-[var(--color-text-secondary)]">
                <Calendar className="w-4 h-4 mr-2" /> Apply by: {new Date(opp.deadline).toLocaleDateString()}
              </div>
            </div>

            <button className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors mt-auto">
              Register for FDP
            </button>
          </div>
        ))}
        {fdpOpps.length === 0 && (
          <div className="col-span-full py-12 text-center text-[var(--color-text-secondary)]">
            No active FDPs found.
          </div>
        )}
      </div>
    </div>
  );
};
export default AcademicianFDP;
