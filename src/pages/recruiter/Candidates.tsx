import { useState, useMemo } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import type { Recruiter } from '../../types';
import { rankCandidates } from '../../engine/matching';
import { ChevronDown, Info, UserCheck, Eye, Star } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';

export default function Candidates() {
  const { user } = useAuth();
  const recruiter = user as Recruiter;
  const { opportunities, students, applications, updateApplicationStatus } = useData();
  const [searchParams, setSearchParams] = useSearchParams();

  const initialJobId = searchParams.get('jobId') || '';
  
  const myOpportunities = useMemo(() => 
    opportunities.filter(o => o.companyId === recruiter.companyId), 
  [opportunities, recruiter.companyId]);

  const [selectedOppId, setSelectedOppId] = useState<string>(
    initialJobId || (myOpportunities.length > 0 ? myOpportunities[0].id : '')
  );

  const selectedOpp = myOpportunities.find(o => o.id === selectedOppId);

  // Get ALL students, score them against this opportunity
  const rankedCandidates = useMemo(() => {
    if (!selectedOpp) return [];
    
    // Rank all students based on the engine
    const allRanked = rankCandidates(students, selectedOpp);
    
    // Find if they have applied
    return allRanked.map(ranked => {
      const app = applications.find(
        a => a.studentId === ranked.student.id && a.opportunityId === selectedOpp.id
      );
      return {
        ...ranked,
        application: app,
        isApplicant: !!app
      };
    }).sort((a, b) => {
      // Sort primarily by match score, but applicants first if we wanted. For now, strict AI rank.
      return b.matchScore - a.matchScore;
    });
  }, [selectedOpp, students, applications]);

  const handleShortlist = (appId: string) => {
    updateApplicationStatus(appId, 'shortlisted');
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500 border-green-500';
    if (score >= 60) return 'text-amber-500 border-amber-500';
    return 'text-red-500 border-red-500';
  };

  return (
    <div className="p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">AI Candidate Ranking</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Discover the best-matched talent for your roles.</p>
        </div>
        
        <div className="w-full md:w-auto min-w-[250px]">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Select Opportunity</label>
          <div className="relative">
            <select
              value={selectedOppId}
              onChange={(e) => {
                setSelectedOppId(e.target.value);
                setSearchParams({ jobId: e.target.value });
              }}
              className="w-full appearance-none bg-white dark:bg-[#1e293b] border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white rounded-lg py-2.5 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              {myOpportunities.map(opp => (
                <option key={opp.id} value={opp.id}>{opp.title}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-3 w-5 h-5 text-gray-500 pointer-events-none" />
          </div>
        </div>
      </div>

      {!selectedOpp ? (
        <div className="bg-white dark:bg-[#1e293b] rounded-xl p-12 text-center border border-gray-100 dark:border-gray-800">
          <p className="text-gray-500 dark:text-gray-400">Please select or post an opportunity to view candidates.</p>
        </div>
      ) : (
        <div className="bg-white dark:bg-[#1e293b] rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
                  <th className="py-4 px-6 text-sm font-semibold text-gray-600 dark:text-gray-300">Rank</th>
                  <th className="py-4 px-6 text-sm font-semibold text-gray-600 dark:text-gray-300">Candidate</th>
                  <th className="py-4 px-6 text-sm font-semibold text-gray-600 dark:text-gray-300">AI Match Score</th>
                  <th className="py-4 px-6 text-sm font-semibold text-gray-600 dark:text-gray-300">Top Skills</th>
                  <th className="py-4 px-6 text-sm font-semibold text-gray-600 dark:text-gray-300">Status</th>
                  <th className="py-4 px-6 text-sm font-semibold text-gray-600 dark:text-gray-300 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {rankedCandidates.map((candidate, idx) => (
                  <tr key={candidate.student.id} className="border-b border-gray-100 dark:border-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800/20 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-bold text-sm">
                        #{idx + 1}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex flex-col">
                        <span className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                          {candidate.student.name}
                          {!candidate.isApplicant && (
                            <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-400" title="Has not applied yet, AI sourced">
                              Passive
                            </span>
                          )}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {candidate.student.department}, {candidate.student.college}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-full border-4 flex items-center justify-center font-bold ${getScoreColor(candidate.matchScore)}`}>
                          {candidate.matchScore}%
                        </div>
                        <div className="group relative">
                          <Info className="w-4 h-4 text-gray-400 cursor-pointer" />
                          <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-64 p-3 bg-gray-900 text-white text-xs rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10 pointer-events-none">
                            <p className="font-semibold mb-1">Why this candidate?</p>
                            <p>{candidate.matchDetails.explanation}</p>
                            <div className="absolute left-1/2 -bottom-1 -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex flex-wrap gap-1 max-w-[200px]">
                        {candidate.matchDetails.matchedSkills.slice(0, 3).map(skill => (
                          <span key={skill} className="px-2 py-1 text-[10px] rounded-full bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300">
                            {skill}
                          </span>
                        ))}
                        {candidate.matchDetails.matchedSkills.length > 3 && (
                          <span className="px-2 py-1 text-[10px] rounded-full bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                            +{candidate.matchDetails.matchedSkills.length - 3} more
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      {candidate.isApplicant ? (
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                          ${candidate.application!.status === 'shortlisted' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                            candidate.application!.status === 'interview' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400' :
                            candidate.application!.status === 'rejected' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' :
                            'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                          }
                        `}>
                          {candidate.application!.status.replace('-', ' ')}
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400">
                          Not Applied
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to={`/recruiter/candidates/${candidate.student.id}?oppId=${selectedOpp.id}${candidate.isApplicant ? `&appId=${candidate.application!.id}` : ''}`}
                          className="p-2 text-gray-500 hover:text-cyan-500 hover:bg-cyan-50 dark:hover:bg-cyan-900/20 rounded-lg transition-colors"
                          title="View Profile"
                        >
                          <Eye className="w-5 h-5" />
                        </Link>
                        {candidate.isApplicant && candidate.application!.status === 'applied' && (
                          <button
                            onClick={() => handleShortlist(candidate.application!.id)}
                            className="p-2 text-gray-500 hover:text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors"
                            title="Shortlist"
                          >
                            <UserCheck className="w-5 h-5" />
                          </button>
                        )}
                        {!candidate.isApplicant && (
                          <button
                            className="p-2 text-gray-500 hover:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-lg transition-colors"
                            title="Invite to Apply"
                          >
                            <Star className="w-5 h-5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
                
                {rankedCandidates.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-gray-500 dark:text-gray-400">
                      No candidates found for this role.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
