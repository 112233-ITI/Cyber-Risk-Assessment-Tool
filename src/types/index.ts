export interface RiskAssessment {
  id: string;
  companyName: string;
  industry: string;
  employeeCount: number;
  annualRevenue: number;
  createdAt: Date;
  updatedAt: Date;
  status: 'draft' | 'in-progress' | 'completed';
  overallScore: number;
  riskLevel: 'Low' | 'Medium' | 'High' | 'Critical';
}

export interface Question {
  id: string;
  category: string;
  question: string;
  type: 'boolean' | 'scale' | 'multiple' | 'text';
  weight: number;
  options?: string[];
  compliance: string[];
}

export interface Answer {
  questionId: string;
  value: string | number | boolean;
  score: number;
}

export interface ComplianceFramework {
  name: string;
  fullName: string;
  score: number;
  maxScore: number;
  percentage: number;
  status: 'compliant' | 'partial' | 'non-compliant';
}

export interface VulnerabilityData {
  category: string;
  count: number;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  trend: 'up' | 'down' | 'stable';
}

export interface ThreatIntelligence {
  threatLevel: string;
  activeThreats: number;
  recentIncidents: number;
  industryRisk: string;
  lastUpdated: Date;
}

export interface ReportData {
  assessment: RiskAssessment;
  compliance: ComplianceFramework[];
  vulnerabilities: VulnerabilityData[];
  recommendations: string[];
  threatIntel: ThreatIntelligence;
}