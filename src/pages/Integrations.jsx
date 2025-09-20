import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Link as LinkIcon, 
  Upload, 
  Settings,
  CheckCircle,
  AlertCircle,
  Clock,
  Download
} from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Toggle from '../components/inputs/Toggle';
import { pathwayService } from '../services/pathway';

const Integrations = () => {
  const [pathwayConnected, setPathwayConnected] = useState(false);
  const [csvFile, setCsvFile] = useState(null);
  const [webhookUrl, setWebhookUrl] = useState('');

  const integrations = [
    {
      name: 'Pathway',
      description: 'Real-time financial data ingestion',
      icon: LinkIcon,
      status: pathwayConnected ? 'connected' : 'disconnected',
      lastSync: pathwayConnected ? '2 minutes ago' : 'Never',
      features: ['Live cash updates', 'Revenue tracking', 'Expense monitoring']
    },
    {
      name: 'CSV Upload',
      description: 'Import financial data from spreadsheets',
      icon: Upload,
      status: 'available',
      lastSync: 'Last upload: 3 days ago',
      features: ['Bulk data import', 'Column mapping', 'Data validation']
    },
    {
      name: 'Webhook',
      description: 'Receive real-time updates via webhooks',
      icon: Settings,
      status: webhookUrl ? 'configured' : 'not_configured',
      lastSync: webhookUrl ? 'Active' : 'Not configured',
      features: ['Real-time notifications', 'Custom endpoints', 'Event filtering']
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'connected':
      case 'configured':
        return 'text-green-600 dark:text-green-400';
      case 'disconnected':
      case 'not_configured':
        return 'text-red-600 dark:text-red-400';
      case 'available':
        return 'text-blue-600 dark:text-blue-400';
      default:
        return 'text-slate-600 dark:text-slate-400';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'connected':
      case 'configured':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'disconnected':
      case 'not_configured':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'available':
        return <Clock className="w-5 h-5 text-blue-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-slate-500" />;
    }
  };

  const handlePathwayToggle = async () => {
    if (pathwayConnected) {
      pathwayService.disconnect();
      setPathwayConnected(false);
    } else {
      const result = await pathwayService.connect();
      if (result.success) {
        setPathwayConnected(true);
      }
    }
  };

  const handleCsvUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setCsvFile(file);
    }
  };

  const handleWebhookSave = () => {
    // Mock webhook save
    console.log('Webhook URL saved:', webhookUrl);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
            Integrations
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Connect external data sources and automate your workflow
          </p>
        </div>
      </div>

      {/* Integrations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {integrations.map((integration, index) => (
          <motion.div
            key={integration.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="h-full">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg">
                    <integration.icon className="w-6 h-6 text-slate-600 dark:text-slate-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                      {integration.name}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {integration.description}
                    </p>
                  </div>
                </div>
                {getStatusIcon(integration.status)}
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    Status
                  </span>
                  <span className={`text-sm font-medium ${getStatusColor(integration.status)}`}>
                    {integration.status.replace('_', ' ')}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    Last Sync
                  </span>
                  <span className="text-sm text-slate-900 dark:text-slate-100">
                    {integration.lastSync}
                  </span>
                </div>

                {/* Features */}
                <div>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Features:
                  </p>
                  <ul className="space-y-1">
                    {integration.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="text-xs text-slate-600 dark:text-slate-400">
                        • {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Actions */}
                <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                  {integration.name === 'Pathway' && (
                    <Toggle
                      checked={pathwayConnected}
                      onChange={handlePathwayToggle}
                      label="Enable Pathway Integration"
                    />
                  )}
                  
                  {integration.name === 'CSV Upload' && (
                    <div className="space-y-3">
                      <input
                        type="file"
                        accept=".csv"
                        onChange={handleCsvUpload}
                        className="hidden"
                        id="csv-upload"
                      />
                      <label htmlFor="csv-upload">
                        <Button variant="outline" size="sm" className="w-full">
                          <Upload size={16} className="mr-2" />
                          Upload CSV
                        </Button>
                      </label>
                      {csvFile && (
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          Selected: {csvFile.name}
                        </p>
                      )}
                    </div>
                  )}
                  
                  {integration.name === 'Webhook' && (
                    <div className="space-y-3">
                      <input
                        type="url"
                        placeholder="https://your-webhook-url.com"
                        value={webhookUrl}
                        onChange={(e) => setWebhookUrl(e.target.value)}
                        className="input-field text-sm"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
                        onClick={handleWebhookSave}
                      >
                        Save Webhook
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Pathway Live Feed */}
      {pathwayConnected && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Live Data Feed
              </h3>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm text-green-600 dark:text-green-400">
                  Connected
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">
                  Current Cash
                </p>
                <p className="text-xl font-bold text-slate-900 dark:text-slate-100">
                  $650,000
                </p>
                <p className="text-xs text-green-600 dark:text-green-400">
                  +$5,000 (2 min ago)
                </p>
              </div>
              
              <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">
                  Monthly Revenue
                </p>
                <p className="text-xl font-bold text-slate-900 dark:text-slate-100">
                  $85,000
                </p>
                <p className="text-xs text-green-600 dark:text-green-400">
                  +$2,000 (5 min ago)
                </p>
              </div>
              
              <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">
                  Monthly Expenses
                </p>
                <p className="text-xl font-bold text-slate-900 dark:text-slate-100">
                  $62,000
                </p>
                <p className="text-xs text-red-600 dark:text-red-400">
                  +$1,000 (10 min ago)
                </p>
              </div>
              
              <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">
                  Headcount
                </p>
                <p className="text-xl font-bold text-slate-900 dark:text-slate-100">
                  28
                </p>
                <p className="text-xs text-blue-600 dark:text-blue-400">
                  +2 (1 hour ago)
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      )}

      {/* CSV Mapping */}
      {csvFile && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-6">
              CSV Column Mapping
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-slate-700 dark:text-slate-300 mb-3">
                  CSV Columns
                </h4>
                <div className="space-y-2">
                  {['Date', 'Revenue', 'Expenses', 'Cash', 'Headcount'].map((column) => (
                    <div key={column} className="p-2 bg-slate-50 dark:bg-slate-800 rounded text-sm">
                      {column}
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-slate-700 dark:text-slate-300 mb-3">
                  Map to CFO Helper Fields
                </h4>
                <div className="space-y-2">
                  {['Date', 'Revenue', 'Expenses', 'Cash', 'Headcount'].map((field) => (
                    <select key={field} className="input-field text-sm">
                      <option value="">Select field...</option>
                      <option value="date">Date</option>
                      <option value="revenue">Revenue</option>
                      <option value="expenses">Expenses</option>
                      <option value="cash">Cash</option>
                      <option value="headcount">Headcount</option>
                    </select>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-end space-x-3 mt-6">
              <Button variant="outline">
                Cancel
              </Button>
              <Button variant="primary">
                Import Data
              </Button>
            </div>
          </Card>
        </motion.div>
      )}
    </div>
  );
};

export default Integrations;