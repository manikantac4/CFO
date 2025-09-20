import React from 'react';
import { motion } from 'framer-motion';

const Toggle = ({
  checked,
  onChange,
  label,
  disabled = false,
  size = 'md',
  color = 'pink',
  showLabel = true,
  className = ''
}) => {
  const sizeClasses = {
    sm: {
      track: 'w-8 h-4',
      thumb: 'w-3 h-3',
      translate: 'translate-x-4'
    },
    md: {
      track: 'w-11 h-6',
      thumb: 'w-5 h-5',
      translate: 'translate-x-5'
    },
    lg: {
      track: 'w-14 h-7',
      thumb: 'w-6 h-6',
      translate: 'translate-x-7'
    }
  };
  
  const colorClasses = {
    pink: {
      checked: 'bg-pink-500',
      unchecked: 'bg-slate-300 dark:bg-slate-600'
    },
    purple: {
      checked: 'bg-purple-500',
      unchecked: 'bg-slate-300 dark:bg-slate-600'
    },
    blue: {
      checked: 'bg-blue-500',
      unchecked: 'bg-slate-300 dark:bg-slate-600'
    },
    green: {
      checked: 'bg-green-500',
      unchecked: 'bg-slate-300 dark:bg-slate-600'
    },
    red: {
      checked: 'bg-red-500',
      unchecked: 'bg-slate-300 dark:bg-slate-600'
    }
  };
  
  const currentSize = sizeClasses[size];
  const currentColor = colorClasses[color];
  
  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <button
        type="button"
        onClick={() => !disabled && onChange(!checked)}
        disabled={disabled}
        className={`relative inline-flex ${currentSize.track} flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 ${
          checked ? currentColor.checked : currentColor.unchecked
        } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <motion.span
          className={`pointer-events-none inline-block ${currentSize.thumb} transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
          animate={{
            x: checked ? 0 : currentSize.translate.split(' ')[0].replace('translate-x-', '')
          }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      </button>
      
      {showLabel && label && (
        <label className={`text-sm font-medium ${
          disabled 
            ? 'text-slate-400 dark:text-slate-500' 
            : 'text-slate-700 dark:text-slate-300 cursor-pointer'
        }`}>
          {label}
        </label>
      )}
    </div>
  );
};

export default Toggle;