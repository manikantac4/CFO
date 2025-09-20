import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { formatCurrency } from '../../utils/currency';

const ScenarioCompareChart = ({
  scenarios = [],
  dataKey = 'cash',
  currency = 'USD',
  height = 300,
  showGrid = true,
  showTooltip = true,
  className = ''
}) => {
  // Generate mock data if none provided
  const mockScenarios = scenarios.length > 0 ? scenarios : [
    {
      name: 'Conservative',
      color: '#3b82f6',
      data: [
        { month: 'Jan', cash: 500000 },
        { month: 'Feb', cash: 490000 },
        { month: 'Mar', cash: 480000 },
        { month: 'Apr', cash: 470000 },
        { month: 'May', cash: 460000 },
        { month: 'Jun', cash: 450000 },
        { month: 'Jul', cash: 440000 },
        { month: 'Aug', cash: 430000 },
        { month: 'Sep', cash: 420000 },
        { month: 'Oct', cash: 410000 },
        { month: 'Nov', cash: 400000 },
        { month: 'Dec', cash: 390000 }
      ]
    },
    {
      name: 'Optimistic',
      color: '#10b981',
      data: [
        { month: 'Jan', cash: 500000 },
        { month: 'Feb', cash: 520000 },
        { month: 'Mar', cash: 540000 },
        { month: 'Apr', cash: 560000 },
        { month: 'May', cash: 580000 },
        { month: 'Jun', cash: 600000 },
        { month: 'Jul', cash: 620000 },
        { month: 'Aug', cash: 640000 },
        { month: 'Sep', cash: 660000 },
        { month: 'Oct', cash: 680000 },
        { month: 'Nov', cash: 700000 },
        { month: 'Dec', cash: 720000 }
      ]
    },
    {
      name: 'Realistic',
      color: '#f59e0b',
      data: [
        { month: 'Jan', cash: 500000 },
        { month: 'Feb', cash: 505000 },
        { month: 'Mar', cash: 510000 },
        { month: 'Apr', cash: 515000 },
        { month: 'May', cash: 520000 },
        { month: 'Jun', cash: 525000 },
        { month: 'Jul', cash: 530000 },
        { month: 'Aug', cash: 535000 },
        { month: 'Sep', cash: 540000 },
        { month: 'Oct', cash: 545000 },
        { month: 'Nov', cash: 550000 },
        { month: 'Dec', cash: 555000 }
      ]
    }
  ];
  
  // Transform data for chart
  const chartData = mockScenarios[0]?.data.map((item, index) => {
    const dataPoint = { month: item.month };
    mockScenarios.forEach((scenario, scenarioIndex) => {
      dataPoint[scenario.name] = scenario.data[index]?.[dataKey] || 0;
    });
    return dataPoint;
  }) || [];
  
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-slate-800 p-3 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg">
          <p className="text-sm font-medium text-slate-900 dark:text-slate-100 mb-2">
            {label}
          </p>
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-sm text-slate-600 dark:text-slate-400">
                {entry.name}:
              </span>
              <span className="text-sm font-medium text-slate-900 dark:text-slate-100">
                {formatCurrency(entry.value, currency)}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };
  
  return (
    <div className={`w-full ${className}`}>
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
          Scenario Comparison
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Compare {dataKey} across different scenarios
        </p>
      </div>
      
      <ResponsiveContainer width="100%" height={height}>
        <LineChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          {showGrid && (
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="#e2e8f0" 
              className="dark:stroke-slate-700"
            />
          )}
          <XAxis 
            dataKey="month" 
            stroke="#64748b"
            className="dark:stroke-slate-400"
            fontSize={12}
          />
          <YAxis 
            stroke="#64748b"
            className="dark:stroke-slate-400"
            fontSize={12}
            tickFormatter={(value) => formatCurrency(value, currency, { compact: true })}
          />
          {showTooltip && <Tooltip content={<CustomTooltip />} />}
          <Legend />
          
          {mockScenarios.map((scenario, index) => (
            <Line
              key={scenario.name}
              type="monotone"
              dataKey={scenario.name}
              stroke={scenario.color}
              strokeWidth={3}
              dot={{ fill: scenario.color, strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: scenario.color, strokeWidth: 2 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
      
      {/* Scenario summary */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        {mockScenarios.map((scenario, index) => (
          <div key={scenario.name} className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: scenario.color }}
              />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                {scenario.name}
              </span>
            </div>
            <div className="text-lg font-bold text-slate-900 dark:text-slate-100">
              {formatCurrency(
                scenario.data[scenario.data.length - 1]?.[dataKey] || 0,
                currency,
                { compact: true }
              )}
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-400">
              End of year
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScenarioCompareChart;