import React from 'react';
import { useData } from '../../context/DataContext';
import { Briefcase, MapPin, Clock } from 'lucide-react';

export const AcademicianProjects: React.FC = () => {
  const { academicianOpportunities } = useData();
  const projectOpps = academicianOpportunities.filter(o => o.type === 'industry-project');

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[var(--color-text-light)]">Industry Projects</h1>
        <p className="text-[var(--color-text-secondary)]">Consulting and live industry projects for academicians</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {projectOpps.map(opp => (
          <div key={opp.id} className="bg-[var(--color-bg-card-dark)] p-6 rounded-xl border border-[var(--color-border-dark)] shadow-sm hover:border-[var(--color-accent-green)] transition-all">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-xl text-[var(--color-text-light)] mb-1">{opp.title}</h3>
                <p className="text-[var(--color-accent)] font-medium flex items-center">
                  <Briefcase className="w-4 h-4 mr-1.5" /> {opp.organization}
                </p>
              </div>
              {opp.compensation && (
                <span className="px-3 py-1 bg-green-500/10 text-green-400 border border-green-500/20 rounded-lg text-sm font-medium whitespace-nowrap ml-4">
                  {opp.compensation}
                </span>
              )}
            </div>
            
            <p className="text-[var(--color-text-secondary)] mb-6 text-sm leading-relaxed">
              {opp.description}
            </p>

            <div className="flex gap-4 mb-6">
              <span className="flex items-center text-sm text-[var(--color-text-secondary)]">
                <MapPin className="w-4 h-4 mr-1.5" /> {opp.location}
              </span>
              <span className="flex items-center text-sm text-[var(--color-text-secondary)]">
                <Clock className="w-4 h-4 mr-1.5" /> {opp.duration}
              </span>
            </div>

            <div className="mb-6">
               <div className="flex flex-wrap gap-2">
                {opp.skills.map(skill => (
                  <span key={skill} className="px-2.5 py-1 bg-[var(--color-bg-secondary)] border border-[var(--color-border-dark)] text-[var(--color-text-secondary)] text-xs rounded-md">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-3 mt-auto pt-4 border-t border-[var(--color-border-dark)]">
              <button className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors">
                Apply Now
              </button>
              <button className="px-4 py-2 bg-[var(--color-bg-secondary)] hover:bg-[var(--color-border-dark)] text-[var(--color-text-light)] rounded-lg font-medium transition-colors border border-[var(--color-border-dark)]">
                Save
              </button>
            </div>
          </div>
        ))}
        {projectOpps.length === 0 && (
          <div className="col-span-full py-12 text-center text-[var(--color-text-secondary)]">
            No active industry projects found.
          </div>
        )}
      </div>
    </div>
  );
};
export default AcademicianProjects;
