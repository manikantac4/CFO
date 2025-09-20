import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { formatCurrency } from '../../utils/currency';

const PnLStack = ({
  data = [],
  currency = 'USD',
  height = 300,
  showGrid = true,
  showTooltip = true,
  className = ''
}) => {
  // Generate mock data if none provided
  const mockData = data.length > 0 ? data : [
    { month: 'Jan', revenue: 75000, expenses: 60000, profit: 15000 },
    { month: 'Feb', revenue: 80000, expenses: 65000, profit: 15000 },
    { month: 'Mar', revenue: 85000, expenses: 70000, profit: 15000 },
    { month: 'Apr', revenue: 90000, expenses: 75000, profit: 15000 },
    { month: 'May', revenue: 95000, expenses: 80000, profit: 15000 },
    { month: 'Jun', revenue: 100000, expenses: 85000, profit: 15000 },
    { month: 'Jul', revenue: 105000, expenses: 90000, profit: 15000 },
    { month: 'Aug', revenue: 110000, expenses: 95000, profit: 15000 },
    { month: 'Sep', revenue: 115000, expenses: 100000, profit: 15000 },
    { month: 'Oct', revenue: 120000, expenses: 105000, profit: 15000 },
    { month: 'Nov', revenue: 125000, expenses: 110000, profit: 15000 },
    { month: 'Dec', revenue: 130000, expenses: 115000, profit: 15000 }
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
          Profit & Loss
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Monthly revenue, expenses, and profit
        </p>
      </div>
      
      <ResponsiveContainer width="100%" height={height}>
        <BarChart
          data={mockData}
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
          
          {/* Revenue bars */}
          <Bar
            dataKey="revenue"
            name="Revenue"
            fill="#10b981"
            radius={[2, 2, 0, 0]}
          />
          
          {/* Expenses bars (negative) */}
          <Bar
            dataKey="expenses"
            name="Expenses"
            fill="#ef4444"
            radius={[2, 2, 0, 0]}
          />
          
          {/* Profit bars */}
          <Bar
            dataKey="profit"
            name="Profit"
            fill="#3b82f6"
            radius={[2, 2, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
      
      {/* Summary stats */}
      <div className="mt-4 grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            {formatCurrency(
              mockData.reduce((sum, item) => sum + item.revenue, 0),
              currency,
              { compact: true }
            )}
          </div>
          <div className="text-sm text-slate-600 dark:text-slate-400">
            Total Revenue
          </div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-red-600 dark:text-red-400">
            {formatCurrency(
              mockData.reduce((sum, item) => sum + item.expenses, 0),
              currency,
              { compact: true }
            )}
          </div>
          <div className="text-sm text-slate-600 dark:text-slate-400">
            Total Expenses
          </div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {formatCurrency(
              mockData.reduce((sum, item) => sum + item.profit, 0),
              currency,
              { compact: true }
            )}
          </div>
          <div className="text-sm text-slate-600 dark:text-slate-400">
            Total Profit
          </div>
        </div>
      </div>
    </div>
  );
};

export default PnLStack;