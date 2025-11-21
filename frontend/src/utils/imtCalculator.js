/**
 * Calculate IMT (Imposto Municipal sobre Transmissões Onerosas de Imóveis)
 * Property Transfer Tax in Portugal
 */
export const calculateIMT = (propertyValue, propertyType = 'residential', location = 'mainland') => {
  if (!propertyValue || propertyValue <= 0) {
    return {
      imt: 0,
      rate: 0,
      formatted: '€0,00',
      details: 'Invalid property value'
    };
  }

  let imt = 0;
  let effectiveRate = 0;
  const islandReduction = location !== 'mainland' ? 0.8 : 1; // 20% reduction for islands

  // Primary Residence (Mainland rates - 2024)
  if (propertyType === 'residential' || propertyType === 'apartment' || propertyType === 'house' ||
      propertyType === 'villa' || propertyType === 'townhouse') {
    if (propertyValue <= 97064) {
      // Exempt
      imt = 0;
      effectiveRate = 0;
    } else if (propertyValue <= 115038) {
      // 2% over €97,064
      imt = (propertyValue - 97064) * 0.02;
      effectiveRate = (imt / propertyValue) * 100;
    } else if (propertyValue <= 133495) {
      // Base + 5% over €115,038
      imt = (115038 - 97064) * 0.02 + (propertyValue - 115038) * 0.05;
      effectiveRate = (imt / propertyValue) * 100;
    } else if (propertyValue <= 176310) {
      // Base + 7% over €133,495
      imt = (115038 - 97064) * 0.02 +
             (133495 - 115038) * 0.05 +
             (propertyValue - 133495) * 0.07;
      effectiveRate = (imt / propertyValue) * 100;
    } else if (propertyValue <= 633453) {
      // Base + 8% over €176,310
      imt = (115038 - 97064) * 0.02 +
             (133495 - 115038) * 0.05 +
             (176310 - 133495) * 0.07 +
             (propertyValue - 176310) * 0.08;
      effectiveRate = (imt / propertyValue) * 100;
    } else {
      // 6% on total value (progressive rates don't apply above €633,453)
      imt = propertyValue * 0.06;
      effectiveRate = 6;
    }
  }
  // Commercial Property or Land
  else if (propertyType === 'commercial' || propertyType === 'land' || propertyType === 'office' ||
           propertyType === 'warehouse' || propertyType === 'retail') {
    // Flat rate of 6.5% for commercial properties
    imt = propertyValue * 0.065;
    effectiveRate = 6.5;
  }

  // Apply island reduction if applicable
  imt = imt * islandReduction;

  return {
    imt: Math.round(imt * 100) / 100,
    rate: Math.round(effectiveRate * 100) / 100,
    propertyValue,
    propertyType,
    location,
    islandReduction: location !== 'mainland' ? '20%' : 'N/A',
    formatted: formatCurrency(Math.round(imt * 100) / 100)
  };
};

/**
 * Calculate Stamp Duty (Imposto do Selo)
 * Applied to property purchases with mortgages
 */
export const calculateStampDuty = (loanAmount) => {
  if (!loanAmount || loanAmount <= 0) {
    return {
      stampDuty: 0,
      formatted: '€0,00'
    };
  }
  // 0.6% of loan amount
  const stampDuty = Math.round(loanAmount * 0.006 * 100) / 100;
  return {
    stampDuty,
    formatted: formatCurrency(stampDuty)
  };
};

/**
 * Format currency in Portuguese EUR format
 */
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('pt-PT', {
    style: 'currency',
    currency: 'EUR'
  }).format(amount);
};

/**
 * Format number with Portuguese thousands separator
 */
export const formatNumber = (number) => {
  return new Intl.NumberFormat('pt-PT').format(number);
};

/**
 * Convert square meters to square feet
 */
export const squareMetersToFeet = (squareMeters) => {
  return Math.round(squareMeters * 10.764 * 100) / 100;
};

/**
 * Convert square feet to square meters
 */
export const squareFeetToMeters = (squareFeet) => {
  return Math.round(squareFeet / 10.764 * 100) / 100;
};

/**
 * Validate Portuguese ZIP code format (XXXX-XXX)
 */
export const validatePortugueseZipCode = (zipCode) => {
  const zipRegex = /^\d{4}-\d{3}$/;
  return zipRegex.test(zipCode);
};

/**
 * Get energy rating color
 */
export const getEnergyRatingColor = (rating) => {
  const colors = {
    'A+': 'bg-green-600 text-white',
    'A': 'bg-green-500 text-white',
    'B': 'bg-lime-500 text-white',
    'B-': 'bg-yellow-500 text-white',
    'C': 'bg-yellow-600 text-white',
    'D': 'bg-orange-500 text-white',
    'E': 'bg-red-500 text-white',
    'F': 'bg-red-700 text-white',
    'Isento': 'bg-gray-400 text-white',
    'Pendente': 'bg-gray-300 text-gray-700'
  };
  return colors[rating] || 'bg-gray-300 text-gray-700';
};
