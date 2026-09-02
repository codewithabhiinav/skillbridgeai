import { useState } from 'react';
import { useData } from '../../context/DataContext';
import { getRecommendedOpportunities } from '../../engine';
import { useStudent } from '../../hooks/useStudent';
import { Search, MapPin, Briefcase, Building, ChevronRight, CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Opportunities() {
  const { opportunities } = useData();
  const navigate = useNavigate();
  const student = useStudent();

  const [activeTab, setActiveTab] = useState<'all' | 'internship' | 'job'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const recommendations = getRecommendedOpportunities(student, opportunities);

  let filtered = recommendations;
  if (activeTab !== 'all') {
    filtered = filtered.filter(r => r.opportunity.type === activeTab);
  }
  if (searchQuery.trim() !== '') {
    filtered = filtered.filter(r => 
      r.opportunity.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      r.opportunity.companyName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Opportunity Matches</h1>
          <p className="text-slate-500 mt-1">AI-curated roles based on your verified skills and profile.</p>
        </div>
        
        <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
          <button 
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'all' ? 'bg-white dark:bg-slate-700 shadow-sm text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
          >
            All Roles
          </button>
          <button 
            onClick={() => setActiveTab('internship')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'internship' ? 'bg-white dark:bg-slate-700 shadow-sm text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
          >
            Internships
          </button>
          <button 
            onClick={() => setActiveTab('job')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'job' ? 'bg-white dark:bg-slate-700 shadow-sm text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
          >
            Full-time Jobs
          </button>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
        <input 
          type="text" 
          placeholder="Search by role or company..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none text-slate-900 dark:text-white"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(({ opportunity, matchDetails }) => (
          <div key={opportunity.id} className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-md hover:border-cyan-300 dark:hover:border-cyan-700 transition-all flex flex-col cursor-pointer" onClick={() => navigate(`/student/opportunities/${opportunity.id}`)}>
            <div className="p-6 flex-1">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white leading-tight mb-1">{opportunity.title}</h3>
                  <p className="text-slate-500 flex items-center gap-1.5 font-medium"><Building size={14} /> {opportunity.companyName}</p>
                </div>
                <div className="flex flex-col items-center justify-center w-14 h-14 bg-cyan-50 dark:bg-cyan-900/20 rounded-full border border-cyan-100 dark:border-cyan-800 shrink-0">
                  <span className="text-sm font-bold text-cyan-700 dark:text-cyan-400">{matchDetails.overallScore}%</span>
                  <span className="text-[10px] text-cyan-600 dark:text-cyan-500 uppercase tracking-wider font-semibold">Match</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300">
                  <MapPin size={12} /> {opportunity.location}
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300 capitalize">
                  <Briefcase size={12} /> {opportunity.workMode}
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 capitalize">
                  {opportunity.type}
                </span>
              </div>

              <div className="mb-4">
                <p className="text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wider">Required Skills Match</p>
                <div className="flex flex-wrap gap-1.5">
                  {opportunity.requiredSkills?.slice(0, 4).map(req => {
                    const isMatched = matchDetails.matchedSkills.includes(req.skillName);
                    const isPartial = matchDetails.partialSkills.includes(req.skillName);
                    
                    return (
                      <span key={req.skillName} className={`text-xs px-2 py-1 rounded border flex items-center gap-1 ${
                        isMatched ? 'bg-green-50 border-green-200 text-green-700 dark:bg-green-900/20 dark:border-green-800/50 dark:text-green-400' :
                        isPartial ? 'bg-amber-50 border-amber-200 text-amber-700 dark:bg-amber-900/20 dark:border-amber-800/50 dark:text-amber-400' :
                        'bg-red-50 border-red-200 text-red-700 dark:bg-red-900/20 dark:border-red-800/50 dark:text-red-400'
                      }`}>
                        {isMatched ? <CheckCircle2 size={10} /> : isPartial ? <AlertTriangle size={10} /> : <XCircle size={10} />}
                        {req.skillName}
                      </span>
                    )
                  })}
                  {(opportunity.requiredSkills?.length || 0) > 4 && (
                    <span className="text-xs px-2 py-1 rounded bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300">
                      +{opportunity.requiredSkills!.length - 4} more
                    </span>
                  )}
                </div>
              </div>
            </div>
            
            <div className="bg-slate-50 dark:bg-slate-700/30 p-4 border-t border-slate-100 dark:border-slate-700 flex justify-between items-center mt-auto">
              <div>
                {opportunity.type === 'internship' ? (
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{opportunity.stipend}</p>
                ) : (
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{opportunity.salary}</p>
                )}
                <p className="text-xs text-slate-500">Apply by {new Date(opportunity.deadline).toLocaleDateString()}</p>
              </div>
              <button className="flex items-center justify-center w-8 h-8 rounded-full bg-white dark:bg-slate-600 text-cyan-600 dark:text-cyan-400 shadow-sm hover:bg-cyan-50 dark:hover:bg-cyan-900/40 transition-colors">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full py-12 text-center">
            <p className="text-slate-500">No opportunities found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
