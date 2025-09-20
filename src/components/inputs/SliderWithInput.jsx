import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const SliderWithInput = ({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  label,
  unit = '',
  disabled = false,
  className = '',
  showInput = true,
  showLabel = true,
  color = 'pink'
}) => {
  const [inputValue, setInputValue] = useState(value);
  
  useEffect(() => {
    setInputValue(value);
  }, [value]);
  
  const handleSliderChange = (e) => {
    const newValue = parseFloat(e.target.value);
    onChange(newValue);
    setInputValue(newValue);
  };
  
  const handleInputChange = (e) => {
    const newValue = parseFloat(e.target.value) || 0;
    const clampedValue = Math.min(Math.max(newValue, min), max);
    setInputValue(clampedValue);
    onChange(clampedValue);
  };
  
  const handleInputBlur = () => {
    const clampedValue = Math.min(Math.max(inputValue, min), max);
    setInputValue(clampedValue);
    onChange(clampedValue);
  };
  
  const percentage = ((value - min) / (max - min)) * 100;
  
  const colorClasses = {
    pink: 'bg-pink-500',
    purple: 'bg-purple-500',
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    red: 'bg-red-500',
    yellow: 'bg-yellow-500'
  };
  
  return (
    <div className={`space-y-2 ${className}`}>
      {showLabel && label && (
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
            {label}
          </label>
          {showInput && (
            <div className="flex items-center space-x-1">
              <input
                type="number"
                value={inputValue}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                min={min}
                max={max}
                step={step}
                disabled={disabled}
                className="w-20 px-2 py-1 text-sm text-center border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
              {unit && (
                <span className="text-sm text-slate-500 dark:text-slate-400">
                  {unit}
                </span>
              )}
            </div>
          )}
        </div>
      )}
      
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleSliderChange}
          disabled={disabled}
          className={`w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer slider ${
            disabled ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          style={{
            background: `linear-gradient(to right, ${colorClasses[color]} 0%, ${colorClasses[color]} ${percentage}%, #e2e8f0 ${percentage}%, #e2e8f0 100%)`
          }}
        />
        
        {/* Custom slider thumb */}
        <div
          className={`absolute top-1/2 transform -translate-y-1/2 w-5 h-5 ${colorClasses[color]} rounded-full shadow-lg cursor-pointer transition-all duration-200 hover:scale-110 ${
            disabled ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          style={{ left: `calc(${percentage}% - 10px)` }}
        />
      </div>
      
      {/* Value indicators */}
      <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
        <span>{min}{unit}</span>
        <span>{max}{unit}</span>
      </div>
    </div>
  );
};

export default SliderWithInput;