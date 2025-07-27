import React, { useState, useEffect } from 'react';
import { Shield, TrendingUp, AlertTriangle, CheckCircle, Download, Eye, Settings } from 'lucide-react';
import { RiskAssessment, ComplianceFramework, VulnerabilityData, ThreatIntelligence } from '../types';

interface DashboardProps {
  assessment: RiskAssessment | null;
  compliance: ComplianceFramework[];
  vulnerabilities: VulnerabilityData[];
  threatIntel: ThreatIntelligence;
  onStartAssessment: () => void;
  onViewReport: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({
  assessment,
  compliance,
  vulnerabilities,
  threatIntel,
  onStartAssessment,
  onViewReport
}) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'Low': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'High': return 'text-orange-600 bg-orange-100';
      case 'Critical': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Cyber Insurance Risk Assessment
          </h1>
          <p className="text-slate-300 mt-2">Real-time Security Posture Analysis</p>
        </div>
        <div className="text-right">
          <div className="text-sm text-slate-400">Last Updated</div>
          <div className="text-lg font-mono">{currentTime.toLocaleTimeString()}</div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Overall Risk Score</p>
              <p className={`text-2xl font-bold ${assessment ? getRiskColor(assessment.riskLevel).split(' ')[0] : 'text-gray-400'}`}>
                {assessment ? `${assessment.overallScore}%` : 'N/A'}
              </p>
            </div>
            <Shield className="w-8 h-8 text-blue-400" />
          </div>
          {assessment && (
            <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-2 ${getRiskColor(assessment.riskLevel)}`}>
              {assessment.riskLevel} Risk
            </div>
          )}
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Active Threats</p>
              <p className="text-2xl font-bold text-red-400">{threatIntel.activeThreats}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-400" />
          </div>
          <div className="text-xs text-slate-400 mt-2">Industry: {threatIntel.industryRisk}</div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Vulnerabilities</p>
              <p className="text-2xl font-bold text-orange-400">
                {vulnerabilities.reduce((sum, v) => sum + v.count, 0)}
              </p>
            </div>
            <TrendingUp className="w-8 h-8 text-orange-400" />
          </div>
          <div className="text-xs text-slate-400 mt-2">Across all systems</div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Compliance Status</p>
              <p className="text-2xl font-bold text-green-400">
                {compliance.filter(c => c.status === 'compliant').length}/{compliance.length}
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-400" />
          </div>
          <div className="text-xs text-slate-400 mt-2">Frameworks compliant</div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Assessment Status */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Shield className="w-5 h-5 mr-2 text-blue-400" />
            Risk Assessment Status
          </h2>
          
          {assessment ? (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-slate-300">Company:</span>
                <span className="font-medium">{assessment.companyName}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-300">Industry:</span>
                <span className="font-medium">{assessment.industry}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-300">Status:</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  assessment.status === 'completed' ? 'bg-green-100 text-green-800' :
                  assessment.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {assessment.status.replace('-', ' ').toUpperCase()}
                </span>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={onViewReport}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  View Report
                </button>
                <button className="flex-1 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                  <Download className="w-4 h-4" />
                  Export
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <Shield className="w-16 h-16 text-slate-400 mx-auto mb-4" />
              <p className="text-slate-400 mb-4">No assessment completed yet</p>
              <button
                onClick={onStartAssessment}
                className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Start Risk Assessment
              </button>
            </div>
          )}
        </div>

        {/* Compliance Frameworks */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <CheckCircle className="w-5 h-5 mr-2 text-green-400" />
            Compliance Frameworks
          </h2>
          
          <div className="space-y-4">
            {compliance.map((framework) => (
              <div key={framework.name} className="bg-slate-700/50 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">{framework.fullName}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getComplianceColor(framework.status)}`}>
                    {framework.status.replace('-', ' ').toUpperCase()}
                  </span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-slate-400">Progress</span>
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
              </div>
            ))}
          </div>
        </div>

        {/* Vulnerabilities Overview */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2 text-orange-400" />
            Vulnerability Overview
          </h2>
          
          <div className="space-y-4">
            {vulnerabilities.map((vuln) => (
              <div key={vuln.category} className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${
                    vuln.severity === 'Critical' ? 'bg-red-500' :
                    vuln.severity === 'High' ? 'bg-orange-500' :
                    vuln.severity === 'Medium' ? 'bg-yellow-500' : 'bg-green-500'
                  }`}></div>
                  <span className="font-medium">{vuln.category}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{vuln.count}</span>
                  <div className={`text-xs ${
                    vuln.trend === 'up' ? 'text-red-400' :
                    vuln.trend === 'down' ? 'text-green-400' : 'text-slate-400'
                  }`}>
                    {vuln.trend === 'up' ? '↗' : vuln.trend === 'down' ? '↘' : '→'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Threat Intelligence */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-red-400" />
            Threat Intelligence
          </h2>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-slate-700/50 rounded-lg">
              <span className="text-slate-300">Current Threat Level</span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                threatIntel.threatLevel === 'Critical' ? 'bg-red-100 text-red-800' :
                threatIntel.threatLevel === 'High' ? 'bg-orange-100 text-orange-800' :
                threatIntel.threatLevel === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-green-100 text-green-800'
              }`}>
                {threatIntel.threatLevel}
              </span>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-slate-700/50 rounded-lg">
              <span className="text-slate-300">Recent Incidents</span>
              <span className="font-medium text-red-400">{threatIntel.recentIncidents}</span>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-slate-700/50 rounded-lg">
              <span className="text-slate-300">Industry Risk</span>
              <span className="font-medium text-orange-400">{threatIntel.industryRisk}</span>
            </div>
            
            <div className="text-xs text-slate-400 mt-4">
              Last updated: {threatIntel.lastUpdated.toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 flex flex-wrap gap-4">
        <button
          onClick={onStartAssessment}
          className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
        >
          <Shield className="w-4 h-4" />
          {assessment ? 'Retake Assessment' : 'Start Assessment'}
        </button>
        
        <button className="bg-slate-700 hover:bg-slate-600 px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2">
          <Settings className="w-4 h-4" />
          Configure Settings
        </button>
        
        <button className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2">
          <Download className="w-4 h-4" />
          Download Application
        </button>
      </div>
    </div>
  );
};

export default Dashboard;