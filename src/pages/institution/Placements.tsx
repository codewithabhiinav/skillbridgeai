import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, LineChart, Line
} from 'recharts';
import { Trophy, TrendingUp, IndianRupee, Target } from 'lucide-react';

export const InstitutionPlacements: React.FC = () => {
  const yoyTrend = [
    { year: '2020', rate: 65, avgPackage: 4.5 },
    { year: '2021', rate: 72, avgPackage: 5.2 },
    { year: '2022', rate: 78, avgPackage: 6.0 },
    { year: '2023', rate: 85, avgPackage: 7.5 },
    { year: '2024', rate: 92, avgPackage: 8.5 },
  ];

  const companyWise = [
    { name: 'TCS', hires: 45 },
    { name: 'Infosys', hires: 38 },
    { name: 'Wipro', hires: 30 },
    { name: 'Cognizant', hires: 25 },
    { name: 'Amazon', hires: 12 },
    { name: 'Microsoft', hires: 5 },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[var(--color-text-light)]">Placement Analytics</h1>
        <p className="text-[var(--color-text-secondary)]">Track and analyze campus placement performance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Overall Placement Rate', value: '92%', icon: Trophy, color: 'text-yellow-500' },
          { label: 'Highest Package', value: '₹42 LPA', icon: TrendingUp, color: 'text-green-500' },
          { label: 'Average Package', value: '₹8.5 LPA', icon: IndianRupee, color: 'text-blue-500' },
          { label: 'Top Recruiters', value: '45+', icon: Target, color: 'text-purple-500' }
        ].map((stat, i) => (
          <div key={i} className="bg-[var(--color-bg-card-dark)] p-4 rounded-xl border border-[var(--color-border-dark)] shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-[var(--color-text-secondary)]">{stat.label}</p>
                <p className="text-2xl font-semibold mt-1 text-[var(--color-text-light)]">{stat.value}</p>
              </div>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[var(--color-bg-card-dark)] p-5 rounded-xl border border-[var(--color-border-dark)] shadow-sm">
          <h3 className="text-lg font-semibold mb-4 text-[var(--color-text-light)]">Year-over-Year Trend</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={yoyTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="year" stroke="#94a3b8" />
                <YAxis yAxisId="left" stroke="#94a3b8" />
                <YAxis yAxisId="right" orientation="right" stroke="#94a3b8" />
                <RechartsTooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155' }} />
                <Line yAxisId="left" type="monotone" dataKey="rate" name="Placement %" stroke="var(--color-accent-green)" strokeWidth={3} />
                <Line yAxisId="right" type="monotone" dataKey="avgPackage" name="Avg LPA" stroke="var(--color-accent-blue)" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-[var(--color-bg-card-dark)] p-5 rounded-xl border border-[var(--color-border-dark)] shadow-sm">
          <h3 className="text-lg font-semibold mb-4 text-[var(--color-text-light)]">Top Recruiters</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={companyWise} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis type="number" stroke="#94a3b8" />
                <YAxis dataKey="name" type="category" stroke="#94a3b8" width={80} />
                <RechartsTooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155' }} />
                <Bar dataKey="hires" name="Students Hired" fill="var(--color-accent)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
export default InstitutionPlacements;
