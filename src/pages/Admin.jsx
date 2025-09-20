import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings, 
  Activity, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  RefreshCw,
  Download,
  Trash2
} from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('logs');

  // Mock data
  const systemLogs = [
    {
      id: 1,
      timestamp: '2024-01-15T10:30:00Z',
      level: 'info',
      message: 'Pathway integration connected successfully',
      service: 'pathway',
      details: 'Connected to Pathway API v2.1'
    },
    {
      id: 2,
      timestamp: '2024-01-15T10:25:00Z',
      level: 'warning',
      message: 'High credit usage detected',
      service: 'billing',
      details: 'User consumed 80% of monthly credits'
    },
    {
      id: 3,
      timestamp: '2024-01-15T10:20:00Z',
      level: 'error',
      message: 'Simulation failed to complete',
      service: 'simulation',
      details: 'Invalid scenario parameters provided'
    },
    {
      id: 4,
      timestamp: '2024-01-15T10:15:00Z',
      level: 'info',
      message: 'Report generated successfully',
      service: 'reports',
      details: 'PDF report created for scenario ID 123'
    }
  ];

  const systemStats = {
    totalUsers: 1250,
    activeUsers: 890,
    totalScenarios: 5420,
    reportsGenerated: 1250,
    apiCalls: 45600,
    errors: 23,
    uptime: '99.9%'
  };

  const recentEvents = [
    {
      id: 1,
      type: 'user_signup',
      description: 'New user registered',
      timestamp: '2024-01-15T10:30:00Z',
      user: 'john@company.com'
    },
    {
      id: 2,
      type: 'scenario_created',
      description: 'New scenario created',
      timestamp: '2024-01-15T10:25:00Z',
      user: 'sarah@startup.com'
    },
    {
      id: 3,
      type: 'report_generated',
      description: 'Financial report generated',
      timestamp: '2024-01-15T10:20:00Z',
      user: 'mike@tech.com'
    },
    {
      id: 4,
      type: 'payment_processed',
      description: 'Credit purchase completed',
      timestamp: '2024-01-15T10:15:00Z',
      user: 'lisa@business.com'
    }
  ];

  const getLogLevelColor = (level) => {
    switch (level) {
      case 'error':
        return 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20';
      case 'warning':
        return 'text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20';
      case 'info':
        return 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20';
      default:
        return 'text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800';
    }
  };

  const getLogLevelIcon = (level) => {
    switch (level) {
      case 'error':
        return <XCircle className="w-4 h-4" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4" />;
      case 'info':
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <Activity className="w-4 h-4" />;
    }
  };

  const handleTriggerError = (type) => {
    console.log(`Triggering ${type} error for testing`);
  };

  const handleClearLogs = () => {
    console.log('Clearing system logs');
  };

  const handleExportLogs = () => {
    console.log('Exporting system logs');
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
            Admin Panel
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            System monitoring and administration tools
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm">
            <RefreshCw size={16} className="mr-2" />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <Download size={16} className="mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* System Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Object.entries(systemStats).map(([key, value], index) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="kpi-chip">
              <div className="text-center">
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </p>
                <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  {typeof value === 'number' ? value.toLocaleString() : value}
                </p>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-200 dark:border-slate-700">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'logs', name: 'System Logs' },
            { id: 'events', name: 'Recent Events' },
            { id: 'debug', name: 'Debug Tools' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-pink-500 text-pink-600 dark:text-pink-400'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300 dark:text-slate-400 dark:hover:text-slate-300'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'logs' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                System Logs
              </h3>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" onClick={handleClearLogs}>
                  <Trash2 size={16} className="mr-2" />
                  Clear Logs
                </Button>
                <Button variant="outline" size="sm" onClick={handleExportLogs}>
                  <Download size={16} className="mr-2" />
                  Export
                </Button>
              </div>
            </div>
            
            <div className="space-y-3">
              {systemLogs.map((log, index) => (
                <motion.div
                  key={log.id}
                  className={`p-4 rounded-lg border ${getLogLevelColor(log.level)}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      {getLogLevelIcon(log.level)}
                      <div>
                        <p className="font-medium text-slate-900 dark:text-slate-100">
                          {log.message}
                        </p>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                          {log.details}
                        </p>
                        <div className="flex items-center space-x-4 mt-2 text-xs text-slate-500 dark:text-slate-400">
                          <span>Service: {log.service}</span>
                          <span>{new Date(log.timestamp).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
      )}

      {activeTab === 'events' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-6">
              Recent Events
            </h3>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-700">
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-600 dark:text-slate-400">
                      Event
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-600 dark:text-slate-400">
                      User
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-600 dark:text-slate-400">
                      Timestamp
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {recentEvents.map((event, index) => (
                    <motion.tr
                      key={event.id}
                      className="border-b border-slate-200 dark:border-slate-700"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <td className="py-3 px-4 text-sm text-slate-900 dark:text-slate-100">
                        {event.description}
                      </td>
                      <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">
                        {event.user}
                      </td>
                      <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">
                        {new Date(event.timestamp).toLocaleString()}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </motion.div>
      )}

      {activeTab === 'debug' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-6">
              Debug Tools
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-slate-700 dark:text-slate-300 mb-4">
                  Error Simulation
                </h4>
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleTriggerError('simulation')}
                    className="w-full"
                  >
                    Trigger Simulation Error
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleTriggerError('billing')}
                    className="w-full"
                  >
                    Trigger Billing Error
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleTriggerError('pathway')}
                    className="w-full"
                  >
                    Trigger Pathway Error
                  </Button>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-slate-700 dark:text-slate-300 mb-4">
                  System Actions
                </h4>
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                  >
                    Clear Cache
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                  >
                    Reset Database
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                  >
                    Restart Services
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      )}
    </div>
  );
};

export default Admin;