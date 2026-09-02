import React from 'react';
import { useData } from '../../context/DataContext';
import { Lightbulb, MapPin, Calendar } from 'lucide-react';

export const AcademicianResearch: React.FC = () => {
  const { academicianOpportunities } = useData();
  const researchOpps = academicianOpportunities.filter(o => o.type === 'research');

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[var(--color-text-light)]">Research Collaborations</h1>
        <p className="text-[var(--color-text-secondary)]">Partner with industry on cutting-edge research</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {researchOpps.map(opp => (
          <div key={opp.id} className="bg-[var(--color-bg-card-dark)] p-6 rounded-xl border border-[var(--color-border-dark)] shadow-sm hover:border-[var(--color-accent-amber)] transition-all">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center flex-shrink-0">
                <Lightbulb className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-xl text-[var(--color-text-light)] mb-1">{opp.title}</h3>
                <p className="text-[var(--color-accent)] font-medium">{opp.organization}</p>
              </div>
            </div>
            
            <p className="text-[var(--color-text-secondary)] mb-6">
              {opp.description}
            </p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-[var(--color-bg-secondary)] p-3 rounded-lg border border-[var(--color-border-dark)]">
                <p className="text-xs text-[var(--color-text-secondary)] mb-1 flex items-center"><MapPin className="w-3 h-3 mr-1" /> Location</p>
                <p className="text-sm font-medium text-[var(--color-text-light)] capitalize">{opp.location} ({opp.workMode})</p>
              </div>
              <div className="bg-[var(--color-bg-secondary)] p-3 rounded-lg border border-[var(--color-border-dark)]">
                <p className="text-xs text-[var(--color-text-secondary)] mb-1 flex items-center"><Calendar className="w-3 h-3 mr-1" /> Duration</p>
                <p className="text-sm font-medium text-[var(--color-text-light)]">{opp.duration}</p>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-sm font-semibold text-[var(--color-text-light)] mb-2">Required Expertise:</h4>
              <div className="flex flex-wrap gap-2">
                {opp.skills.map(skill => (
                  <span key={skill} className="px-2.5 py-1 bg-[var(--color-bg-secondary)] border border-[var(--color-border-dark)] text-[var(--color-text-secondary)] text-xs rounded-md">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <button className="w-full py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-medium transition-colors">
              Express Interest
            </button>
          </div>
        ))}
        {researchOpps.length === 0 && (
          <div className="col-span-full py-12 text-center text-[var(--color-text-secondary)]">
            No active research opportunities found.
          </div>
        )}
      </div>
    </div>
  );
};
export default AcademicianResearch;
