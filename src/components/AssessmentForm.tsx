import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Save, CheckCircle } from 'lucide-react';
import { Question, Answer } from '../types';
import { riskAssessmentQuestions } from '../data/questions';

interface AssessmentFormProps {
  onComplete: (answers: Answer[], companyInfo: any) => void;
  onBack: () => void;
}

const AssessmentForm: React.FC<AssessmentFormProps> = ({ onComplete, onBack }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [companyInfo, setCompanyInfo] = useState({
    companyName: '',
    industry: '',
    employeeCount: 0,
    annualRevenue: 0
  });

  const categories = [...new Set(riskAssessmentQuestions.map(q => q.category))];
  const isCompanyInfoStep = currentStep === 0;
  const currentCategory = categories[currentStep - 1];
  const questionsForCategory = riskAssessmentQuestions.filter(q => q.category === currentCategory);
  const totalSteps = categories.length + 1; // +1 for company info

  const handleAnswerChange = (questionId: string, value: any) => {
    setAnswers(prev => {
      const existing = prev.find(a => a.questionId === questionId);
      const question = riskAssessmentQuestions.find(q => q.id === questionId);
      
      if (!question) return prev;
      
      // Calculate score based on question type and answer
      let score = 0;
      switch (question.type) {
        case 'boolean':
          score = value === true ? question.weight : 0;
          break;
        case 'scale':
          score = (value / 5) * question.weight;
          break;
        case 'multiple':
          const optionIndex = question.options?.indexOf(value) || 0;
          const optionCount = question.options?.length || 1;
          score = (optionIndex / (optionCount - 1)) * question.weight;
          break;
      }
      
      if (existing) {
        return prev.map(a => a.questionId === questionId ? { ...a, value, score } : a);
      } else {
        return [...prev, { questionId, value, score }];
      }
    });
  };

  const getAnswerValue = (questionId: string) => {
    return answers.find(a => a.questionId === questionId)?.value;
  };

  const canProceed = () => {
    if (isCompanyInfoStep) {
      return companyInfo.companyName && companyInfo.industry && companyInfo.employeeCount > 0;
    }
    
    const categoryAnswers = questionsForCategory.filter(q => 
      answers.some(a => a.questionId === q.id)
    );
    return categoryAnswers.length === questionsForCategory.length;
  };

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(answers, companyInfo);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      onBack();
    }
  };

  const renderCompanyInfo = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Company Name *
        </label>
        <input
          type="text"
          value={companyInfo.companyName}
          onChange={(e) => setCompanyInfo(prev => ({ ...prev, companyName: e.target.value }))}
          className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your company name"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Industry *
        </label>
        <select
          value={companyInfo.industry}
          onChange={(e) => setCompanyInfo(prev => ({ ...prev, industry: e.target.value }))}
          className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Industry</option>
          <option value="Technology">Technology</option>
          <option value="Healthcare">Healthcare</option>
          <option value="Financial Services">Financial Services</option>
          <option value="Manufacturing">Manufacturing</option>
          <option value="Retail">Retail</option>
          <option value="Education">Education</option>
          <option value="Government">Government</option>
          <option value="Other">Other</option>
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Number of Employees *
        </label>
        <select
          value={companyInfo.employeeCount}
          onChange={(e) => setCompanyInfo(prev => ({ ...prev, employeeCount: parseInt(e.target.value) }))}
          className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value={0}>Select Employee Count</option>
          <option value={10}>1-10</option>
          <option value={50}>11-50</option>
          <option value={100}>51-100</option>
          <option value={500}>101-500</option>
          <option value={1000}>501-1000</option>
          <option value={5000}>1000+</option>
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Annual Revenue (Optional)
        </label>
        <select
          value={companyInfo.annualRevenue}
          onChange={(e) => setCompanyInfo(prev => ({ ...prev, annualRevenue: parseInt(e.target.value) }))}
          className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value={0}>Select Annual Revenue</option>
          <option value={100000}>Under $100K</option>
          <option value={1000000}>$100K - $1M</option>
          <option value={10000000}>$1M - $10M</option>
          <option value={50000000}>$10M - $50M</option>
          <option value={100000000}>$50M+</option>
        </select>
      </div>
    </div>
  );

  const renderQuestion = (question: Question) => {
    const value = getAnswerValue(question.id);
    
    return (
      <div key={question.id} className="bg-slate-700/50 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-medium text-white mb-4">{question.question}</h3>
        
        {question.type === 'boolean' && (
          <div className="flex gap-4">
            <button
              onClick={() => handleAnswerChange(question.id, true)}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                value === true
                  ? 'bg-green-600 text-white'
                  : 'bg-slate-600 text-slate-300 hover:bg-slate-500'
              }`}
            >
              Yes
            </button>
            <button
              onClick={() => handleAnswerChange(question.id, false)}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                value === false
                  ? 'bg-red-600 text-white'
                  : 'bg-slate-600 text-slate-300 hover:bg-slate-500'
              }`}
            >
              No
            </button>
          </div>
        )}
        
        {question.type === 'scale' && (
          <div className="space-y-3">
            <div className="flex justify-between text-sm text-slate-400">
              <span>Poor (1)</span>
              <span>Excellent (5)</span>
            </div>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map(num => (
                <button
                  key={num}
                  onClick={() => handleAnswerChange(question.id, num)}
                  className={`w-12 h-12 rounded-lg font-medium transition-all ${
                    value === num
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-600 text-slate-300 hover:bg-slate-500'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>
        )}
        
        {question.type === 'multiple' && (
          <div className="space-y-2">
            {question.options?.map(option => (
              <button
                key={option}
                onClick={() => handleAnswerChange(question.id, option)}
                className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-all ${
                  value === option
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-600 text-slate-300 hover:bg-slate-500'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        )}
        
        <div className="mt-4 text-xs text-slate-400">
          Compliance: {question.compliance.join(', ')} | Weight: {question.weight}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={handlePrevious}
            className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          
          <div className="text-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              {isCompanyInfoStep ? 'Company Information' : currentCategory}
            </h1>
            <p className="text-slate-400 mt-1">
              Step {currentStep + 1} of {totalSteps}
            </p>
          </div>
          
          <div className="w-16"></div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-slate-400 mb-2">
            <span>Progress</span>
            <span>{Math.round(((currentStep) / (totalSteps - 1)) * 100)}%</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${((currentStep) / (totalSteps - 1)) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700">
          {isCompanyInfoStep ? (
            renderCompanyInfo()
          ) : (
            <div>
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">{currentCategory}</h2>
                <p className="text-slate-400">
                  Please answer all questions in this category to proceed.
                </p>
              </div>
              
              {questionsForCategory.map(renderQuestion)}
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8">
          <div className="text-sm text-slate-400">
            {!isCompanyInfoStep && (
              <>Answered: {questionsForCategory.filter(q => answers.some(a => a.questionId === q.id)).length} / {questionsForCategory.length}</>
            )}
          </div>
          
          <button
            onClick={handleNext}
            disabled={!canProceed()}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
              canProceed()
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-slate-600 text-slate-400 cursor-not-allowed'
            }`}
          >
            {currentStep === totalSteps - 1 ? (
              <>
                <Save className="w-4 h-4" />
                Complete Assessment
              </>
            ) : (
              <>
                Next
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssessmentForm;