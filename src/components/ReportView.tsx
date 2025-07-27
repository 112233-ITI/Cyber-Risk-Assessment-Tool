import React from 'react';
import { ArrowLeft, Download, Shield, AlertTriangle, CheckCircle, TrendingUp, FileText, Calendar } from 'lucide-react';
import { ReportData } from '../types';

interface ReportViewProps {
  reportData: ReportData;
  onBack: () => void;
}

const ReportView: React.FC<ReportViewProps> = ({ reportData, onBack }) => {
  const { assessment, compliance, vulnerabilities, recommendations, threatIntel } = reportData;

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'Low': return 'text-green-600 bg-green-100 border-green-300';
      case 'Medium': return 'text-yellow-600 bg-yellow-100 border-yellow-300';
      case 'High': return 'text-orange-600 bg-orange-100 border-orange-300';
      case 'Critical': return 'text-red-600 bg-red-100 border-red-300';
      default: return 'text-gray-600 bg-gray-100 border-gray-300';
    }
  };

  const getComplianceColor = (status: string) => {
    switch (status) {
      case 'compliant': return 'text-green-600 bg-green-100';
      case 'partial': return 'text-yellow-600 bg-yellow-100';
      case 'non-compliant': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const exportReport = () => {
    const reportContent = `
CYBER INSURANCE RISK ASSESSMENT REPORT
=====================================

Company: ${assessment.companyName}
Industry: ${assessment.industry}
Assessment Date: ${assessment.createdAt.toLocaleDateString()}
Overall Risk Score: ${assessment.overallScore}%
Risk Level: ${assessment.riskLevel}

COMPLIANCE FRAMEWORKS
====================
${compliance.map(c => `${c.fullName}: ${c.percentage}% (${c.status})`).join('\n')}

VULNERABILITIES
===============
${vulnerabilities.map(v => `${v.category}: ${v.count} (${v.severity})`).join('\n')}

RECOMMENDATIONS
===============
${recommendations.map((r, i) => `${i + 1}. ${r}`).join('\n')}

THREAT INTELLIGENCE
==================
Current Threat Level: ${threatIntel.threatLevel}
Active Threats: ${threatIntel.activeThreats}
Recent Incidents: ${threatIntel.recentIncidents}
Industry Risk: ${threatIntel.industryRisk}
`;

    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cyber-risk-assessment-${assessment.companyName.replace(/\s+/g, '-').toLowerCase()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </button>
          
          <div className="text-center">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Risk Assessment Report
            </h1>
            <p className="text-slate-300 mt-2">{assessment.companyName}</p>
          </div>
          
          <button
            onClick={exportReport}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg font-medium transition-colors"
          >
            <Download className="w-4 h-4" />
            Export Report
          </button>
        </div>

        {/* Executive Summary */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700 mb-8">
          <h2 className="text-2xl font-semibold mb-6 flex items-center">
            <FileText className="w-6 h-6 mr-3 text-blue-400" />
            Executive Summary
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">{assessment.overallScore}%</div>
              <div className="text-sm text-slate-400">Overall Score</div>
            </div>
            <div className="text-center">
              <div className={`text-lg font-bold px-3 py-1 rounded-full ${getRiskColor(assessment.riskLevel)}`}>
                {assessment.riskLevel}
              </div>
              <div className="text-sm text-slate-400 mt-2">Risk Level</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">
                {compliance.filter(c => c.status === 'compliant').length}
              </div>
              <div className="text-sm text-slate-400">Compliant Frameworks</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-400 mb-2">
                {vulnerabilities.reduce((sum, v) => sum + v.count, 0)}
              </div>
              <div className="text-sm text-slate-400">Total Vulnerabilities</div>
            </div>
          </div>

          <div className="bg-slate-700/50 rounded-lg p-4">
            <h3 className="font-semibold mb-2">Assessment Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-400">Industry:</span>
                <span>{assessment.industry}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Assessment Date:</span>
                <span>{assessment.createdAt.toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Status:</span>
                <span className="capitalize">{assessment.status}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Report ID:</span>
                <span className="font-mono">{assessment.id.slice(0, 8)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Risk Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Compliance Status */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <CheckCircle className="w-5 h-5 mr-2 text-green-400" />
              Compliance Status
            </h2>
            
            <div className="space-y-4">
              {compliance.map((framework) => (
                <div key={framework.name} className="bg-slate-700/50 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-medium">{framework.fullName}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getComplianceColor(framework.status)}`}>
                      {framework.status.replace('-', ' ').toUpperCase()}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-slate-400">Compliance Score</span>
                    <span className="text-sm font-medium">{framework.percentage}%</span>
                  </div>
                  
                  <div className="w-full bg-slate-600 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${
                        framework.status === 'compliant' ? 'bg-green-500' :
                        framework.status === 'partial' ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${framework.percentage}%` }}
                    ></div>
                  </div>
                  
                  <div className="text-xs text-slate-400 mt-2">
                    Score: {framework.score.toFixed(1)} / {framework.maxScore}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Vulnerability Analysis */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2 text-orange-400" />
              Vulnerability Analysis
            </h2>
            
            <div className="space-y-4">
              {vulnerabilities.map((vuln) => (
                <div key={vuln.category} className="bg-slate-700/50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${
                        vuln.severity === 'Critical' ? 'bg-red-500' :
                        vuln.severity === 'High' ? 'bg-orange-500' :
                        vuln.severity === 'Medium' ? 'bg-yellow-500' : 'bg-green-500'
                      }`}></div>
                      <span className="font-medium">{vuln.category}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold">{vuln.count}</span>
                      <div className={`text-sm ${
                        vuln.trend === 'up' ? 'text-red-400' :
                        vuln.trend === 'down' ? 'text-green-400' : 'text-slate-400'
                      }`}>
                        {vuln.trend === 'up' ? '↗' : vuln.trend === 'down' ? '↘' : '→'}
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-slate-400">
                    Severity: {vuln.severity} | Trend: {vuln.trend}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Threat Intelligence */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-red-400" />
            Current Threat Landscape
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-slate-700/50 rounded-lg p-4 text-center">
              <div className={`text-2xl font-bold mb-2 ${
                threatIntel.threatLevel === 'Critical' ? 'text-red-400' :
                threatIntel.threatLevel === 'High' ? 'text-orange-400' :
                threatIntel.threatLevel === 'Medium' ? 'text-yellow-400' : 'text-green-400'
              }`}>
                {threatIntel.threatLevel}
              </div>
              <div className="text-sm text-slate-400">Threat Level</div>
            </div>
            
            <div className="bg-slate-700/50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-red-400 mb-2">{threatIntel.activeThreats}</div>
              <div className="text-sm text-slate-400">Active Threats</div>
            </div>
            
            <div className="bg-slate-700/50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-orange-400 mb-2">{threatIntel.recentIncidents}</div>
              <div className="text-sm text-slate-400">Recent Incidents</div>
            </div>
            
            <div className="bg-slate-700/50 rounded-lg p-4 text-center">
              <div className="text-lg font-bold text-yellow-400 mb-2">{threatIntel.industryRisk}</div>
              <div className="text-sm text-slate-400">Industry Risk</div>
            </div>
          </div>
          
          <div className="mt-4 text-xs text-slate-400 text-center">
            Last updated: {threatIntel.lastUpdated.toLocaleString()}
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Shield className="w-5 h-5 mr-2 text-blue-400" />
            Security Recommendations
          </h2>
          
          <div className="space-y-4">
            {recommendations.map((recommendation, index) => (
              <div key={index} className="flex items-start gap-4 p-4 bg-slate-700/50 rounded-lg">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <p className="text-white">{recommendation}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-slate-400">
          <p>This report was generated on {new Date().toLocaleString()}</p>
          <p className="mt-2">Cyber Insurance Risk Assessment Tool v1.0</p>
        </div>
      </div>
    </div>
  );
};

export default ReportView;