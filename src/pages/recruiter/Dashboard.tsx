import { useMemo } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import type { Recruiter } from '../../types';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer 
} from 'recharts';
import { Briefcase, Users, UserCheck, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { user } = useAuth();
  const recruiter = user as Recruiter;
  const { opportunities, applications, companies, students } = useData();

  const company = companies.find(c => c.id === recruiter.companyId);
  
  const myOpportunities = opportunities.filter(o => o.companyId === recruiter.companyId);
  const myOpportunityIds = myOpportunities.map(o => o.id);
  const myApplications = applications.filter(a => myOpportunityIds.includes(a.opportunityId));

  const stats = {
    activePostings: myOpportunities.filter(o => o.status === 'active').length,
    totalApplicants: myApplications.length,
    shortlisted: myApplications.filter(a => a.status === 'shortlisted' || a.status === 'interview' || a.status === 'selected').length,
    interviewsScheduled: myApplications.filter(a => a.status === 'interview').length,
  };

  const pipelineData = useMemo(() => {
    const counts: Record<string, number> = {
      applied: 0,
      'under-review': 0,
      shortlisted: 0,
      interview: 0,
      selected: 0,
      rejected: 0
    };
    
    myApplications.forEach(app => {
      counts[app.status] = (counts[app.status] || 0) + 1;
    });

    return [
      { name: 'Applied', count: counts['applied'] },
      { name: 'Under Review', count: counts['under-review'] },
      { name: 'Shortlisted', count: counts['shortlisted'] },
      { name: 'Interview', count: counts['interview'] },
      { name: 'Selected', count: counts['selected'] }
    ];
  }, [myApplications]);

  // Get recent top applicants by match score
  const recentTopApplicants = useMemo(() => {
    return [...myApplications]
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 5)
      .map(app => {
        const student = students.find(s => s.id === app.studentId);
        const opp = myOpportunities.find(o => o.id === app.opportunityId);
        return { app, student, opp };
      });
  }, [myApplications, students, myOpportunities]);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome back, {recruiter.name}</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Here's what's happening at {company?.name || 'your company'} today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-[#1e293b] p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Active Postings</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stats.activePostings}</h3>
            </div>
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-[#1e293b] p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Applicants</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stats.totalApplicants}</h3>
            </div>
            <div className="w-12 h-12 bg-cyan-100 dark:bg-cyan-900/30 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-[#1e293b] p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Shortlisted</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stats.shortlisted}</h3>
            </div>
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
              <UserCheck className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-[#1e293b] p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Interviews Scheduled</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stats.interviewsScheduled}</h3>
            </div>
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-[#1e293b] p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Application Pipeline</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={pipelineData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <RechartsTooltip 
                  cursor={{fill: 'rgba(255,255,255,0.05)'}}
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff' }} 
                />
                <Bar dataKey="count" fill="#06b6d4" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Top Applicants */}
        <div className="bg-white dark:bg-[#1e293b] p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Top Match Applicants</h3>
            <Link to="/recruiter/candidates" className="text-sm text-cyan-600 hover:text-cyan-500">View all</Link>
          </div>
          
          <div className="space-y-4">
            {recentTopApplicants.length > 0 ? (
              recentTopApplicants.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-[#0f172a] rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full bg-cyan-900 flex items-center justify-center text-cyan-400 font-bold">
                        {item.student?.name.charAt(0)}
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-[#0f172a] flex items-center justify-center text-[10px] text-white font-bold">
                        {item.app.matchScore}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">{item.student?.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">{item.opp?.title}</p>
                    </div>
                  </div>
                  <Link 
                    to={`/recruiter/candidates/${item.student?.id}?appId=${item.app.id}`}
                    className="text-xs bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 py-1.5 px-3 rounded-md transition-colors"
                  >
                    View
                  </Link>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">No applications yet.</p>
            )}
          </div>
        </div>
      </div>
      
      {/* Active Opportunities */}
      <div className="mt-8 bg-white dark:bg-[#1e293b] p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Active Opportunities</h3>
          <Link to="/recruiter/post-opportunity" className="text-sm bg-cyan-600 hover:bg-cyan-500 text-white py-2 px-4 rounded-lg transition-colors">
            Post New
          </Link>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-800">
                <th className="py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Role</th>
                <th className="py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Type</th>
                <th className="py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Posted</th>
                <th className="py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Applicants</th>
                <th className="py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Status</th>
                <th className="py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Action</th>
              </tr>
            </thead>
            <tbody>
              {myOpportunities.slice(0, 5).map(opp => {
                const applicantsCount = myApplications.filter(a => a.opportunityId === opp.id).length;
                return (
                  <tr key={opp.id} className="border-b border-gray-100 dark:border-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800/20 transition-colors">
                    <td className="py-3 px-4">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{opp.title}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{opp.location} • {opp.workMode}</p>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-xs bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 py-1 px-2 rounded-full capitalize">
                        {opp.type}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-300">
                      {new Date(opp.postedAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-300 font-semibold">
                      {applicantsCount}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`text-xs py-1 px-2 rounded-full capitalize ${
                        opp.status === 'active' 
                          ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                          : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'
                      }`}>
                        {opp.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <Link to={`/recruiter/candidates?jobId=${opp.id}`} className="text-sm text-cyan-600 hover:text-cyan-500">
                        View
                      </Link>
                    </td>
                  </tr>
                );
              })}
              {myOpportunities.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-gray-500 dark:text-gray-400">
                    No opportunities posted yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
