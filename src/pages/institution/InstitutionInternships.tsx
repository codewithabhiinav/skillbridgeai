import React from 'react';
import { useData } from '../../context/DataContext';
import { MapPin, Calendar, Users } from 'lucide-react';

export const InstitutionInternships: React.FC = () => {
  const { opportunities } = useData();
  const internships = opportunities.filter(o => o.type === 'internship');

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[var(--color-text-light)]">Internship Opportunities</h1>
        <p className="text-[var(--color-text-secondary)]">Track available internships for your students</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {internships.map(internship => (
          <div key={internship.id} className="bg-[var(--color-bg-card-dark)] border border-[var(--color-border-dark)] rounded-xl p-5 hover:border-[var(--color-accent)] transition-colors">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold text-lg text-[var(--color-text-light)]">{internship.title}</h3>
                <p className="text-[var(--color-accent)] font-medium text-sm">{internship.companyName}</p>
              </div>
              <span className="px-2.5 py-1 text-xs rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                {internship.workMode}
              </span>
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm text-[var(--color-text-secondary)]">
                <MapPin className="w-4 h-4 mr-2" /> {internship.location}
              </div>
              <div className="flex items-center text-sm text-[var(--color-text-secondary)]">
                <Calendar className="w-4 h-4 mr-2" /> {internship.duration || 'Flexible'}
              </div>
              <div className="flex items-center text-sm text-[var(--color-text-secondary)]">
                <Users className="w-4 h-4 mr-2" /> {internship.applicants} Applicants
              </div>
            </div>

            <div className="mb-4 flex flex-wrap gap-2">
              {internship.requiredSkills.slice(0, 3).map(skill => (
                <span key={skill.skillName} className="px-2 py-1 bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)] text-xs rounded-md">
                  {skill.skillName}
                </span>
              ))}
              {internship.requiredSkills.length > 3 && (
                <span className="px-2 py-1 bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)] text-xs rounded-md">
                  +{internship.requiredSkills.length - 3}
                </span>
              )}
            </div>

            <button className="w-full py-2 bg-[var(--color-bg-secondary)] hover:bg-[var(--color-border-dark)] text-[var(--color-text-light)] rounded-lg font-medium transition-colors border border-[var(--color-border-dark)]">
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
export default InstitutionInternships;
