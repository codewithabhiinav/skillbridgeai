import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import type { Recruiter } from '../../types';
import { Link } from 'react-router-dom';
import { UserCheck, Calendar, CheckCircle, ExternalLink, Filter } from 'lucide-react';

export default function Shortlist() {
  const { user } = useAuth();
  const recruiter = user as Recruiter;
  const { opportunities, applications, students, updateApplicationStatus } = useData();

  const myOpportunities = opportunities.filter(o => o.companyId === recruiter.companyId);
  const myOpportunityIds = myOpportunities.map(o => o.id);
  
  // Get applications that are shortlisted, interviewing, or selected
  const activeApplications = applications.filter(a => 
    myOpportunityIds.includes(a.opportunityId) && 
    ['shortlisted', 'interview', 'selected'].includes(a.status)
  );

  const [filterOpp, setFilterOpp] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredApps = activeApplications.filter(app => {
    if (filterOpp !== 'all' && app.opportunityId !== filterOpp) return false;
    if (filterStatus !== 'all' && app.status !== filterStatus) return false;
    return true;
  }).sort((a, b) => b.matchScore - a.matchScore);

  const handleStatusUpdate = (appId: string, newStatus: any) => {
    updateApplicationStatus(appId, newStatus);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Active Pipeline</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Manage your shortlisted candidates and interviews.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8 bg-white dark:bg-[#1e293b] p-4 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm">
        <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 px-2">
          <Filter className="w-5 h-5" />
          <span className="font-medium text-sm">Filters:</span>
        </div>
        
        <select 
          value={filterOpp}
          onChange={(e) => setFilterOpp(e.target.value)}
          className="bg-gray-50 dark:bg-[#0f172a] border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        >
          <option value="all">All Roles</option>
          {myOpportunities.map(opp => (
            <option key={opp.id} value={opp.id}>{opp.title}</option>
          ))}
        </select>

        <select 
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="bg-gray-50 dark:bg-[#0f172a] border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        >
          <option value="all">All Statuses</option>
          <option value="shortlisted">Shortlisted</option>
          <option value="interview">Interview Scheduled</option>
          <option value="selected">Selected</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredApps.map(app => {
          const student = students.find(s => s.id === app.studentId);
          const opp = myOpportunities.find(o => o.id === app.opportunityId);
          if (!student || !opp) return null;

          return (
            <div key={app.id} className="bg-white dark:bg-[#1e293b] rounded-xl border border-gray-100 dark:border-gray-800 p-6 flex flex-col shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden flex-shrink-0">
                    {student.avatar ? (
                      <img src={student.avatar} alt={student.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center font-bold text-gray-500 dark:text-gray-400">
                        {student.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white line-clamp-1">{student.name}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{student.college}</p>
                  </div>
                </div>
                <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold
                  ${app.matchScore >= 80 ? 'text-green-500 border-green-500' : 'text-amber-500 border-amber-500'}
                `}>
                  {app.matchScore}
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Applying for:</p>
                <p className="text-sm text-cyan-600 dark:text-cyan-400 font-semibold truncate">{opp.title}</p>
              </div>

              <div className="flex gap-2 mb-6 text-sm">
                {student.resumeUrl && (
                  <a href={student.resumeUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                    <ExternalLink className="w-4 h-4" /> Resume
                  </a>
                )}
                <Link to={`/recruiter/candidates/${student.id}?appId=${app.id}`} className="flex items-center gap-1 text-cyan-600 hover:text-cyan-500 ml-auto">
                  View Profile
                </Link>
              </div>

              <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-800">
                {app.status === 'shortlisted' && (
                  <div className="flex flex-col gap-2">
                    <span className="flex items-center gap-2 text-sm font-medium text-amber-600 bg-amber-50 dark:bg-amber-900/20 dark:text-amber-400 px-3 py-1.5 rounded-md w-fit">
                      <UserCheck className="w-4 h-4" /> Shortlisted
                    </span>
                    <button 
                      onClick={() => handleStatusUpdate(app.id, 'interview')}
                      className="w-full py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-sm font-medium transition-colors"
                    >
                      Schedule Interview
                    </button>
                  </div>
                )}

                {app.status === 'interview' && (
                  <div className="flex flex-col gap-2">
                    <span className="flex items-center gap-2 text-sm font-medium text-purple-600 bg-purple-50 dark:bg-purple-900/20 dark:text-purple-400 px-3 py-1.5 rounded-md w-fit">
                      <Calendar className="w-4 h-4" /> Interview Scheduled
                    </span>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleStatusUpdate(app.id, 'selected')}
                        className="flex-1 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg text-sm font-medium transition-colors"
                      >
                        Select
                      </button>
                      <button 
                        onClick={() => handleStatusUpdate(app.id, 'rejected')}
                        className="flex-1 py-2 bg-red-50 hover:bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/40 rounded-lg text-sm font-medium transition-colors"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                )}

                {app.status === 'selected' && (
                  <div className="flex items-center justify-center gap-2 text-sm font-bold text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400 px-3 py-3 rounded-lg w-full">
                    <CheckCircle className="w-5 h-5" /> Selected
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {filteredApps.length === 0 && (
          <div className="col-span-full py-16 text-center text-gray-500 dark:text-gray-400">
            No candidates found matching the current filters.
          </div>
        )}
      </div>
    </div>
  );
}
