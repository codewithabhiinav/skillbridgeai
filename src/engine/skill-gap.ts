import type { StudentSkill, RequiredSkill, SkillGap } from '../types';

export function analyzeSkillGap(studentSkills: StudentSkill[], requiredSkills: RequiredSkill[]): SkillGap[] {
  return requiredSkills.map(reqSkill => {
    const studentSkill = studentSkills.find(s => s.skillName.toLowerCase() === reqSkill.skillName.toLowerCase());
    
    const required = reqSkill.minProficiency;
    const current = studentSkill ? studentSkill.proficiency : 0;
    const gap = Math.max(0, required - current);
    
    let status: 'matched' | 'partial' | 'missing' = 'missing';
    let recommendation = '';
    
    if (studentSkill) {
      const percentageOfRequired = (current / required) * 100;
      
      if (current >= required) {
        status = 'matched';
      } else if (percentageOfRequired >= 40) {
        status = 'partial';
        recommendation = `Improve your ${reqSkill.skillName} skills to reach the required level. Focus on advanced concepts.`;
      } else {
        status = 'missing';
        recommendation = `Your ${reqSkill.skillName} proficiency is significantly below the requirement. Start with foundational courses.`;
      }
    } else {
      status = 'missing';
      recommendation = `You are missing ${reqSkill.skillName}, which is ${reqSkill.importance}. Start learning the basics.`;
    }
    
    return {
      skillName: reqSkill.skillName,
      required,
      current,
      gap,
      status,
      recommendation
    };
  });
}
