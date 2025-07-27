# Installation Guide - Cyber Insurance Risk Assessment Tool

## 🚀 Quick Installation

### Desktop Application (Recommended)

#### Windows Installation
1. **Download**: Get `CyberInsuranceRiskAssessment-v1.0.0-Setup.exe` (45.2 MB)
2. **Verify**: Check file integrity with provided SHA-256 hash
3. **Install**: Right-click installer → "Run as Administrator"
4. **Setup**: Follow installation wizard prompts
5. **Launch**: Start from Desktop shortcut or Start Menu

#### macOS Installation
1. **Download**: Get `CyberInsuranceRiskAssessment-v1.0.0.dmg` (52.8 MB)
2. **Mount**: Double-click DMG file to mount
3. **Install**: Drag application to Applications folder
4. **Security**: Allow app in System Preferences → Security & Privacy
5. **Launch**: Start from Applications folder or Launchpad

#### Linux Installation
1. **Download**: Get `CyberInsuranceRiskAssessment-v1.0.0.AppImage` (38.4 MB)
2. **Permissions**: `chmod +x CyberInsuranceRiskAssessment-v1.0.0.AppImage`
3. **Install**: `./CyberInsuranceRiskAssessment-v1.0.0.AppImage --install`
4. **Launch**: Run from applications menu or command line

### Web Application
```bash
# Clone repository
git clone https://github.com/cybersec-solutions/cyber-insurance-risk-assessment.git
cd cyber-insurance-risk-assessment

# Install dependencies
npm install

# Start development server
npm run dev

# Production build
npm run build
npm run preview
```

## 📋 System Requirements

### Minimum Requirements
| Component | Requirement |
|-----------|-------------|
| **Operating System** | Windows 10/11 (64-bit), macOS 10.15+, Ubuntu 20.04+ |
| **Memory (RAM)** | 4GB minimum |
| **Storage** | 500MB free space |
| **Network** | Internet connection for updates |
| **Browser** | Chrome 90+, Firefox 88+, Safari 14+, Edge 90+ |

### Recommended Specifications
| Component | Recommendation |
|-----------|----------------|
| **Operating System** | Latest stable versions |
| **Memory (RAM)** | 8GB or higher |
| **Storage** | 1GB free space (SSD preferred) |
| **Processor** | Multi-core CPU (Intel i5/AMD Ryzen 5 or better) |
| **Network** | Broadband connection for threat intelligence |

## 🔧 Installation Methods

### Method 1: Desktop Application (Full Features)

#### Windows Detailed Steps
```powershell
# Download verification (PowerShell)
$hash = Get-FileHash -Path "CyberInsuranceRiskAssessment-v1.0.0-Setup.exe" -Algorithm SHA256
Write-Host "File Hash: $($hash.Hash)"

# Silent installation (optional)
.\CyberInsuranceRiskAssessment-v1.0.0-Setup.exe /S /D=C:\Program Files\CyberRiskAssessment
```

#### macOS Detailed Steps
```bash
# Verify download
shasum -a 256 CyberInsuranceRiskAssessment-v1.0.0.dmg

# Mount and install
hdiutil attach CyberInsuranceRiskAssessment-v1.0.0.dmg
cp -R "/Volumes/Cyber Insurance Risk Assessment/Cyber Insurance Risk Assessment.app" /Applications/
hdiutil detach "/Volumes/Cyber Insurance Risk Assessment"

# Remove quarantine (if needed)
sudo xattr -rd com.apple.quarantine "/Applications/Cyber Insurance Risk Assessment.app"
```

#### Linux Detailed Steps
```bash
# Download and verify
wget https://releases.cybersec-solutions.com/CyberInsuranceRiskAssessment-v1.0.0.AppImage
sha256sum CyberInsuranceRiskAssessment-v1.0.0.AppImage

# Make executable and install
chmod +x CyberInsuranceRiskAssessment-v1.0.0.AppImage
./CyberInsuranceRiskAssessment-v1.0.0.AppImage --install

# Create desktop entry
cat > ~/.local/share/applications/cyber-risk-assessment.desktop << EOF
[Desktop Entry]
Name=Cyber Insurance Risk Assessment
Exec=/opt/CyberRiskAssessment/CyberRiskAssessment
Icon=/opt/CyberRiskAssessment/icon.png
Type=Application
Categories=Office;Security;
EOF
```

### Method 2: Progressive Web App (PWA)

#### Chrome/Edge Installation
1. Visit the web application URL
2. Click the install icon in the address bar
3. Confirm installation in the popup dialog
4. Access from desktop or app drawer

#### Firefox Installation
1. Visit the web application URL
2. Click the "Install" button when prompted
3. Confirm installation
4. Access from applications menu

### Method 3: Docker Deployment

```bash
# Pull official image
docker pull cybersec/risk-assessment:latest

# Run container
docker run -d \
  --name cyber-risk-assessment \
  -p 8080:80 \
  -v /path/to/data:/app/data \
  cybersec/risk-assessment:latest

# Access at http://localhost:8080
```

### Method 4: Source Code Installation

```bash
# Prerequisites
node --version  # Requires Node.js 18+
npm --version   # Requires npm 9+

# Clone and setup
git clone https://github.com/cybersec-solutions/cyber-insurance-risk-assessment.git
cd cyber-insurance-risk-assessment

# Install dependencies
npm ci

# Build for production
npm run build

# Start production server
npm run preview
```

## ⚙️ Configuration

### First-Time Setup

#### Desktop Application
1. **Launch Application**: Start from desktop shortcut
2. **License Agreement**: Accept terms and conditions
3. **Initial Configuration**:
   - Set data storage location
   - Configure security settings
   - Set up user preferences
4. **User Account**: Create administrator account
5. **System Integration**: Configure system permissions
6. **Verification**: Run initial system check

#### Configuration File
```json
{
  "application": {
    "name": "Cyber Insurance Risk Assessment Tool",
    "version": "1.0.0",
    "dataPath": "./data",
    "logLevel": "info"
  },
  "security": {
    "encryption": "AES-256",
    "sessionTimeout": 3600,
    "maxLoginAttempts": 3,
    "requireMFA": false
  },
  "compliance": {
    "frameworks": ["ISO27001", "NIST", "SOC2"],
    "autoUpdate": true,
    "reportRetention": 365
  },
  "network": {
    "proxyEnabled": false,
    "threatIntelligence": true,
    "updateCheck": true
  }
}
```

### Environment Variables

#### Desktop Application
```bash
# Data directory
CYBER_RISK_DATA_DIR=/path/to/data

# Log level
CYBER_RISK_LOG_LEVEL=info

# Proxy settings
CYBER_RISK_PROXY_URL=http://proxy.company.com:8080

# License key
CYBER_RISK_LICENSE_KEY=your-license-key-here
```

#### Web Application
```bash
# Development
NODE_ENV=development
VITE_APP_TITLE="Cyber Risk Assessment - Dev"
VITE_API_BASE_URL=http://localhost:3000

# Production
NODE_ENV=production
VITE_APP_TITLE="Cyber Risk Assessment"
VITE_API_BASE_URL=https://api.cybersec-solutions.com
```

## 🔒 Security Configuration

### SSL/TLS Setup
```bash
# Generate self-signed certificate (development)
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes

# Configure HTTPS
export HTTPS=true
export SSL_CRT_FILE=./cert.pem
export SSL_KEY_FILE=./key.pem
```

### Firewall Configuration
```bash
# Windows Firewall
netsh advfirewall firewall add rule name="Cyber Risk Assessment" dir=in action=allow protocol=TCP localport=8080

# Linux iptables
sudo iptables -A INPUT -p tcp --dport 8080 -j ACCEPT

# macOS pfctl
echo "pass in proto tcp from any to any port 8080" | sudo pfctl -f -
```

## 🚨 Troubleshooting

### Common Issues

#### Installation Fails
```bash
# Windows: Run as Administrator
# Check Windows Defender exclusions
# Verify system requirements

# macOS: Security & Privacy
# Allow app from unidentified developer
# Check Gatekeeper settings

# Linux: Dependencies
sudo apt-get install libgtk-3-0 libnotify4 libnss3 libxss1 libxtst6 xdg-utils libatspi2.0-0 libdrm2 libxcomposite1 libxdamage1 libxrandr2 libgbm1 libxkbcommon0 libxkbfile1
```

#### Application Won't Start
```bash
# Check logs
# Windows: %APPDATA%\CyberRiskAssessment\logs
# macOS: ~/Library/Logs/CyberRiskAssessment
# Linux: ~/.local/share/CyberRiskAssessment/logs

# Reset configuration
rm -rf ~/.config/CyberRiskAssessment
```

#### Network Issues
```bash
# Test connectivity
curl -I https://api.cybersec-solutions.com/health

# Check proxy settings
export HTTP_PROXY=http://proxy.company.com:8080
export HTTPS_PROXY=http://proxy.company.com:8080

# Verify DNS resolution
nslookup api.cybersec-solutions.com
```

### Performance Optimization

#### System Tuning
```bash
# Increase file watchers (Linux)
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
sudo sysctl -p

# Memory optimization
export NODE_OPTIONS="--max-old-space-size=4096"

# CPU optimization
export UV_THREADPOOL_SIZE=4
```

#### Database Optimization
```sql
-- SQLite optimization
PRAGMA journal_mode = WAL;
PRAGMA synchronous = NORMAL;
PRAGMA cache_size = 1000000;
PRAGMA temp_store = memory;
```

## 📊 Monitoring & Logging

### Log Configuration
```json
{
  "logging": {
    "level": "info",
    "file": "./logs/application.log",
    "maxSize": "10MB",
    "maxFiles": 5,
    "format": "json"
  }
}
```

### Health Checks
```bash
# Application health
curl http://localhost:8080/health

# Database health
curl http://localhost:8080/health/database

# System resources
curl http://localhost:8080/health/system
```

## 🔄 Updates & Maintenance

### Automatic Updates
```json
{
  "updates": {
    "enabled": true,
    "channel": "stable",
    "checkInterval": "24h",
    "downloadInBackground": true,
    "installOnRestart": true
  }
}
```

### Manual Updates
```bash
# Desktop application
# Check for updates in Help → Check for Updates

# Web application
git pull origin main
npm ci
npm run build
```

### Backup & Restore
```bash
# Backup data
tar -czf cyber-risk-backup-$(date +%Y%m%d).tar.gz ~/.local/share/CyberRiskAssessment/

# Restore data
tar -xzf cyber-risk-backup-20241201.tar.gz -C ~/
```

## 📞 Support

### Getting Help
- **Documentation**: https://docs.cybersec-solutions.com
- **Community Forum**: https://community.cybersec-solutions.com
- **Technical Support**: support@cybersec-solutions.com
- **Phone Support**: +1 (555) 123-CYBER

### Reporting Issues
```bash
# Generate diagnostic report
./CyberRiskAssessment --generate-diagnostic-report

# Submit issue with logs
# Include system information
# Describe steps to reproduce
# Attach diagnostic report
```

---

**Need additional help?** Contact our technical support team or visit our comprehensive documentation portal for detailed guides and troubleshooting resources.