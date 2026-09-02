import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { useStudent } from '../../hooks/useStudent';
import { getRecommendedOpportunities, getLearningRecommendations } from '../../engine';
import { analyzeSkillGap } from '../../engine/skill-gap';
import { BookOpen, Video, FileText, Star, Clock, ExternalLink, Lightbulb } from 'lucide-react';

export default function Learning() {
  const student = useStudent();
  const { learningResources, opportunities } = useData();
  const navigate = useNavigate();

  const recommendations = useMemo(() => {
    const topMatch = getRecommendedOpportunities(student, opportunities)[0];
    if (!topMatch) return [];

    const gaps = analyzeSkillGap(student.skills, topMatch.opportunity.requiredSkills)
      .filter(g => g.status !== 'matched');

    return getLearningRecommendations(gaps, learningResources);
  }, [student, opportunities, learningResources]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'course': return <BookOpen size={16} />;
      case 'video': return <Video size={16} />;
      case 'article': return <FileText size={16} />;
      default: return <BookOpen size={16} />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Learning Hub</h1>
        <p className="text-slate-500 mt-1">
          Personalized course recommendations based on your skill gaps for top-matched opportunities.
        </p>
      </div>

      {recommendations.length === 0 ? (
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-12 text-center">
          <p className="text-slate-500 mb-4">No skill gaps detected for your top matches — great work!</p>
          <button
            onClick={() => navigate('/student/opportunities')}
            className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-2 rounded-lg font-medium"
          >
            Browse Opportunities
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          {recommendations.map((rec) => (
            <div key={rec.skillName} className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
              <div className={`p-4 border-b flex items-start gap-4 ${
                rec.priority === 'high' ? 'bg-red-50 dark:bg-red-900/10 border-red-100 dark:border-red-900/50' :
                rec.priority === 'medium' ? 'bg-amber-50 dark:bg-amber-900/10 border-amber-100 dark:border-amber-900/50' :
                'bg-blue-50 dark:bg-blue-900/10 border-blue-100 dark:border-blue-900/50'
              }`}>
                <div className={`p-2 rounded-lg mt-1 ${
                  rec.priority === 'high' ? 'bg-red-100 text-red-600 dark:bg-red-900/30' :
                  rec.priority === 'medium' ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/30' :
                  'bg-blue-100 text-blue-600 dark:bg-blue-900/30'
                }`}>
                  <Lightbulb size={24} />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">Focus Area: {rec.skillName}</h2>
                  <p className="text-slate-600 dark:text-slate-300 text-sm mt-1">{rec.reason}</p>
                  <div className="mt-2 inline-block px-2 py-1 rounded text-xs font-bold uppercase tracking-wider bg-white/60 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300">
                    Priority: {rec.priority}
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Recommended Resources</h3>
                {rec.resources.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {rec.resources.map(resource => (
                      <div key={resource.id} className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 hover:border-cyan-300 dark:hover:border-cyan-700 transition-colors flex flex-col h-full">
                        <div className="flex justify-between items-start mb-3">
                          <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-medium capitalize">
                            {getTypeIcon(resource.type)} {resource.type}
                          </span>
                          {resource.free && <span className="text-xs font-bold text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400 px-2 py-1 rounded">FREE</span>}
                        </div>

                        <h4 className="font-bold text-slate-900 dark:text-white mb-1 line-clamp-2">{resource.title}</h4>
                        <p className="text-sm text-slate-500 mb-4">{resource.provider}</p>

                        <div className="mt-auto flex items-center justify-between text-xs text-slate-500 font-medium pt-4 border-t border-slate-100 dark:border-slate-700">
                          <span className="flex items-center gap-1"><Clock size={14} /> {resource.duration}</span>
                          <span className="flex items-center gap-1 text-amber-500"><Star size={14} fill="currentColor" /> {resource.rating}</span>
                          <span className="capitalize">{resource.difficulty}</span>
                        </div>

                        <a href={resource.url} target="_blank" rel="noopener noreferrer" className="mt-4 w-full py-2 bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700 text-cyan-600 dark:text-cyan-400 font-medium rounded-lg flex items-center justify-center gap-2 transition-colors text-sm border border-slate-200 dark:border-slate-600">
                          View Resource <ExternalLink size={14} />
                        </a>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-500 text-sm">No exact resources found. Try searching online for &quot;{rec.skillName} tutorials&quot;.</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
