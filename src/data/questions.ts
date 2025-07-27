import { Question } from '../types';

export const riskAssessmentQuestions: Question[] = [
  // Network Security
  {
    id: 'net-001',
    category: 'Network Security',
    question: 'Do you have a next-generation firewall with intrusion prevention?',
    type: 'boolean',
    weight: 8,
    compliance: ['ISO27001', 'NIST', 'SOC2']
  },
  {
    id: 'net-002',
    category: 'Network Security',
    question: 'Rate your network segmentation implementation (1-5)',
    type: 'scale',
    weight: 7,
    compliance: ['ISO27001', 'NIST']
  },
  {
    id: 'net-003',
    category: 'Network Security',
    question: 'Do you monitor network traffic 24/7?',
    type: 'boolean',
    weight: 6,
    compliance: ['SOC2', 'NIST']
  },

  // Endpoint Security
  {
    id: 'end-001',
    category: 'Endpoint Security',
    question: 'What type of endpoint protection do you use?',
    type: 'multiple',
    weight: 8,
    options: ['Traditional Antivirus', 'Next-Gen Antivirus', 'EDR Solution', 'XDR Solution', 'None'],
    compliance: ['ISO27001', 'NIST', 'SOC2']
  },
  {
    id: 'end-002',
    category: 'Endpoint Security',
    question: 'Are all endpoints encrypted?',
    type: 'boolean',
    weight: 9,
    compliance: ['ISO27001', 'NIST', 'SOC2']
  },
  {
    id: 'end-003',
    category: 'Endpoint Security',
    question: 'Do you have mobile device management (MDM)?',
    type: 'boolean',
    weight: 6,
    compliance: ['ISO27001', 'SOC2']
  },

  // Access Control
  {
    id: 'acc-001',
    category: 'Access Control',
    question: 'Do you enforce multi-factor authentication (MFA)?',
    type: 'boolean',
    weight: 10,
    compliance: ['ISO27001', 'NIST', 'SOC2']
  },
  {
    id: 'acc-002',
    category: 'Access Control',
    question: 'How often do you review user access rights?',
    type: 'multiple',
    weight: 7,
    options: ['Weekly', 'Monthly', 'Quarterly', 'Annually', 'Never'],
    compliance: ['ISO27001', 'SOC2']
  },
  {
    id: 'acc-003',
    category: 'Access Control',
    question: 'Do you have privileged access management (PAM)?',
    type: 'boolean',
    weight: 8,
    compliance: ['ISO27001', 'NIST', 'SOC2']
  },

  // Data Protection
  {
    id: 'data-001',
    category: 'Data Protection',
    question: 'Is sensitive data encrypted at rest and in transit?',
    type: 'boolean',
    weight: 10,
    compliance: ['ISO27001', 'NIST', 'SOC2']
  },
  {
    id: 'data-002',
    category: 'Data Protection',
    question: 'Do you have a data loss prevention (DLP) solution?',
    type: 'boolean',
    weight: 7,
    compliance: ['ISO27001', 'SOC2']
  },
  {
    id: 'data-003',
    category: 'Data Protection',
    question: 'How frequently do you backup critical data?',
    type: 'multiple',
    weight: 8,
    options: ['Real-time', 'Daily', 'Weekly', 'Monthly', 'Irregularly'],
    compliance: ['ISO27001', 'NIST', 'SOC2']
  },

  // Incident Response
  {
    id: 'inc-001',
    category: 'Incident Response',
    question: 'Do you have a documented incident response plan?',
    type: 'boolean',
    weight: 9,
    compliance: ['ISO27001', 'NIST', 'SOC2']
  },
  {
    id: 'inc-002',
    category: 'Incident Response',
    question: 'How often do you test your incident response procedures?',
    type: 'multiple',
    weight: 7,
    options: ['Monthly', 'Quarterly', 'Semi-annually', 'Annually', 'Never'],
    compliance: ['ISO27001', 'NIST']
  },
  {
    id: 'inc-003',
    category: 'Incident Response',
    question: 'Do you have a Security Operations Center (SOC)?',
    type: 'boolean',
    weight: 6,
    compliance: ['NIST', 'SOC2']
  },

  // Employee Training
  {
    id: 'emp-001',
    category: 'Employee Training',
    question: 'How often do you conduct security awareness training?',
    type: 'multiple',
    weight: 6,
    options: ['Monthly', 'Quarterly', 'Semi-annually', 'Annually', 'Never'],
    compliance: ['ISO27001', 'NIST', 'SOC2']
  },
  {
    id: 'emp-002',
    category: 'Employee Training',
    question: 'Do you conduct phishing simulation exercises?',
    type: 'boolean',
    weight: 5,
    compliance: ['ISO27001', 'NIST']
  },

  // Compliance & Governance
  {
    id: 'comp-001',
    category: 'Compliance & Governance',
    question: 'Do you have a formal information security policy?',
    type: 'boolean',
    weight: 8,
    compliance: ['ISO27001', 'SOC2']
  },
  {
    id: 'comp-002',
    category: 'Compliance & Governance',
    question: 'How often do you conduct security risk assessments?',
    type: 'multiple',
    weight: 7,
    options: ['Monthly', 'Quarterly', 'Semi-annually', 'Annually', 'Never'],
    compliance: ['ISO27001', 'NIST', 'SOC2']
  }
];