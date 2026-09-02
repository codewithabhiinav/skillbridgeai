// ============================================
// SKILLBRIDGE AI — Type Definitions
// ============================================

export type UserRole = 'student' | 'recruiter' | 'institution' | 'academician';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  location?: string;
  createdAt: string;
}

export interface Student extends User {
  role: 'student';
  college: string;
  department: string;
  year: number;
  cgpa: number;
  skills: StudentSkill[];
  projects: Project[];
  certificates: Certificate[];
  achievements: string[];
  careerInterests: string[];
  assessmentCompleted: boolean;
  skillReadinessScore: number;
  resumeUrl?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  portfolioUrl?: string;
}

export interface Recruiter extends User {
  role: 'recruiter';
  companyId: string;
  designation: string;
}

export interface Institution extends User {
  role: 'institution';
  institutionName: string;
  type: 'university' | 'college' | 'iit' | 'nit' | 'iiit';
  departments: string[];
  totalStudents: number;
  location: string;
}

export interface Academician extends User {
  role: 'academician';
  institution: string;
  department: string;
  designation: string;
  specialization: string[];
  experience: number;
  researchAreas: string[];
}

// ---- Skills ----

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  icon?: string;
  description?: string;
}

export type SkillCategory = 
  | 'programming' 
  | 'frontend' 
  | 'backend' 
  | 'database' 
  | 'devops' 
  | 'ai-ml' 
  | 'soft-skill' 
  | 'design'
  | 'mobile'
  | 'cloud';

export interface StudentSkill {
  skillId: string;
  skillName: string;
  proficiency: number; // 0-100
  verified: boolean;
  source: 'assessment' | 'self-reported' | 'project' | 'certificate';
}

export interface SkillGap {
  skillName: string;
  required: number;
  current: number;
  gap: number;
  status: 'matched' | 'partial' | 'missing';
  recommendation?: string;
}

// ---- Assessment ----

export interface Assessment {
  id: string;
  title: string;
  description: string;
  category: SkillCategory;
  duration: number; // minutes
  questions: AssessmentQuestion[];
  totalMarks: number;
}

export interface AssessmentQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  skillId: string;
  skillName: string;
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
}

export interface AssessmentResult {
  assessmentId: string;
  studentId: string;
  answers: number[];
  score: number;
  totalMarks: number;
  percentage: number;
  skillScores: { skillName: string; score: number; total: number; percentage: number }[];
  completedAt: string;
}

// ---- Company & Opportunities ----

export interface Company {
  id: string;
  name: string;
  logo?: string;
  industry: string;
  size: string;
  location: string;
  website?: string;
  description: string;
  founded?: string;
  techStack?: string[];
}

export type OpportunityType = 'internship' | 'job';
export type WorkMode = 'remote' | 'onsite' | 'hybrid';

export interface Opportunity {
  id: string;
  companyId: string;
  companyName: string;
  title: string;
  type: OpportunityType;
  description: string;
  requirements: string[];
  requiredSkills: RequiredSkill[];
  location: string;
  workMode: WorkMode;
  duration?: string;
  stipend?: string;
  salary?: string;
  eligibility: OpportunityEligibility;
  postedAt: string;
  deadline: string;
  applicants: number;
  status: 'active' | 'closed';
}

export interface RequiredSkill {
  skillName: string;
  importance: 'required' | 'preferred' | 'nice-to-have';
  minProficiency: number;
}

export interface OpportunityEligibility {
  minYear?: number;
  maxYear?: number;
  departments?: string[];
  minCGPA?: number;
}

// ---- Applications ----

export type ApplicationStatus = 'applied' | 'under-review' | 'shortlisted' | 'interview' | 'selected' | 'rejected';

export interface Application {
  id: string;
  studentId: string;
  studentName: string;
  opportunityId: string;
  opportunityTitle: string;
  companyName: string;
  status: ApplicationStatus;
  appliedAt: string;
  matchScore: number;
  matchDetails: MatchDetails;
  updatedAt: string;
}

export interface MatchDetails {
  overallScore: number;
  skillMatchScore: number;
  eligibilityScore: number;
  interestScore: number;
  matchedSkills: string[];
  partialSkills: string[];
  missingSkills: string[];
  explanation: string;
}

// ---- Learning ----

export interface LearningResource {
  id: string;
  title: string;
  provider: string;
  type: 'course' | 'tutorial' | 'project' | 'article' | 'video';
  skillName: string;
  url: string;
  duration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  rating: number;
  free: boolean;
}

// ---- Portfolio ----

export interface Project {
  id: string;
  title: string;
  description: string;
  skills: string[];
  url?: string;
  githubUrl?: string;
  startDate: string;
  endDate?: string;
  image?: string;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
  verified: boolean;
  skills: string[];
}

// ---- Collaboration ----

export type CollaborationType = 'live-project' | 'mentorship' | 'workshop' | 'guest-lecture' | 'research' | 'innovation-challenge';

export interface Collaboration {
  id: string;
  title: string;
  description: string;
  type: CollaborationType;
  initiator: string;
  initiatorType: 'industry' | 'institution' | 'academician';
  target: string;
  targetType: 'industry' | 'institution' | 'student' | 'academician';
  skills: string[];
  duration: string;
  status: 'open' | 'in-progress' | 'completed';
  startDate: string;
  participants: number;
}

// ---- Academician Opportunities ----

export type AcademicianOpportunityType = 'fdp' | 'industrial-training' | 'consultancy' | 'research' | 'guest-lecture' | 'industry-project' | 'faculty-internship';

export interface AcademicianOpportunity {
  id: string;
  title: string;
  type: AcademicianOpportunityType;
  organization: string;
  description: string;
  skills: string[];
  duration: string;
  location: string;
  workMode: WorkMode;
  compensation?: string;
  deadline: string;
  status: 'open' | 'closed';
}

// ---- Notifications ----

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning';
  read: boolean;
  createdAt: string;
}

// ---- Engine Types ----

export interface SkillGapReport {
  targetRole: string;
  overallMatch: number;
  matchedSkills: SkillGap[];
  partialSkills: SkillGap[];
  missingSkills: SkillGap[];
  recommendations: LearningRecommendation[];
}

export interface LearningRecommendation {
  skillName: string;
  reason: string;
  resources: LearningResource[];
  priority: 'high' | 'medium' | 'low';
}

export interface CandidateRanking {
  student: Student;
  matchScore: number;
  matchDetails: MatchDetails;
  rank: number;
}
