import { useMemo } from 'react';
import { useData } from '../../context/DataContext';
import {
  computeCategoryRadar,
  computeDemandSupply,
  computeDepartmentHeatmap,
  SKILL_CATEGORIES,
} from '../../utils/analytics';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';

export default function InstitutionSkillAnalytics() {
  const { students, opportunities } = useData();

  const radarData = useMemo(
    () => computeCategoryRadar(students, opportunities).map(d => ({
      subject: d.subject,
      A: d.studentAvg,
      B: d.industryRequired,
    })),
    [students, opportunities]
  );

  const demandData = useMemo(
    () => computeDemandSupply(students, opportunities),
    [students, opportunities]
  );

  const heatmapData = useMemo(() => computeDepartmentHeatmap(students), [students]);
  const categories = Object.keys(SKILL_CATEGORIES);

  const heatColor = (pct: number) => {
    if (pct >= 70) return 'bg-emerald-500/80';
    if (pct >= 50) return 'bg-amber-500/80';
    return 'bg-red-500/80';
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[var(--color-text-light)]">Skill Analytics</h1>
        <p className="text-[var(--color-text-secondary)]">Live view of student capabilities vs industry needs</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[var(--color-bg-card-dark)] p-5 rounded-xl border border-[var(--color-border-dark)] shadow-sm">
          <h3 className="text-lg font-semibold mb-4 text-[var(--color-text-light)]">Overall Skill Distribution</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid stroke="#334155" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#334155" />
                <Radar name="Student Avg" dataKey="A" stroke="var(--color-accent)" fill="var(--color-accent)" fillOpacity={0.4} />
                <Radar name="Industry Required" dataKey="B" stroke="var(--color-accent-purple)" fill="var(--color-accent-purple)" fillOpacity={0.4} />
                <Legend />
                <RechartsTooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-[var(--color-bg-card-dark)] p-5 rounded-xl border border-[var(--color-border-dark)] shadow-sm">
          <h3 className="text-lg font-semibold mb-4 text-[var(--color-text-light)]">Demand vs Supply (Top Skills)</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={demandData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" domain={[0, 100]} />
                <RechartsTooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155' }} />
                <Legend />
                <Bar dataKey="demand" name="Industry Demand" fill="var(--color-accent-purple)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="supply" name="Student Supply" fill="var(--color-accent)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-[var(--color-bg-card-dark)] p-5 rounded-xl border border-[var(--color-border-dark)] shadow-sm">
        <h3 className="text-lg font-semibold mb-4 text-[var(--color-text-light)]">Department Skill Heatmap</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-[var(--color-text-light)]">
            <thead>
              <tr className="border-b border-[var(--color-border-dark)]">
                <th className="py-3 px-4">Department</th>
                {categories.map(cat => (
                  <th key={cat} className="py-3 px-4 text-center">{cat}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {heatmapData.map(row => (
                <tr key={String(row.department)} className="border-b border-[var(--color-border-dark)] last:border-0">
                  <td className="py-3 px-4 font-medium">{row.department}</td>
                  {categories.map(cat => {
                    const pct = Number(row[cat] ?? 0);
                    return (
                      <td key={cat} className="py-3 px-4">
                        <div className={`w-full h-8 ${heatColor(pct)} rounded flex items-center justify-center text-xs font-bold text-white`}>
                          {pct}%
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
