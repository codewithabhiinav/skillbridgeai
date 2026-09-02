import { useData } from '../../context/DataContext';
import { getRecommendedOpportunities } from '../../engine';
import { useStudent } from '../../hooks/useStudent';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Trophy, Briefcase, FileBadge, ArrowRight, Activity } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { opportunities, applications } = useData();
  const navigate = useNavigate();
  const student = useStudent();

  const topSkills = [...student.skills]
    .sort((a, b) => b.proficiency - a.proficiency)
    .slice(0, 5);

  const strongSkills = student.skills.filter(s => s.proficiency >= 70);
  const skillGaps = student.skills.filter(s => s.proficiency < 50);

  const studentApplications = applications.filter(a => a.studentId === student.id);
  const recentApplications = [...studentApplications]
    .sort((a, b) => new Date(b.appliedAt).getTime() - new Date(a.appliedAt).getTime())
    .slice(0, 3);

  const recommendedOppList = getRecommendedOpportunities(student, opportunities).slice(0, 3);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Welcome back, {student.name}! 👋</h1>
          <p className="text-slate-500 mt-1">Here's your skill readiness overview.</p>
        </div>
        <button onClick={() => navigate('/student/assessment')} className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2">
          <Activity size={18} />
          Take Assessment
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col justify-center items-center">
          <div className="relative w-24 h-24 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-100 dark:text-slate-700" />
              <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="8" fill="transparent"
                strokeDasharray={`${student.skillReadinessScore * 2.51} 251`}
                className="text-cyan-500 transition-all duration-1000 ease-out" />
            </svg>
            <span className="absolute text-2xl font-bold dark:text-white">{student.skillReadinessScore}</span>
          </div>
          <span className="text-sm text-slate-500 mt-2 font-medium">Readiness Score</span>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg">
              <Trophy size={24} />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">Skills Assessed</p>
              <h3 className="text-2xl font-bold dark:text-white">{student.skills.length}</h3>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg">
              <Briefcase size={24} />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">Applications</p>
              <h3 className="text-2xl font-bold dark:text-white">{studentApplications.length}</h3>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg">
              <FileBadge size={24} />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">Certifications</p>
              <h3 className="text-2xl font-bold dark:text-white">{student.certificates?.length || 0}</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold dark:text-white">Top Skills</h2>
            <Link to="/student/skills" className="text-sm text-cyan-500 hover:text-cyan-600 flex items-center gap-1">View all <ArrowRight size={14} /></Link>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topSkills} layout="vertical" margin={{ top: 0, right: 0, left: 40, bottom: 0 }}>
                <XAxis type="number" hide />
                <YAxis dataKey="skillName" type="category" axisLine={false} tickLine={false} className="text-xs font-medium dark:text-slate-300" width={80} />
                <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }} />
                <Bar dataKey="proficiency" radius={[0, 4, 4, 0]} barSize={20}>
                  {topSkills.map((_, index) => (
                    <Cell key={`cell-${index}`} fill="var(--color-accent)" />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-lg">
              <h3 className="text-sm font-semibold text-green-600 dark:text-green-400 mb-2">Strong Skills (≥70%)</h3>
              <div className="flex flex-wrap gap-2">
                {strongSkills.map(s => (
                  <span key={s.skillName} className="text-xs px-2 py-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 rounded-md border border-green-200 dark:border-green-800">{s.skillName}</span>
                ))}
              </div>
            </div>
            <div className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-lg">
              <h3 className="text-sm font-semibold text-amber-600 dark:text-amber-400 mb-2">Needs Work (&lt;50%)</h3>
              <div className="flex flex-wrap gap-2">
                {skillGaps.map(s => (
                  <span key={s.skillName} className="text-xs px-2 py-1 bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300 rounded-md border border-amber-200 dark:border-amber-800">{s.skillName}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold dark:text-white">Recommended For You</h2>
              <Link to="/student/opportunities" className="text-sm text-cyan-500 hover:text-cyan-600 flex items-center gap-1">Browse all <ArrowRight size={14} /></Link>
            </div>
            <div className="space-y-4">
              {recommendedOppList.map(({ opportunity, matchDetails }) => (
                <div key={opportunity.id} className="flex justify-between items-center p-4 rounded-lg border border-slate-100 dark:border-slate-700 hover:border-cyan-200 dark:hover:border-cyan-800 transition-colors cursor-pointer" onClick={() => navigate(`/student/opportunities/${opportunity.id}`)}>
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white">{opportunity.title}</h3>
                    <p className="text-sm text-slate-500">{opportunity.companyName}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="text-xs font-medium text-slate-500">Match</p>
                      <p className="font-bold text-cyan-600 dark:text-cyan-400">{matchDetails.overallScore}%</p>
                    </div>
                  </div>
                </div>
              ))}
              {recommendedOppList.length === 0 && <p className="text-sm text-slate-500">No recommendations right now.</p>}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold dark:text-white">Recent Applications</h2>
              <Link to="/student/applications" className="text-sm text-cyan-500 hover:text-cyan-600 flex items-center gap-1">View all <ArrowRight size={14} /></Link>
            </div>
            <div className="space-y-3">
              {recentApplications.map((app) => (
                <div key={app.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm text-slate-900 dark:text-white">{app.opportunityTitle}</p>
                    <p className="text-xs text-slate-500">{app.companyName}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full capitalize ${
                    app.status === 'applied' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' :
                    app.status === 'under-review' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300' :
                    app.status === 'shortlisted' || app.status === 'interview' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300' :
                    app.status === 'selected' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' :
                    'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                  }`}>
                    {app.status.replace('-', ' ')}
                  </span>
                </div>
              ))}
              {recentApplications.length === 0 && <p className="text-sm text-slate-500">No recent applications.</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
