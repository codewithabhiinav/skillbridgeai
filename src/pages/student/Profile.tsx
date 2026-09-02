import { useStudent } from '../../hooks/useStudent';
import { MapPin, GraduationCap, Briefcase } from 'lucide-react';

export default function Profile() {
  const student = useStudent();

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Profile Settings</h1>
      
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex items-center gap-4">
          <img 
            src={student.avatar || `https://ui-avatars.com/api/?name=${student.name}&background=0D8ABC&color=fff`} 
            alt={student.name}
            className="w-16 h-16 rounded-full"
          />
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">{student.name}</h2>
            <p className="text-slate-500">{student.email}</p>
          </div>
        </div>
        
        <div className="p-6 space-y-6">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4 flex items-center gap-2"><GraduationCap size={16} /> Academic Info</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-xl">
                <p className="text-xs text-slate-500 mb-1">College/Institution</p>
                <p className="font-medium dark:text-white">{student.college}</p>
              </div>
              <div className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-xl">
                <p className="text-xs text-slate-500 mb-1">Department</p>
                <p className="font-medium dark:text-white">{student.department}</p>
              </div>
              <div className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-xl">
                <p className="text-xs text-slate-500 mb-1">Year of Study</p>
                <p className="font-medium dark:text-white">Year {student.year}</p>
              </div>
              <div className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-xl">
                <p className="text-xs text-slate-500 mb-1">CGPA</p>
                <p className="font-medium dark:text-white">{student.cgpa}</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4 flex items-center gap-2"><Briefcase size={16} /> Career Interests</h3>
            <div className="flex flex-wrap gap-2">
              {student.careerInterests?.map((interest, idx) => (
                <span key={idx} className="px-3 py-1.5 bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800 rounded-lg text-sm font-medium">
                  {interest}
                </span>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4 flex items-center gap-2"><MapPin size={16} /> Contact & Location</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-xl">
                <p className="text-xs text-slate-500 mb-1">Phone Number</p>
                <p className="font-medium dark:text-white">{student.phone || 'Not provided'}</p>
              </div>
              <div className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-xl">
                <p className="text-xs text-slate-500 mb-1">Location</p>
                <p className="font-medium dark:text-white">{student.location || 'Not provided'}</p>
              </div>
            </div>
          </div>
          
          <div className="pt-4 flex justify-end">
            <button className="px-6 py-2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-medium rounded-lg">
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
