// Currency formatting and conversion utilities

export const CURRENCY_SYMBOLS = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  INR: '₹',
  JPY: '¥',
  CAD: 'C$',
  AUD: 'A$'
};

export const CURRENCY_FORMATS = {
  USD: { symbol: '$', position: 'before', decimals: 2 },
  EUR: { symbol: '€', position: 'after', decimals: 2 },
  GBP: { symbol: '£', position: 'before', decimals: 2 },
  INR: { symbol: '₹', position: 'before', decimals: 0 },
  JPY: { symbol: '¥', position: 'before', decimals: 0 },
  CAD: { symbol: 'C$', position: 'before', decimals: 2 },
  AUD: { symbol: 'A$', position: 'before', decimals: 2 }
};

// Format currency value
export const formatCurrency = (amount, currency = 'USD', options = {}) => {
  const {
    showSymbol = true,
    showDecimals = null,
    compact = false,
    locale = 'en-US'
  } = options;

  const format = CURRENCY_FORMATS[currency] || CURRENCY_FORMATS.USD;
  const decimals = showDecimals !== null ? showDecimals : format.decimals;

  if (compact && Math.abs(amount) >= 1000) {
    return formatCompactCurrency(amount, currency, { showSymbol, locale });
  }

  const formattedNumber = new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(Math.abs(amount));

  const symbol = showSymbol ? format.symbol : '';
  const sign = amount < 0 ? '-' : '';

  if (format.position === 'before') {
    return `${sign}${symbol}${formattedNumber}`;
  } else {
    return `${sign}${formattedNumber}${symbol}`;
  }
};

// Format currency in compact notation (K, M, B)
export const formatCompactCurrency = (amount, currency = 'USD', options = {}) => {
  const { showSymbol = true, locale = 'en-US' } = options;
  const format = CURRENCY_FORMATS[currency] || CURRENCY_FORMATS.USD;
  
  const absAmount = Math.abs(amount);
  const sign = amount < 0 ? '-' : '';
  
  let compactAmount;
  let suffix;
  
  if (absAmount >= 1e9) {
    compactAmount = (absAmount / 1e9).toFixed(1);
    suffix = 'B';
  } else if (absAmount >= 1e6) {
    compactAmount = (absAmount / 1e6).toFixed(1);
    suffix = 'M';
  } else if (absAmount >= 1e3) {
    compactAmount = (absAmount / 1e3).toFixed(1);
    suffix = 'K';
  } else {
    compactAmount = absAmount.toFixed(0);
    suffix = '';
  }
  
  // Remove trailing .0
  if (compactAmount.endsWith('.0')) {
    compactAmount = compactAmount.slice(0, -2);
  }
  
  const symbol = showSymbol ? format.symbol : '';
  
  if (format.position === 'before') {
    return `${sign}${symbol}${compactAmount}${suffix}`;
  } else {
    return `${sign}${compactAmount}${suffix}${symbol}`;
  }
};

// Parse currency string to number
export const parseCurrency = (currencyString, currency = 'USD') => {
  if (typeof currencyString === 'number') return currencyString;
  
  const format = CURRENCY_FORMATS[currency] || CURRENCY_FORMATS.USD;
  const symbol = format.symbol;
  
  // Remove currency symbol and whitespace
  let cleanString = currencyString.replace(new RegExp(`\\${symbol}`, 'g'), '');
  cleanString = cleanString.replace(/[,\s]/g, '');
  
  // Handle compact notation
  const compactMatch = cleanString.match(/^([\d.]+)([KMB])?$/i);
  if (compactMatch) {
    let [, number, suffix] = compactMatch;
    let multiplier = 1;
    
    if (suffix) {
      switch (suffix.toUpperCase()) {
        case 'K': multiplier = 1e3; break;
        case 'M': multiplier = 1e6; break;
        case 'B': multiplier = 1e9; break;
      }
    }
    
    return parseFloat(number) * multiplier;
  }
  
  return parseFloat(cleanString) || 0;
};

// Convert between currencies (mock implementation)
export const convertCurrency = (amount, fromCurrency, toCurrency) => {
  // Mock exchange rates - in real app, this would fetch from API
  const exchangeRates = {
    USD: { EUR: 0.85, GBP: 0.73, INR: 83.0, JPY: 110.0 },
    EUR: { USD: 1.18, GBP: 0.86, INR: 97.5, JPY: 129.4 },
    GBP: { USD: 1.37, EUR: 1.16, INR: 113.7, JPY: 150.7 },
    INR: { USD: 0.012, EUR: 0.010, GBP: 0.0088, JPY: 1.33 },
    JPY: { USD: 0.0091, EUR: 0.0077, GBP: 0.0066, INR: 0.75 }
  };
  
  if (fromCurrency === toCurrency) return amount;
  
  const rate = exchangeRates[fromCurrency]?.[toCurrency];
  if (!rate) return amount; // Return original if no rate found
  
  return amount * rate;
};

// Get currency color based on value
export const getCurrencyColor = (amount, options = {}) => {
  const { positiveColor = 'text-green-600', negativeColor = 'text-red-600', neutralColor = 'text-slate-600' } = options;
  
  if (amount > 0) return positiveColor;
  if (amount < 0) return negativeColor;
  return neutralColor;
};

// Format percentage
export const formatPercentage = (value, decimals = 1) => {
  return `${value.toFixed(decimals)}%`;
};

// Format number with commas
export const formatNumber = (number, decimals = 0) => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(number);
};