import type { Student, Opportunity } from '../types';

const SKILL_CATEGORIES: Record<string, string[]> = {
  Programming: ['JavaScript', 'Python', 'Java', 'C++', 'TypeScript'],
  'Web Dev': ['React', 'Angular', 'Vue.js', 'HTML/CSS', 'Node.js', 'Express'],
  Database: ['MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'SQL'],
  Cloud: ['AWS', 'Azure', 'Docker', 'Kubernetes', 'CI/CD'],
  'AI/ML': ['Machine Learning', 'Deep Learning', 'NLP', 'TensorFlow'],
  'Soft Skills': ['Communication', 'Problem Solving', 'Teamwork', 'Leadership'],
};

function avgProficiency(students: Student[], skillNames: string[]): number {
  const scores: number[] = [];
  for (const student of students) {
    for (const skill of student.skills) {
      if (skillNames.some(n => n.toLowerCase() === skill.skillName.toLowerCase())) {
        scores.push(skill.proficiency);
      }
    }
  }
  return scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;
}

export function computeCategoryRadar(students: Student[], opportunities: Opportunity[]) {
  const categories = Object.keys(SKILL_CATEGORIES);
  return categories.map(subject => {
    const skillNames = SKILL_CATEGORIES[subject];
    const studentAvg = avgProficiency(students, skillNames);

    const demandScores: number[] = [];
    for (const opp of opportunities) {
      for (const req of opp.requiredSkills) {
        if (skillNames.some(n => n.toLowerCase() === req.skillName.toLowerCase())) {
          demandScores.push(req.minProficiency);
        }
      }
    }
    const industryRequired = demandScores.length
      ? Math.round(demandScores.reduce((a, b) => a + b, 0) / demandScores.length)
      : 0;

    return { subject, studentAvg, industryRequired };
  });
}

export function computeDemandSupply(students: Student[], opportunities: Opportunity[]) {
  const skillDemand = new Map<string, { demand: number; count: number }>();
  const skillSupply = new Map<string, number[]>();

  for (const opp of opportunities) {
    for (const req of opp.requiredSkills) {
      const key = req.skillName;
      const existing = skillDemand.get(key) ?? { demand: 0, count: 0 };
      skillDemand.set(key, {
        demand: existing.demand + req.minProficiency,
        count: existing.count + 1,
      });
    }
  }

  for (const student of students) {
    for (const skill of student.skills) {
      const list = skillSupply.get(skill.skillName) ?? [];
      list.push(skill.proficiency);
      skillSupply.set(skill.skillName, list);
    }
  }

  const allSkills = new Set([...skillDemand.keys(), ...skillSupply.keys()]);
  const results = Array.from(allSkills).map(name => {
    const demandInfo = skillDemand.get(name);
    const supplyList = skillSupply.get(name) ?? [];
    return {
      name,
      demand: demandInfo ? Math.round(demandInfo.demand / demandInfo.count) : 0,
      supply: supplyList.length
        ? Math.round(supplyList.reduce((a, b) => a + b, 0) / supplyList.length)
        : 0,
    };
  });

  return results
    .filter(r => r.demand > 0)
    .sort((a, b) => b.demand - a.demand)
    .slice(0, 8);
}

export function computeDepartmentHeatmap(students: Student[]) {
  const departments = Array.from(new Set(students.map(s => s.department)));
  const categories = Object.keys(SKILL_CATEGORIES);

  return departments.map(dept => {
    const deptStudents = students.filter(s => s.department === dept);
    const row: Record<string, string | number> = { department: dept };
    for (const category of categories) {
      row[category] = avgProficiency(deptStudents, SKILL_CATEGORIES[category]);
    }
    return row;
  });
}

export function computeTopSkillGaps(students: Student[], opportunities: Opportunity[]) {
  const gaps = new Map<string, { totalGap: number; count: number }>();

  for (const opp of opportunities) {
    for (const req of opp.requiredSkills) {
      if (req.importance !== 'required') continue;
      const proficiencies = students
        .map(s => s.skills.find(sk => sk.skillName.toLowerCase() === req.skillName.toLowerCase())?.proficiency ?? 0);
      const avgCurrent = proficiencies.length
        ? proficiencies.reduce((a, b) => a + b, 0) / proficiencies.length
        : 0;
      const gap = Math.max(0, req.minProficiency - avgCurrent);
      const existing = gaps.get(req.skillName) ?? { totalGap: 0, count: 0 };
      gaps.set(req.skillName, { totalGap: existing.totalGap + gap, count: existing.count + 1 });
    }
  }

  return Array.from(gaps.entries())
    .map(([skill, data]) => ({ skill, gap: Math.round(data.totalGap / data.count) }))
    .sort((a, b) => b.gap - a.gap)
    .slice(0, 6);
}

export function computePlacementTrend(applications: { status: string; updatedAt: string }[]) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  return months.map((month, idx) => ({
    month,
    placements: applications.filter(a => {
      if (a.status !== 'selected') return false;
      const d = new Date(a.updatedAt);
      return d.getMonth() <= idx + 1;
    }).length,
  }));
}

export { SKILL_CATEGORIES };
