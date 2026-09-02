import type { Student, Opportunity, MatchDetails, CandidateRanking } from '../types';
import { analyzeSkillGap } from './skill-gap';

export function calculateMatchScore(student: Student, opportunity: Opportunity): MatchDetails {
  // 1. Skill Match (50% weight)
  let skillMatchScore = 0;
  const matchedSkills: string[] = [];
  const partialSkills: string[] = [];
  const missingSkills: string[] = [];
  
  if (opportunity.requiredSkills && opportunity.requiredSkills.length > 0) {
    let totalSkillWeight = 0;
    let earnedSkillPoints = 0;
    
    const skillGaps = analyzeSkillGap(student.skills, opportunity.requiredSkills);
    
    skillGaps.forEach(gap => {
      const reqSkill = opportunity.requiredSkills.find(r => r.skillName === gap.skillName)!;
      let weight = 0.3; // nice-to-have
      if (reqSkill.importance === 'required') weight = 1.0;
      else if (reqSkill.importance === 'preferred') weight = 0.7;
      
      totalSkillWeight += weight;
      
      if (gap.status === 'matched') {
        earnedSkillPoints += weight;
        matchedSkills.push(gap.skillName);
      } else if (gap.status === 'partial') {
        earnedSkillPoints += weight * 0.5;
        partialSkills.push(gap.skillName);
      } else {
        missingSkills.push(gap.skillName);
      }
    });
    
    skillMatchScore = totalSkillWeight > 0 ? (earnedSkillPoints / totalSkillWeight) * 100 : 0;
  } else {
    skillMatchScore = 100; // No required skills means 100% skill match
  }
  
  // 2. Proficiency Level (25% weight)
  let proficiencyScore = 0;
  if (matchedSkills.length > 0) {
    let totalProficiency = 0;
    matchedSkills.forEach(skillName => {
      const reqSkill = opportunity.requiredSkills.find(r => r.skillName === skillName);
      const stuSkill = student.skills.find(s => s.skillName === skillName);
      if (reqSkill && stuSkill) {
        // Capped at 100% per skill
        const profPercentage = Math.min(100, (stuSkill.proficiency / reqSkill.minProficiency) * 100);
        totalProficiency += profPercentage;
      }
    });
    proficiencyScore = totalProficiency / matchedSkills.length;
  } else if (opportunity.requiredSkills && opportunity.requiredSkills.length === 0) {
    proficiencyScore = 100; // Default to 100 if no required skills are defined
  }
  
  // 3. Career Interest Alignment (15% weight)
  let interestScore = 0;
  if (student.careerInterests && student.careerInterests.length > 0) {
    const oppKeywords = `${opportunity.title.toLowerCase()} ${opportunity.type.toLowerCase()}`;
    const matchFound = student.careerInterests.some(interest => 
      oppKeywords.includes(interest.toLowerCase()) || 
      interest.toLowerCase().includes(opportunity.title.toLowerCase())
    );
    interestScore = matchFound ? 100 : 0;
  } else {
    interestScore = 50; // Neutral score if no career interests specified
  }
  
  // 4. Eligibility (10% weight)
  let eligibilityScore = 100;
  const elig = opportunity.eligibility;
  
  if (elig) {
    if (elig.minYear && student.year < elig.minYear) eligibilityScore -= 50;
    if (elig.maxYear && student.year > elig.maxYear) eligibilityScore -= 50;
    if (elig.minCGPA && student.cgpa < elig.minCGPA) eligibilityScore -= 50;
    
    if (elig.departments && elig.departments.length > 0 && 
        !elig.departments.some(d => d.toLowerCase() === student.department.toLowerCase())) {
      eligibilityScore -= 50;
    }
  }
  eligibilityScore = Math.max(0, eligibilityScore);
  
  // Overall Score Calculation (weighted sum)
  const overallScore = Math.round(
    (skillMatchScore * 0.50) +
    (proficiencyScore * 0.25) +
    (interestScore * 0.15) +
    (eligibilityScore * 0.10)
  );
  
  // Generate Explanation
  let explanation = '';
  if (overallScore >= 80) {
    explanation = `Strong match: You meet ${matchedSkills.length} of ${opportunity.requiredSkills?.length || 0} required skills with excellent proficiency.`;
  } else if (overallScore >= 50) {
    explanation = `Good match: You have ${matchedSkills.length} matched skills, but building your ${missingSkills.slice(0, 2).join(' and ')} would improve your chances.`;
  } else {
    explanation = `Potential match: Focus on developing ${missingSkills.slice(0, 2).join(' and ')} to better align with this role.`;
  }
  
  if (eligibilityScore < 100) {
    explanation += ' Note: You may not meet all baseline eligibility criteria (e.g. CGPA, Year, Department).';
  }

  return {
    overallScore,
    skillMatchScore: Math.round(skillMatchScore),
    eligibilityScore: Math.round(eligibilityScore),
    interestScore: Math.round(interestScore),
    matchedSkills,
    partialSkills,
    missingSkills,
    explanation
  };
}

export function rankCandidates(students: Student[], opportunity: Opportunity): CandidateRanking[] {
  const rankings: CandidateRanking[] = students.map(student => {
    const matchDetails = calculateMatchScore(student, opportunity);
    return {
      student,
      matchScore: matchDetails.overallScore,
      matchDetails,
      rank: 0
    };
  });
  
  // Sort descending by match score
  rankings.sort((a, b) => b.matchScore - a.matchScore);
  
  // Assign ranks
  rankings.forEach((r, idx) => {
    r.rank = idx + 1;
  });
  
  return rankings;
}
