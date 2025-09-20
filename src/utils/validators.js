// Form validation utilities

// Email validation
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Password validation
export const validatePassword = (password) => {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  return {
    isValid: password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers,
    errors: {
      minLength: password.length < minLength ? `Password must be at least ${minLength} characters` : null,
      hasUpperCase: !hasUpperCase ? 'Password must contain at least one uppercase letter' : null,
      hasLowerCase: !hasLowerCase ? 'Password must contain at least one lowercase letter' : null,
      hasNumbers: !hasNumbers ? 'Password must contain at least one number' : null,
      hasSpecialChar: !hasSpecialChar ? 'Password must contain at least one special character' : null
    }
  };
};

// Company name validation
export const validateCompanyName = (name) => {
  if (!name || name.trim().length === 0) {
    return { isValid: false, error: 'Company name is required' };
  }
  if (name.trim().length < 2) {
    return { isValid: false, error: 'Company name must be at least 2 characters' };
  }
  if (name.trim().length > 100) {
    return { isValid: false, error: 'Company name must be less than 100 characters' };
  }
  return { isValid: true };
};

// Currency amount validation
export const validateCurrencyAmount = (amount, options = {}) => {
  const { min = 0, max = 1000000000, required = true } = options;
  
  if (required && (!amount || amount === '')) {
    return { isValid: false, error: 'Amount is required' };
  }
  
  const numAmount = parseFloat(amount);
  
  if (isNaN(numAmount)) {
    return { isValid: false, error: 'Please enter a valid number' };
  }
  
  if (numAmount < min) {
    return { isValid: false, error: `Amount must be at least ${min}` };
  }
  
  if (numAmount > max) {
    return { isValid: false, error: `Amount must be less than ${max}` };
  }
  
  return { isValid: true };
};

// Percentage validation
export const validatePercentage = (percentage, options = {}) => {
  const { min = 0, max = 100, required = true } = options;
  
  if (required && (!percentage || percentage === '')) {
    return { isValid: false, error: 'Percentage is required' };
  }
  
  const numPercentage = parseFloat(percentage);
  
  if (isNaN(numPercentage)) {
    return { isValid: false, error: 'Please enter a valid percentage' };
  }
  
  if (numPercentage < min) {
    return { isValid: false, error: `Percentage must be at least ${min}%` };
  }
  
  if (numPercentage > max) {
    return { isValid: false, error: `Percentage must be less than ${max}%` };
  }
  
  return { isValid: true };
};

// Headcount validation
export const validateHeadcount = (headcount) => {
  if (!headcount || headcount === '') {
    return { isValid: false, error: 'Headcount is required' };
  }
  
  const numHeadcount = parseInt(headcount);
  
  if (isNaN(numHeadcount) || !Number.isInteger(numHeadcount)) {
    return { isValid: false, error: 'Please enter a valid number of employees' };
  }
  
  if (numHeadcount < 1) {
    return { isValid: false, error: 'Headcount must be at least 1' };
  }
  
  if (numHeadcount > 10000) {
    return { isValid: false, error: 'Headcount must be less than 10,000' };
  }
  
  return { isValid: true };
};

// Scenario name validation
export const validateScenarioName = (name) => {
  if (!name || name.trim().length === 0) {
    return { isValid: false, error: 'Scenario name is required' };
  }
  if (name.trim().length < 2) {
    return { isValid: false, error: 'Scenario name must be at least 2 characters' };
  }
  if (name.trim().length > 50) {
    return { isValid: false, error: 'Scenario name must be less than 50 characters' };
  }
  return { isValid: true };
};

// Date validation
export const validateDate = (date, options = {}) => {
  const { required = true, minDate = null, maxDate = null } = options;
  
  if (required && (!date || date === '')) {
    return { isValid: false, error: 'Date is required' };
  }
  
  if (!date) return { isValid: true };
  
  const dateObj = new Date(date);
  
  if (isNaN(dateObj.getTime())) {
    return { isValid: false, error: 'Please enter a valid date' };
  }
  
  if (minDate && dateObj < new Date(minDate)) {
    return { isValid: false, error: `Date must be after ${new Date(minDate).toLocaleDateString()}` };
  }
  
  if (maxDate && dateObj > new Date(maxDate)) {
    return { isValid: false, error: `Date must be before ${new Date(maxDate).toLocaleDateString()}` };
  }
  
  return { isValid: true };
};

// URL validation
export const validateURL = (url) => {
  if (!url || url.trim().length === 0) {
    return { isValid: true }; // URL is optional
  }
  
  try {
    new URL(url);
    return { isValid: true };
  } catch {
    return { isValid: false, error: 'Please enter a valid URL' };
  }
};

// Phone number validation
export const validatePhoneNumber = (phone) => {
  if (!phone || phone.trim().length === 0) {
    return { isValid: true }; // Phone is optional
  }
  
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
  
  if (!phoneRegex.test(cleanPhone)) {
    return { isValid: false, error: 'Please enter a valid phone number' };
  }
  
  return { isValid: true };
};

// Generic required field validation
export const validateRequired = (value, fieldName = 'Field') => {
  if (!value || (typeof value === 'string' && value.trim().length === 0)) {
    return { isValid: false, error: `${fieldName} is required` };
  }
  return { isValid: true };
};

// Form validation helper
export const validateForm = (formData, validationRules) => {
  const errors = {};
  let isValid = true;
  
  Object.keys(validationRules).forEach(field => {
    const rule = validationRules[field];
    const value = formData[field];
    
    let result;
    
    switch (rule.type) {
      case 'email':
        result = validateEmail(value);
        if (!result) {
          errors[field] = 'Please enter a valid email address';
          isValid = false;
        }
        break;
      case 'password':
        result = validatePassword(value);
        if (!result.isValid) {
          errors[field] = Object.values(result.errors).filter(Boolean)[0];
          isValid = false;
        }
        break;
      case 'required':
        result = validateRequired(value, rule.label || field);
        if (!result.isValid) {
          errors[field] = result.error;
          isValid = false;
        }
        break;
      case 'currency':
        result = validateCurrencyAmount(value, rule.options);
        if (!result.isValid) {
          errors[field] = result.error;
          isValid = false;
        }
        break;
      case 'percentage':
        result = validatePercentage(value, rule.options);
        if (!result.isValid) {
          errors[field] = result.error;
          isValid = false;
        }
        break;
      case 'custom':
        result = rule.validator(value);
        if (!result.isValid) {
          errors[field] = result.error;
          isValid = false;
        }
        break;
    }
  });
  
  return { isValid, errors };
};