import type { Assessment, AssessmentResult } from '../types';

export const assessments: Assessment[] = [
  {
    id: 'ASS001',
    title: 'Full Stack Developer Readiness Assessment',
    description: 'A comprehensive evaluation of frontend, backend, database, and problem-solving skills.',
    category: 'programming',
    duration: 60,
    totalMarks: 100,
    questions: [
      {
        id: 'Q01',
        question: 'What is the output of `typeof null` in JavaScript?',
        options: ['"null"', '"undefined"', '"object"', '"number"'],
        correctAnswer: 2,
        skillId: 'SKL001',
        skillName: 'JavaScript',
        difficulty: 'easy',
        points: 5
      },
      {
        id: 'Q02',
        question: 'Which of the following is a Hook in React?',
        options: ['useData', 'useEffect', 'useReact', 'useClass'],
        correctAnswer: 1,
        skillId: 'SKL006',
        skillName: 'React',
        difficulty: 'easy',
        points: 5
      },
      {
        id: 'Q03',
        question: 'How do you handle asynchronous operations in Node.js?',
        options: ['Promises', 'Callbacks', 'Async/Await', 'All of the above'],
        correctAnswer: 3,
        skillId: 'SKL010',
        skillName: 'Node.js',
        difficulty: 'easy',
        points: 5
      },
      {
        id: 'Q04',
        question: 'Which Python framework is best suited for building APIs quickly?',
        options: ['Django', 'Flask', 'FastAPI', 'Pyramid'],
        correctAnswer: 2,
        skillId: 'SKL002',
        skillName: 'Python',
        difficulty: 'medium',
        points: 5
      },
      {
        id: 'Q05',
        question: 'In SQL, which clause is used to filter records based on aggregated conditions?',
        options: ['WHERE', 'GROUP BY', 'HAVING', 'ORDER BY'],
        correctAnswer: 2,
        skillId: 'SKL014',
        skillName: 'MySQL',
        difficulty: 'medium',
        points: 5
      },
      {
        id: 'Q06',
        question: 'What does CSS stand for?',
        options: ['Cascading Style Sheets', 'Computer Style Sheets', 'Creative Style Sheets', 'Colorful Style Sheets'],
        correctAnswer: 0,
        skillId: 'SKL009',
        skillName: 'HTML/CSS',
        difficulty: 'easy',
        points: 5
      },
      {
        id: 'Q07',
        question: 'Which HTTP method is typically used to update an existing resource?',
        options: ['GET', 'POST', 'PUT', 'DELETE'],
        correctAnswer: 2,
        skillId: 'SKL028',
        skillName: 'Problem Solving',
        difficulty: 'medium',
        points: 5
      },
      {
        id: 'Q08',
        question: 'In React, what is the virtual DOM?',
        options: ['A direct copy of the real DOM kept in memory', 'A browser extension for debugging', 'A completely different paradigm for rendering HTML', 'A Python library'],
        correctAnswer: 0,
        skillId: 'SKL006',
        skillName: 'React',
        difficulty: 'medium',
        points: 5
      },
      {
        id: 'Q09',
        question: 'What is the purpose of Docker?',
        options: ['To create virtual machines', 'To manage databases', 'To containerize applications', 'To deploy physical servers'],
        correctAnswer: 2,
        skillId: 'SKL018',
        skillName: 'Docker',
        difficulty: 'easy',
        points: 5
      },
      {
        id: 'Q10',
        question: 'In Git, how do you save your changes to the local repository?',
        options: ['git push', 'git commit', 'git add', 'git save'],
        correctAnswer: 1,
        skillId: 'SKL020',
        skillName: 'CI/CD', // Map git to CI/CD roughly or problem solving
        difficulty: 'easy',
        points: 5
      },
      {
        id: 'Q11',
        question: 'What is a closure in JavaScript?',
        options: ['A function bundled together with references to its lexical environment', 'A way to close the browser window', 'A method to terminate a loop', 'A secure way to store passwords'],
        correctAnswer: 0,
        skillId: 'SKL001',
        skillName: 'JavaScript',
        difficulty: 'hard',
        points: 5
      },
      {
        id: 'Q12',
        question: 'Which of these is NOT a NoSQL database?',
        options: ['MongoDB', 'Cassandra', 'PostgreSQL', 'Redis'],
        correctAnswer: 2,
        skillId: 'SKL015',
        skillName: 'PostgreSQL',
        difficulty: 'medium',
        points: 5
      },
      {
        id: 'Q13',
        question: 'What does MVC stand for?',
        options: ['Model View Component', 'Model View Controller', 'Main View Controller', 'Model Visual Controller'],
        correctAnswer: 1,
        skillId: 'SKL028',
        skillName: 'Problem Solving',
        difficulty: 'easy',
        points: 5
      },
      {
        id: 'Q14',
        question: 'In Python, what is the output of `[1, 2, 3] * 2`?',
        options: ['[2, 4, 6]', '[1, 2, 3, 1, 2, 3]', 'Error', '[[1, 2, 3], [1, 2, 3]]'],
        correctAnswer: 1,
        skillId: 'SKL002',
        skillName: 'Python',
        difficulty: 'medium',
        points: 5
      },
      {
        id: 'Q15',
        question: 'Which cloud provider offers the S3 storage service?',
        options: ['Google Cloud', 'Microsoft Azure', 'AWS', 'IBM Cloud'],
        correctAnswer: 2,
        skillId: 'SKL021',
        skillName: 'AWS',
        difficulty: 'easy',
        points: 5
      },
      {
        id: 'Q16',
        question: 'What is the time complexity of binary search?',
        options: ['O(1)', 'O(n)', 'O(log n)', 'O(n^2)'],
        correctAnswer: 2,
        skillId: 'SKL028',
        skillName: 'Problem Solving',
        difficulty: 'hard',
        points: 5
      },
      {
        id: 'Q17',
        question: 'Which command is used to run a React application locally?',
        options: ['npm start', 'npm run build', 'node index.js', 'react-scripts start'],
        correctAnswer: 0,
        skillId: 'SKL006',
        skillName: 'React',
        difficulty: 'easy',
        points: 5
      },
      {
        id: 'Q18',
        question: 'What does a 404 status code mean?',
        options: ['Server Error', 'Bad Request', 'Unauthorized', 'Not Found'],
        correctAnswer: 3,
        skillId: 'SKL028',
        skillName: 'Problem Solving',
        difficulty: 'easy',
        points: 5
      },
      {
        id: 'Q19',
        question: 'What is the purpose of middleware in Express.js?',
        options: ['To style the frontend', 'To execute code during the request-response cycle', 'To define database schemas', 'To host the application'],
        correctAnswer: 1,
        skillId: 'SKL010',
        skillName: 'Node.js',
        difficulty: 'medium',
        points: 5
      },
      {
        id: 'Q20',
        question: 'When effectively communicating a technical problem to a non-technical stakeholder, you should:',
        options: ['Use complex jargon to sound professional', 'Provide only the final solution, not the problem', 'Use analogies and focus on business impact', 'Tell them it\'s too complex to explain'],
        correctAnswer: 2,
        skillId: 'SKL027',
        skillName: 'Communication',
        difficulty: 'medium',
        points: 5
      }
    ]
  }
];

