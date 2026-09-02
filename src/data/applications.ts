import type { Application } from '../types';

export const applications: Application[] = [
  // Arjun Sharma (STU001) applications
  {
    id: 'APP001',
    studentId: 'STU001',
    studentName: 'Arjun Sharma',
    opportunityId: 'OPP001',
    opportunityTitle: 'Frontend Developer Intern',
    companyName: 'Razorpay',
    status: 'interview',
    appliedAt: '2023-10-15T10:00:00Z',
    updatedAt: '2023-11-05T14:30:00Z',
    matchScore: 92,
    matchDetails: {
      overallScore: 92,
      skillMatchScore: 95,
      eligibilityScore: 100,
      interestScore: 80,
      matchedSkills: ['React', 'JavaScript'],
      partialSkills: [],
      missingSkills: ['HTML/CSS', 'TypeScript'],
      explanation: 'Excellent match! Your React and JavaScript skills are exactly what Razorpay is looking for.'
    }
  },
  {
    id: 'APP002',
    studentId: 'STU001',
    studentName: 'Arjun Sharma',
    opportunityId: 'OPP003',
    opportunityTitle: 'Full Stack Developer',
    companyName: 'Freshworks',
    status: 'under-review',
    appliedAt: '2023-10-20T09:15:00Z',
    updatedAt: '2023-10-25T11:00:00Z',
    matchScore: 85,
    matchDetails: {
      overallScore: 85,
      skillMatchScore: 82,
      eligibilityScore: 90,
      interestScore: 100,
      matchedSkills: ['React', 'Node.js', 'MySQL', 'Communication'],
      partialSkills: [],
      missingSkills: ['AWS'],
      explanation: 'Strong candidate. Your frontend and backend skills align well, though AWS experience is missing.'
    }
  },
  {
    id: 'APP003',
    studentId: 'STU001',
    studentName: 'Arjun Sharma',
    opportunityId: 'OPP010',
    opportunityTitle: 'React Developer',
    companyName: 'Infosys',
    status: 'shortlisted',
    appliedAt: '2023-11-02T16:45:00Z',
    updatedAt: '2023-11-10T09:30:00Z',
    matchScore: 88,
    matchDetails: {
      overallScore: 88,
      skillMatchScore: 90,
      eligibilityScore: 100,
      interestScore: 80,
      matchedSkills: ['React', 'JavaScript'],
      partialSkills: [],
      missingSkills: ['HTML/CSS', 'TypeScript'],
      explanation: 'Great alignment with core requirements. High proficiency in React makes you a strong fit.'
    }
  },
  {
    id: 'APP004',
    studentId: 'STU001',
    studentName: 'Arjun Sharma',
    opportunityId: 'OPP006',
    opportunityTitle: 'DevOps Engineer Intern',
    companyName: 'Flipkart',
    status: 'rejected',
    appliedAt: '2023-10-25T11:20:00Z',
    updatedAt: '2023-11-01T15:00:00Z',
    matchScore: 45,
    matchDetails: {
      overallScore: 45,
      skillMatchScore: 30,
      eligibilityScore: 100,
      interestScore: 50,
      matchedSkills: [],
      partialSkills: ['Docker'],
      missingSkills: ['CI/CD', 'AWS', 'Python'],
      explanation: 'Low skill match. Significant gaps in DevOps specific skills like CI/CD and AWS.'
    }
  },
  {
    id: 'APP005',
    studentId: 'STU001',
    studentName: 'Arjun Sharma',
    opportunityId: 'OPP008',
    opportunityTitle: 'Software Engineer',
    companyName: 'Razorpay',
    status: 'applied',
    appliedAt: '2023-11-12T08:00:00Z',
    updatedAt: '2023-11-12T08:00:00Z',
    matchScore: 78,
    matchDetails: {
      overallScore: 78,
      skillMatchScore: 75,
      eligibilityScore: 100,
      interestScore: 90,
      matchedSkills: ['Node.js', 'Problem Solving', 'MySQL'],
      partialSkills: [],
      missingSkills: ['Kubernetes'],
      explanation: 'Good match. Your backend skills are solid, but you are lacking Kubernetes experience.'
    }
  },
  
  // Other students
  {
    id: 'APP006',
    studentId: 'STU002',
    studentName: 'Priya Patel',
    opportunityId: 'OPP004',
    opportunityTitle: 'Data Science Intern',
    companyName: 'TCS',
    status: 'selected',
    appliedAt: '2023-10-16T10:00:00Z',
    updatedAt: '2023-11-10T14:00:00Z',
    matchScore: 95,
    matchDetails: {
      overallScore: 95,
      skillMatchScore: 98,
      eligibilityScore: 100,
      interestScore: 100,
      matchedSkills: ['Python', 'Machine Learning', 'Problem Solving'],
      partialSkills: [],
      missingSkills: ['PostgreSQL'],
      explanation: 'Exceptional match. Perfect alignment with ML and Python requirements.'
    }
  },
  {
    id: 'APP007',
    studentId: 'STU002',
    studentName: 'Priya Patel',
    opportunityId: 'OPP005',
    opportunityTitle: 'ML Engineer',
    companyName: 'Infosys',
    status: 'interview',
    appliedAt: '2023-10-19T09:00:00Z',
    updatedAt: '2023-11-12T11:30:00Z',
    matchScore: 89,
    matchDetails: {
      overallScore: 89,
      skillMatchScore: 85,
      eligibilityScore: 100,
      interestScore: 100,
      matchedSkills: ['Python', 'Deep Learning'],
      partialSkills: [],
      missingSkills: ['Docker', 'Azure'],
      explanation: 'Strong match in core ML skills, but missing some deployment skills like Docker and Azure.'
    }
  },
  {
    id: 'APP008',
    studentId: 'STU004',
    studentName: 'Neha Singh',
    opportunityId: 'OPP007',
    opportunityTitle: 'UI/UX Designer Intern',
    companyName: 'Freshworks',
    status: 'shortlisted',
    appliedAt: '2023-10-23T14:15:00Z',
    updatedAt: '2023-11-08T10:00:00Z',
    matchScore: 91,
    matchDetails: {
      overallScore: 91,
      skillMatchScore: 94,
      eligibilityScore: 100,
      interestScore: 100,
      matchedSkills: ['UI/UX Design', 'Figma'],
      partialSkills: [],
      missingSkills: ['HTML/CSS', 'Communication'],
      explanation: 'Excellent match. Your design skills and Figma proficiency perfectly align with the role.'
    }
  },
  {
    id: 'APP009',
    studentId: 'STU005',
    studentName: 'Aditya Gupta',
    opportunityId: 'OPP002',
    opportunityTitle: 'Backend Developer Intern',
    companyName: 'Flipkart',
    status: 'under-review',
    appliedAt: '2023-10-12T11:00:00Z',
    updatedAt: '2023-10-25T16:00:00Z',
    matchScore: 75,
    matchDetails: {
      overallScore: 75,
      skillMatchScore: 60,
      eligibilityScore: 100,
      interestScore: 90,
      matchedSkills: ['Problem Solving'],
      partialSkills: [],
      missingSkills: ['Java', 'Python', 'MySQL'],
      explanation: 'Moderate match. Strong problem solving, but missing specific language requirements like Java or Python.'
    }
  },
  {
    id: 'APP010',
    studentId: 'STU006',
    studentName: 'Ananya Reddy',
    opportunityId: 'OPP005',
    opportunityTitle: 'ML Engineer',
    companyName: 'Infosys',
    status: 'selected',
    appliedAt: '2023-10-20T08:30:00Z',
    updatedAt: '2023-11-15T10:00:00Z',
    matchScore: 96,
    matchDetails: {
      overallScore: 96,
      skillMatchScore: 95,
      eligibilityScore: 100,
      interestScore: 100,
      matchedSkills: ['Python', 'Deep Learning'],
      partialSkills: [],
      missingSkills: ['Docker', 'Azure'],
      explanation: 'Outstanding match. Extremely high proficiency in required ML skills.'
    }
  },
  {
    id: 'APP011',
    studentId: 'STU007',
    studentName: 'Rohan Sharma',
    opportunityId: 'OPP009',
    opportunityTitle: 'Cloud Engineer',
    companyName: 'TCS',
    status: 'interview',
    appliedAt: '2023-10-29T15:45:00Z',
    updatedAt: '2023-11-14T12:00:00Z',
    matchScore: 88,
    matchDetails: {
      overallScore: 88,
      skillMatchScore: 85,
      eligibilityScore: 100,
      interestScore: 100,
      matchedSkills: ['AWS', 'Docker'],
      partialSkills: [],
      missingSkills: ['Azure', 'Communication'],
      explanation: 'Strong candidate. Excellent alignment with AWS and Docker requirements.'
    }
  },
  {
    id: 'APP012',
    studentId: 'STU009',
    studentName: 'Sneha Joshi',
    opportunityId: 'OPP012',
    opportunityTitle: 'Mobile App Developer Intern',
    companyName: 'Freshworks',
    status: 'shortlisted',
    appliedAt: '2023-11-06T10:20:00Z',
    updatedAt: '2023-11-12T09:00:00Z',
    matchScore: 94,
    matchDetails: {
      overallScore: 94,
      skillMatchScore: 96,
      eligibilityScore: 100,
      interestScore: 100,
      matchedSkills: ['React Native', 'JavaScript'],
      partialSkills: [],
      missingSkills: ['UI/UX Design', 'Problem Solving'],
      explanation: 'Excellent match. High proficiency in React Native and JavaScript makes you a top candidate.'
    }
  },
  {
    id: 'APP013',
    studentId: 'STU010',
    studentName: 'Vikram Singh',
    opportunityId: 'OPP011',
    opportunityTitle: 'Python Developer',
    companyName: 'Flipkart',
    status: 'applied',
    appliedAt: '2023-11-04T13:00:00Z',
    updatedAt: '2023-11-04T13:00:00Z',
    matchScore: 92,
    matchDetails: {
      overallScore: 92,
      skillMatchScore: 90,
      eligibilityScore: 100,
      interestScore: 100,
      matchedSkills: ['Python', 'Django', 'PostgreSQL'],
      partialSkills: [],
      missingSkills: ['Problem Solving'],
      explanation: 'Very strong match. You have all the specific technical requirements for this role.'
    }
  },
  {
    id: 'APP014',
    studentId: 'STU003',
    studentName: 'Rahul Kumar',
    opportunityId: 'OPP002',
    opportunityTitle: 'Backend Developer Intern',
    companyName: 'Flipkart',
    status: 'rejected',
    appliedAt: '2023-10-08T09:00:00Z',
    updatedAt: '2023-10-20T14:00:00Z',
    matchScore: 42,
    matchDetails: {
      overallScore: 42,
      skillMatchScore: 35,
      eligibilityScore: 100,
      interestScore: 80,
      matchedSkills: ['Java'],
      partialSkills: [],
      missingSkills: ['Python', 'MySQL', 'Problem Solving'],
      explanation: 'Low match score. While you know Java, you are missing several other key requirements.'
    }
  },
  {
    id: 'APP015',
    studentId: 'STU011',
    studentName: 'Megha Nair',
    opportunityId: 'OPP003',
    opportunityTitle: 'Full Stack Developer',
    companyName: 'Freshworks',
    status: 'under-review',
    appliedAt: '2023-11-01T11:30:00Z',
    updatedAt: '2023-11-05T10:00:00Z',
    matchScore: 55,
    matchDetails: {
      overallScore: 55,
      skillMatchScore: 20,
      eligibilityScore: 100,
      interestScore: 60,
      matchedSkills: ['Communication'],
      partialSkills: [],
      missingSkills: ['React', 'Node.js', 'MySQL', 'AWS'],
      explanation: 'Low skill match. You possess the required soft skills but are missing the core technical stack.'
    }
  }
];
