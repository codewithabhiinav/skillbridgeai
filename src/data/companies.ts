import type { Company } from '../types';

export const companies: Company[] = [
  {
    id: 'COM001',
    name: 'TCS',
    industry: 'IT Services',
    size: '10000+',
    location: 'Mumbai, India',
    website: 'https://www.tcs.com',
    description: 'Tata Consultancy Services is an Indian multinational information technology services and consulting company.',
    founded: '1968',
    techStack: ['Java', 'Spring Boot', 'Python', 'AWS', 'Angular']
  },
  {
    id: 'COM002',
    name: 'Infosys',
    industry: 'IT Services',
    size: '10000+',
    location: 'Bangalore, India',
    website: 'https://www.infosys.com',
    description: 'Infosys Limited is an Indian multinational information technology company that provides business consulting, information technology and outsourcing services.',
    founded: '1981',
    techStack: ['Java', 'React', 'Node.js', 'Python', 'Azure']
  },
  {
    id: 'COM003',
    name: 'Razorpay',
    industry: 'Fintech',
    size: '1000-5000',
    location: 'Bangalore, India',
    website: 'https://razorpay.com',
    description: 'Razorpay is an Indian payment gateway that allows businesses to accept, process, and disburse payments.',
    founded: '2014',
    techStack: ['React', 'Node.js', 'Go', 'PHP', 'Kubernetes']
  },
  {
    id: 'COM004',
    name: 'Flipkart',
    industry: 'E-commerce',
    size: '10000+',
    location: 'Bangalore, India',
    website: 'https://www.flipkart.com',
    description: 'Flipkart is an Indian e-commerce company, headquartered in Bangalore, and incorporated in Singapore as a private limited company.',
    founded: '2007',
    techStack: ['Java', 'Python', 'React', 'Machine Learning', 'Big Data']
  },
  {
    id: 'COM005',
    name: 'Freshworks',
    industry: 'SaaS',
    size: '1000-5000',
    location: 'Chennai, India',
    website: 'https://www.freshworks.com',
    description: 'Freshworks Inc. is an American customer engagement software company that provides a software-as-a-service platform.',
    founded: '2010',
    techStack: ['Ruby on Rails', 'React', 'Ember.js', 'AWS', 'MySQL']
  }
];
