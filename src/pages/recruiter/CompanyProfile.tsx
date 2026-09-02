import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import type { Recruiter } from '../../types';
import { Building2, Globe, MapPin, Users, Mail, Edit, Calendar } from 'lucide-react';

export default function CompanyProfile() {
  const { user } = useAuth();
  const recruiter = user as Recruiter;
  const { companies, opportunities } = useData();

  const company = companies.find(c => c.id === recruiter.companyId);
  const activeJobs = opportunities.filter(o => o.companyId === recruiter.companyId && o.status === 'active').length;

  if (!company) {
    return <div className="p-8 text-white">Company profile not found.</div>;
  }

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Company Profile</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Manage how students see your organization.</p>
        </div>
        <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-white py-2 px-4 rounded-lg transition-colors font-medium">
          <Edit className="w-4 h-4" /> Edit Profile
        </button>
      </div>

      <div className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden mb-8">
        <div className="h-32 bg-gradient-to-r from-cyan-600 to-blue-700"></div>
        
        <div className="px-8 pb-8 relative">
          <div className="flex flex-col md:flex-row gap-6 md:items-end -mt-12 mb-6">
            <div className="w-24 h-24 bg-white dark:bg-gray-900 rounded-xl shadow-lg border-4 border-white dark:border-[#1e293b] flex items-center justify-center overflow-hidden flex-shrink-0">
              {company.logo ? (
                <img src={company.logo} alt={company.name} className="w-full h-full object-cover" />
              ) : (
                <Building2 className="w-10 h-10 text-gray-400" />
              )}
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{company.name}</h2>
              <p className="text-cyan-600 dark:text-cyan-400 font-medium">{company.industry}</p>
            </div>
            <div className="flex gap-4">
              <div className="text-center px-4 border-r border-gray-200 dark:border-gray-700">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{activeJobs}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">Active Postings</p>
              </div>
              <div className="text-center px-4">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{company.size}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">Employees</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8 border-t border-gray-100 dark:border-gray-800 pt-8">
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">About Us</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {company.description}
                </p>
              </div>

              {company.techStack && (
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Tech Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {company.techStack.map(tech => (
                      <span key={tech} className="px-3 py-1.5 bg-gray-100 dark:bg-[#0f172a] text-gray-700 dark:text-gray-300 rounded-lg text-sm border border-gray-200 dark:border-gray-700">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-6 bg-gray-50 dark:bg-[#0f172a] p-6 rounded-xl border border-gray-100 dark:border-gray-800">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Company Details</h3>
              
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  {company.location}
                </li>
                {company.website && (
                  <li className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                    <Globe className="w-5 h-5 text-gray-400" />
                    <a href={company.website} target="_blank" rel="noreferrer" className="text-cyan-600 hover:underline">{company.website}</a>
                  </li>
                )}
                {company.founded && (
                  <li className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    Founded {company.founded}
                  </li>
                )}
                <li className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                  <Users className="w-5 h-5 text-gray-400" />
                  {company.size} employees
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      {/* Recruiter Details */}
      <div className="bg-white dark:bg-[#1e293b] rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Your Profile (Recruiter)</h3>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400 rounded-full flex items-center justify-center font-bold text-lg border-2 border-cyan-500">
            {recruiter.name.charAt(0)}
          </div>
          <div>
            <p className="font-semibold text-gray-900 dark:text-white">{recruiter.name}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{recruiter.designation}</p>
          </div>
          <div className="ml-auto flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Mail className="w-4 h-4" /> {recruiter.email}
          </div>
        </div>
      </div>
    </div>
  );
}
