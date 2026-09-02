import React, { useMemo } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import type { Institution } from '../../types';
import { 
  Users, TrendingUp, Briefcase, Building2,
  CheckCircle2, Clock
} from 'lucide-react';
import {
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer, LineChart, Line
} from 'recharts';
import { computeTopSkillGaps, computePlacementTrend } from '../../utils/analytics';

export const InstitutionDashboard: React.FC = () => {
  const { user } = useAuth();
  const { students, applications, opportunities, companies } = useData();
  const institution = user as Institution;

  const stats = useMemo(() => {
    const totalStudents = students.length;
    const avgReadiness = Math.round(students.reduce((acc, s) => acc + s.skillReadinessScore, 0) / (totalStudents || 1));
    const activeInternships = opportunities.filter(o => o.type === 'internship' && o.status === 'active').length;
    const totalApplications = applications.length;
    const placements = applications.filter(a => a.status === 'selected').length;
    const industryPartners = companies.length;

    return { totalStudents, avgReadiness, activeInternships, totalApplications, placements, industryPartners };
  }, [students, applications, opportunities, companies]);

  const readinessData = useMemo(() => {
    let ready = 0, developing = 0, needsSupport = 0;
    students.forEach(s => {
      if (s.skillReadinessScore >= 75) ready++;
      else if (s.skillReadinessScore >= 50) developing++;
      else needsSupport++;
    });
    return [
      { name: 'Ready (>75%)', value: ready, color: 'var(--color-accent-green)' },
      { name: 'Developing (50-75%)', value: developing, color: 'var(--color-accent-amber)' },
      { name: 'Needs Support (<50%)', value: needsSupport, color: 'var(--color-accent-red)' }
    ];
  }, [students]);

  const deptData = useMemo(() => {
    const depts = Array.from(new Set(students.map(s => s.department)));
    return depts.map(dept => {
      const deptStudents = students.filter(s => s.department === dept);
      const avgScore = Math.round(deptStudents.reduce((acc, s) => acc + s.skillReadinessScore, 0) / deptStudents.length);
      return { department: dept, readiness: avgScore };
    });
  }, [students]);

  const skillGaps = useMemo(
    () => computeTopSkillGaps(students, opportunities),
    [students, opportunities]
  );

  const placementTrend = useMemo(
    () => computePlacementTrend(applications),
    [applications]
  );

  return (
    <div className="institution-dashboard p-6 space-y-6 text-[var(--color-text-primary)]">
      <div>
        <h1 className="text-2xl font-bold text-[var(--color-text-light)]">Welcome, {institution?.institutionName || 'Institution'}</h1>
        <p className="text-[var(--color-text-secondary)]">Here is your campus skill readiness & placement overview.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {[
          { label: 'Total Students', value: stats.totalStudents, icon: Users, color: 'text-blue-500' },
          { label: 'Avg Skill Readiness', value: `${stats.avgReadiness}%`, icon: TrendingUp, color: 'text-green-500' },
          { label: 'Active Internships', value: stats.activeInternships, icon: Briefcase, color: 'text-cyan-500' },
          { label: 'Applications', value: stats.totalApplications, icon: Clock, color: 'text-amber-500' },
          { label: 'Placements', value: stats.placements, icon: CheckCircle2, color: 'text-purple-500' },
          { label: 'Industry Partners', value: stats.industryPartners, icon: Building2, color: 'text-pink-500' }
        ].map((stat, i) => (
          <div key={i} className="bg-[var(--color-bg-card-dark)] p-4 rounded-xl border border-[var(--color-border-dark)] shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-[var(--color-text-secondary)]">{stat.label}</p>
                <p className="text-2xl font-semibold mt-1 text-[var(--color-text-light)]">{stat.value}</p>
              </div>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-[var(--color-bg-card-dark)] p-5 rounded-xl border border-[var(--color-border-dark)] shadow-sm col-span-1">
          <h3 className="text-lg font-semibold mb-4 text-[var(--color-text-light)]">Student Readiness</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={readinessData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {readinessData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-[var(--color-bg-card-dark)] p-5 rounded-xl border border-[var(--color-border-dark)] shadow-sm col-span-2">
          <h3 className="text-lg font-semibold mb-4 text-[var(--color-text-light)]">Department-wise Readiness</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deptData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="department" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <RechartsTooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155' }} />
                <Bar dataKey="readiness" fill="var(--color-accent)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[var(--color-bg-card-dark)] p-5 rounded-xl border border-[var(--color-border-dark)] shadow-sm">
          <h3 className="text-lg font-semibold mb-4 text-[var(--color-text-light)]">Top Skill Gaps</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={skillGaps} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis type="number" stroke="#94a3b8" />
                <YAxis dataKey="skill" type="category" stroke="#94a3b8" width={100} />
                <RechartsTooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155' }} />
                <Bar dataKey="gap" fill="var(--color-accent-amber)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-[var(--color-bg-card-dark)] p-5 rounded-xl border border-[var(--color-border-dark)] shadow-sm">
          <h3 className="text-lg font-semibold mb-4 text-[var(--color-text-light)]">Placement Trend</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={placementTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <RechartsTooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155' }} />
                <Line type="monotone" dataKey="placements" stroke="var(--color-accent-purple)" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
export default InstitutionDashboard;
