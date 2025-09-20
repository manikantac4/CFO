import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const PercentInput = ({
  value,
  onChange,
  label,
  placeholder = '0',
  disabled = false,
  required = false,
  error = null,
  className = '',
  showLabel = true,
  size = 'md',
  min = 0,
  max = 100,
  step = 0.1,
  showSlider = false
}) => {
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  
  useEffect(() => {
    if (value !== undefined && value !== null) {
      setInputValue(value.toString());
    }
  }, [value]);
  
  const handleInputChange = (e) => {
    const rawValue = e.target.value;
    setInputValue(rawValue);
    
    const numericValue = parseFloat(rawValue) || 0;
    const clampedValue = Math.min(Math.max(numericValue, min), max);
    onChange(clampedValue);
  };
  
  const handleSliderChange = (e) => {
    const newValue = parseFloat(e.target.value);
    setInputValue(newValue.toString());
    onChange(newValue);
  };
  
  const handleFocus = () => {
    setIsFocused(true);
  };
  
  const handleBlur = () => {
    setIsFocused(false);
    // Clamp value on blur
    const numericValue = parseFloat(inputValue) || 0;
    const clampedValue = Math.min(Math.max(numericValue, min), max);
    setInputValue(clampedValue.toString());
    onChange(clampedValue);
  };
  
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-base',
    lg: 'px-5 py-4 text-lg'
  };
  
  const percentage = ((value - min) / (max - min)) * 100;
  
  return (
    <div className={`space-y-2 ${className}`}>
      {showLabel && label && (
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="space-y-2">
        <div className="relative">
          <input
            type="number"
            value={inputValue}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={placeholder}
            disabled={disabled}
            min={min}
            max={max}
            step={step}
            className={`w-full ${sizeClasses[size]} pr-8 border rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 ${
              error
                ? 'border-red-300 dark:border-red-600 focus:ring-red-500'
                : isFocused
                ? 'border-pink-300 dark:border-pink-600'
                : 'border-slate-300 dark:border-slate-600'
            } ${
              disabled ? 'opacity-50 cursor-not-allowed bg-slate-50 dark:bg-slate-700' : ''
            }`}
          />
          
          {/* Percentage symbol */}
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <span className="text-slate-500 dark:text-slate-400 text-sm">%</span>
          </div>
          
          {/* Focus indicator */}
          {isFocused && (
            <motion.div
              className="absolute inset-0 rounded-lg border-2 border-pink-500 pointer-events-none"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.15 }}
            />
          )}
        </div>
        
        {/* Slider */}
        {showSlider && (
          <div className="space-y-1">
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
                  background: `linear-gradient(to right, #ec4899 0%, #ec4899 ${percentage}%, #e2e8f0 ${percentage}%, #e2e8f0 100%)`
                }}
              />
              
              {/* Custom slider thumb */}
              <div
                className={`absolute top-1/2 transform -translate-y-1/2 w-5 h-5 bg-pink-500 rounded-full shadow-lg cursor-pointer transition-all duration-200 hover:scale-110 ${
                  disabled ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                style={{ left: `calc(${percentage}% - 10px)` }}
              />
            </div>
            
            {/* Value indicators */}
            <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
              <span>{min}%</span>
              <span>{max}%</span>
            </div>
          </div>
        )}
      </div>
      
      {/* Error message */}
      {error && (
        <motion.p
          className="text-sm text-red-600 dark:text-red-400"
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
        >
          {error}
        </motion.p>
      )}
      
      {/* Value display */}
      {!isFocused && value !== undefined && value !== null && (
        <div className="text-xs text-slate-500 dark:text-slate-400">
          {value.toFixed(1)}%
        </div>
      )}
    </div>
  );
};

export default PercentInput;