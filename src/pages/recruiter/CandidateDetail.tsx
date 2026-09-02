import { useMemo } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { calculateMatchScore } from '../../engine/matching';
import { 
  ArrowLeft, CheckCircle, XCircle, AlertCircle, Award, Briefcase, 
  BookOpen, Calendar, GraduationCap, MapPin, Mail, Phone, ExternalLink 
} from 'lucide-react';

export default function CandidateDetail() {
  const { candidateId } = useParams<{ candidateId: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { students, opportunities, applications, updateApplicationStatus } = useData();

  const appId = searchParams.get('appId');
  const oppId = searchParams.get('oppId');

  const student = students.find(s => s.id === candidateId);
  const application = appId ? applications.find(a => a.id === appId) : null;
  const opportunity = (appId && application) 
    ? opportunities.find(o => o.id === application.opportunityId) 
    : (oppId ? opportunities.find(o => o.id === oppId) : null);

  const matchDetails = useMemo(() => {
    if (student && opportunity) {
      return calculateMatchScore(student, opportunity);
    }
    return null;
  }, [student, opportunity]);

  if (!student) {
    return <div className="p-8 text-white">Candidate not found.</div>;
  }

  const handleStatusChange = (status: any) => {
    if (application) {
      updateApplicationStatus(application.id, status);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500 border-green-500';
    if (score >= 60) return 'text-amber-500 border-amber-500';
    return 'text-red-500 border-red-500';
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-amber-500';
    return 'bg-red-500';
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-cyan-500 dark:hover:text-cyan-400 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Candidates
      </button>

      {/* Header Profile Card */}
      <div className="bg-white dark:bg-[#1e293b] rounded-2xl p-6 lg:p-8 shadow-sm border border-gray-100 dark:border-gray-800 mb-8 flex flex-col md:flex-row gap-6 md:gap-8 items-start md:items-center relative overflow-hidden">
        {/* Background Accent */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        
        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden flex-shrink-0 border-4 border-white dark:border-gray-800 shadow-md">
          {student.avatar ? (
            <img src={student.avatar} alt={student.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-gray-500 dark:text-gray-400">
              {student.name.charAt(0)}
            </div>
          )}
        </div>
        
        <div className="flex-1 z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                {student.name}
                {student.skillReadinessScore >= 80 && (
                  <span className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1">
                    <Award className="w-3 h-3" /> Top 10%
                  </span>
                )}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-lg mt-1">{student.department}</p>
            </div>
            
            {application && (
              <div className="flex gap-3">
                {application.status !== 'rejected' && application.status !== 'selected' && (
                  <button onClick={() => handleStatusChange('rejected')} className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/30 rounded-lg transition-colors">
                    Reject
                  </button>
                )}
                {application.status === 'applied' && (
                  <button onClick={() => handleStatusChange('shortlisted')} className="px-4 py-2 text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-500 rounded-lg transition-colors">
                    Shortlist
                  </button>
                )}
                {(application.status === 'shortlisted' || application.status === 'interview') && (
                  <button onClick={() => handleStatusChange('interview')} className="px-4 py-2 text-sm font-medium text-white bg-purple-600 hover:bg-purple-500 rounded-lg transition-colors">
                    Schedule Interview
                  </button>
                )}
                {application.status === 'interview' && (
                  <button onClick={() => handleStatusChange('selected')} className="px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-500 rounded-lg transition-colors">
                    Mark Selected
                  </button>
                )}
                <div className={`px-4 py-2 text-sm font-bold rounded-lg border flex items-center justify-center capitalize
                  ${application.status === 'shortlisted' ? 'border-green-500 text-green-500' :
                    application.status === 'interview' ? 'border-purple-500 text-purple-500' :
                    application.status === 'rejected' ? 'border-red-500 text-red-500' :
                    application.status === 'selected' ? 'border-green-600 bg-green-600 text-white' :
                    'border-blue-500 text-blue-500'
                  }
                `}>
                  {application.status.replace('-', ' ')}
                </div>
              </div>
            )}
          </div>
          
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-gray-600 dark:text-gray-400">
            <span className="flex items-center gap-1.5"><GraduationCap className="w-4 h-4" /> {student.college}</span>
            <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> Year {student.year}</span>
            <span className="flex items-center gap-1.5 font-semibold text-gray-900 dark:text-white">CGPA: {student.cgpa}</span>
            {student.location && <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {student.location}</span>}
            <span className="flex items-center gap-1.5"><Mail className="w-4 h-4" /> {student.email}</span>
            {student.phone && <span className="flex items-center gap-1.5"><Phone className="w-4 h-4" /> {student.phone}</span>}
          </div>
          
          <div className="flex gap-4 mt-6">
            {student.resumeUrl && <a href={student.resumeUrl} target="_blank" rel="noreferrer" className="text-sm text-cyan-600 hover:text-cyan-500 flex items-center gap-1"><ExternalLink className="w-3.5 h-3.5"/> Resume</a>}
            {student.linkedinUrl && <a href={student.linkedinUrl} target="_blank" rel="noreferrer" className="text-sm text-cyan-600 hover:text-cyan-500 flex items-center gap-1"><ExternalLink className="w-3.5 h-3.5"/> LinkedIn</a>}
            {student.githubUrl && <a href={student.githubUrl} target="_blank" rel="noreferrer" className="text-sm text-cyan-600 hover:text-cyan-500 flex items-center gap-1"><ExternalLink className="w-3.5 h-3.5"/> GitHub</a>}
            {student.portfolioUrl && <a href={student.portfolioUrl} target="_blank" rel="noreferrer" className="text-sm text-cyan-600 hover:text-cyan-500 flex items-center gap-1"><ExternalLink className="w-3.5 h-3.5"/> Portfolio</a>}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Match Analysis */}
        <div className="lg:col-span-1 space-y-8">
          {matchDetails && opportunity && (
            <div className="bg-white dark:bg-[#1e293b] rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-cyan-500" /> 
                AI Match Analysis
              </h2>
              
              <div className="flex flex-col items-center mb-8">
                <div className={`w-32 h-32 rounded-full border-8 flex items-center justify-center mb-3 ${getScoreColor(matchDetails.overallScore)}`}>
                  <span className="text-4xl font-bold">{matchDetails.overallScore}%</span>
                </div>
                <p className="text-sm text-center text-gray-600 dark:text-gray-400">
                  Match for <span className="font-semibold text-gray-900 dark:text-white">{opportunity.title}</span>
                </p>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600 dark:text-gray-400">Skill Match</span>
                    <span className="font-medium text-gray-900 dark:text-white">{matchDetails.skillMatchScore}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div className={`h-full ${getScoreBg(matchDetails.skillMatchScore)}`} style={{ width: `${matchDetails.skillMatchScore}%` }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600 dark:text-gray-400">Eligibility</span>
                    <span className="font-medium text-gray-900 dark:text-white">{matchDetails.eligibilityScore}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div className={`h-full ${getScoreBg(matchDetails.eligibilityScore)}`} style={{ width: `${matchDetails.eligibilityScore}%` }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600 dark:text-gray-400">Interest Alignment</span>
                    <span className="font-medium text-gray-900 dark:text-white">{matchDetails.interestScore}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div className={`h-full ${getScoreBg(matchDetails.interestScore)}`} style={{ width: `${matchDetails.interestScore}%` }}></div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-[#0f172a] p-4 rounded-lg">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Why this candidate?</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {matchDetails.explanation}
                </p>
              </div>

              {/* Skill gaps for this role */}
              <div className="mt-6">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Role Requirements vs Candidate Skills</h4>
                <div className="space-y-2">
                  {matchDetails.matchedSkills.map(skill => (
                    <div key={skill} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      {skill}
                    </div>
                  ))}
                  {matchDetails.partialSkills.map(skill => (
                    <div key={skill} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <AlertCircle className="w-4 h-4 text-amber-500 flex-shrink-0" />
                      {skill} (Partial)
                    </div>
                  ))}
                  {matchDetails.missingSkills.map(skill => (
                    <div key={skill} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <XCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                      {skill} (Missing)
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Detailed Profile */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* All Skills */}
          <div className="bg-white dark:bg-[#1e293b] rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-100 dark:border-gray-800 pb-4">
              Verified Skills Profile
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {student.skills.map(skill => (
                <div key={skill.skillId}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
                      {skill.skillName}
                      {skill.verified && <CheckCircle className="w-3.5 h-3.5 text-blue-500" data-tooltip-content="Verified via Assessment" />}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400">{skill.proficiency}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-cyan-500" style={{ width: `${skill.proficiency}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Projects */}
          <div className="bg-white dark:bg-[#1e293b] rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-100 dark:border-gray-800 pb-4 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-gray-400" />
              Projects
            </h3>
            <div className="space-y-6">
              {student.projects.length > 0 ? student.projects.map(project => (
                <div key={project.id} className="border-l-2 border-cyan-500 pl-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{project.title}</h4>
                    <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                      {new Date(project.startDate).getFullYear()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {project.skills.map(skill => (
                      <span key={skill} className="text-xs px-2 py-1 bg-gray-100 dark:bg-[#0f172a] text-gray-600 dark:text-gray-300 rounded">
                        {skill}
                      </span>
                    ))}
                  </div>
                  {(project.url || project.githubUrl) && (
                    <div className="flex gap-4 mt-2">
                      {project.url && <a href={project.url} className="text-xs text-cyan-600 hover:underline">Live Demo</a>}
                      {project.githubUrl && <a href={project.githubUrl} className="text-xs text-cyan-600 hover:underline">Repository</a>}
                    </div>
                  )}
                </div>
              )) : (
                <p className="text-gray-500 dark:text-gray-400 text-sm">No projects added yet.</p>
              )}
            </div>
          </div>

          {/* Certificates & Achievements */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-[#1e293b] rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-gray-400" />
                Certifications
              </h3>
              <ul className="space-y-4">
                {student.certificates.length > 0 ? student.certificates.map(cert => (
                  <li key={cert.id} className="flex gap-3">
                    <div className="w-8 h-8 rounded bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center flex-shrink-0">
                      <Award className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">{cert.title}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{cert.issuer} • {new Date(cert.date).getFullYear()}</p>
                    </div>
                  </li>
                )) : (
                  <p className="text-gray-500 dark:text-gray-400 text-sm">No certifications added yet.</p>
                )}
              </ul>
            </div>

            <div className="bg-white dark:bg-[#1e293b] rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-gray-400" />
                Achievements
              </h3>
              <ul className="space-y-3 list-disc list-inside text-sm text-gray-600 dark:text-gray-300">
                {student.achievements.length > 0 ? student.achievements.map((ach, idx) => (
                  <li key={idx}>{ach}</li>
                )) : (
                  <p className="text-gray-500 dark:text-gray-400 text-sm list-none">No achievements added yet.</p>
                )}
              </ul>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
