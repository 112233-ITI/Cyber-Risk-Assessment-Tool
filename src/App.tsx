import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import AssessmentForm from './components/AssessmentForm';
import ReportView from './components/ReportView';
import DownloadModal from './components/DownloadModal';
import { RiskAssessment, Answer, ComplianceFramework, VulnerabilityData, ThreatIntelligence, ReportData } from './types';
import { calculateOverallScore, getRiskLevel, calculateComplianceScores, generateVulnerabilityData, generateThreatIntelligence, generateRecommendations } from './utils/scoring';

type View = 'dashboard' | 'assessment' | 'report';

function App() {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [assessment, setAssessment] = useState<RiskAssessment | null>(null);
  const [compliance, setCompliance] = useState<ComplianceFramework[]>([]);
  const [vulnerabilities, setVulnerabilities] = useState<VulnerabilityData[]>([]);
  const [threatIntel, setThreatIntel] = useState<ThreatIntelligence | null>(null);
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);

  // Initialize demo data
  useEffect(() => {
    // Initialize with demo compliance data
    setCompliance([
      {
        name: 'ISO27001',
        fullName: 'ISO/IEC 27001:2022',
        score: 65.5,
        maxScore: 80,
        percentage: 82,
        status: 'compliant'
      },
      {
        name: 'NIST',
        fullName: 'NIST Cybersecurity Framework',
        score: 48.2,
        maxScore: 70,
        percentage: 69,
        status: 'partial'
      },
      {
        name: 'SOC2',
        fullName: 'SOC 2 Type II',
        score: 38.8,
        maxScore: 65,
        percentage: 60,
        status: 'partial'
      }
    ]);

    setVulnerabilities(generateVulnerabilityData());
    setThreatIntel(generateThreatIntelligence());

    // Check for existing assessment in localStorage
    const savedAssessment = localStorage.getItem('cyberRiskAssessment');
    if (savedAssessment) {
      try {
        const parsed = JSON.parse(savedAssessment);
        parsed.createdAt = new Date(parsed.createdAt);
        parsed.updatedAt = new Date(parsed.updatedAt);
        setAssessment(parsed);
      } catch (error) {
        console.error('Error parsing saved assessment:', error);
      }
    }
  }, []);

  const handleStartAssessment = () => {
    setCurrentView('assessment');
  };

  const handleAssessmentComplete = (answers: Answer[], companyInfo: any) => {
    const overallScore = calculateOverallScore(answers);
    const riskLevel = getRiskLevel(overallScore);
    const complianceScores = calculateComplianceScores(answers);

    const newAssessment: RiskAssessment = {
      id: Math.random().toString(36).substr(2, 9),
      companyName: companyInfo.companyName,
      industry: companyInfo.industry,
      employeeCount: companyInfo.employeeCount,
      annualRevenue: companyInfo.annualRevenue,
      createdAt: new Date(),
      updatedAt: new Date(),
      status: 'completed',
      overallScore,
      riskLevel
    };

    setAssessment(newAssessment);
    setCompliance(complianceScores);

    // Save to localStorage
    localStorage.setItem('cyberRiskAssessment', JSON.stringify(newAssessment));
    localStorage.setItem('assessmentAnswers', JSON.stringify(answers));

    setCurrentView('dashboard');
  };

  const handleViewReport = () => {
    if (!assessment || !threatIntel) return;

    const recommendations = generateRecommendations(assessment.overallScore, assessment.riskLevel);
    
    const report: ReportData = {
      assessment,
      compliance,
      vulnerabilities,
      recommendations,
      threatIntel
    };

    setReportData(report);
    setCurrentView('report');
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
  };

  if (!threatIntel) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <p>Initializing Cyber Security Assessment Tool...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {currentView === 'dashboard' && (
        <Dashboard
          assessment={assessment}
          compliance={compliance}
          vulnerabilities={vulnerabilities}
          threatIntel={threatIntel}
          onStartAssessment={handleStartAssessment}
          onViewReport={handleViewReport}
        />
      )}

      {currentView === 'assessment' && (
        <AssessmentForm
          onComplete={handleAssessmentComplete}
          onBack={handleBackToDashboard}
        />
      )}

      {currentView === 'report' && reportData && (
        <ReportView
          reportData={reportData}
          onBack={handleBackToDashboard}
        />
      )}

      <DownloadModal
        isOpen={isDownloadModalOpen}
        onClose={() => setIsDownloadModalOpen(false)}
      />

      {/* Global Download Button */}
      <button
        onClick={() => setIsDownloadModalOpen(true)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white p-4 rounded-full shadow-lg transition-all hover:scale-105 z-40 animate-pulse"
        title="Download Professional Application"
      >
        <Download className="w-6 h-6" />
      </button>
    </>
  );
}

export default App;