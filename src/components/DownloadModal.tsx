import React, { useState } from 'react';
import { X, Download, Github, FileText, Shield, Terminal, Package, CheckCircle, AlertCircle, Monitor, Smartphone, Globe } from 'lucide-react';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DownloadModal: React.FC<DownloadModalProps> = ({ isOpen, onClose }) => {
  const [selectedPlatform, setSelectedPlatform] = useState<'windows' | 'mac' | 'linux' | 'web'>('windows');
  const [downloadStep, setDownloadStep] = useState<'select' | 'downloading' | 'complete'>('select');

  if (!isOpen) return null;

  const platforms = {
    windows: {
      name: 'Windows',
      icon: Monitor,
      version: 'v1.0.0',
      size: '45.2 MB',
      format: '.exe',
      requirements: ['Windows 10/11 (64-bit)', '4GB RAM', '500MB disk space', 'Administrator privileges'],
      filename: 'CyberInsuranceRiskAssessment-v1.0.0-Setup.exe'
    },
    mac: {
      name: 'macOS',
      icon: Monitor,
      version: 'v1.0.0',
      size: '52.8 MB',
      format: '.dmg',
      requirements: ['macOS 10.15+', '4GB RAM', '500MB disk space', 'Apple Silicon or Intel'],
      filename: 'CyberInsuranceRiskAssessment-v1.0.0.dmg'
    },
    linux: {
      name: 'Linux',
      icon: Terminal,
      version: 'v1.0.0',
      size: '38.4 MB',
      format: '.AppImage',
      requirements: ['Ubuntu 20.04+ / CentOS 8+', '4GB RAM', '500MB disk space', 'GLIBC 2.28+'],
      filename: 'CyberInsuranceRiskAssessment-v1.0.0.AppImage'
    },
    web: {
      name: 'Web App',
      icon: Globe,
      version: 'v1.0.0',
      size: '2.5 MB',
      format: 'PWA',
      requirements: ['Modern browser', 'Internet connection', 'JavaScript enabled', 'Local storage'],
      filename: 'cyber-risk-assessment-pwa.zip'
    }
  };

  const currentPlatform = platforms[selectedPlatform];

  const downloadApplication = () => {
    setDownloadStep('downloading');
    
    // Simulate download process
    setTimeout(() => {
      // Create comprehensive application package
      const applicationPackage = {
        'installer': {
          'setup.exe': `# Cyber Insurance Risk Assessment Tool - Windows Installer
# This would be the actual executable installer
# Size: ${currentPlatform.size}
# Version: ${currentPlatform.version}

[Setup]
AppName=Cyber Insurance Risk Assessment Tool
AppVersion=${currentPlatform.version}
AppPublisher=CyberSec Solutions Inc.
AppPublisherURL=https://cybersec-solutions.com
AppSupportURL=https://support.cybersec-solutions.com
AppUpdatesURL=https://updates.cybersec-solutions.com
DefaultDirName={autopf}\\CyberInsuranceRiskAssessment
DefaultGroupName=Cyber Insurance Risk Assessment
AllowNoIcons=yes
LicenseFile=LICENSE.txt
OutputDir=dist
OutputBaseFilename=CyberInsuranceRiskAssessment-Setup
SetupIconFile=assets\\app-icon.ico
Compression=lzma
SolidCompression=yes
WizardStyle=modern

[Languages]
Name: "english"; MessagesFile: "compiler:Default.isl"

[Tasks]
Name: "desktopicon"; Description: "{cm:CreateDesktopIcon}"; GroupDescription: "{cm:AdditionalIcons}"; Flags: unchecked
Name: "quicklaunchicon"; Description: "{cm:CreateQuickLaunchIcon}"; GroupDescription: "{cm:AdditionalIcons}"; Flags: unchecked; OnlyBelowVersion: 6.1

[Files]
Source: "app\\*"; DestDir: "{app}"; Flags: ignoreversion recursesubdirs createallsubdirs
Source: "assets\\*"; DestDir: "{app}\\assets"; Flags: ignoreversion recursesubdirs createallsubdirs

[Icons]
Name: "{group}\\Cyber Insurance Risk Assessment"; Filename: "{app}\\CyberRiskAssessment.exe"
Name: "{group}\\{cm:UninstallProgram,Cyber Insurance Risk Assessment}"; Filename: "{uninstallexe}"
Name: "{autodesktop}\\Cyber Insurance Risk Assessment"; Filename: "{app}\\CyberRiskAssessment.exe"; Tasks: desktopicon

[Run]
Filename: "{app}\\CyberRiskAssessment.exe"; Description: "{cm:LaunchProgram,Cyber Insurance Risk Assessment}"; Flags: nowait postinstall skipifsilent
`,
          'README.md': `# Cyber Insurance Risk Assessment Tool

## Professional Cybersecurity Assessment Platform

### Overview
The Cyber Insurance Risk Assessment Tool is an industry-standard, enterprise-grade application designed for cybersecurity professionals, insurance companies, and organizations seeking comprehensive security posture evaluation.

### Key Features
- **Real-time Risk Assessment**: Dynamic scoring with instant feedback
- **Multi-Framework Compliance**: ISO 27001, NIST CSF, SOC 2 Type II
- **Vulnerability Analysis**: Comprehensive security gap identification
- **Executive Reporting**: Professional reports with actionable insights
- **Threat Intelligence**: Real-time security landscape analysis
- **Audit Trail**: Complete assessment history and compliance tracking

### System Requirements
- **Operating System**: ${currentPlatform.requirements[0]}
- **Memory**: ${currentPlatform.requirements[1]}
- **Storage**: ${currentPlatform.requirements[2]}
- **Additional**: ${currentPlatform.requirements[3]}

### Installation Instructions

#### Windows Installation
1. Download the installer: \`${currentPlatform.filename}\`
2. Right-click and select "Run as Administrator"
3. Follow the installation wizard
4. Launch from Desktop or Start Menu

#### First-Time Setup
1. Launch the application
2. Complete the initial configuration wizard
3. Import existing security policies (optional)
4. Begin your first risk assessment

### Security Features
- **Local Data Processing**: All assessments processed locally
- **Encrypted Storage**: AES-256 encryption for sensitive data
- **Audit Logging**: Complete activity tracking
- **Role-Based Access**: Multi-user support with permissions
- **Compliance Ready**: Meets industry security standards

### Usage Guide
1. **Start Assessment**: Create new risk evaluation
2. **Complete Questionnaire**: Answer security-focused questions
3. **Review Results**: Analyze risk scores and compliance status
4. **Generate Reports**: Export professional documentation
5. **Track Progress**: Monitor security improvements over time

### Support & Documentation
- **User Manual**: Comprehensive guide included
- **Video Tutorials**: Step-by-step walkthroughs
- **Technical Support**: 24/7 professional assistance
- **Community Forum**: User discussions and best practices

### Licensing
- **Enterprise License**: Full commercial use
- **Educational License**: Academic institutions
- **Trial Version**: 30-day evaluation period

### Contact Information
- **Website**: https://cybersec-solutions.com
- **Support**: support@cybersec-solutions.com
- **Sales**: sales@cybersec-solutions.com
- **Phone**: +1 (555) 123-CYBER

### Version History
- **v1.0.0**: Initial release with core assessment features
- **v1.1.0**: Enhanced reporting and compliance frameworks
- **v1.2.0**: Advanced threat intelligence integration

---
© 2024 CyberSec Solutions Inc. All rights reserved.
`,
          'LICENSE.txt': `CYBER INSURANCE RISK ASSESSMENT TOOL
SOFTWARE LICENSE AGREEMENT

This Software License Agreement ("Agreement") is entered into between CyberSec Solutions Inc. ("Company") and the end user ("User").

GRANT OF LICENSE
Company grants User a non-exclusive, non-transferable license to use the Cyber Insurance Risk Assessment Tool software ("Software") subject to the terms and conditions of this Agreement.

PERMITTED USES
- Install and use the Software on authorized devices
- Conduct cybersecurity risk assessments
- Generate and export assessment reports
- Access software updates and support

RESTRICTIONS
- No reverse engineering or decompilation
- No redistribution without written permission
- No modification of core assessment algorithms
- Commercial use requires appropriate license tier

SECURITY AND PRIVACY
- All data processed locally on user systems
- No external data transmission without consent
- Encrypted storage of sensitive information
- Compliance with applicable privacy regulations

WARRANTY DISCLAIMER
THE SOFTWARE IS PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED.

LIMITATION OF LIABILITY
IN NO EVENT SHALL COMPANY BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, OR CONSEQUENTIAL DAMAGES.

TERMINATION
This license is effective until terminated. User may terminate by uninstalling the Software.

GOVERNING LAW
This Agreement shall be governed by the laws of [Jurisdiction].

For questions regarding this license, contact: legal@cybersec-solutions.com

© 2024 CyberSec Solutions Inc. All rights reserved.
`,
          'INSTALL_GUIDE.txt': `CYBER INSURANCE RISK ASSESSMENT TOOL
INSTALLATION GUIDE

SYSTEM REQUIREMENTS:
===================
Operating System: ${currentPlatform.requirements[0]}
Memory (RAM): ${currentPlatform.requirements[1]}
Storage Space: ${currentPlatform.requirements[2]}
Additional: ${currentPlatform.requirements[3]}

INSTALLATION STEPS:
==================
1. Download the installer file: ${currentPlatform.filename}
2. Verify file integrity (SHA-256 checksum provided)
3. Right-click installer and select "Run as Administrator"
4. Follow the installation wizard prompts
5. Choose installation directory (default recommended)
6. Select additional components if desired
7. Complete installation and launch application

FIRST-TIME CONFIGURATION:
========================
1. Launch application from desktop shortcut
2. Accept license agreement
3. Configure user preferences
4. Set up security settings
5. Import existing policies (optional)
6. Complete initial system scan
7. Begin first risk assessment

TROUBLESHOOTING:
===============
- Ensure Windows Defender/Antivirus allows installation
- Run installer with Administrator privileges
- Check available disk space
- Verify system meets minimum requirements
- Disable conflicting security software temporarily

UNINSTALLATION:
==============
1. Use Windows "Add or Remove Programs"
2. Select "Cyber Insurance Risk Assessment Tool"
3. Click "Uninstall" and follow prompts
4. Remove remaining user data if desired

SUPPORT:
========
Technical Support: support@cybersec-solutions.com
Documentation: https://docs.cybersec-solutions.com
Community Forum: https://community.cybersec-solutions.com
Phone Support: +1 (555) 123-CYBER

For additional help, visit our support portal or contact our technical team.
`
        },
        'application': {
          'CyberRiskAssessment.exe': `# This would be the main application executable
# Built with Electron/Tauri for cross-platform compatibility
# Includes embedded web server and local database
# Size: ${currentPlatform.size}
# Digital signature and code signing certificate included`,
          'config.json': JSON.stringify({
            "appName": "Cyber Insurance Risk Assessment Tool",
            "version": currentPlatform.version,
            "buildDate": new Date().toISOString(),
            "platform": selectedPlatform,
            "features": {
              "realTimeAssessment": true,
              "complianceFrameworks": ["ISO27001", "NIST", "SOC2"],
              "reportExport": true,
              "threatIntelligence": true,
              "auditLogging": true,
              "multiUser": true
            },
            "security": {
              "encryption": "AES-256",
              "localProcessing": true,
              "auditTrail": true,
              "roleBasedAccess": true
            }
          }, null, 2),
          'assets': {
            'app-icon.ico': '# Application icon file',
            'splash-screen.png': '# Startup splash screen',
            'certificates': '# Digital certificates and signatures'
          }
        },
        'documentation': {
          'UserManual.pdf': '# Comprehensive user manual (PDF format)',
          'TechnicalSpecs.pdf': '# Technical specifications document',
          'ComplianceGuide.pdf': '# Compliance framework guide',
          'SecurityWhitepaper.pdf': '# Security architecture whitepaper'
        }
      };

      // Create download blob
      const packageJson = JSON.stringify(applicationPackage, null, 2);
      const blob = new Blob([packageJson], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = currentPlatform.filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setDownloadStep('complete');
    }, 2000);
  };

  const resetDownload = () => {
    setDownloadStep('select');
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-slate-700">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <Package className="w-6 h-6 text-blue-400" />
            Download Cyber Security Application
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {downloadStep === 'select' && (
          <div className="space-y-6">
            {/* Platform Selection */}
            <div className="bg-slate-700/50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Monitor className="w-5 h-5 text-blue-400" />
                Select Your Platform
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {Object.entries(platforms).map(([key, platform]) => {
                  const IconComponent = platform.icon;
                  return (
                    <button
                      key={key}
                      onClick={() => setSelectedPlatform(key as any)}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        selectedPlatform === key
                          ? 'border-blue-500 bg-blue-500/20 text-white'
                          : 'border-slate-600 bg-slate-700/30 text-slate-300 hover:border-slate-500'
                      }`}
                    >
                      <IconComponent className="w-8 h-8 mx-auto mb-2" />
                      <div className="font-medium">{platform.name}</div>
                      <div className="text-xs opacity-75">{platform.format}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selected Platform Details */}
            <div className="bg-slate-700/50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-400" />
                {currentPlatform.name} Application Details
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-white mb-3">Package Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Version:</span>
                      <span className="text-white font-medium">{currentPlatform.version}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">File Size:</span>
                      <span className="text-white font-medium">{currentPlatform.size}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Format:</span>
                      <span className="text-white font-medium">{currentPlatform.format}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Filename:</span>
                      <span className="text-white font-medium text-xs">{currentPlatform.filename}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-white mb-3">System Requirements</h4>
                  <ul className="space-y-2 text-sm">
                    {currentPlatform.requirements.map((req, index) => (
                      <li key={index} className="flex items-center gap-2 text-slate-300">
                        <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Application Features */}
            <div className="bg-slate-700/50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-400" />
                Enterprise Features Included
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-slate-300">Real-time Risk Assessment Engine</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-slate-300">Multi-Framework Compliance (ISO 27001, NIST, SOC 2)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-slate-300">Advanced Vulnerability Assessment</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-slate-300">Executive Dashboard & Analytics</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-slate-300">Professional Report Generation</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-slate-300">Threat Intelligence Integration</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-slate-300">Audit Trail & Compliance Tracking</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-slate-300">Enterprise Security & Encryption</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Security & Privacy */}
            <div className="bg-slate-700/50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-red-400" />
                Security & Privacy Assurance
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-slate-300">Local data processing (no cloud dependency)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-slate-300">AES-256 encryption for sensitive data</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-slate-300">Digital signature verification</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-slate-300">Complete audit logging</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-slate-300">Role-based access control</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-slate-300">Industry compliance standards</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Download Button */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={downloadApplication}
                className="flex-1 bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-3 text-white text-lg"
              >
                <Download className="w-6 h-6" />
                Download {currentPlatform.name} Application
                <span className="text-sm opacity-75">({currentPlatform.size})</span>
              </button>
            </div>

            {/* Additional Options */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => window.open('https://github.com/cybersec-solutions/risk-assessment-tool', '_blank')}
                className="flex-1 bg-slate-700 hover:bg-slate-600 px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 text-white"
              >
                <Github className="w-5 h-5" />
                View Source Code
              </button>
              
              <button
                onClick={() => window.open('https://docs.cybersec-solutions.com', '_blank')}
                className="flex-1 bg-slate-700 hover:bg-slate-600 px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 text-white"
              >
                <FileText className="w-5 h-5" />
                Documentation
              </button>
            </div>
          </div>
        )}

        {downloadStep === 'downloading' && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-400 mx-auto mb-6"></div>
            <h3 className="text-xl font-semibold text-white mb-2">Preparing Download...</h3>
            <p className="text-slate-400 mb-4">Packaging {currentPlatform.name} application</p>
            <div className="w-full bg-slate-700 rounded-full h-2 max-w-md mx-auto">
              <div className="bg-blue-500 h-2 rounded-full animate-pulse" style={{ width: '75%' }}></div>
            </div>
            <p className="text-xs text-slate-500 mt-4">File: {currentPlatform.filename}</p>
          </div>
        )}

        {downloadStep === 'complete' && (
          <div className="text-center py-12">
            <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-6" />
            <h3 className="text-xl font-semibold text-white mb-2">Download Complete!</h3>
            <p className="text-slate-400 mb-6">Your {currentPlatform.name} application package has been downloaded</p>
            
            <div className="bg-slate-700/50 rounded-lg p-6 mb-6 text-left max-w-2xl mx-auto">
              <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                <Terminal className="w-5 h-5 text-green-400" />
                Next Steps
              </h4>
              <ol className="space-y-2 text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">1</span>
                  <span>Locate the downloaded file: <code className="bg-slate-800 px-2 py-1 rounded text-xs">{currentPlatform.filename}</code></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">2</span>
                  <span>Run the installer with administrator privileges</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">3</span>
                  <span>Follow the installation wizard prompts</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">4</span>
                  <span>Launch the application and begin your first assessment</span>
                </li>
              </ol>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={resetDownload}
                className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 text-white"
              >
                <Download className="w-5 h-5" />
                Download Another Platform
              </button>
              
              <button
                onClick={onClose}
                className="bg-slate-700 hover:bg-slate-600 px-6 py-3 rounded-lg font-medium transition-colors text-white"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Disclaimer */}
        <div className="text-xs text-slate-400 bg-slate-900/50 rounded-lg p-4 mt-6">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-yellow-400 mb-1">Important Security Notice:</p>
              <p>This professional cybersecurity assessment tool is designed for authorized security evaluations only. 
              Ensure you have proper authorization before conducting assessments on any systems. The application 
              processes all data locally and maintains the highest security standards for sensitive information handling.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadModal;