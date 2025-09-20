import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical,
  Copy,
  Trash2,
  Edit,
  BarChart3
} from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import ScenarioCompareChart from '../components/charts/ScenarioCompareChart';
import { formatCurrency } from '../utils/currency';

const Scenarios = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedScenarios, setSelectedScenarios] = useState([]);
  const [compareMode, setCompareMode] = useState(false);

  // Mock scenarios data
  const scenarios = [
    {
      id: 1,
      name: 'Q4 Growth Plan',
      description: 'Conservative growth scenario with 20% headcount increase',
      cash: 750000,
      runway: 16.7,
      burn: 45000,
      revenue: 85000,
      expenses: 60000,
      headcount: 30,
      updatedAt: '2024-01-15',
      status: 'active',
      category: 'growth'
    },
    {
      id: 2,
      name: 'Market Expansion',
      description: 'Aggressive expansion into new markets',
      cash: 580000,
      runway: 12.9,
      burn: 45000,
      revenue: 95000,
      expenses: 70000,
      headcount: 35,
      updatedAt: '2024-01-12',
      status: 'draft',
      category: 'expansion'
    },
    {
      id: 3,
      name: 'Cost Optimization',
      description: 'Reduced expenses and streamlined operations',
      cash: 720000,
      runway: 18.2,
      burn: 39500,
      revenue: 75000,
      expenses: 50000,
      headcount: 25,
      updatedAt: '2024-01-10',
      status: 'completed',
      category: 'optimization'
    },
    {
      id: 4,
      name: 'Fundraising Round',
      description: 'Scenario with Series A funding',
      cash: 2000000,
      runway: 44.4,
      burn: 45000,
      revenue: 100000,
      expenses: 65000,
      headcount: 40,
      updatedAt: '2024-01-08',
      status: 'draft',
      category: 'fundraising'
    }
  ];

  const filteredScenarios = scenarios.filter(scenario =>
    scenario.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    scenario.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectScenario = (scenarioId) => {
    if (selectedScenarios.includes(scenarioId)) {
      setSelectedScenarios(selectedScenarios.filter(id => id !== scenarioId));
    } else if (selectedScenarios.length < 3) {
      setSelectedScenarios([...selectedScenarios, scenarioId]);
    }
  };

  const handleCompare = () => {
    if (selectedScenarios.length >= 2) {
      setCompareMode(true);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'completed':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      default:
        return 'bg-slate-100 text-slate-800 dark:bg-slate-900/20 dark:text-slate-400';
    }
  };

  const getRunwayColor = (runway) => {
    if (runway <= 6) return 'text-red-600 dark:text-red-400';
    if (runway <= 12) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-green-600 dark:text-green-400';
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
            Scenarios
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Manage and compare your financial scenarios
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm">
            <Filter size={16} className="mr-2" />
            Filter
          </Button>
          <Button variant="primary" size="sm">
            <Plus size={16} className="mr-2" />
            New Scenario
          </Button>
        </div>
      </div>

      {/* Search and Compare */}
      <div className="flex items-center space-x-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
          <input
            type="text"
            placeholder="Search scenarios..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-field pl-10"
          />
        </div>
        {selectedScenarios.length >= 2 && (
          <Button
            variant="secondary"
            onClick={handleCompare}
            icon={<BarChart3 size={16} />}
          >
            Compare ({selectedScenarios.length})
          </Button>
        )}
      </div>

      {/* Compare Mode */}
      {compareMode && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Scenario Comparison
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setCompareMode(false);
                  setSelectedScenarios([]);
                }}
              >
                Close
              </Button>
            </div>
            <ScenarioCompareChart
              scenarios={selectedScenarios.map(id => scenarios.find(s => s.id === id))}
              dataKey="cash"
              height={400}
            />
          </Card>
        </motion.div>
      )}

      {/* Scenarios Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredScenarios.map((scenario, index) => (
          <motion.div
            key={scenario.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card
              className={`cursor-pointer transition-all duration-200 ${
                selectedScenarios.includes(scenario.id)
                  ? 'ring-2 ring-pink-500 bg-pink-50 dark:bg-pink-900/10'
                  : 'hover:shadow-lg'
              }`}
              onClick={() => handleSelectScenario(scenario.id)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                      {scenario.name}
                    </h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(scenario.status)}`}>
                      {scenario.status}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                    {scenario.description}
                  </p>
                </div>
                <button className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
                  <MoreVertical size={16} />
                </button>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Cash</p>
                  <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                    {formatCurrency(scenario.cash, 'USD', { compact: true })}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Runway</p>
                  <p className={`text-sm font-semibold ${getRunwayColor(scenario.runway)}`}>
                    {scenario.runway} months
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Burn</p>
                  <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                    {formatCurrency(scenario.burn, 'USD', { compact: true })}/mo
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Headcount</p>
                  <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                    {scenario.headcount}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-700">
                <div className="flex items-center space-x-2">
                  <button className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
                    <Edit size={14} />
                  </button>
                  <button className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
                    <Copy size={14} />
                  </button>
                  <button className="p-1 text-slate-400 hover:text-red-600 dark:hover:text-red-400">
                    <Trash2 size={14} />
                  </button>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {new Date(scenario.updatedAt).toLocaleDateString()}
                </p>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredScenarios.length === 0 && (
        <motion.div
          className="text-center py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <BarChart3 className="w-12 h-12 text-slate-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
            No scenarios found
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            {searchQuery ? 'Try adjusting your search terms' : 'Create your first scenario to get started'}
          </p>
          <Button variant="primary">
            <Plus size={16} className="mr-2" />
            Create Scenario
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default Scenarios;