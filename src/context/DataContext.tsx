import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import type {
  Student, Company, Opportunity, Application, ApplicationStatus,
  LearningResource, Collaboration, AcademicianOpportunity,
  Assessment, AssessmentResult, StudentSkill
} from '../types';
import { loadPersistedState, savePersistedState } from '../utils/storage';

export interface DataState {
  students: Student[];
  companies: Company[];
  opportunities: Opportunity[];
  applications: Application[];
  learningResources: LearningResource[];
  collaborations: Collaboration[];
  academicianOpportunities: AcademicianOpportunity[];
  assessments: Assessment[];
  assessmentResults: AssessmentResult[];
}

interface DataContextType extends DataState {
  updateStudentSkills: (studentId: string, skills: StudentSkill[]) => void;
  applyAssessmentResults: (studentId: string, result: AssessmentResult) => void;
  addAssessmentResult: (result: AssessmentResult) => void;
  markAssessmentCompleted: (studentId: string) => void;
  updateStudentReadiness: (studentId: string, score: number) => void;
  applyToOpportunity: (application: Application) => void;
  updateApplicationStatus: (applicationId: string, status: ApplicationStatus) => void;
  addOpportunity: (opportunity: Opportunity) => void;
  getStudentApplications: (studentId: string) => Application[];
  getOpportunityApplications: (opportunityId: string) => Application[];
  getCompanyById: (companyId: string) => Company | undefined;
  getOpportunityById: (opportunityId: string) => Opportunity | undefined;
  getStudentById: (studentId: string) => Student | undefined;
  getDemoStudent: () => Student;
}

const DataContext = createContext<DataContextType | null>(null);

export function useData(): DataContextType {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useData must be used within DataProvider');
  return ctx;
}

interface DataProviderProps {
  children: ReactNode;
  initialData: DataState;
}

const DEMO_STUDENT_ID = 'STU001';

function mergeInitialData(initialData: DataState): DataState {
  const persisted = loadPersistedState();
  if (!persisted) return initialData;

  return {
    ...initialData,
    students: persisted.students ?? initialData.students,
    opportunities: persisted.opportunities ?? initialData.opportunities,
    applications: persisted.applications ?? initialData.applications,
    assessmentResults: persisted.assessmentResults ?? initialData.assessmentResults,
  };
}

