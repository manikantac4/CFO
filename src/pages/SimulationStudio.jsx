import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Save, 
  Download, 
  Undo, 
  Redo, 
  Settings,
  Lightbulb,
  CreditCard,
  TrendingUp
} from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import SliderWithInput from '../components/inputs/SliderWithInput';
import CurrencyInput from '../components/inputs/CurrencyInput';
import PercentInput from '../components/inputs/PercentInput';
import Toggle from '../components/inputs/Toggle';
import CashflowChart from '../components/charts/CashflowChart';
import RunwayGauge from '../components/charts/RunwayGauge';
import PnLStack from '../components/charts/PnLStack';
import { useSimulation } from '../hooks/useSimulation';
import { formatCurrency } from '../utils/currency';

const SimulationStudio = () => {
  const {
    currentScenario,
    calculatedMetrics,
    updateScenario,
    saveCurrentScenario,
    isSaving
  } = useSimulation();

  const [activeTab, setActiveTab] = useState('inputs');
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleSave = async () => {
    try {
      await saveCurrentScenario();
      // Show success toast
    } catch (error) {
      console.error('Save failed:', error);
    }
  };

  const handleExport = () => {
    // Mock export functionality
    console.log('Exporting report...');
  };

  const inputSections = [
    {
      title: 'Revenue & Expenses',
      inputs: [
        {
          type: 'currency',
          key: 'monthlyRevenue',
          label: 'Monthly Revenue',
          value: currentScenario.monthlyRevenue,
          onChange: (value) => updateScenario({ monthlyRevenue: value })
        },
        {
          type: 'currency',
          key: 'monthlyExpenses',
          label: 'Monthly Expenses',
          value: currentScenario.monthlyExpenses,
          onChange: (value) => updateScenario({ monthlyExpenses: value })
        },
        {
          type: 'currency',
          key: 'marketing',
          label: 'Marketing Spend',
          value: currentScenario.marketing,
          onChange: (value) => updateScenario({ marketing: value })
        }
      ]
    },
    {
      title: 'Payroll & Headcount',
      inputs: [
        {
          type: 'slider',
          key: 'headcount',
          label: 'Headcount',
          value: currentScenario.headcount,
          min: 1,
          max: 100,
          onChange: (value) => updateScenario({ headcount: value })
        },
        {
          type: 'currency',
          key: 'averageSalary',
          label: 'Average Salary',
          value: currentScenario.averageSalary,
          onChange: (value) => updateScenario({ averageSalary: value })
        }
      ]
    },
    {
      title: 'Growth & Assumptions',
      inputs: [
        {
          type: 'percent',
          key: 'growthRate',
          label: 'Growth Rate',
          value: currentScenario.growthRate * 100,
          onChange: (value) => updateScenario({ growthRate: value / 100 })
        },
        {
          type: 'currency',
          key: 'startingCash',
          label: 'Starting Cash',
          value: currentScenario.startingCash,
          onChange: (value) => updateScenario({ startingCash: value })
        }
      ]
    }
  ];

  const advancedInputs = [
    {
      type: 'percent',
      key: 'taxRate',
      label: 'Tax Rate',
      value: currentScenario.assumptions.taxRate * 100,
      onChange: (value) => updateScenario({ 
        assumptions: { ...currentScenario.assumptions, taxRate: value / 100 }
      })
    },
    {
      type: 'currency',
      key: 'capex',
      label: 'Monthly CAPEX',
      value: currentScenario.assumptions.capex,
      onChange: (value) => updateScenario({ 
        assumptions: { ...currentScenario.assumptions, capex: value }
      })
    },
    {
      type: 'percent',
      key: 'seasonality',
      label: 'Seasonality Factor',
      value: currentScenario.assumptions.seasonality * 100,
      onChange: (value) => updateScenario({ 
        assumptions: { ...currentScenario.assumptions, seasonality: value / 100 }
      })
    }
  ];

  const renderInput = (input) => {
    switch (input.type) {
      case 'currency':
        return (
          <CurrencyInput
            key={input.key}
            value={input.value}
            onChange={input.onChange}
            label={input.label}
            currency="USD"
          />
        );
      case 'slider':
        return (
          <SliderWithInput
            key={input.key}
            value={input.value}
            onChange={input.onChange}
            label={input.label}
            min={input.min}
            max={input.max}
            unit="people"
          />
        );
      case 'percent':
        return (
          <PercentInput
            key={input.key}
            value={input.value}
            onChange={input.onChange}
            label={input.label}
            showSlider={true}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
            Simulation Studio
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Build and analyze financial scenarios in real-time
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm" icon={<Undo size={16} />}>
            Undo
          </Button>
          <Button variant="outline" size="sm" icon={<Redo size={16} />}>
            Redo
          </Button>
          <Button variant="outline" size="sm" icon={<Download size={16} />} onClick={handleExport}>
            Export
          </Button>
          <Button 
            variant="primary" 
            size="sm" 
            icon={<Save size={16} />} 
            onClick={handleSave}
            loading={isSaving}
          >
            Save Scenario
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Left Panel - Inputs */}
        <motion.div
          className="xl:col-span-3"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="h-fit">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Input Parameters
              </h3>
              <Button
                variant="ghost"
                size="sm"
                icon={<Settings size={16} />}
                onClick={() => setShowAdvanced(!showAdvanced)}
              >
                {showAdvanced ? 'Hide' : 'Show'} Advanced
              </Button>
            </div>

            <div className="space-y-6">
              {inputSections.map((section, sectionIndex) => (
                <div key={sectionIndex}>
                  <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-4">
                    {section.title}
                  </h4>
                  <div className="space-y-4">
                    {section.inputs.map(renderInput)}
                  </div>
                </div>
              ))}

              {showAdvanced && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-4">
                    Advanced Settings
                  </h4>
                  <div className="space-y-4">
                    {advancedInputs.map(renderInput)}
                  </div>
                </motion.div>
              )}
            </div>
          </Card>
        </motion.div>

        {/* Middle Panel - Results */}
        <motion.div
          className="xl:col-span-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="kpi-chip">
                <div className="text-center">
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
                    Current Cash
                  </p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                    {formatCurrency(currentScenario.startingCash, 'USD', { compact: true })}
                  </p>
                </div>
              </Card>
              <Card className="kpi-chip">
                <div className="text-center">
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
                    Monthly Burn
                  </p>
                  <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                    {formatCurrency(calculatedMetrics.monthlyBurn, 'USD', { compact: true })}
                  </p>
                </div>
              </Card>
              <Card className="kpi-chip">
                <div className="text-center">
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
                    Runway
                  </p>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {calculatedMetrics.runway} months
                  </p>
                </div>
              </Card>
            </div>

            {/* Charts */}
            <div className="space-y-6">
              <Card>
                <CashflowChart height={300} />
              </Card>
              <Card>
                <PnLStack height={250} />
              </Card>
            </div>
          </div>
        </motion.div>

        {/* Right Panel - Insights & Billing */}
        <motion.div
          className="xl:col-span-3"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="space-y-6">
            {/* Runway Gauge */}
            <Card>
              <RunwayGauge 
                currentRunway={calculatedMetrics.runway} 
                height={200} 
              />
            </Card>

            {/* AI Insights */}
            <Card>
              <div className="flex items-center space-x-2 mb-4">
                <Lightbulb className="w-5 h-5 text-yellow-500" />
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  AI Insights
                </h3>
              </div>
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    Your burn rate is 15% higher than industry average. Consider optimizing operational costs.
                  </p>
                </div>
                <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <p className="text-sm text-green-800 dark:text-green-200">
                    Revenue growth looks healthy. You're on track to break even in 8 months.
                  </p>
                </div>
                <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <p className="text-sm text-yellow-800 dark:text-yellow-200">
                    Consider raising funds when runway drops below 6 months.
                  </p>
                </div>
              </div>
            </Card>

            {/* Billing Widget */}
            <Card>
              <div className="flex items-center space-x-2 mb-4">
                <CreditCard className="w-5 h-5 text-purple-500" />
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  Credits
                </h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    Remaining
                  </span>
                  <span className="font-semibold text-slate-900 dark:text-slate-100">
                    1,250
                  </span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span>Last used: 2 hours ago</span>
                  <span>75% remaining</span>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  Buy More Credits
                </Button>
              </div>
            </Card>

            {/* Pathway Feed */}
            <Card>
              <div className="flex items-center space-x-2 mb-4">
                <TrendingUp className="w-5 h-5 text-green-500" />
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  Live Updates
                </h3>
              </div>
              <div className="space-y-3">
                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    <span className="font-medium">Revenue:</span> $85,000 (+5.2%)
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    2 minutes ago
                  </p>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    <span className="font-medium">Expenses:</span> $62,000 (+1.8%)
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    5 minutes ago
                  </p>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    <span className="font-medium">Headcount:</span> 28 (+2)
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    1 hour ago
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SimulationStudio;