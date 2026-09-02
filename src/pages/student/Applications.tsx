import { useData } from '../../context/DataContext';
import { useStudent } from '../../hooks/useStudent';
import { Building, Calendar, ArrowRight, CheckCircle2, Clock, XCircle, FileText, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Applications() {
  const { applications } = useData();
  const navigate = useNavigate();
  const student = useStudent();

  const myApplications = applications
    .filter(a => a.studentId === student.id)
    .sort((a, b) => new Date(b.appliedAt).getTime() - new Date(a.appliedAt).getTime());

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'applied': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800';
      case 'under-review': return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800';
      case 'shortlisted': return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 border-purple-200 dark:border-purple-800';
      case 'interview': return 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800';
      case 'selected': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800';
      case 'rejected': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800';
      default: return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'applied': return <FileText size={16} />;
      case 'under-review': return <Clock size={16} />;
      case 'shortlisted': return <CheckCircle2 size={16} />;
      case 'interview': return <Users size={16} />;
      case 'selected': return <CheckCircle2 size={16} />;
      case 'rejected': return <XCircle size={16} />;
      default: return <Clock size={16} />;
    }
  };

  const pipelineStages = ['applied', 'under-review', 'shortlisted', 'interview', 'selected'];
  
  const counts = pipelineStages.reduce((acc, stage) => {
    acc[stage] = myApplications.filter(a => a.status === stage).length;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">My Applications</h1>
        <p className="text-slate-500 mt-1">Track your job and internship applications.</p>
      </div>

      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
        <h2 className="text-lg font-bold dark:text-white mb-6">Pipeline Overview</h2>
        <div className="flex flex-col md:flex-row justify-between relative">
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-slate-100 dark:bg-slate-700 -translate-y-1/2 z-0"></div>
          
          {pipelineStages.map((stage) => (
            <div key={stage} className="relative z-10 flex md:flex-col items-center gap-4 md:gap-2 bg-white dark:bg-slate-800 p-2 md:p-0">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg border-4 border-white dark:border-slate-800 ${
                counts[stage] > 0 ? 'bg-cyan-500 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-400'
              }`}>
                {counts[stage]}
              </div>
              <span className="text-sm font-medium text-slate-600 dark:text-slate-300 capitalize">{stage.replace('-', ' ')}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {myApplications.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
            <p className="text-slate-500 mb-4">You haven't applied to any opportunities yet.</p>
            <button onClick={() => navigate('/student/opportunities')} className="bg-cyan-500 text-white px-6 py-2 rounded-lg font-medium">Browse Opportunities</button>
          </div>
        ) : (
          myApplications.map((app) => (
            <div key={app.id} className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 flex flex-col md:flex-row gap-6 justify-between hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate(`/student/opportunities/${app.opportunityId}`)}>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">{app.opportunityTitle}</h3>
                  <div className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 border capitalize ${getStatusColor(app.status)}`}>
                    {getStatusIcon(app.status)} {app.status.replace('-', ' ')}
                  </div>
                </div>
                
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 mb-4 font-medium">
                  <Building size={16} /> {app.companyName}
                </div>
                
                <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                  <span className="flex items-center gap-1"><Calendar size={14} /> Applied: {new Date(app.appliedAt).toLocaleDateString()}</span>
                  <span className="flex items-center gap-1"><Clock size={14} /> Last Updated: {new Date(app.updatedAt).toLocaleDateString()}</span>
                </div>
              </div>
              
              <div className="flex flex-row md:flex-col items-center justify-between md:justify-center gap-4 md:border-l border-slate-100 dark:border-slate-700 md:pl-6 min-w-[120px]">
                <div className="text-center">
                  <p className="text-xs text-slate-500 uppercase font-semibold mb-1">Match Score</p>
                  <p className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">{app.matchScore}%</p>
                </div>
                <button className="text-cyan-500 hover:text-cyan-600 text-sm font-medium flex items-center gap-1">
                  View Details <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