export function DataProvider({ children, initialData }: DataProviderProps) {
  const merged = mergeInitialData(initialData);

  const [students, setStudents] = useState<Student[]>(merged.students);
  const [companies] = useState<Company[]>(merged.companies);
  const [opportunities, setOpportunities] = useState<Opportunity[]>(merged.opportunities);
  const [applications, setApplications] = useState<Application[]>(merged.applications);
  const [learningResources] = useState<LearningResource[]>(merged.learningResources);
  const [collaborations] = useState<Collaboration[]>(merged.collaborations);
  const [academicianOpportunities] = useState<AcademicianOpportunity[]>(merged.academicianOpportunities);
  const [assessments] = useState<Assessment[]>(merged.assessments);
  const [assessmentResults, setAssessmentResults] = useState<AssessmentResult[]>(merged.assessmentResults);

  useEffect(() => {
    savePersistedState({ students, opportunities, applications, assessmentResults });
  }, [students, opportunities, applications, assessmentResults]);

  const updateStudentSkills = useCallback((studentId: string, skills: StudentSkill[]) => {
    setStudents(prev => prev.map(s => s.id === studentId ? { ...s, skills } : s));
  }, []);

  const updateStudentReadiness = useCallback((studentId: string, score: number) => {
    setStudents(prev => prev.map(s => s.id === studentId ? { ...s, skillReadinessScore: score } : s));
  }, []);

  const markAssessmentCompleted = useCallback((studentId: string) => {
    setStudents(prev => prev.map(s => s.id === studentId ? { ...s, assessmentCompleted: true } : s));
  }, []);

  const addAssessmentResult = useCallback((result: AssessmentResult) => {
    setAssessmentResults(prev => [...prev.filter(r => !(r.studentId === result.studentId && r.assessmentId === result.assessmentId)), result]);
  }, []);

  const applyAssessmentResults = useCallback((studentId: string, result: AssessmentResult) => {
    addAssessmentResult(result);

    setStudents(prev => prev.map(student => {
      if (student.id !== studentId) return student;

      const updatedSkills = [...student.skills];
      for (const skillScore of result.skillScores) {
        const idx = updatedSkills.findIndex(
          s => s.skillName.toLowerCase() === skillScore.skillName.toLowerCase()
        );
        const assessedProficiency = Math.round(skillScore.percentage);

        if (idx >= 0) {
          updatedSkills[idx] = {
            ...updatedSkills[idx],
            proficiency: Math.max(updatedSkills[idx].proficiency, assessedProficiency),
            verified: true,
            source: 'assessment',
          };
        } else {
          updatedSkills.push({
            skillId: `SKL-${skillScore.skillName.replace(/\s+/g, '-').toUpperCase()}`,
            skillName: skillScore.skillName,
            proficiency: assessedProficiency,
            verified: true,
            source: 'assessment',
          });
        }
      }

      const avgProficiency = updatedSkills.length
        ? Math.round(updatedSkills.reduce((sum, s) => sum + s.proficiency, 0) / updatedSkills.length)
        : student.skillReadinessScore;

      return {
        ...student,
        skills: updatedSkills,
        assessmentCompleted: true,
        skillReadinessScore: Math.max(student.skillReadinessScore, avgProficiency),
      };
    }));
  }, [addAssessmentResult]);

  const applyToOpportunity = useCallback((application: Application) => {
    setApplications(prev => {
      const exists = prev.some(
        a => a.studentId === application.studentId && a.opportunityId === application.opportunityId
      );
      if (exists) return prev;
      return [...prev, application];
    });
    setOpportunities(prev =>
      prev.map(o =>
        o.id === application.opportunityId ? { ...o, applicants: o.applicants + 1 } : o
      )
    );
  }, []);

  const updateApplicationStatus = useCallback((applicationId: string, status: ApplicationStatus) => {
    setApplications(prev => prev.map(app =>
      app.id === applicationId
        ? { ...app, status, updatedAt: new Date().toISOString() }
        : app
    ));
  }, []);

  const addOpportunity = useCallback((opportunity: Opportunity) => {
    setOpportunities(prev => [opportunity, ...prev]);
  }, []);

  const getStudentApplications = useCallback((studentId: string) => {
    return applications.filter(a => a.studentId === studentId);
  }, [applications]);

  const getOpportunityApplications = useCallback((opportunityId: string) => {
    return applications.filter(a => a.opportunityId === opportunityId);
  }, [applications]);

  const getCompanyById = useCallback((companyId: string) => {
    return companies.find(c => c.id === companyId);
  }, [companies]);

  const getOpportunityById = useCallback((opportunityId: string) => {
    return opportunities.find(o => o.id === opportunityId);
  }, [opportunities]);

  const getStudentById = useCallback((studentId: string) => {
    return students.find(s => s.id === studentId);
  }, [students]);

  const getDemoStudent = useCallback(() => {
    return students.find(s => s.id === DEMO_STUDENT_ID) ?? students[0];
  }, [students]);

  const value: DataContextType = {
    students,
    companies,
    opportunities,
    applications,
    learningResources,
    collaborations,
    academicianOpportunities,
    assessments,
    assessmentResults,
    updateStudentSkills,
    applyAssessmentResults,
    addAssessmentResult,
    markAssessmentCompleted,
    updateStudentReadiness,
    applyToOpportunity,
    updateApplicationStatus,
    addOpportunity,
    getStudentApplications,
    getOpportunityApplications,
    getCompanyById,
    getOpportunityById,
    getStudentById,
    getDemoStudent,
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
}
