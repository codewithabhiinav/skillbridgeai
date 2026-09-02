import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import type { Recruiter } from '../../types';
import { Users, MapPin, Plus, Calendar, Briefcase } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function Jobs() {
  const { user } = useAuth();
  const recruiter = user as Recruiter;
  const { opportunities, applications } = useData();
  const navigate = useNavigate();

  const myJobs = opportunities.filter(o => o.companyId === recruiter.companyId && o.type === 'job');

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Jobs</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Manage your full-time role postings.</p>
        </div>
        <button 
          onClick={() => navigate('/recruiter/post-opportunity')}
          className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white py-2.5 px-4 rounded-lg transition-colors font-medium"
        >
          <Plus className="w-5 h-5" /> Post Job
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {myJobs.map(job => {
          const appCount = applications.filter(a => a.opportunityId === job.id).length;
          
          return (
            <div key={job.id} className="bg-white dark:bg-[#1e293b] rounded-xl border border-gray-100 dark:border-gray-800 p-6 flex flex-col h-full hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <Briefcase className="w-6 h-6" />
                </div>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                  job.status === 'active' 
                    ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                    : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'
                }`}>
                  {job.status}
                </span>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-1">{job.title}</h3>
              
              <div className="space-y-2 mb-4 flex-1">
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <MapPin className="w-4 h-4" /> {job.location} ({job.workMode})
                </div>
                {job.salary && (
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <span className="font-medium text-gray-900 dark:text-gray-300">₹</span> {job.salary}
                  </div>
                )}
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Calendar className="w-4 h-4" /> Posted {new Date(job.postedAt).toLocaleDateString()}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {job.requiredSkills.slice(0, 3).map(skill => (
                  <span key={skill.skillName} className="text-xs px-2 py-1 bg-gray-100 dark:bg-[#0f172a] text-gray-700 dark:text-gray-300 rounded">
                    {skill.skillName}
                  </span>
                ))}
                {job.requiredSkills.length > 3 && (
                  <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-[#0f172a] text-gray-500 dark:text-gray-400 rounded">
                    +{job.requiredSkills.length - 3}
                  </span>
                )}
              </div>
              
              <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between mt-auto">
                <div className="flex items-center gap-1.5 text-sm font-medium text-gray-700 dark:text-gray-300">
                  <Users className="w-4 h-4 text-cyan-500" />
                  {appCount} Applicants
                </div>
                <Link 
                  to={`/recruiter/candidates?jobId=${job.id}`}
                  className="text-sm font-medium text-cyan-600 hover:text-cyan-500"
                >
                  View Candidates
                </Link>
              </div>
            </div>
          );
        })}
        
        {myJobs.length === 0 && (
          <div className="col-span-full py-16 text-center border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-xl">
            <Briefcase className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">No Jobs Posted</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">You haven't posted any full-time jobs yet.</p>
            <button 
              onClick={() => navigate('/recruiter/post-opportunity')}
              className="text-cyan-600 hover:text-cyan-500 font-medium"
            >
              Post your first job
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
