import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DataProvider } from './context/DataContext';

// Data imports
import { students } from './data/students';
import { companies } from './data/companies';
import { opportunities } from './data/opportunities';
import { applications } from './data/applications';
import { learningResources } from './data/learning-resources';
import { collaborations } from './data/collaborations';
import { academicianOpportunities } from './data/academician-opportunities';
import { assessments, demoAssessmentResult } from './data/assessments';

// Layout
import DashboardLayout from './components/layout/DashboardLayout';

// Pages
import Landing from './pages/Landing';
import DemoLogin from './pages/DemoLogin';

// Student Pages
import StudentDashboard from './pages/student/Dashboard';
import StudentAssessment from './pages/student/Assessment';
import AssessmentResult from './pages/student/AssessmentResult';
import MySkills from './pages/student/MySkills';
import Opportunities from './pages/student/Opportunities';
import OpportunityDetail from './pages/student/OpportunityDetail';
import StudentApplications from './pages/student/Applications';
import Learning from './pages/student/Learning';
import Portfolio from './pages/student/Portfolio';
import Profile from './pages/student/Profile';

// Recruiter Pages
import RecruiterDashboard from './pages/recruiter/Dashboard';
import Candidates from './pages/recruiter/Candidates';
import CandidateDetail from './pages/recruiter/CandidateDetail';
import RecruiterJobs from './pages/recruiter/Jobs';
import RecruiterInternships from './pages/recruiter/Internships';
import PostOpportunity from './pages/recruiter/PostOpportunity';
import Shortlist from './pages/recruiter/Shortlist';
import CompanyProfile from './pages/recruiter/CompanyProfile';

// Institution Pages
import InstitutionDashboard from './pages/institution/Dashboard';
import InstitutionStudents from './pages/institution/Students';
import SkillAnalytics from './pages/institution/SkillAnalytics';
import InstitutionInternships from './pages/institution/InstitutionInternships';
import Placements from './pages/institution/Placements';
import Industry from './pages/institution/Industry';
import Reports from './pages/institution/Reports';

// Academician Pages
import AcademicianDashboard from './pages/academician/Dashboard';
import AcademicianOpportunities from './pages/academician/Opportunities';
import FDP from './pages/academician/FDP';
import Research from './pages/academician/Research';
import AcademicianProjects from './pages/academician/Projects';
import Collaboration from './pages/academician/Collaboration';

import type { UserRole, Recruiter, Institution, Academician } from './types';

// Demo users for instant login (student loaded live from DataContext)
const demoUsers = {
  recruiter: {
    id: 'REC001',
    name: 'Priya Nair',
    email: 'priya.nair@razorpay.com',
    role: 'recruiter' as const,
    phone: '+91 98765 43210',
    location: 'Bangalore',
    companyId: 'COM003', // Razorpay
    designation: 'Senior Technical Recruiter',
    createdAt: '2024-01-15',
  } as Recruiter,
  institution: {
    id: 'INST001',
    name: 'Prof. Suresh Kumar',
    email: 'placement@iitb.ac.in',
    role: 'institution' as const,
    phone: '+91 22 2576 7001',
    location: 'Mumbai',
    institutionName: 'Indian Institute of Technology Bombay',
    type: 'iit' as const,
    departments: ['Computer Science', 'Information Technology', 'Electronics', 'Electrical', 'Mechanical'],
    totalStudents: 1200,
    createdAt: '2023-06-01',
  } as Institution,
  academician: {
    id: 'ACAD001',
    name: 'Dr. Ramesh Iyer',
    email: 'ramesh.iyer@iitb.ac.in',
    role: 'academician' as const,
    phone: '+91 22 2576 7890',
    location: 'Mumbai',
    institution: 'IIT Bombay',
    department: 'Computer Science',
    designation: 'Associate Professor',
    specialization: ['Machine Learning', 'Natural Language Processing', 'Data Mining'],
    experience: 15,
    researchAreas: ['Deep Learning', 'Computer Vision', 'Recommender Systems'],
    createdAt: '2020-07-01',
  } as Academician,
};

// Initial data state
const initialData = {
  students,
  companies,
  opportunities,
  applications,
  learningResources,
  collaborations,
  academicianOpportunities,
  assessments,
  assessmentResults: [demoAssessmentResult],
};

// Protected route wrapper
function ProtectedRoute({ children, allowedRole }: { children: React.ReactNode; allowedRole: UserRole }) {
  const { isAuthenticated, role } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/demo" replace />;
  }
  
  if (role !== allowedRole) {
    return <Navigate to={`/${role}`} replace />;
  }
  
  return <>{children}</>;
}

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Landing />} />
      <Route path="/demo" element={<DemoLogin />} />

      {/* Student Routes */}
      <Route path="/student" element={
        <ProtectedRoute allowedRole="student">
          <DashboardLayout />
        </ProtectedRoute>
      }>
        <Route index element={<StudentDashboard />} />
        <Route path="skills" element={<MySkills />} />
        <Route path="assessment" element={<StudentAssessment />} />
        <Route path="assessment/result" element={<AssessmentResult />} />
        <Route path="learning" element={<Learning />} />
        <Route path="opportunities" element={<Opportunities />} />
        <Route path="opportunities/:opportunityId" element={<OpportunityDetail />} />
        <Route path="applications" element={<StudentApplications />} />
        <Route path="portfolio" element={<Portfolio />} />
        <Route path="profile" element={<Profile />} />
      </Route>

      {/* Recruiter Routes */}
      <Route path="/recruiter" element={
        <ProtectedRoute allowedRole="recruiter">
          <DashboardLayout />
        </ProtectedRoute>
      }>
        <Route index element={<RecruiterDashboard />} />
        <Route path="jobs" element={<RecruiterJobs />} />
        <Route path="internships" element={<RecruiterInternships />} />
        <Route path="candidates" element={<Candidates />} />
        <Route path="candidates/:candidateId" element={<CandidateDetail />} />
        <Route path="shortlist" element={<Shortlist />} />
        <Route path="post" element={<PostOpportunity />} />
        <Route path="company" element={<CompanyProfile />} />
      </Route>

      {/* Institution Routes */}
      <Route path="/institution" element={
        <ProtectedRoute allowedRole="institution">
          <DashboardLayout />
        </ProtectedRoute>
      }>
        <Route index element={<InstitutionDashboard />} />
        <Route path="students" element={<InstitutionStudents />} />
        <Route path="analytics" element={<SkillAnalytics />} />
        <Route path="internships" element={<InstitutionInternships />} />
        <Route path="placements" element={<Placements />} />
        <Route path="industry" element={<Industry />} />
        <Route path="reports" element={<Reports />} />
      </Route>

      {/* Academician Routes */}
      <Route path="/academician" element={
        <ProtectedRoute allowedRole="academician">
          <DashboardLayout />
        </ProtectedRoute>
      }>
        <Route index element={<AcademicianDashboard />} />
        <Route path="opportunities" element={<AcademicianOpportunities />} />
        <Route path="fdp" element={<FDP />} />
        <Route path="research" element={<Research />} />
        <Route path="projects" element={<AcademicianProjects />} />
        <Route path="collaboration" element={<Collaboration />} />
      </Route>

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <DataProvider initialData={initialData}>
        <AuthProvider demoUsers={demoUsers}>
          <AppRoutes />
        </AuthProvider>
      </DataProvider>
    </BrowserRouter>
  );
}
