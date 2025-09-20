import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { formatCurrency, parseCurrency } from '../../utils/currency';

const CurrencyInput = ({
  value,
  onChange,
  currency = 'USD',
  label,
  placeholder = '0',
  disabled = false,
  required = false,
  error = null,
  className = '',
  showLabel = true,
  size = 'md'
}) => {
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  
  useEffect(() => {
    if (value !== undefined && value !== null) {
      setInputValue(formatCurrency(value, currency, { showSymbol: false }));
    }
  }, [value, currency]);
  
  const handleInputChange = (e) => {
    const rawValue = e.target.value;
    setInputValue(rawValue);
    
    // Parse the currency value
    const numericValue = parseCurrency(rawValue, currency);
    onChange(numericValue);
  };
  
  const handleFocus = () => {
    setIsFocused(true);
    // Remove formatting on focus for easier editing
    if (value !== undefined && value !== null) {
      setInputValue(value.toString());
    }
  };
  
  const handleBlur = () => {
    setIsFocused(false);
    // Reformat on blur
    if (value !== undefined && value !== null) {
      setInputValue(formatCurrency(value, currency, { showSymbol: false }));
    }
  };
  
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-base',
    lg: 'px-5 py-4 text-lg'
  };
  
  return (
    <div className={`space-y-1 ${className}`}>
      {showLabel && label && (
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <span className="text-slate-500 dark:text-slate-400 text-sm">
            {currency === 'USD' ? '$' : currency === 'EUR' ? '€' : currency === 'GBP' ? '£' : currency === 'INR' ? '₹' : currency}
          </span>
        </div>
        
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          disabled={disabled}
          className={`w-full ${sizeClasses[size]} pl-8 pr-3 border rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 ${
            error
              ? 'border-red-300 dark:border-red-600 focus:ring-red-500'
              : isFocused
              ? 'border-pink-300 dark:border-pink-600'
              : 'border-slate-300 dark:border-slate-600'
          } ${
            disabled ? 'opacity-50 cursor-not-allowed bg-slate-50 dark:bg-slate-700' : ''
          }`}
        />
        
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
      
      {/* Formatted display */}
      {!isFocused && value !== undefined && value !== null && (
        <div className="text-xs text-slate-500 dark:text-slate-400">
          {formatCurrency(value, currency)}
        </div>
      )}
    </div>
  );
};

export default CurrencyInput;