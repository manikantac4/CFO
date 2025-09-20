import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Clock,
  Plus,
  FileText,
  BarChart3,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import CashflowChart from '../components/charts/CashflowChart';
import RunwayGauge from '../components/charts/RunwayGauge';
import { formatCurrency } from '../utils/currency';

const Dashboard = () => {
  // Mock data
  const kpis = [
    {
      title: 'Current Cash',
      value: 650000,
      change: 5.2,
      trend: 'up',
      icon: DollarSign,
      color: 'text-green-600 dark:text-green-400'
    },
    {
      title: 'Monthly Burn',
      value: 45000,
      change: -2.1,
      trend: 'down',
      icon: TrendingDown,
      color: 'text-red-600 dark:text-red-400'
    },
    {
      title: 'Runway',
      value: 14.4,
      change: 0.8,
      trend: 'up',
      icon: Clock,
      color: 'text-blue-600 dark:text-blue-400',
      unit: 'months'
    },
    {
      title: 'Profit/Loss',
      value: 15000,
      change: 12.5,
      trend: 'up',
      icon: TrendingUp,
      color: 'text-green-600 dark:text-green-400'
    }
  ];

  const recentScenarios = [
    {
      id: 1,
      name: 'Q4 Growth Plan',
      description: 'Conservative growth scenario with 20% headcount increase',
      cash: 750000,
      runway: 16.7,
      burn: 45000,
      updatedAt: '2024-01-15',
      status: 'active'
    },
    {
      id: 2,
      name: 'Market Expansion',
      description: 'Aggressive expansion into new markets',
      cash: 580000,
      runway: 12.9,
      burn: 45000,
      updatedAt: '2024-01-12',
      status: 'draft'
    },
    {
      id: 3,
      name: 'Cost Optimization',
      description: 'Reduced expenses and streamlined operations',
      cash: 720000,
      runway: 18.2,
      burn: 39500,
      updatedAt: '2024-01-10',
      status: 'completed'
    }
  ];

  const alerts = [
    {
      type: 'warning',
      message: 'Runway is below 6 months. Consider fundraising or cost reduction.',
      icon: AlertTriangle
    },
    {
      type: 'info',
      message: 'Monthly burn rate has increased by 5% this quarter.',
      icon: TrendingUp
    }
  ];

  const quickActions = [
    {
      title: 'New Simulation',
      description: 'Create a new financial scenario',
      icon: Plus,
      href: '/simulation',
      color: 'bg-pink-500'
    },
    {
      title: 'Export Report',
      description: 'Generate PDF or CSV report',
      icon: FileText,
      href: '/reports',
      color: 'bg-purple-500'
    },
    {
      title: 'View Scenarios',
      description: 'Compare and analyze scenarios',
      icon: BarChart3,
      href: '/scenarios',
      color: 'bg-blue-500'
    }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
            Dashboard
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Welcome back! Here's your financial overview.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm">
            <FileText size={16} className="mr-2" />
            Export
          </Button>
          <Link to="/simulation">
            <Button variant="primary" size="sm">
              <Plus size={16} className="mr-2" />
              New Simulation
            </Button>
          </Link>
        </div>
      </div>

      {/* Alerts */}
      {alerts.length > 0 && (
        <motion.div
          className="space-y-3"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {alerts.map((alert, index) => (
            <motion.div
              key={index}
              className={`p-4 rounded-lg border-l-4 ${
                alert.type === 'warning'
                  ? 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-400'
                  : 'bg-blue-50 dark:bg-blue-900/20 border-blue-400'
              }`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className="flex items-center">
                <alert.icon className={`w-5 h-5 mr-3 ${
                  alert.type === 'warning'
                    ? 'text-yellow-600 dark:text-yellow-400'
                    : 'text-blue-600 dark:text-blue-400'
                }`} />
                <p className={`text-sm ${
                  alert.type === 'warning'
                    ? 'text-yellow-800 dark:text-yellow-200'
                    : 'text-blue-800 dark:text-blue-200'
                }`}>
                  {alert.message}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="kpi-chip">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                    {kpi.title}
                  </p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                    {kpi.unit ? `${kpi.value} ${kpi.unit}` : formatCurrency(kpi.value)}
                  </p>
                  <div className="flex items-center mt-1">
                    {kpi.trend === 'up' ? (
                      <TrendingUp className={`w-4 h-4 mr-1 text-green-500`} />
                    ) : (
                      <TrendingDown className={`w-4 h-4 mr-1 text-red-500`} />
                    )}
                    <span className={`text-sm ${
                      kpi.trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                    }`}>
                      {kpi.change > 0 ? '+' : ''}{kpi.change}%
                    </span>
                  </div>
                </div>
                <div className={`p-3 rounded-lg bg-slate-100 dark:bg-slate-700`}>
                  <kpi.icon className={`w-6 h-6 ${kpi.color}`} />
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cash Flow Chart */}
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card>
            <CashflowChart height={300} />
          </Card>
        </motion.div>

        {/* Runway Gauge */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card>
            <RunwayGauge currentRunway={14.4} height={300} />
          </Card>
        </motion.div>
      </div>

      {/* Recent Scenarios and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Scenarios */}
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Recent Scenarios
              </h3>
              <Link to="/scenarios">
                <Button variant="ghost" size="sm">
                  View All
                </Button>
              </Link>
            </div>
            
            <div className="space-y-4">
              {recentScenarios.map((scenario, index) => (
                <motion.div
                  key={scenario.id}
                  className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-medium text-slate-900 dark:text-slate-100">
                          {scenario.name}
                        </h4>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          scenario.status === 'active'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                            : scenario.status === 'draft'
                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                            : 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                        }`}>
                          {scenario.status}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                        {scenario.description}
                      </p>
                      <div className="flex items-center space-x-4 text-sm">
                        <span className="text-slate-600 dark:text-slate-400">
                          Cash: {formatCurrency(scenario.cash, 'USD', { compact: true })}
                        </span>
                        <span className="text-slate-600 dark:text-slate-400">
                          Runway: {scenario.runway} months
                        </span>
                        <span className="text-slate-600 dark:text-slate-400">
                          Burn: {formatCurrency(scenario.burn, 'USD', { compact: true })}/mo
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Updated {new Date(scenario.updatedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <Card>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-6">
              Quick Actions
            </h3>
            
            <div className="space-y-4">
              {quickActions.map((action, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
                >
                  <Link to={action.href}>
                    <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${action.color}`}>
                          <action.icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-medium text-slate-900 dark:text-slate-100">
                            {action.title}
                          </h4>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            {action.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;