export const demoAssessmentResult: AssessmentResult = {
  assessmentId: 'ASS001',
  studentId: 'STU001',
  answers: [2, 1, 3, 2, 2, 0, 2, 0, 2, 1, 0, 2, 1, 1, 2, 2, 0, 3, 1, 2], // All correct
  score: 95, // Let's say 1 mistake
  totalMarks: 100,
  percentage: 95,
  skillScores: [
    { skillName: 'JavaScript', score: 10, total: 10, percentage: 100 },
    { skillName: 'React', score: 15, total: 15, percentage: 100 },
    { skillName: 'Node.js', score: 10, total: 10, percentage: 100 },
    { skillName: 'Python', score: 10, total: 10, percentage: 100 },
    { skillName: 'MySQL', score: 5, total: 5, percentage: 100 },
    { skillName: 'Problem Solving', score: 20, total: 25, percentage: 80 },
    { skillName: 'Docker', score: 5, total: 5, percentage: 100 },
    { skillName: 'AWS', score: 5, total: 5, percentage: 100 },
    { skillName: 'Communication', score: 5, total: 5, percentage: 100 },
    { skillName: 'PostgreSQL', score: 5, total: 5, percentage: 100 },
    { skillName: 'HTML/CSS', score: 5, total: 5, percentage: 100 }
  ],
  completedAt: '2023-11-01T10:30:00Z'
};
