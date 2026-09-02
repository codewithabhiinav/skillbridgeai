import React from 'react';
import { useData } from '../../context/DataContext';
import { Building2, Globe, MapPin, Users } from 'lucide-react';

export const InstitutionIndustry: React.FC = () => {
  const { companies } = useData();

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[var(--color-text-light)]">Industry Partners</h1>
        <p className="text-[var(--color-text-secondary)]">Manage relationships with top companies</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {companies.map(company => (
          <div key={company.id} className="bg-[var(--color-bg-card-dark)] p-6 rounded-xl border border-[var(--color-border-dark)] shadow-sm hover:border-[var(--color-accent)] transition-all">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-lg bg-[var(--color-bg-secondary)] flex items-center justify-center flex-shrink-0">
                {company.logo ? (
                  <img src={company.logo} alt={company.name} className="w-8 h-8 object-contain" />
                ) : (
                  <Building2 className="w-6 h-6 text-[var(--color-text-secondary)]" />
                )}
              </div>
              <div>
                <h3 className="font-semibold text-lg text-[var(--color-text-light)]">{company.name}</h3>
                <p className="text-[var(--color-accent)] text-sm">{company.industry}</p>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center text-sm text-[var(--color-text-secondary)]">
                <MapPin className="w-4 h-4 mr-2" /> {company.location}
              </div>
              <div className="flex items-center text-sm text-[var(--color-text-secondary)]">
                <Globe className="w-4 h-4 mr-2" /> {company.website || 'N/A'}
              </div>
              <div className="flex items-center text-sm text-[var(--color-text-secondary)]">
                <Users className="w-4 h-4 mr-2" /> {company.size} Employees
              </div>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 py-2 bg-[var(--color-accent)] hover:bg-cyan-600 text-white rounded-lg font-medium transition-colors">
                View Opportunities
              </button>
              <button className="px-4 py-2 bg-[var(--color-bg-secondary)] hover:bg-[var(--color-border-dark)] text-[var(--color-text-light)] rounded-lg font-medium transition-colors border border-[var(--color-border-dark)]">
                Contact
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default InstitutionIndustry;
