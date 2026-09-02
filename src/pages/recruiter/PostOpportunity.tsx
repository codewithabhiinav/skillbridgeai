import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import type { RequiredSkill, OpportunityEligibility } from '../../types';
import { Plus, X, CheckCircle, Save } from 'lucide-react';
import { skills as skillCatalog } from '../../data/skills';

export default function PostOpportunity() {
  const { user } = useAuth();
  const { companies, addOpportunity } = useData();
  const navigate = useNavigate();

  // Assuming company is found
  const company = companies.find(c => c.id === (user as any).companyId);

  const [formData, setFormData] = useState({
    title: '',
    type: 'job' as 'job' | 'internship',
    description: '',
    location: '',
    workMode: 'remote' as 'remote' | 'onsite' | 'hybrid',
    duration: '',
    compensation: '',
    deadline: '',
  });

  const [reqSkills, setReqSkills] = useState<RequiredSkill[]>([]);
  const [eligibility, setEligibility] = useState<OpportunityEligibility>({
    minCGPA: 7.0,
    minYear: 3,
    maxYear: 4,
    departments: []
  });

  const [skillInput, setSkillInput] = useState('');
  const [skillImportance, setSkillImportance] = useState<'required'|'preferred'|'nice-to-have'>('required');
  const [skillMinProficiency, setSkillMinProficiency] = useState(60);

  const [success, setSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddSkill = () => {
    if (!skillInput) return;
    
    // Check if already exists
    if (reqSkills.some(s => s.skillName.toLowerCase() === skillInput.toLowerCase())) {
      return;
    }

    setReqSkills([...reqSkills, {
      skillName: skillInput,
      importance: skillImportance,
      minProficiency: skillMinProficiency
    }]);
    
    setSkillInput('');
  };

  const removeSkill = (name: string) => {
    setReqSkills(reqSkills.filter(s => s.skillName !== name));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!company || reqSkills.length === 0) return;

    const oppId = `OPP-${Date.now()}`;
    const deadline = formData.deadline || new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0];

    addOpportunity({
      id: oppId,
      companyId: company.id,
      companyName: company.name,
      title: formData.title,
      type: formData.type,
      description: formData.description || `Join ${company.name} as a ${formData.title}.`,
      requirements: reqSkills.filter(s => s.importance === 'required').map(s => `Proficiency in ${s.skillName} (${s.minProficiency}%+)`),
      requiredSkills: reqSkills,
      location: formData.location || company.location,
      workMode: formData.workMode,
      duration: formData.type === 'internship' ? formData.duration : undefined,
      stipend: formData.type === 'internship' ? formData.compensation : undefined,
      salary: formData.type === 'job' ? formData.compensation : undefined,
      eligibility,
      postedAt: new Date().toISOString().split('T')[0],
      deadline,
      applicants: 0,
      status: 'active',
    });

    setSuccess(true);
    setTimeout(() => {
      navigate(formData.type === 'job' ? '/recruiter/jobs' : '/recruiter/internships');
    }, 2000);
  };

  if (success) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[80vh]">
        <div className="bg-white dark:bg-[#1e293b] p-8 rounded-xl shadow-lg border border-gray-100 dark:border-gray-800 text-center max-w-md w-full">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Opportunity Posted!</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Your {formData.type} role has been published successfully. The AI engine is already matching candidates.
          </p>
          <p className="text-sm text-cyan-600">Redirecting...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Post New Opportunity</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Create a new job or internship posting for {company?.name}.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Details */}
        <div className="bg-white dark:bg-[#1e293b] p-6 lg:p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-100 dark:border-gray-800 pb-4">
            Basic Information
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Role Title *</label>
              <input 
                type="text" 
                name="title"
                required
                value={formData.title}
                onChange={handleInputChange}
                className="w-full bg-gray-50 dark:bg-[#0f172a] border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2.5 text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                placeholder="e.g. Frontend Developer"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Opportunity Type *</label>
              <select 
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className="w-full bg-gray-50 dark:bg-[#0f172a] border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2.5 text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              >
                <option value="job">Full-time Job</option>
                <option value="internship">Internship</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Work Mode *</label>
              <select 
                name="workMode"
                value={formData.workMode}
                onChange={handleInputChange}
                className="w-full bg-gray-50 dark:bg-[#0f172a] border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2.5 text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              >
                <option value="remote">Remote</option>
                <option value="onsite">On-site</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Location</label>
              <input 
                type="text" 
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="w-full bg-gray-50 dark:bg-[#0f172a] border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2.5 text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                placeholder="e.g. Bangalore, India"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {formData.type === 'job' ? 'Salary (LPA)' : 'Stipend / month'}
              </label>
              <input 
                type="text" 
                name="compensation"
                value={formData.compensation}
                onChange={handleInputChange}
                className="w-full bg-gray-50 dark:bg-[#0f172a] border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2.5 text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                placeholder={formData.type === 'job' ? 'e.g. 12-15 LPA' : 'e.g. ₹30,000'}
              />
            </div>
            
            {formData.type === 'internship' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Duration</label>
                <input 
                  type="text" 
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  className="w-full bg-gray-50 dark:bg-[#0f172a] border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2.5 text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                  placeholder="e.g. 6 Months"
                />
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Application Deadline</label>
              <input 
                type="date" 
                name="deadline"
                value={formData.deadline}
                onChange={handleInputChange}
                className="w-full bg-gray-50 dark:bg-[#0f172a] border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2.5 text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
              <textarea 
                name="description"
                rows={5}
                value={formData.description}
                onChange={handleInputChange}
                className="w-full bg-gray-50 dark:bg-[#0f172a] border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2.5 text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                placeholder="Describe the role, responsibilities, and what you're looking for..."
              />
            </div>
          </div>
        </div>

        {/* Required Skills - CRITICAL FOR AI MATCHING */}
        <div className="bg-white dark:bg-[#1e293b] p-6 lg:p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 border-l-4 border-l-cyan-500">
          <div className="flex justify-between items-start mb-6 border-b border-gray-100 dark:border-gray-800 pb-4">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Required Skills</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                The AI engine uses these to score and rank candidates. Be specific.
              </p>
            </div>
            <div className="bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-400 text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
              AI Matching Enabled
            </div>
          </div>

          {/* Added Skills */}
          <div className="space-y-3 mb-6">
            {reqSkills.length === 0 ? (
              <div className="text-center py-6 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg text-gray-500 dark:text-gray-400">
                No skills added yet. Add skills below for better AI matching.
              </div>
            ) : (
              reqSkills.map(skill => (
                <div key={skill.skillName} className="flex items-center justify-between bg-gray-50 dark:bg-[#0f172a] p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-4">
                    <span className="font-semibold text-gray-900 dark:text-white">{skill.skillName}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full capitalize
                      ${skill.importance === 'required' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' : 
                        skill.importance === 'preferred' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' : 
                        'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                      }
                    `}>
                      {skill.importance}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Min: {skill.minProficiency}%</span>
                  </div>
                  <button type="button" onClick={() => removeSkill(skill.skillName)} className="text-gray-400 hover:text-red-500 transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Add Skill Controls */}
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Skill Name</label>
              <input 
                type="text" 
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                list="skills-list"
                className="w-full bg-gray-50 dark:bg-[#0f172a] border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2.5 text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                placeholder="e.g. React, Python"
              />
              <datalist id="skills-list">
                {skillCatalog.map(s => <option key={s.id} value={s.name} />)}
              </datalist>
            </div>
            
            <div className="w-full md:w-40">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Importance</label>
              <select 
                value={skillImportance}
                onChange={(e) => setSkillImportance(e.target.value as any)}
                className="w-full bg-gray-50 dark:bg-[#0f172a] border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2.5 text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              >
                <option value="required">Required</option>
                <option value="preferred">Preferred</option>
                <option value="nice-to-have">Nice to have</option>
              </select>
            </div>

            <div className="w-full md:w-32">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Min Level (%)</label>
              <input 
                type="number" 
                min="10" max="100" step="10"
                value={skillMinProficiency}
                onChange={(e) => setSkillMinProficiency(Number(e.target.value))}
                className="w-full bg-gray-50 dark:bg-[#0f172a] border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2.5 text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              />
            </div>
            
            <button 
              type="button"
              onClick={handleAddSkill}
              className="w-full md:w-auto bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white py-2.5 px-6 rounded-lg transition-colors font-medium flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" /> Add
            </button>
          </div>
        </div>

        {/* Eligibility Criteria */}
        <div className="bg-white dark:bg-[#1e293b] p-6 lg:p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-100 dark:border-gray-800 pb-4">
            Eligibility Criteria
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Minimum CGPA</label>
              <input 
                type="number" 
                step="0.1" min="0" max="10"
                value={eligibility.minCGPA || ''}
                onChange={(e) => setEligibility({...eligibility, minCGPA: Number(e.target.value)})}
                className="w-full bg-gray-50 dark:bg-[#0f172a] border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2.5 text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Target Year (Min)</label>
              <select 
                value={eligibility.minYear || 1}
                onChange={(e) => setEligibility({...eligibility, minYear: Number(e.target.value)})}
                className="w-full bg-gray-50 dark:bg-[#0f172a] border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2.5 text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              >
                {[1,2,3,4].map(y => <option key={y} value={y}>Year {y}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Target Year (Max)</label>
              <select 
                value={eligibility.maxYear || 4}
                onChange={(e) => setEligibility({...eligibility, maxYear: Number(e.target.value)})}
                className="w-full bg-gray-50 dark:bg-[#0f172a] border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2.5 text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              >
                {[1,2,3,4].map(y => <option key={y} value={y}>Year {y}</option>)}
              </select>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button 
            type="button"
            onClick={() => navigate(-1)}
            className="px-6 py-3 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button 
            type="submit"
            disabled={reqSkills.length === 0}
            className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white px-8 py-3 rounded-lg font-bold transition-colors shadow-lg shadow-cyan-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="w-5 h-5" /> Post Opportunity
          </button>
        </div>
      </form>
    </div>
  );
}
