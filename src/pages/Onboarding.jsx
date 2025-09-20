import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import CurrencyInput from '../components/inputs/CurrencyInput';
import SliderWithInput from '../components/inputs/SliderWithInput';
import PercentInput from '../components/inputs/PercentInput';
import { formatCurrency } from '../utils/currency';

const Onboarding = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    companyName: '',
    startingCash: 500000,
    monthlyRevenue: 75000,
    monthlyExpenses: 60000,
    headcount: 25,
    averageSalary: 80000,
    growthRate: 5,
    burnRate: 10
  });

  const steps = [
    {
      title: 'Company Setup',
      description: 'Tell us about your company and starting position',
      fields: [
        {
          type: 'text',
          key: 'companyName',
          label: 'Company Name',
          placeholder: 'Enter your company name',
          required: true
        },
        {
          type: 'currency',
          key: 'startingCash',
          label: 'Starting Cash',
          description: 'How much cash do you have available?'
        }
      ]
    },
    {
      title: 'Monthly Operations',
      description: 'Set up your monthly revenue and expenses',
      fields: [
        {
          type: 'currency',
          key: 'monthlyRevenue',
          label: 'Monthly Revenue',
          description: 'Expected monthly revenue'
        },
        {
          type: 'currency',
          key: 'monthlyExpenses',
          label: 'Monthly Expenses',
          description: 'Fixed monthly expenses (excluding payroll)'
        }
      ]
    },
    {
      title: 'Team & Growth',
      description: 'Configure your team and growth assumptions',
      fields: [
        {
          type: 'slider',
          key: 'headcount',
          label: 'Current Headcount',
          min: 1,
          max: 100,
          unit: 'people'
        },
        {
          type: 'currency',
          key: 'averageSalary',
          label: 'Average Salary',
          description: 'Average annual salary per employee'
        },
        {
          type: 'percent',
          key: 'growthRate',
          label: 'Monthly Growth Rate',
          description: 'Expected monthly revenue growth'
        }
      ]
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete onboarding
      navigate('/dashboard');
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFieldChange = (key, value) => {
    setFormData(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const renderField = (field) => {
    switch (field.type) {
      case 'text':
        return (
          <div key={field.key}>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <input
              type="text"
              value={formData[field.key]}
              onChange={(e) => handleFieldChange(field.key, e.target.value)}
              placeholder={field.placeholder}
              className="input-field"
              required={field.required}
            />
            {field.description && (
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {field.description}
              </p>
            )}
          </div>
        );
      case 'currency':
        return (
          <CurrencyInput
            key={field.key}
            value={formData[field.key]}
            onChange={(value) => handleFieldChange(field.key, value)}
            label={field.label}
            currency="USD"
          />
        );
      case 'slider':
        return (
          <SliderWithInput
            key={field.key}
            value={formData[field.key]}
            onChange={(value) => handleFieldChange(field.key, value)}
            label={field.label}
            min={field.min}
            max={field.max}
            unit={field.unit}
          />
        );
      case 'percent':
        return (
          <PercentInput
            key={field.key}
            value={formData[field.key]}
            onChange={(value) => handleFieldChange(field.key, value)}
            label={field.label}
            showSlider={true}
          />
        );
      default:
        return null;
    }
  };

  // Calculate preview metrics
  const calculateMetrics = () => {
    const annualPayroll = formData.headcount * formData.averageSalary;
    const monthlyPayroll = annualPayroll / 12;
    const totalMonthlyExpenses = formData.monthlyExpenses + monthlyPayroll;
    const monthlyBurn = totalMonthlyExpenses - formData.monthlyRevenue;
    const runway = monthlyBurn > 0 ? formData.startingCash / monthlyBurn : Infinity;
    
    return {
      monthlyBurn: Math.round(monthlyBurn),
      runway: Math.round(runway * 10) / 10,
      totalMonthlyExpenses: Math.round(totalMonthlyExpenses),
      monthlyPayroll: Math.round(monthlyPayroll)
    };
  };

  const metrics = calculateMetrics();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">CF</span>
            </div>
            <span className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              CFO Helper
            </span>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
            Welcome! Let's set up your financial model
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            This will only take a few minutes to get you started
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Progress Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-6">
                Setup Progress
              </h3>
              <div className="space-y-4">
                {steps.map((step, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      index < currentStep
                        ? 'bg-green-500 text-white'
                        : index === currentStep
                        ? 'bg-pink-500 text-white'
                        : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
                    }`}>
                      {index < currentStep ? <Check size={16} /> : index + 1}
                    </div>
                    <div>
                      <p className={`text-sm font-medium ${
                        index <= currentStep
                          ? 'text-slate-900 dark:text-slate-100'
                          : 'text-slate-600 dark:text-slate-400'
                      }`}>
                        {step.title}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card className="p-8">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                    {steps[currentStep].title}
                  </h2>
                  <p className="text-slate-600 dark:text-slate-400">
                    {steps[currentStep].description}
                  </p>
                </div>

                <div className="space-y-6">
                  {steps[currentStep].fields.map(renderField)}
                </div>
              </motion.div>

              {/* Navigation */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentStep === 0}
                  icon={<ChevronLeft size={16} />}
                >
                  Previous
                </Button>
                
                <div className="text-sm text-slate-500 dark:text-slate-400">
                  Step {currentStep + 1} of {steps.length}
                </div>
                
                <Button
                  variant="primary"
                  onClick={handleNext}
                  icon={<ChevronRight size={16} />}
                  iconPosition="right"
                >
                  {currentStep === steps.length - 1 ? 'Complete Setup' : 'Next'}
                </Button>
              </div>
            </Card>
          </div>
        </div>

        {/* Live Preview */}
        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-6">
              Live Preview
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
                  Starting Cash
                </p>
                <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  {formatCurrency(formData.startingCash, 'USD', { compact: true })}
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
                  Monthly Burn
                </p>
                <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                  {formatCurrency(metrics.monthlyBurn, 'USD', { compact: true })}
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
                  Runway
                </p>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {metrics.runway} months
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
                  Total Expenses
                </p>
                <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  {formatCurrency(metrics.totalMonthlyExpenses, 'USD', { compact: true })}
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Onboarding;