

import type { Opportunity } from '../types';

export const opportunities: Opportunity[] = [
  {
    id: 'OPP001',
    companyId: 'COM003',
    companyName: 'Razorpay',
    title: 'Frontend Developer Intern',
    type: 'internship',
    description: 'Join our frontend team to build scalable and highly performant user interfaces for millions of merchants.',
    requirements: [
      'Strong understanding of HTML, CSS, and JavaScript',
      'Experience with React and modern frontend tools',
      'Good understanding of REST APIs',
      'Problem-solving mindset'
    ],
    requiredSkills: [
      { skillName: 'React', importance: 'required', minProficiency: 70 },
      { skillName: 'JavaScript', importance: 'required', minProficiency: 75 },
      { skillName: 'HTML/CSS', importance: 'required', minProficiency: 80 },
      { skillName: 'TypeScript', importance: 'preferred', minProficiency: 50 }
    ],
    location: 'Bangalore, India',
    workMode: 'hybrid',
    duration: '6 months',
    stipend: '₹40,000 / month',
    eligibility: {
      minYear: 3,
      maxYear: 4,
      departments: ['CSE', 'IT', 'ECE'],
      minCGPA: 7.5
    },
    postedAt: '2023-10-01T10:00:00Z',
    deadline: '2023-11-15T23:59:59Z',
    applicants: 452,
    status: 'active'
  },
  {
    id: 'OPP002',
    companyId: 'COM004',
    companyName: 'Flipkart',
    title: 'Backend Developer Intern',
    type: 'internship',
    description: 'Work on building highly scalable microservices that power India\'s largest e-commerce platform.',
    requirements: [
      'Strong knowledge of Data Structures and Algorithms',
      'Experience with Java or Python',
      'Basic understanding of databases',
      'Familiarity with Git'
    ],
    requiredSkills: [
      { skillName: 'Java', importance: 'required', minProficiency: 75 },
      { skillName: 'Python', importance: 'preferred', minProficiency: 60 },
      { skillName: 'MySQL', importance: 'required', minProficiency: 65 },
      { skillName: 'Problem Solving', importance: 'required', minProficiency: 80 }
    ],
    location: 'Bangalore, India',
    workMode: 'onsite',
    duration: '6 months',
    stipend: '₹50,000 / month',
    eligibility: {
      minYear: 4,
      maxYear: 4,
      departments: ['CSE', 'IT'],
      minCGPA: 8.0
    },
    postedAt: '2023-10-05T09:00:00Z',
    deadline: '2023-11-10T23:59:59Z',
    applicants: 890,
    status: 'active'
  },
  {
    id: 'OPP003',
    companyId: 'COM005',
    companyName: 'Freshworks',
    title: 'Full Stack Developer',
    type: 'job',
    description: 'Build and maintain full-stack features for our core SaaS products used by thousands of businesses globally.',
    requirements: [
      'Proficiency in React and Node.js',
      'Experience with relational databases',
      'Knowledge of cloud platforms (AWS preferred)',
      'Strong communication skills'
    ],
    requiredSkills: [
      { skillName: 'React', importance: 'required', minProficiency: 75 },
      { skillName: 'Node.js', importance: 'required', minProficiency: 70 },
      { skillName: 'MySQL', importance: 'required', minProficiency: 65 },
      { skillName: 'AWS', importance: 'preferred', minProficiency: 50 },
      { skillName: 'Communication', importance: 'required', minProficiency: 80 }
    ],
    location: 'Chennai, India',
    workMode: 'hybrid',
    salary: '₹12,00,000 - ₹18,00,000 / year',
    eligibility: {
      minYear: 4,
      departments: ['CSE', 'IT', 'ECE', 'EEE'],
      minCGPA: 7.0
    },
    postedAt: '2023-10-10T11:00:00Z',
    deadline: '2023-11-30T23:59:59Z',
    applicants: 1205,
    status: 'active'
  },
  {
    id: 'OPP004',
    companyId: 'COM001',
    companyName: 'TCS',
    title: 'Data Science Intern',
    type: 'internship',
    description: 'Work with vast amounts of data to derive meaningful insights and build predictive models for enterprise clients.',
    requirements: [
      'Strong foundation in statistics and probability',
      'Proficiency in Python and its data science ecosystem',
      'Basic knowledge of Machine Learning algorithms',
      'Experience with SQL'
    ],
    requiredSkills: [
      { skillName: 'Python', importance: 'required', minProficiency: 80 },
      { skillName: 'Machine Learning', importance: 'required', minProficiency: 65 },
      { skillName: 'PostgreSQL', importance: 'preferred', minProficiency: 60 },
      { skillName: 'Problem Solving', importance: 'required', minProficiency: 75 }
    ],
    location: 'Mumbai, India',
    workMode: 'hybrid',
    duration: '3 months',
    stipend: '₹25,000 / month',
    eligibility: {
      minYear: 3,
      maxYear: 4,
      departments: ['CSE', 'IT', 'Mathematics', 'Statistics'],
      minCGPA: 7.5
    },
    postedAt: '2023-10-15T08:00:00Z',
    deadline: '2023-11-20T23:59:59Z',
    applicants: 630,
    status: 'active'
  },
  {
    id: 'OPP005',
    companyId: 'COM002',
    companyName: 'Infosys',
    title: 'ML Engineer',
    type: 'job',
    description: 'Deploy and scale machine learning models in production environments for global clients.',
    requirements: [
      'Experience with Python and deep learning frameworks',
      'Knowledge of model deployment and MLOps',
      'Familiarity with cloud platforms (Azure/AWS)',
      'Strong software engineering practices'
    ],
    requiredSkills: [
      { skillName: 'Python', importance: 'required', minProficiency: 80 },
      { skillName: 'Deep Learning', importance: 'required', minProficiency: 70 },
      { skillName: 'Docker', importance: 'preferred', minProficiency: 60 },
      { skillName: 'Azure', importance: 'preferred', minProficiency: 55 }
    ],
    location: 'Bangalore, India',
    workMode: 'remote',
    salary: '₹10,00,000 - ₹15,00,000 / year',
    eligibility: {
      minYear: 4,
      departments: ['CSE', 'IT', 'ECE'],
      minCGPA: 7.0
    },
    postedAt: '2023-10-18T14:00:00Z',
    deadline: '2023-12-05T23:59:59Z',
    applicants: 420,
    status: 'active'
  },
  {
    id: 'OPP006',
    companyId: 'COM004',
    companyName: 'Flipkart',
    title: 'DevOps Engineer Intern',
    type: 'internship',
    description: 'Help build and maintain infrastructure as code, CI/CD pipelines, and monitor system health.',
    requirements: [
      'Understanding of Linux systems',
      'Basic knowledge of Docker and containers',
      'Familiarity with shell scripting or Python',
      'Interest in scalable systems'
    ],
    requiredSkills: [
      { skillName: 'Docker', importance: 'required', minProficiency: 65 },
      { skillName: 'CI/CD', importance: 'required', minProficiency: 60 },
      { skillName: 'Python', importance: 'preferred', minProficiency: 50 },
      { skillName: 'AWS', importance: 'preferred', minProficiency: 55 }
    ],
    location: 'Bangalore, India',
    workMode: 'hybrid',
    duration: '6 months',
    stipend: '₹45,000 / month',
    eligibility: {
      minYear: 3,
      maxYear: 4,
      departments: ['CSE', 'IT'],
      minCGPA: 7.0
    },
    postedAt: '2023-10-20T10:30:00Z',
    deadline: '2023-11-25T23:59:59Z',
    applicants: 310,
    status: 'active'
  },
  {
    id: 'OPP007',
    companyId: 'COM005',
    companyName: 'Freshworks',
    title: 'UI/UX Designer Intern',
    type: 'internship',
    description: 'Create intuitive, engaging, and beautiful enterprise software interfaces.',
    requirements: [
      'Strong portfolio demonstrating UI/UX skills',
      'Proficiency in Figma or similar tools',
      'Understanding of user-centered design principles',
      'Basic knowledge of HTML/CSS is a plus'
    ],
    requiredSkills: [
      { skillName: 'UI/UX Design', importance: 'required', minProficiency: 75 },
      { skillName: 'Figma', importance: 'required', minProficiency: 80 },
      { skillName: 'HTML/CSS', importance: 'preferred', minProficiency: 40 },
      { skillName: 'Communication', importance: 'required', minProficiency: 70 }
    ],
    location: 'Chennai, India',
    workMode: 'hybrid',
    duration: '3 months',
    stipend: '₹30,000 / month',
    eligibility: {
      minYear: 2,
      maxYear: 4,
      departments: ['Any'],
      minCGPA: 6.5
    },
    postedAt: '2023-10-22T09:15:00Z',
    deadline: '2023-11-30T23:59:59Z',
    applicants: 540,
    status: 'active'
  },
  {
    id: 'OPP008',
    companyId: 'COM003',
    companyName: 'Razorpay',
    title: 'Software Engineer',
    type: 'job',
    description: 'Join our core payments team to build fault-tolerant, high-throughput systems.',
    requirements: [
      'Strong computer science fundamentals',
      'Experience in building scalable backend systems',
      'Proficiency in Go, Java, or Node.js',
      'Knowledge of distributed systems'
    ],
    requiredSkills: [
      { skillName: 'Node.js', importance: 'required', minProficiency: 80 },
      { skillName: 'MySQL', importance: 'required', minProficiency: 75 },
      { skillName: 'Problem Solving', importance: 'required', minProficiency: 85 },
      { skillName: 'Kubernetes', importance: 'preferred', minProficiency: 60 }
    ],
    location: 'Bangalore, India',
    workMode: 'onsite',
    salary: '₹18,00,000 - ₹24,00,000 / year',
    eligibility: {
      minYear: 4,
      departments: ['CSE', 'IT'],
      minCGPA: 8.0
    },
    postedAt: '2023-10-25T11:45:00Z',
    deadline: '2023-12-10T23:59:59Z',
    applicants: 1560,
    status: 'active'
  },
  {
    id: 'OPP009',
    companyId: 'COM001',
    companyName: 'TCS',
    title: 'Cloud Engineer',
    type: 'job',
    description: 'Help enterprises migrate to the cloud and optimize their infrastructure.',
    requirements: [
      'Solid understanding of cloud computing concepts',
      'Hands-on experience with AWS or Azure',
      'Knowledge of infrastructure as code (Terraform)',
      'Understanding of networking and security'
    ],
    requiredSkills: [
      { skillName: 'AWS', importance: 'required', minProficiency: 75 },
      { skillName: 'Azure', importance: 'preferred', minProficiency: 60 },
      { skillName: 'Docker', importance: 'required', minProficiency: 65 },
      { skillName: 'Communication', importance: 'required', minProficiency: 75 }
    ],
    location: 'Pune, India',
    workMode: 'remote',
    salary: '₹8,00,000 - ₹12,00,000 / year',
    eligibility: {
      minYear: 4,
      departments: ['CSE', 'IT', 'ECE'],
      minCGPA: 6.5
    },
    postedAt: '2023-10-28T16:00:00Z',
    deadline: '2023-12-15T23:59:59Z',
    applicants: 780,
    status: 'active'
  },
  {
    id: 'OPP010',
    companyId: 'COM002',
    companyName: 'Infosys',
    title: 'React Developer',
    type: 'job',
    description: 'Build modern, responsive web applications for international clients.',
    requirements: [
      'Strong proficiency in JavaScript and React',
      'Experience with state management libraries (Redux)',
      'Familiarity with RESTful APIs',
      'Knowledge of modern authorization mechanisms'
    ],
    requiredSkills: [
      { skillName: 'React', importance: 'required', minProficiency: 80 },
      { skillName: 'JavaScript', importance: 'required', minProficiency: 85 },
      { skillName: 'HTML/CSS', importance: 'required', minProficiency: 75 },
      { skillName: 'TypeScript', importance: 'preferred', minProficiency: 65 }
    ],
    location: 'Hyderabad, India',
    workMode: 'hybrid',
    salary: '₹7,00,000 - ₹10,00,000 / year',
    eligibility: {
      minYear: 4,
      departments: ['Any'],
      minCGPA: 6.0
    },
    postedAt: '2023-11-01T09:30:00Z',
    deadline: '2023-12-20T23:59:59Z',
    applicants: 1120,
    status: 'active'
  },
  {
    id: 'OPP011',
    companyId: 'COM004',
    companyName: 'Flipkart',
    title: 'Python Developer',
    type: 'job',
    description: 'Develop scalable backend systems and internal tools using Python.',
    requirements: [
      'Strong programming skills in Python',
      'Experience with Django or Flask',
      'Good understanding of database design',
      'Experience with unit testing'
    ],
    requiredSkills: [
      { skillName: 'Python', importance: 'required', minProficiency: 80 },
      { skillName: 'Django', importance: 'required', minProficiency: 70 },
      { skillName: 'PostgreSQL', importance: 'required', minProficiency: 65 },
      { skillName: 'Problem Solving', importance: 'required', minProficiency: 75 }
    ],
    location: 'Bangalore, India',
    workMode: 'hybrid',
    salary: '₹15,00,000 - ₹20,00,000 / year',
    eligibility: {
      minYear: 4,
      departments: ['CSE', 'IT'],
      minCGPA: 7.5
    },
    postedAt: '2023-11-03T10:00:00Z',
    deadline: '2023-12-05T23:59:59Z',
    applicants: 940,
    status: 'active'
  },
  {
    id: 'OPP012',
    companyId: 'COM005',
    companyName: 'Freshworks',
    title: 'Mobile App Developer Intern',
    type: 'internship',
    description: 'Help build the next generation of our mobile applications using cross-platform technologies.',
    requirements: [
      'Experience building mobile apps (personal or academic projects)',
      'Knowledge of React Native or Flutter',
      'Understanding of mobile app design guidelines',
      'Passion for building smooth user experiences'
    ],
    requiredSkills: [
      { skillName: 'React Native', importance: 'required', minProficiency: 65 },
      { skillName: 'JavaScript', importance: 'required', minProficiency: 70 },
      { skillName: 'UI/UX Design', importance: 'preferred', minProficiency: 50 },
      { skillName: 'Problem Solving', importance: 'required', minProficiency: 60 }
    ],
    location: 'Chennai, India',
    workMode: 'remote',
    duration: '4 months',
    stipend: '₹35,000 / month',
    eligibility: {
      minYear: 3,
      maxYear: 4,
      departments: ['CSE', 'IT', 'ECE'],
      minCGPA: 7.0
    },
    postedAt: '2023-11-05T14:30:00Z',
    deadline: '2023-12-15T23:59:59Z',
    applicants: 380,
    status: 'active'
  }
];
