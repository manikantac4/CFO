import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';
import { formatCurrency } from '../../utils/currency';

const CashflowChart = ({
  data = [],
  currency = 'USD',
  height = 300,
  showGrid = true,
  showTooltip = true,
  className = ''
}) => {
  // Generate mock data if none provided
  const mockData = data.length > 0 ? data : [
    { month: 'Jan', cash: 500000, revenue: 75000, expenses: 60000 },
    { month: 'Feb', cash: 515000, revenue: 80000, expenses: 65000 },
    { month: 'Mar', cash: 530000, revenue: 85000, expenses: 70000 },
    { month: 'Apr', cash: 545000, revenue: 90000, expenses: 75000 },
    { month: 'May', cash: 560000, revenue: 95000, expenses: 80000 },
    { month: 'Jun', cash: 575000, revenue: 100000, expenses: 85000 },
    { month: 'Jul', cash: 590000, revenue: 105000, expenses: 90000 },
    { month: 'Aug', cash: 605000, revenue: 110000, expenses: 95000 },
    { month: 'Sep', cash: 620000, revenue: 115000, expenses: 100000 },
    { month: 'Oct', cash: 635000, revenue: 120000, expenses: 105000 },
    { month: 'Nov', cash: 650000, revenue: 125000, expenses: 110000 },
    { month: 'Dec', cash: 665000, revenue: 130000, expenses: 115000 }
  ];
  
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
          Cash Flow Projection
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Monthly cash position and burn rate
        </p>
      </div>
      
      <ResponsiveContainer width="100%" height={height}>
        <AreaChart
          data={mockData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
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
          
          {/* Cash position area */}
          <Area
            type="monotone"
            dataKey="cash"
            stackId="1"
            stroke="#ec4899"
            fill="url(#cashGradient)"
            strokeWidth={2}
          />
          
          {/* Revenue area */}
          <Area
            type="monotone"
            dataKey="revenue"
            stackId="2"
            stroke="#a855f7"
            fill="url(#revenueGradient)"
            strokeWidth={2}
          />
          
          {/* Expenses area (negative) */}
          <Area
            type="monotone"
            dataKey="expenses"
            stackId="3"
            stroke="#ef4444"
            fill="url(#expensesGradient)"
            strokeWidth={2}
          />
          
          {/* Zero line reference */}
          <ReferenceLine y={0} stroke="#64748b" strokeDasharray="2 2" />
          
          {/* Gradients */}
          <defs>
            <linearGradient id="cashGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ec4899" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#ec4899" stopOpacity={0.1} />
            </linearGradient>
            <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#a855f7" stopOpacity={0.1} />
            </linearGradient>
            <linearGradient id="expensesGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1} />
            </linearGradient>
          </defs>
        </AreaChart>
      </ResponsiveContainer>
      
      {/* Legend */}
      <div className="flex items-center justify-center space-x-6 mt-4">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-pink-500 rounded-full" />
          <span className="text-sm text-slate-600 dark:text-slate-400">Cash Position</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-purple-500 rounded-full" />
          <span className="text-sm text-slate-600 dark:text-slate-400">Revenue</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full" />
          <span className="text-sm text-slate-600 dark:text-slate-400">Expenses</span>
        </div>
      </div>
    </div>
  );
};

export default CashflowChart;