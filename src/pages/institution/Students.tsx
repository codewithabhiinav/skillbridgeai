import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Search, Filter, ChevronRight } from 'lucide-react';

export const InstitutionStudents: React.FC = () => {
  const { students } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [deptFilter, setDeptFilter] = useState('');

  const filteredStudents = students.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = deptFilter ? s.department === deptFilter : true;
    return matchesSearch && matchesDept;
  });

  const departments = Array.from(new Set(students.map(s => s.department)));

  const getScoreColor = (score: number) => {
    if (score >= 75) return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';
    if (score >= 50) return 'text-amber-400 bg-amber-400/10 border-amber-400/20';
    return 'text-red-400 bg-red-400/10 border-red-400/20';
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-text-light)]">Student Directory</h1>
          <p className="text-[var(--color-text-secondary)]">Manage and monitor student readiness</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)] w-5 h-5" />
          <input
            type="text"
            placeholder="Search students..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[var(--color-bg-secondary)] border border-[var(--color-border-dark)] rounded-lg pl-10 pr-4 py-2 text-[var(--color-text-light)] focus:outline-none focus:border-[var(--color-accent)]"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-[var(--color-text-secondary)]" />
          <select
            value={deptFilter}
            onChange={(e) => setDeptFilter(e.target.value)}
            className="bg-[var(--color-bg-secondary)] border border-[var(--color-border-dark)] rounded-lg px-4 py-2 text-[var(--color-text-light)] focus:outline-none focus:border-[var(--color-accent)]"
          >
            <option value="">All Departments</option>
            {departments.map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-[var(--color-bg-card-dark)] rounded-xl border border-[var(--color-border-dark)] overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)] text-sm">
              <tr>
                <th className="px-6 py-4 font-medium">Name</th>
                <th className="px-6 py-4 font-medium">Department</th>
                <th className="px-6 py-4 font-medium">Year</th>
                <th className="px-6 py-4 font-medium">CGPA</th>
                <th className="px-6 py-4 font-medium">Readiness Score</th>
                <th className="px-6 py-4 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border-dark)] text-[var(--color-text-light)]">
              {filteredStudents.map(student => (
                <tr key={student.id} className="hover:bg-[var(--color-bg-secondary)]/50 transition-colors">
                  <td className="px-6 py-4 font-medium">{student.name}</td>
                  <td className="px-6 py-4">{student.department}</td>
                  <td className="px-6 py-4">{student.year}</td>
                  <td className="px-6 py-4">{student.cgpa.toFixed(1)}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs border ${getScoreColor(student.skillReadinessScore)}`}>
                      {student.skillReadinessScore}%
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-[var(--color-accent)] hover:text-cyan-400 inline-flex items-center">
                      View <ChevronRight className="w-4 h-4 ml-1" />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredStudents.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-[var(--color-text-secondary)]">
                    No students found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default InstitutionStudents;
