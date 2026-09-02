import type { 
  Student, 
  Opportunity, 
  MatchDetails, 
  RequiredSkill, 
  LearningResource, 
  SkillGap,
  SkillGapReport,
  LearningRecommendation
} from '../types';
import { analyzeSkillGap } from './skill-gap';
import { calculateMatchScore } from './matching';

export function getSkillGapReport(student: Student, targetRole: string, requiredSkills: RequiredSkill[], learningResources: LearningResource[]): SkillGapReport {
  const gaps = analyzeSkillGap(student.skills, requiredSkills);
  
  const matchedSkills = gaps.filter(g => g.status === 'matched');
  const partialSkills = gaps.filter(g => g.status === 'partial');
  const missingSkills = gaps.filter(g => g.status === 'missing');
  
  const total = gaps.length;
  const overallMatch = total > 0 ? Math.round(((matchedSkills.length + (partialSkills.length * 0.5)) / total) * 100) : 100;
  
  const recommendations = getLearningRecommendations([...partialSkills, ...missingSkills], learningResources);
  
  return {
    targetRole,
    overallMatch,
    matchedSkills,
    partialSkills,
    missingSkills,
    recommendations
  };
}

export function getRecommendedOpportunities(student: Student, opportunities: Opportunity[]): Array<{opportunity: Opportunity; matchDetails: MatchDetails}> {
  const recommendations = opportunities.map(opportunity => {
    return {
      opportunity,
      matchDetails: calculateMatchScore(student, opportunity)
    };
  });
  
  return recommendations
    .filter(r => r.matchDetails.overallScore >= 40)
    .sort((a, b) => b.matchDetails.overallScore - a.matchDetails.overallScore);
}

export function getLearningRecommendations(gaps: SkillGap[], resources: LearningResource[]): LearningRecommendation[] {
  return gaps.map(gap => {
    const matchingResources = resources.filter(r => r.skillName.toLowerCase() === gap.skillName.toLowerCase());
    
    let priority: 'high' | 'medium' | 'low' = 'low';
    let reason = '';
    
    if (gap.status === 'missing') {
      priority = 'high';
      reason = `You are missing ${gap.skillName} entirely. These foundational resources will help you get started.`;
    } else if (gap.status === 'partial') {
      priority = 'medium';
      reason = `Your ${gap.skillName} proficiency is at ${gap.current}%, but ${gap.required}% is required. Use these to bridge the gap.`;
    } else {
      priority = 'low';
      reason = `Continue mastering ${gap.skillName} with these advanced resources.`;
    }
    
    return {
      skillName: gap.skillName,
      reason,
      resources: matchingResources,
      priority
    };
  });
}
