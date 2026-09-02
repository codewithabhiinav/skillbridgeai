import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { useStudent } from '../../hooks/useStudent';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';
import { CheckCircle2, AlertTriangle, XCircle, BookOpen } from 'lucide-react';
import { analyzeSkillGap } from '../../engine';

export default function MySkills() {
  const student = useStudent();
  const { opportunities } = useData();
  const navigate = useNavigate();

  const [targetOppId, setTargetOppId] = useState<string>('');

  const targetRoles = useMemo(() =>
    opportunities.map(o => ({ id: o.id, title: `${o.title} — ${o.companyName}`, skills: o.requiredSkills })),
  [opportunities]);

  const radarData = student.skills.map(s => ({
    subject: s.skillName,
    A: s.proficiency,
    fullMark: 100,
  }));

  const selectedTarget = targetRoles.find(r => r.id === targetOppId);
  const gapAnalysis = selectedTarget ? analyzeSkillGap(student.skills, selectedTarget.skills) : null;

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Skill Profile</h1>
        <p className="text-slate-500 mt-1">Visualize your verified skills and identify areas for growth.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
          <h2 className="text-xl font-bold dark:text-white mb-6">Skill Map</h2>
          <div className="h-80 w-full flex justify-center items-center">
            {radarData.length > 2 ? (
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                  <PolarGrid stroke="var(--color-border)" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: 'var(--color-text-secondary)', fontSize: 12 }} />
                  <Radar name="Proficiency" dataKey="A" stroke="var(--color-accent)" fill="var(--color-accent)" fillOpacity={0.4} />
                  <RechartsTooltip />
                </RadarChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-slate-500">Complete the assessment to build your skill map.</p>
            )}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-y-auto max-h-[420px]">
          <h2 className="text-xl font-bold dark:text-white mb-6">Verified Skills</h2>
          <div className="space-y-5">
            {student.skills.map((skill) => (
              <div key={skill.skillName}>
                <div className="flex justify-between items-center mb-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{skill.skillName}</span>
                    {skill.verified && <CheckCircle2 size={14} className="text-green-500" />}
                  </div>
                  <span className="font-bold text-slate-600 dark:text-slate-400">{skill.proficiency}%</span>
                </div>
                <div className="h-2.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-500 rounded-full" style={{ width: `${skill.proficiency}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-slate-50 dark:bg-slate-800/50 p-8 rounded-2xl border border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold dark:text-white mb-2">Target Role Gap Analysis</h2>
        <p className="text-slate-500 mb-6">Select an opportunity to see how your current skills match up.</p>

        <div className="flex gap-4 mb-8">
          <select
            value={targetOppId}
            onChange={(e) => setTargetOppId(e.target.value)}
            className="flex-1 p-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-cyan-500 outline-none"
          >
            <option value="">-- Select Target Opportunity --</option>
            {targetRoles.map(role => (
              <option key={role.id} value={role.id}>{role.title}</option>
            ))}
          </select>
        </div>

        {gapAnalysis && (
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
            <h3 className="text-lg font-bold mb-4 dark:text-white">Analysis for {selectedTarget?.title}</h3>

            <div className="space-y-4">
              {gapAnalysis.map((gap) => (
                <div key={gap.skillName} className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-slate-50 dark:bg-slate-700/30 rounded-lg border border-slate-100 dark:border-slate-600">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      {gap.status === 'matched' ? <CheckCircle2 className="text-green-500" size={20} /> :
                       gap.status === 'partial' ? <AlertTriangle className="text-amber-500" size={20} /> :
                       <XCircle className="text-red-500" size={20} />}
                      <span className="font-bold text-slate-900 dark:text-white">{gap.skillName}</span>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{gap.recommendation}</p>
                  </div>

                  <div className="mt-4 md:mt-0 flex gap-6 items-center">
                    <div className="text-center">
                      <p className="text-xs text-slate-500">Current</p>
                      <p className="font-bold dark:text-white">{gap.current}%</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-slate-500">Required</p>
                      <p className="font-bold dark:text-white">{gap.required}%</p>
                    </div>
                    {gap.status !== 'matched' && (
                      <button
                        onClick={() => navigate('/student/learning')}
                        className="px-3 py-1.5 bg-cyan-100 text-cyan-700 hover:bg-cyan-200 dark:bg-cyan-900/40 dark:text-cyan-300 dark:hover:bg-cyan-900/60 rounded-lg text-sm font-medium flex items-center gap-1 transition-colors"
                      >
                        <BookOpen size={14} /> Learn
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
