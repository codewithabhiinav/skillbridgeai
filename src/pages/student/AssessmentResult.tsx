import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { CheckCircle, AlertCircle, ArrowRight, BarChart2 } from 'lucide-react';

export default function AssessmentResult() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { assessmentResults } = useData();

  const result = location.state?.result
    ?? assessmentResults.find(r => r.studentId === user?.id);

  if (!result) {
    return (
      <div className="p-8 text-center">
        <p>No result found. Please take an assessment first.</p>
        <button onClick={() => navigate('/student/assessment')} className="mt-4 text-cyan-500">
          Go to Assessment
        </button>
      </div>
    );
  }

  const { score, totalMarks, percentage, skillScores } = result;
  const sortedSkills = [...skillScores].sort((a, b) => b.percentage - a.percentage);

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Assessment Complete!</h1>
        <p className="text-slate-500 mt-2">Your skill profile has been updated based on these results.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="col-span-1 bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center text-center">
          <h2 className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-6">Overall Score</h2>
          <div className="relative w-40 h-40 flex items-center justify-center mb-4">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-100 dark:text-slate-700" />
              <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="8" fill="transparent"
                strokeDasharray={`${percentage * 2.827} 282.7`}
                className={`${percentage >= 70 ? 'text-green-500' : percentage >= 40 ? 'text-amber-500' : 'text-red-500'} transition-all duration-1000 ease-out`} />
            </svg>
            <div className="absolute text-center">
              <span className="text-4xl font-bold dark:text-white">{Math.round(percentage)}%</span>
            </div>
          </div>
          <p className="text-slate-500">{score} out of {totalMarks} points</p>

          <div className="mt-8 w-full space-y-3">
            <button onClick={() => navigate('/student/skills')} className="w-full py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-900 dark:text-white font-medium rounded-lg flex items-center justify-center gap-2 transition-colors">
              <BarChart2 size={18} /> View Detailed Profile
            </button>
            <button onClick={() => navigate('/student/learning')} className="w-full py-2 bg-purple-500 hover:bg-purple-600 text-white font-medium rounded-lg flex items-center justify-center gap-2 transition-colors">
              View Learning Plan
            </button>
            <button onClick={() => navigate('/student/opportunities')} className="w-full py-2 bg-cyan-500 hover:bg-cyan-600 text-white font-medium rounded-lg flex items-center justify-center gap-2 transition-colors">
              Explore Matches <ArrowRight size={18} />
            </button>
          </div>
        </div>

        <div className="col-span-1 md:col-span-2 bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Skill Breakdown</h2>

          <div className="space-y-6">
            {sortedSkills.map((skill) => (
              <div key={skill.skillName}>
                <div className="flex justify-between mb-2">
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{skill.skillName}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-bold dark:text-white">{Math.round(skill.percentage)}%</span>
                    {skill.percentage >= 70 ? <CheckCircle size={16} className="text-green-500" /> :
                     skill.percentage < 40 ? <AlertCircle size={16} className="text-red-500" /> : null}
                  </div>
                </div>
                <div className="h-3 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${
                    skill.percentage >= 70 ? 'bg-green-500' :
                    skill.percentage >= 40 ? 'bg-amber-500' : 'bg-red-500'
                  }`} style={{ width: `${skill.percentage}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
