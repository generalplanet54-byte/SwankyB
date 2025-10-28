/**
 * Price Tracking & Deal Alert System
 * Track price changes and notify users of deals
 */

export interface PricePoint {
  price: number;
  timestamp: number;
  source: string;
}

export interface ProductPriceHistory {
  productId: string;
  productName: string;
  currentPrice: number;
  lowestPrice: number;
  highestPrice: number;
  priceHistory: PricePoint[];
  lastChecked: number;
  dealPercentage: number;
}

export interface DealAlert {
  id: string;
  productId: string;
  productName: string;
  targetPrice: number;
  currentPrice: number;
  email: string;
  createdAt: number;
  notified: boolean;
}

/**
 * Calculate deal percentage
 */
export const calculateDealPercentage = (
  currentPrice: number,
  originalPrice: number
): number => {
  if (originalPrice === 0) return 0;
  return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
};

/**
 * Determine if current price is a good deal
 */
export const isGoodDeal = (
  currentPrice: number,
  priceHistory: PricePoint[]
): boolean => {
  if (priceHistory.length < 2) return false;

  const avgPrice =
    priceHistory.reduce((sum, point) => sum + point.price, 0) / priceHistory.length;
  const dealThreshold = avgPrice * 0.85; // 15% below average

  return currentPrice <= dealThreshold;
};

/**
 * Get price trend (increasing, decreasing, stable)
 */
export const getPriceTrend = (
  priceHistory: PricePoint[]
): 'increasing' | 'decreasing' | 'stable' => {
  if (priceHistory.length < 3) return 'stable';

  const recent = priceHistory.slice(-5); // Last 5 price points
  const avgRecent = recent.reduce((sum, p) => sum + p.price, 0) / recent.length;
  const older = priceHistory.slice(-10, -5);
  const avgOlder = older.length
    ? older.reduce((sum, p) => sum + p.price, 0) / older.length
    : avgRecent;

  const changePercent = ((avgRecent - avgOlder) / avgOlder) * 100;

  if (changePercent > 5) return 'increasing';
  if (changePercent < -5) return 'decreasing';
  return 'stable';
};

/**
 * Format price with currency
 */
export const formatPrice = (price: number, currency: string = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
};

/**
 * Generate price alert message
 */
export const generatePriceAlertMessage = (
  productName: string,
  oldPrice: number,
  newPrice: number,
  dealPercentage: number
): string => {
  return `🔥 PRICE DROP ALERT! ${productName} is now ${formatPrice(newPrice)} (${dealPercentage}% off from ${formatPrice(oldPrice)})`;
};

/**
 * Store price in local storage
 */
export const storePricePoint = (
  productId: string,
  price: number,
  source: string = 'amazon'
): void => {
  if (typeof window === 'undefined') return;

  const key = `price_${productId}`;
  const existing = localStorage.getItem(key);
  const history: PricePoint[] = existing ? JSON.parse(existing) : [];

  history.push({
    price,
    timestamp: Date.now(),
    source,
  });

  // Keep only last 30 price points
  if (history.length > 30) {
    history.shift();
  }

  localStorage.setItem(key, JSON.stringify(history));
};

/**
 * Get price history from local storage
 */
export const getPriceHistory = (productId: string): PricePoint[] => {
  if (typeof window === 'undefined') return [];

  const key = `price_${productId}`;
  const stored = localStorage.getItem(key);
  return stored ? JSON.parse(stored) : [];
};

/**
 * Subscribe to price alerts
 */
