import React from 'react';
import { X, Download, Github, FileText, Shield, Terminal } from 'lucide-react';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DownloadModal: React.FC<DownloadModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const downloadTool = () => {
    // Create a comprehensive package with installation instructions
    const packageContent = {
      'README.md': `# Cyber Insurance Risk Assessment Tool

## Overview
A comprehensive, industry-standard cyber security risk assessment tool designed for insurance companies, enterprises, and security professionals.

## Features
- Real-time risk assessment and scoring
- Multi-framework compliance analysis (ISO 27001, NIST, SOC 2)
- Vulnerability assessment simulation
- Interactive dashboard with live metrics
- Comprehensive reporting and export capabilities
- Modern, responsive web interface

## System Requirements
- Node.js 18+ 
- Modern web browser (Chrome, Firefox, Safari, Edge)
- 4GB RAM minimum
- 1GB free disk space

## Installation Instructions

### Quick Start
\`\`\`bash
# Clone the repository
git clone https://github.com/cyberinsurance/risk-assessment-tool.git
cd risk-assessment-tool

# Install dependencies
npm install

# Start the development server
npm run dev
\`\`\`

### Production Deployment
\`\`\`bash
# Build for production
npm run build

# Preview production build
npm run preview
\`\`\`

## Usage
1. Open the application in your web browser
2. Start a new risk assessment
3. Complete the questionnaire across all categories
4. Review the generated risk report
5. Export results and recommendations

## Security Features
- Encrypted data transmission
- Secure local storage
- No external data transmission
- Compliance with industry standards

## Support
For technical support or questions, please visit our documentation or create an issue in the GitHub repository.

## License
Licensed under MIT License. See LICENSE file for details.
`,

      'package.json': `{
  "name": "cyber-insurance-risk-assessment",
  "version": "1.0.0",
  "description": "Industry-standard cyber security risk assessment tool",
  "main": "index.js",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint .",
    "test": "vitest"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "lucide-react": "^0.344.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.1",
    "tailwindcss": "^3.4.1",
    "typescript": "^5.5.3",
    "vite": "^5.4.2"
  },
  "keywords": ["cybersecurity", "risk-assessment", "insurance", "compliance"],
  "license": "MIT"
}`,

      'INSTALL.txt': `CYBER INSURANCE RISK ASSESSMENT TOOL
Installation Guide

SYSTEM REQUIREMENTS:
- Node.js 18 or higher
- npm 9 or higher
- Modern web browser
- 4GB RAM minimum
- 1GB free disk space

INSTALLATION STEPS:

1. Download and extract the tool package
2. Open terminal/command prompt
3. Navigate to the extracted folder
4. Run: npm install
5. Run: npm run dev
6. Open browser to http://localhost:5173

SECURITY NOTES:
- Tool runs locally on your system
- No data is transmitted externally
- All assessments stored locally
- Encrypted data handling

TROUBLESHOOTING:
- Ensure Node.js is properly installed
- Check firewall settings for local development
- Clear browser cache if issues persist

For support: https://github.com/cyberinsurance/risk-assessment-tool
`
    };

    // Create and download the package
    const blob = new Blob([JSON.stringify(packageContent, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'cyber-insurance-risk-assessment-tool.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-700">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <Download className="w-6 h-6 text-blue-400" />
            Download Cyber Security Tool
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Tool Information */}
          <div className="bg-slate-700/50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-400" />
              Tool Specifications
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-400">Version:</span>
                <span className="text-white font-medium">v1.0.0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Size:</span>
                <span className="text-white font-medium">~2.5 MB</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Platform:</span>
                <span className="text-white font-medium">Cross-platform</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">License:</span>
                <span className="text-white font-medium">MIT</span>
              </div>
            </div>
          </div>

          {/* System Requirements */}
          <div className="bg-slate-700/50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Terminal className="w-5 h-5 text-green-400" />
              System Requirements
            </h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                Node.js 18+ (Required for installation)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                Modern web browser (Chrome, Firefox, Safari, Edge)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                4GB RAM minimum
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                1GB free disk space
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                Administrator permissions (for installation)
              </li>
            </ul>
          </div>

          {/* Security Features */}
          <div className="bg-slate-700/50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-red-400" />
              Security Features
            </h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                Local data processing (no external transmission)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                Encrypted data storage
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                Industry-standard compliance frameworks
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                Real-time vulnerability assessment
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                Audit trail and logging
              </li>
            </ul>
          </div>

          {/* Installation Instructions */}
          <div className="bg-slate-700/50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-400" />
              Quick Installation
            </h3>
            <div className="bg-slate-900 rounded-lg p-4 font-mono text-sm text-green-400">
              <div className="mb-2"># Download and extract the tool</div>
              <div className="mb-2">npm install</div>
              <div className="mb-2">npm run dev</div>
              <div className="text-slate-400"># Open http://localhost:5173</div>
            </div>
          </div>

          {/* Download Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={downloadTool}
              className="flex-1 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 text-white"
            >
              <Download className="w-5 h-5" />
              Download Tool Package
            </button>
            
            <button
              onClick={() => window.open('https://github.com/cyberinsurance/risk-assessment-tool', '_blank')}
              className="flex-1 bg-slate-700 hover:bg-slate-600 px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 text-white"
            >
              <Github className="w-5 h-5" />
              View on GitHub
            </button>
          </div>

          {/* Disclaimer */}
          <div className="text-xs text-slate-400 bg-slate-900/50 rounded-lg p-4">
            <p><strong>Important:</strong> This tool is designed for professional cybersecurity assessment purposes. 
            Ensure you have proper authorization before conducting assessments on any systems. 
            The tool processes data locally and does not transmit information externally for maximum security.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadModal;