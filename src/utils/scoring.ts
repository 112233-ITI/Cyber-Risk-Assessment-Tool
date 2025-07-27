import { Answer, Question, ComplianceFramework, VulnerabilityData, ThreatIntelligence } from '../types';
import { riskAssessmentQuestions } from '../data/questions';

export const calculateQuestionScore = (question: Question, answer: Answer): number => {
  let score = 0;
  
  switch (question.type) {
    case 'boolean':
      score = answer.value === true ? question.weight : 0;
      break;
    case 'scale':
      const scaleValue = answer.value as number;
      score = (scaleValue / 5) * question.weight;
      break;
    case 'multiple':
      const selectedOption = answer.value as string;
      const optionIndex = question.options?.indexOf(selectedOption) || 0;
      const optionCount = question.options?.length || 1;
      // Higher index = better security (reverse scoring for some questions)
      if (question.id.includes('emp-001') || question.id.includes('inc-002') || question.id.includes('comp-002')) {
        score = ((optionCount - optionIndex - 1) / (optionCount - 1)) * question.weight;
      } else if (question.id.includes('acc-002')) {
        // For access review frequency, more frequent is better
        score = ((optionCount - optionIndex - 1) / (optionCount - 1)) * question.weight;
      } else {
        score = (optionIndex / (optionCount - 1)) * question.weight;
      }
      break;
  }
  
  return Math.round(score * 100) / 100;
};

export const calculateOverallScore = (answers: Answer[]): number => {
  const totalPossibleScore = riskAssessmentQuestions.reduce((sum, q) => sum + q.weight, 0);
  const actualScore = answers.reduce((sum, answer) => {
    const question = riskAssessmentQuestions.find(q => q.id === answer.questionId);
    return sum + (question ? calculateQuestionScore(question, answer) : 0);
  }, 0);
  
  return Math.round((actualScore / totalPossibleScore) * 100);
};

export const getRiskLevel = (score: number): 'Low' | 'Medium' | 'High' | 'Critical' => {
  if (score >= 80) return 'Low';
  if (score >= 60) return 'Medium';
  if (score >= 40) return 'High';
  return 'Critical';
};

export const calculateComplianceScores = (answers: Answer[]): ComplianceFramework[] => {
  const frameworks = ['ISO27001', 'NIST', 'SOC2'];
  
  return frameworks.map(framework => {
    const relevantQuestions = riskAssessmentQuestions.filter(q => 
      q.compliance.includes(framework)
    );
    
    const maxScore = relevantQuestions.reduce((sum, q) => sum + q.weight, 0);
    const actualScore = answers.reduce((sum, answer) => {
      const question = relevantQuestions.find(q => q.id === answer.questionId);
      return sum + (question ? calculateQuestionScore(question, answer) : 0);
    }, 0);
    
    const percentage = Math.round((actualScore / maxScore) * 100);
    
    return {
      name: framework,
      fullName: getFrameworkFullName(framework),
      score: Math.round(actualScore * 100) / 100,
      maxScore,
      percentage,
      status: percentage >= 80 ? 'compliant' : percentage >= 60 ? 'partial' : 'non-compliant'
    };
  });
};

const getFrameworkFullName = (framework: string): string => {
  switch (framework) {
    case 'ISO27001': return 'ISO/IEC 27001:2022';
    case 'NIST': return 'NIST Cybersecurity Framework';
    case 'SOC2': return 'SOC 2 Type II';
    default: return framework;
  }
};

export const generateVulnerabilityData = (): VulnerabilityData[] => {
  return [
    { category: 'Network', count: Math.floor(Math.random() * 15) + 5, severity: 'High', trend: 'down' },
    { category: 'Application', count: Math.floor(Math.random() * 20) + 10, severity: 'Medium', trend: 'stable' },
    { category: 'System', count: Math.floor(Math.random() * 10) + 3, severity: 'Critical', trend: 'up' },
    { category: 'Database', count: Math.floor(Math.random() * 8) + 2, severity: 'Medium', trend: 'down' },
    { category: 'Cloud', count: Math.floor(Math.random() * 12) + 4, severity: 'Low', trend: 'stable' }
  ];
};

export const generateThreatIntelligence = (): ThreatIntelligence => {
  const threatLevels = ['Low', 'Medium', 'High', 'Critical'];
  return {
    threatLevel: threatLevels[Math.floor(Math.random() * threatLevels.length)],
    activeThreats: Math.floor(Math.random() * 50) + 10,
    recentIncidents: Math.floor(Math.random() * 10) + 1,
    industryRisk: 'Elevated',
    lastUpdated: new Date()
  };
};

export const generateRecommendations = (score: number, riskLevel: string): string[] => {
  const recommendations = [];
  
  if (score < 80) {
    recommendations.push('Implement multi-factor authentication across all systems');
    recommendations.push('Establish a comprehensive incident response plan');
    recommendations.push('Conduct regular security awareness training');
  }
  
  if (score < 60) {
    recommendations.push('Deploy endpoint detection and response (EDR) solutions');
    recommendations.push('Implement network segmentation and zero-trust architecture');
    recommendations.push('Establish 24/7 security monitoring and alerting');
  }
  
  if (score < 40) {
    recommendations.push('Engage a third-party security firm for comprehensive assessment');
    recommendations.push('Implement privileged access management (PAM) solution');
    recommendations.push('Establish a Security Operations Center (SOC)');
  }
  
  return recommendations;
};