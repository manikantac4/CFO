import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Download, 
  FileText, 
  Calendar,
  Eye,
  Trash2,
  Plus,
  Filter
} from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import { formatCurrency } from '../utils/currency';

const Reports = () => {
  const [showExportModal, setShowExportModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);

  // Mock reports data
  const reports = [
    {
      id: 1,
      name: 'Q4 Financial Summary',
      scenario: 'Q4 Growth Plan',
      type: 'PDF',
      size: '2.4 MB',
      createdAt: '2024-01-15T10:30:00Z',
      status: 'completed',
      charts: ['Cash Flow', 'P&L', 'Runway Gauge']
    },
    {
      id: 2,
      name: 'Investor Deck - January',
      scenario: 'Market Expansion',
      type: 'PDF',
      size: '5.1 MB',
      createdAt: '2024-01-12T14:20:00Z',
      status: 'completed',
      charts: ['Cash Flow', 'P&L', 'Scenario Comparison']
    },
    {
      id: 3,
      name: 'Monthly Burn Analysis',
      scenario: 'Cost Optimization',
      type: 'CSV',
      size: '0.8 MB',
      createdAt: '2024-01-10T09:15:00Z',
      status: 'completed',
      charts: ['P&L', 'Expense Breakdown']
    },
    {
      id: 4,
      name: 'Board Report - Q1',
      scenario: 'Fundraising Round',
      type: 'PDF',
      size: '3.2 MB',
      createdAt: '2024-01-08T16:45:00Z',
      status: 'generating',
      charts: ['Cash Flow', 'P&L', 'Runway Gauge', 'Scenario Comparison']
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'generating':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'failed':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'bg-slate-100 text-slate-800 dark:bg-slate-900/20 dark:text-slate-400';
    }
  };

  const handleDownload = (report) => {
    // Mock download
    console.log('Downloading report:', report.name);
  };

  const handlePreview = (report) => {
    setSelectedReport(report);
  };

  const handleDelete = (reportId) => {
    // Mock delete
    console.log('Deleting report:', reportId);
  };

  const handleExport = () => {
    setShowExportModal(true);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
            Reports
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Generate and manage your financial reports
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm">
            <Filter size={16} className="mr-2" />
            Filter
          </Button>
          <Button variant="primary" size="sm" onClick={handleExport}>
            <Plus size={16} className="mr-2" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* Reports List */}
      <div className="space-y-4">
        {reports.map((report, index) => (
          <motion.div
            key={report.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-lg">
                    <FileText className="w-6 h-6 text-slate-600 dark:text-slate-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                      {report.name}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-slate-600 dark:text-slate-400">
                      <span>Scenario: {report.scenario}</span>
                      <span>Type: {report.type}</span>
                      <span>Size: {report.size}</span>
                    </div>
                    <div className="flex items-center space-x-2 mt-2">
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(report.status)}`}>
                        {report.status}
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        {new Date(report.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {report.status === 'completed' && (
                    <>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handlePreview(report)}
                        icon={<Eye size={16} />}
                      >
                        Preview
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDownload(report)}
                        icon={<Download size={16} />}
                      >
                        Download
                      </Button>
                    </>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(report.id)}
                    icon={<Trash2 size={16} />}
                    className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                  >
                    Delete
                  </Button>
                </div>
              </div>
              
              {/* Charts included */}
              <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                  Charts included:
                </p>
                <div className="flex flex-wrap gap-2">
                  {report.charts.map((chart, chartIndex) => (
                    <span
                      key={chartIndex}
                      className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded text-xs"
                    >
                      {chart}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Export Modal */}
      <Modal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        title="Generate Report"
        size="lg"
      >
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Report Name
            </label>
            <input
              type="text"
              placeholder="Enter report name"
              className="input-field"
              defaultValue="Financial Report - January 2024"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Select Scenario
            </label>
            <select className="input-field">
              <option>Q4 Growth Plan</option>
              <option>Market Expansion</option>
              <option>Cost Optimization</option>
              <option>Fundraising Round</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Report Type
            </label>
            <div className="grid grid-cols-2 gap-4">
              <label className="flex items-center space-x-2 p-3 border border-slate-300 dark:border-slate-600 rounded-lg cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800">
                <input type="radio" name="type" value="PDF" defaultChecked className="text-pink-600" />
                <span className="text-sm text-slate-700 dark:text-slate-300">PDF Report</span>
              </label>
              <label className="flex items-center space-x-2 p-3 border border-slate-300 dark:border-slate-600 rounded-lg cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800">
                <input type="radio" name="type" value="CSV" className="text-pink-600" />
                <span className="text-sm text-slate-700 dark:text-slate-300">CSV Data</span>
              </label>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Include Charts
            </label>
            <div className="space-y-2">
              {['Cash Flow Chart', 'P&L Stack', 'Runway Gauge', 'Scenario Comparison'].map((chart) => (
                <label key={chart} className="flex items-center space-x-2">
                  <input type="checkbox" defaultChecked className="text-pink-600" />
                  <span className="text-sm text-slate-700 dark:text-slate-300">{chart}</span>
                </label>
              ))}
            </div>
          </div>
          
          <div className="flex items-center justify-end space-x-3 pt-4">
            <Button variant="outline" onClick={() => setShowExportModal(false)}>
              Cancel
            </Button>
            <Button variant="primary">
              Generate Report
            </Button>
          </div>
        </div>
      </Modal>

      {/* Preview Modal */}
      <Modal
        isOpen={!!selectedReport}
        onClose={() => setSelectedReport(null)}
        title={selectedReport?.name}
        size="xl"
      >
        {selectedReport && (
          <div className="space-y-4">
            <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-8 text-center">
              <FileText className="w-16 h-16 text-slate-400 mx-auto mb-4" />
              <p className="text-slate-600 dark:text-slate-400">
                Report preview would be displayed here
              </p>
            </div>
            <div className="flex items-center justify-end space-x-3">
              <Button variant="outline" onClick={() => setSelectedReport(null)}>
                Close
              </Button>
              <Button variant="primary" onClick={() => handleDownload(selectedReport)}>
                <Download size={16} className="mr-2" />
                Download
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Reports;