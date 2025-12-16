export type Theme = 'dark' | 'light';

export enum View {
  CHAT = 'Chat',
  PORTFOLIO = 'Portfolio',
  MARKET_PULSE = 'Market Pulse',
  TRADE_FORECASTER = 'Trade Forecaster',
  STOCK_ANALYZER = 'Stock Analyzer',
  OPTIONS_INSIGHT = 'Options Insight',
  INSIGHTS = 'Insights',
  SETTINGS = 'Settings',
  BEGINNERS_GUIDE = 'Academy'
}

export interface Message {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: number;
  isStreaming?: boolean;
}

export interface StockPosition {
  symbol: string;
  name: string;
  qty: number;
  avgPrice: number;
  ltp: number;
  pnl: number;
  pnlPercent: number;
  sector: string;
}

export interface MarketIndex {
  name: string;
  value: number;
  change: number;
  changePercent: number;
  trend: 'up' | 'down' | 'neutral';
}

export interface ForecastRequest {
  symbol: string;
  timeframe: 'Intraday' | 'Short-term' | 'Medium-term';
}

export type MarketRegimeType = 'Trending (Bull)' | 'Trending (Bear)' | 'Range-Bound' | 'High Volatility' | 'Event-Driven';

export interface OptionStrategy {
  name: string;
  type: 'Bullish' | 'Bearish' | 'Neutral' | 'Volatile';
  risk: 'Low' | 'Medium' | 'High' | 'Unlimited';
  pop: number; // Probability of Profit
  maxProfit: string;
  maxLoss: string;
  desc: string;
}