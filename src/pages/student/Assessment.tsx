import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { useNavigate } from 'react-router-dom';
import { Clock } from 'lucide-react';

export default function AssessmentPage() {
  const { user, refreshStudentUser } = useAuth();
  const { assessments, applyAssessmentResults } = useData();
  const navigate = useNavigate();

  const [started, setStarted] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  // For demo, we just use the first assessment available
  const assessment = assessments[0];

  if (!assessment) return <div className="p-8">No assessments available.</div>;

  const startAssessment = () => {
    setStarted(true);
    setAnswers(new Array(assessment.questions.length).fill(-1));
  };

  const handleOptionSelect = (optionIdx: number) => {
    const newAnswers = [...answers];
    newAnswers[currentIdx] = optionIdx;
    setAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (currentIdx < assessment.questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
    }
  };

  const prevQuestion = () => {
    if (currentIdx > 0) {
      setCurrentIdx(currentIdx - 1);
    }
  };

  const submitAssessment = () => {
    // Calculate score
    let score = 0;
    const skillScoresMap: Record<string, { earned: number, total: number }> = {};

    assessment.questions.forEach((q, idx) => {
      if (!skillScoresMap[q.skillName]) {
        skillScoresMap[q.skillName] = { earned: 0, total: 0 };
      }
      skillScoresMap[q.skillName].total += q.points;

      if (answers[idx] === q.correctAnswer) {
        score += q.points;
        skillScoresMap[q.skillName].earned += q.points;
      }
    });

    const percentage = (score / assessment.totalMarks) * 100;
    
    const skillScores = Object.entries(skillScoresMap).map(([skillName, data]) => ({
      skillName,
      score: data.earned,
      total: data.total,
      percentage: (data.earned / data.total) * 100
    }));

    const result = {
      assessmentId: assessment.id,
      studentId: user!.id,
      answers,
      score,
      totalMarks: assessment.totalMarks,
      percentage,
      skillScores,
      completedAt: new Date().toISOString()
    };

    applyAssessmentResults(user!.id, result);
    refreshStudentUser();
    navigate('/student/assessment/result', { state: { result } });
  };

  if (!started) {
    return (
      <div className="max-w-3xl mx-auto p-6 mt-12 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 text-center">
        <div className="w-20 h-20 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <Clock size={40} />
        </div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Comprehensive Skill Assessment</h1>
        <p className="text-slate-500 mb-8 text-lg">Test your knowledge across {new Set(assessment.questions.map(q => q.skillName)).size} skill areas to build your AI profile and get personalized opportunities.</p>
        
        <div className="grid grid-cols-3 gap-4 mb-10 text-left">
          <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
            <p className="text-sm text-slate-500 font-medium">Duration</p>
            <p className="text-lg font-semibold dark:text-white">~{assessment.duration} minutes</p>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
            <p className="text-sm text-slate-500 font-medium">Questions</p>
            <p className="text-lg font-semibold dark:text-white">{assessment.questions.length}</p>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
            <p className="text-sm text-slate-500 font-medium">Total Marks</p>
            <p className="text-lg font-semibold dark:text-white">{assessment.totalMarks}</p>
          </div>
        </div>

        <button onClick={startAssessment} className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-3 rounded-xl font-bold text-lg transition-colors w-full md:w-auto">
          Start Assessment Now
        </button>
      </div>
    );
  }

  const question = assessment.questions[currentIdx];
  const progress = ((currentIdx + 1) / assessment.questions.length) * 100;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="mb-8">
        <div className="flex justify-between text-sm font-medium text-slate-500 mb-2">
          <span>Question {currentIdx + 1} of {assessment.questions.length}</span>
          <span>{Math.round(progress)}% Completed</span>
        </div>
        <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
          <div className="h-full bg-cyan-500 transition-all duration-300" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-8">
        <div className="inline-block px-3 py-1 bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 rounded-full text-xs font-bold mb-6">
          {question.skillName} • {question.difficulty}
        </div>
        
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">{question.question}</h2>
        
        <div className="space-y-4 mb-10">
          {question.options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => handleOptionSelect(idx)}
              className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center gap-4 ${
                answers[currentIdx] === idx 
                  ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-900/20 text-cyan-900 dark:text-cyan-100' 
                  : 'border-slate-200 dark:border-slate-700 hover:border-cyan-200 dark:hover:border-cyan-800 text-slate-700 dark:text-slate-300'
              }`}
            >
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                answers[currentIdx] === idx ? 'border-cyan-500' : 'border-slate-300 dark:border-slate-600'
              }`}>
                {answers[currentIdx] === idx && <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>}
              </div>
              <span className="font-medium">{opt}</span>
            </button>
          ))}
        </div>

        <div className="flex justify-between items-center pt-6 border-t border-slate-100 dark:border-slate-700">
          <button 
            onClick={prevQuestion} 
            disabled={currentIdx === 0}
            className="px-6 py-2 rounded-lg font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          
          {currentIdx === assessment.questions.length - 1 ? (
            <button 
              onClick={submitAssessment}
              disabled={answers.includes(-1)}
              className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-2 rounded-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Submit Assessment
            </button>
          ) : (
            <button 
              onClick={nextQuestion}
              className="bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-white text-white dark:text-slate-900 px-8 py-2 rounded-lg font-bold"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
