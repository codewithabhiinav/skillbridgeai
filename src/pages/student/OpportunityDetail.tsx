import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { useStudent } from '../../hooks/useStudent';
import { calculateMatchScore } from '../../engine';
import { MapPin, Briefcase, Calendar, Clock, DollarSign, Building, CheckCircle2, AlertTriangle, XCircle, Sparkles, ChevronLeft } from 'lucide-react';

export default function OpportunityDetail() {
  const { opportunityId } = useParams<{ opportunityId: string }>();
  const navigate = useNavigate();
  const student = useStudent();
  const { opportunities, applications, applyToOpportunity } = useData();
  const opportunity = opportunities.find(o => o.id === opportunityId);
  const existingApplication = applications.find(a => a.opportunityId === opportunityId && a.studentId === student.id);

  if (!opportunity) {
    return <div className="p-8 text-center">Opportunity not found.</div>;
  }

  const matchDetails = calculateMatchScore(student, opportunity);
  const [isApplying, setIsApplying] = useState(false);

  const handleApply = () => {
    setIsApplying(true);
    setTimeout(() => {
      applyToOpportunity({
        id: `app-${Date.now()}`,
        studentId: student.id,
        studentName: student.name,
        opportunityId: opportunity.id,
        opportunityTitle: opportunity.title,
        companyName: opportunity.companyName,
        status: 'applied',
        appliedAt: new Date().toISOString(),
        matchScore: matchDetails.overallScore,
        matchDetails,
        updatedAt: new Date().toISOString()
      });
      setIsApplying(false);
    }, 1000);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">
        <ChevronLeft size={20} /> Back to Opportunities
      </button>

      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="p-8 border-b border-slate-100 dark:border-slate-700">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{opportunity.title}</h1>
              <div className="flex items-center gap-2 text-lg text-slate-600 dark:text-slate-400 mb-6">
                <Building size={20} />
                <span className="font-medium">{opportunity.companyName}</span>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-slate-700 rounded-lg text-sm text-slate-700 dark:text-slate-300">
                  <MapPin size={16} className="text-slate-500" /> {opportunity.location}
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-slate-700 rounded-lg text-sm text-slate-700 dark:text-slate-300 capitalize">
                  <Briefcase size={16} className="text-slate-500" /> {opportunity.workMode}
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-slate-700 rounded-lg text-sm text-slate-700 dark:text-slate-300">
                  <Calendar size={16} className="text-slate-500" /> Apply by {new Date(opportunity.deadline).toLocaleDateString()}
                </div>
              </div>
            </div>
            
            <div className="flex flex-col items-center justify-center p-6 bg-slate-50 dark:bg-slate-700/50 rounded-xl border border-slate-100 dark:border-slate-600 min-w-[200px]">
              {existingApplication ? (
                <>
                  <div className="w-12 h-12 bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400 rounded-full flex items-center justify-center mb-3">
                    <CheckCircle2 size={24} />
                  </div>
                  <p className="font-bold text-green-700 dark:text-green-400 mb-1">Applied</p>
                  <p className="text-xs text-slate-500 text-center">Status: <span className="capitalize">{existingApplication.status.replace('-', ' ')}</span></p>
                </>
              ) : (
                <>
                  <button 
                    onClick={handleApply} 
                    disabled={isApplying}
                    className="w-full py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-bold rounded-lg shadow-sm transition-colors flex justify-center items-center gap-2 disabled:opacity-70"
                  >
                    {isApplying ? 'Applying...' : 'Apply Now'}
                  </button>
                  <p className="text-xs text-slate-500 mt-3 text-center">{opportunity.applicants} applicants so far</p>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-slate-100 dark:divide-slate-700">
          <div className="col-span-2 p-8 space-y-8">
            <section>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">About the Role</h2>
              <div className="prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 whitespace-pre-wrap">
                {opportunity.description}
              </div>
            </section>
            
            <section>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Requirements</h2>
              <ul className="list-disc pl-5 space-y-2 text-slate-600 dark:text-slate-300">
                {opportunity.requirements.map((req, idx) => (
                  <li key={idx}>{req}</li>
                ))}
              </ul>
            </section>
          </div>

          <div className="col-span-1 p-8 bg-slate-50/50 dark:bg-slate-800/50">
            <div className="sticky top-8 space-y-8">
              <div>
                <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Sparkles size={16} className="text-cyan-500" /> AI Match Analysis
                </h2>
                
                <div className="flex items-center gap-6 mb-6">
                  <div className="relative w-20 h-20 flex items-center justify-center shrink-0">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-200 dark:text-slate-700" />
                      <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="8" fill="transparent"
                        strokeDasharray={`${matchDetails.overallScore * 2.51} 251`}
                        className="text-cyan-500 transition-all duration-1000 ease-out" />
                    </svg>
                    <span className="absolute text-xl font-bold dark:text-white">{matchDetails.overallScore}%</span>
                  </div>
                  <div className="flex-1">
                    <div className="bg-cyan-50 dark:bg-cyan-900/20 p-3 rounded-lg border border-cyan-100 dark:border-cyan-800/50">
                      <p className="text-sm text-cyan-800 dark:text-cyan-200">{matchDetails.explanation}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-600 dark:text-slate-400">Skill Match</span>
                      <span className="font-semibold dark:text-white">{matchDetails.skillMatchScore}%</span>
                    </div>
                    <div className="h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full"><div className="h-full bg-cyan-500 rounded-full" style={{ width: `${matchDetails.skillMatchScore}%` }}></div></div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-600 dark:text-slate-400">Eligibility</span>
                      <span className="font-semibold dark:text-white">{matchDetails.eligibilityScore}%</span>
                    </div>
                    <div className="h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full"><div className="h-full bg-cyan-500 rounded-full" style={{ width: `${matchDetails.eligibilityScore}%` }}></div></div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-600 dark:text-slate-400">Interest Alignment</span>
                      <span className="font-semibold dark:text-white">{matchDetails.interestScore}%</span>
                    </div>
                    <div className="h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full"><div className="h-full bg-cyan-500 rounded-full" style={{ width: `${matchDetails.interestScore}%` }}></div></div>
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="text-xs font-semibold text-slate-500 uppercase">Skill Match Details</p>
                  <div className="flex flex-wrap gap-2">
                    {matchDetails.matchedSkills.map(skill => (
                      <span key={skill} className="text-xs px-2 py-1 rounded bg-green-50 text-green-700 border border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800/50 flex items-center gap-1">
                        <CheckCircle2 size={12} /> {skill}
                      </span>
                    ))}
                    {matchDetails.partialSkills.map(skill => (
                      <span key={skill} className="text-xs px-2 py-1 rounded bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800/50 flex items-center gap-1">
                        <AlertTriangle size={12} /> {skill}
                      </span>
                    ))}
                    {matchDetails.missingSkills.map(skill => (
                      <span key={skill} className="text-xs px-2 py-1 rounded bg-red-50 text-red-700 border border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800/50 flex items-center gap-1">
                        <XCircle size={12} /> {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-200 dark:border-slate-700">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4">Details</h3>
                <div className="space-y-4 text-sm">
                  {opportunity.duration && (
                    <div className="flex justify-between">
                      <span className="text-slate-500 flex items-center gap-2"><Clock size={16} /> Duration</span>
                      <span className="font-medium dark:text-white">{opportunity.duration}</span>
                    </div>
                  )}
                  {opportunity.type === 'internship' ? (
                    <div className="flex justify-between">
                      <span className="text-slate-500 flex items-center gap-2"><DollarSign size={16} /> Stipend</span>
                      <span className="font-medium dark:text-white">{opportunity.stipend}</span>
                    </div>
                  ) : (
                    <div className="flex justify-between">
                      <span className="text-slate-500 flex items-center gap-2"><DollarSign size={16} /> Salary</span>
                      <span className="font-medium dark:text-white">{opportunity.salary}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
