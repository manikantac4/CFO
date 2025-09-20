import React from 'react';
import { motion } from 'framer-motion';

const Card = ({
  children,
  className = '',
  hover = false,
  padding = 'default',
  shadow = 'default',
  border = false,
  ...props
}) => {
  const baseClasses = 'bg-white dark:bg-slate-800 rounded-xl transition-all duration-200';
  
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    default: 'p-6',
    lg: 'p-8',
    xl: 'p-10'
  };
  
  const shadowClasses = {
    none: '',
    sm: 'shadow-sm',
    default: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl'
  };
  
  const borderClasses = border ? 'border border-slate-200 dark:border-slate-700' : '';
  const hoverClasses = hover ? 'hover:shadow-lg hover:scale-105 cursor-pointer' : '';
  
  const classes = `${baseClasses} ${paddingClasses[padding]} ${shadowClasses[shadow]} ${borderClasses} ${hoverClasses} ${className}`;
  
  if (hover) {
    return (
      <motion.div
        className={classes}
        whileHover={{ y: -2 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
  
  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

// Card Header Component
export const CardHeader = ({ children, className = '', ...props }) => (
  <div className={`mb-4 ${className}`} {...props}>
    {children}
  </div>
);

// Card Title Component
export const CardTitle = ({ children, className = '', ...props }) => (
  <h3 className={`text-lg font-semibold text-slate-900 dark:text-slate-100 ${className}`} {...props}>
    {children}
  </h3>
);

// Card Description Component
export const CardDescription = ({ children, className = '', ...props }) => (
  <p className={`text-sm text-slate-600 dark:text-slate-400 ${className}`} {...props}>
    {children}
  </p>
);

// Card Content Component
export const CardContent = ({ children, className = '', ...props }) => (
  <div className={className} {...props}>
    {children}
  </div>
);

// Card Footer Component
export const CardFooter = ({ children, className = '', ...props }) => (
  <div className={`mt-4 pt-4 border-t border-slate-200 dark:border-slate-700 ${className}`} {...props}>
    {children}
  </div>
);

export default Card;