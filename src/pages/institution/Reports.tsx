import React from 'react';
import { Download, FileText, PieChart, TrendingUp, Users } from 'lucide-react';

export const InstitutionReports: React.FC = () => {
  const reports = [
    { title: 'Annual Placement Report 2024', date: 'August 15, 2024', type: 'Placement', icon: TrendingUp, color: 'text-purple-500' },
    { title: 'Skill Gap Analysis Q3', date: 'July 1, 2024', type: 'Analytics', icon: PieChart, color: 'text-cyan-500' },
    { title: 'Industry Collaboration Summary', date: 'June 30, 2024', type: 'Industry', icon: Users, color: 'text-blue-500' },
    { title: 'Student Readiness Index', date: 'June 15, 2024', type: 'Academic', icon: FileText, color: 'text-green-500' }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-text-light)]">Reports & Exports</h1>
          <p className="text-[var(--color-text-secondary)]">Generate and download comprehensive institutional reports</p>
        </div>
        <button className="flex items-center px-4 py-2 bg-[var(--color-accent)] hover:bg-cyan-600 text-white rounded-lg font-medium transition-colors shadow-sm">
          <Download className="w-4 h-4 mr-2" />
          Generate New Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {reports.map((report, i) => (
          <div key={i} className="bg-[var(--color-bg-card-dark)] p-5 rounded-xl border border-[var(--color-border-dark)] shadow-sm hover:border-[var(--color-accent)] transition-colors group cursor-pointer">
            <div className="w-12 h-12 rounded-lg bg-[var(--color-bg-secondary)] flex items-center justify-center mb-4">
              <report.icon className={`w-6 h-6 ${report.color}`} />
            </div>
            <h3 className="font-semibold text-lg text-[var(--color-text-light)] mb-1">{report.title}</h3>
            <p className="text-sm text-[var(--color-text-secondary)] mb-4">{report.date} • {report.type}</p>
            <button className="w-full flex items-center justify-center py-2 bg-[var(--color-bg-secondary)] text-[var(--color-text-light)] rounded-lg font-medium transition-colors border border-[var(--color-border-dark)] group-hover:bg-[var(--color-border-dark)]">
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
export default InstitutionReports;
