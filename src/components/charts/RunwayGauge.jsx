import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const RunwayGauge = ({
  currentRunway = 18,
  maxRunway = 24,
  height = 200,
  className = ''
}) => {
  // Calculate the data for the gauge
  const usedRunway = Math.min(currentRunway, maxRunway);
  const remainingRunway = maxRunway - usedRunway;
  
  const data = [
    { name: 'Used', value: usedRunway, color: getRunwayColor(currentRunway) },
    { name: 'Remaining', value: remainingRunway, color: '#e2e8f0' }
  ];
  
  // Determine color based on runway months
  function getRunwayColor(months) {
    if (months <= 3) return '#ef4444'; // Red - Critical
    if (months <= 6) return '#f59e0b'; // Yellow - Warning
    if (months <= 12) return '#3b82f6'; // Blue - Caution
    return '#10b981'; // Green - Healthy
  }
  
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="bg-white dark:bg-slate-800 p-3 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg">
          <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
            {data.name}: {data.value} months
          </p>
        </div>
      );
    }
    return null;
  };
  
  return (
    <div className={`w-full ${className}`}>
      <div className="mb-4 text-center">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
          Runway Gauge
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Months of cash remaining
        </p>
      </div>
      
      <div className="relative">
        <ResponsiveContainer width="100%" height={height}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              startAngle={90}
              endAngle={450}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        
        {/* Center content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-3xl font-bold text-slate-900 dark:text-slate-100">
              {currentRunway}
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-400">
              months
            </div>
          </div>
        </div>
      </div>
      
      {/* Status indicator */}
      <div className="mt-4 text-center">
        <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
          currentRunway <= 3
            ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
            : currentRunway <= 6
            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
            : currentRunway <= 12
            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
            : 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
        }`}>
          {currentRunway <= 3
            ? 'Critical'
            : currentRunway <= 6
            ? 'Warning'
            : currentRunway <= 12
            ? 'Caution'
            : 'Healthy'
          }
        </div>
      </div>
      
      {/* Runway breakdown */}
      <div className="mt-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-slate-600 dark:text-slate-400">Current Runway</span>
          <span className="font-medium text-slate-900 dark:text-slate-100">
            {currentRunway} months
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-slate-600 dark:text-slate-400">Max Projection</span>
          <span className="font-medium text-slate-900 dark:text-slate-100">
            {maxRunway} months
          </span>
        </div>
      </div>
    </div>
  );
};

export default RunwayGauge;