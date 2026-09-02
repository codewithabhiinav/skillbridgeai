import { useStudent } from '../../hooks/useStudent';
import { Mail, ExternalLink, MapPin, GraduationCap, Calendar, Award, CheckCircle2 } from 'lucide-react';

export default function Portfolio() {
  const student = useStudent();

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-cyan-500 to-blue-600"></div>
        <div className="px-8 pb-8">
          <div className="relative flex justify-between items-end -mt-16 mb-6">
            <img 
              src={student.avatar || `https://ui-avatars.com/api/?name=${student.name}&background=0D8ABC&color=fff&size=128`} 
              alt={student.name}
              className="w-32 h-32 rounded-2xl border-4 border-white dark:border-slate-800 shadow-md object-cover bg-white"
            />
            <div className="flex gap-3 mb-2">
              <button className="px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 rounded-lg font-medium text-sm transition-colors flex items-center gap-2">
                <ExternalLink size={16} /> Share Profile
              </button>
            </div>
          </div>

          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{student.name}</h1>
            <p className="text-lg text-slate-500 font-medium mt-1">{student.department} Student</p>
            
            <div className="flex flex-wrap gap-4 mt-4 text-sm text-slate-600 dark:text-slate-300">
              <span className="flex items-center gap-1.5"><GraduationCap size={16} className="text-slate-400" /> {student.college}</span>
              <span className="flex items-center gap-1.5"><Calendar size={16} className="text-slate-400" /> Class of 2024 (Year {student.year})</span>
              <span className="flex items-center gap-1.5"><Award size={16} className="text-slate-400" /> CGPA: {student.cgpa}</span>
              {student.location && <span className="flex items-center gap-1.5"><MapPin size={16} className="text-slate-400" /> {student.location}</span>}
            </div>

            <div className="flex gap-4 mt-6">
              <a href={`mailto:${student.email}`} className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 hover:bg-cyan-50 dark:bg-slate-700 dark:hover:bg-cyan-900/30 text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                <Mail size={18} />
              </a>
              {student.githubUrl && (
                <a href={student.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 hover:bg-cyan-50 dark:bg-slate-700 dark:hover:bg-cyan-900/30 text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                  <ExternalLink size={18} />
                </a>
              )}
              {student.linkedinUrl && (
                <a href={student.linkedinUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 hover:bg-cyan-50 dark:bg-slate-700 dark:hover:bg-cyan-900/30 text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                  <ExternalLink size={18} />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-6">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Top Skills</h2>
            <div className="space-y-4">
              {student.skills.slice(0, 5).map(skill => (
                <div key={skill.skillName}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-slate-700 dark:text-slate-300 flex items-center gap-1">
                      {skill.skillName} {skill.verified && <CheckCircle2 size={12} className="text-green-500" />}
                    </span>
                    <span className="font-bold text-slate-500">{skill.proficiency}%</span>
                  </div>
                  <div className="h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full">
                    <div className="h-full bg-cyan-500 rounded-full" style={{ width: `${skill.proficiency}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {student.certificates && student.certificates.length > 0 && (
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Certifications</h2>
              <div className="space-y-4">
                {student.certificates.map(cert => (
                  <div key={cert.id} className="border-l-2 border-cyan-500 pl-3">
                    <h3 className="font-semibold text-slate-900 dark:text-white">{cert.title}</h3>
                    <p className="text-sm text-slate-500">{cert.issuer} • {new Date(cert.date).getFullYear()}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="md:col-span-2 space-y-6">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Projects</h2>
            <div className="space-y-6">
              {student.projects?.map(project => (
                <div key={project.id} className="pb-6 border-b border-slate-100 dark:border-slate-700 last:border-0 last:pb-0">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">{project.title}</h3>
                    <div className="flex gap-2">
                      {project.githubUrl && (
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                          <ExternalLink size={18} />
                        </a>
                      )}
                      {project.url && (
                        <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                          <ExternalLink size={18} />
                        </a>
                      )}
                    </div>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 text-sm mb-4 leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.skills.map(skill => (
                      <span key={skill} className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded text-xs font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
              {(!student.projects || student.projects.length === 0) && (
                <p className="text-slate-500 text-sm">No projects added yet.</p>
              )}
            </div>
          </div>
          
          {student.achievements && student.achievements.length > 0 && (
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Achievements</h2>
              <ul className="list-disc pl-5 space-y-2 text-slate-600 dark:text-slate-300">
                {student.achievements.map((achievement, idx) => (
                  <li key={idx}>{achievement}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