export const subscribeToPriceAlert = (
  productId: string,
  productName: string,
  targetPrice: number,
  email: string
): void => {
  if (typeof window === 'undefined') return;

  const alerts = getDealAlerts();
  const newAlert: DealAlert = {
    id: `alert_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    productId,
    productName,
    targetPrice,
    currentPrice: 0, // Will be updated when checking
    email,
    createdAt: Date.now(),
    notified: false,
  };

  alerts.push(newAlert);
  localStorage.setItem('price_alerts', JSON.stringify(alerts));

  // Track in analytics
  if (window.gtag) {
    window.gtag('event', 'price_alert_subscribe', {
      event_category: 'engagement',
      product_id: productId,
      target_price: targetPrice,
    });
  }
};

/**
 * Get all deal alerts
 */
export const getDealAlerts = (): DealAlert[] => {
  if (typeof window === 'undefined') return [];

  const stored = localStorage.getItem('price_alerts');
  return stored ? JSON.parse(stored) : [];
};

/**
 * Remove price alert
 */
export const removePriceAlert = (alertId: string): void => {
  if (typeof window === 'undefined') return;

  const alerts = getDealAlerts().filter((alert) => alert.id !== alertId);
  localStorage.setItem('price_alerts', JSON.stringify(alerts));
};

/**
 * Check if any alerts should be triggered
 */
export const checkPriceAlerts = (
  productId: string,
  currentPrice: number
): DealAlert[] => {
  const alerts = getDealAlerts();
  const triggered: DealAlert[] = [];

  alerts.forEach((alert) => {
    if (alert.productId === productId && !alert.notified) {
      if (currentPrice <= alert.targetPrice) {
        alert.notified = true;
        alert.currentPrice = currentPrice;
        triggered.push(alert);
      }
    }
  });

  // Update alerts in storage
  localStorage.setItem('price_alerts', JSON.stringify(alerts));

  return triggered;
};

/**
 * Get product price statistics
 */
export const getPriceStatistics = (
  productId: string
): ProductPriceHistory | null => {
  const history = getPriceHistory(productId);
  if (history.length === 0) return null;

  const prices = history.map((p) => p.price);
  const currentPrice = prices[prices.length - 1];
  const lowestPrice = Math.min(...prices);
  const highestPrice = Math.max(...prices);

  return {
    productId,
    productName: '', // Will be populated by caller
    currentPrice,
    lowestPrice,
    highestPrice,
    priceHistory: history,
    lastChecked: Date.now(),
    dealPercentage: calculateDealPercentage(currentPrice, highestPrice),
  };
};

/**
 * Generate price history chart data
 */
export const generatePriceChartData = (
  priceHistory: PricePoint[]
): { labels: string[]; data: number[] } => {
  const labels = priceHistory.map((point) => {
    const date = new Date(point.timestamp);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  });

  const data = priceHistory.map((point) => point.price);

  return { labels, data };
};

/**
 * Predict future price trend (simple linear regression)
 */
export const predictPriceTrend = (
  priceHistory: PricePoint[]
): { prediction: 'will_increase' | 'will_decrease' | 'stable'; confidence: number } => {
  if (priceHistory.length < 5) {
    return { prediction: 'stable', confidence: 0 };
  }

  // Simple linear regression
  const recent = priceHistory.slice(-10);
  const n = recent.length;
  let sumX = 0;
  let sumY = 0;
  let sumXY = 0;
  let sumX2 = 0;

  recent.forEach((point, i) => {
    sumX += i;
    sumY += point.price;
    sumXY += i * point.price;
    sumX2 += i * i;
  });

  const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
  const avgPrice = sumY / n;
  const confidence = Math.min(Math.abs(slope / avgPrice) * 100, 100);

  if (slope > avgPrice * 0.01) {
    return { prediction: 'will_increase', confidence };
  } else if (slope < -avgPrice * 0.01) {
    return { prediction: 'will_decrease', confidence };
  }

  return { prediction: 'stable', confidence };
};

export default {
  calculateDealPercentage,
  isGoodDeal,
  getPriceTrend,
  formatPrice,
  generatePriceAlertMessage,
  storePricePoint,
  getPriceHistory,
  subscribeToPriceAlert,
  getDealAlerts,
  removePriceAlert,
  checkPriceAlerts,
  getPriceStatistics,
  generatePriceChartData,
  predictPriceTrend,
};
