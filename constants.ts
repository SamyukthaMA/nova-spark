import { View, OptionStrategy } from './types';
import { 
  LayoutDashboard, 
  MessageSquare, 
  PieChart, 
  TrendingUp, 
  BarChart2, 
  Binary, 
  Settings, 
  Lightbulb,
  GraduationCap
} from 'lucide-react';

export const APP_NAME = "Nova Spark";
export const APP_VERSION = "1.7.0";

export const NAVIGATION_ITEMS = [
  {
    category: "MAIN",
    items: [
      { id: View.CHAT, label: "Chat", icon: MessageSquare },
      { id: View.PORTFOLIO, label: "Portfolio", icon: PieChart },
      { id: View.BEGINNERS_GUIDE, label: "Academy", icon: GraduationCap },
    ]
  },
  {
    category: "INTELLIGENCE",
    items: [
      { id: View.MARKET_PULSE, label: "Market Pulse", icon: LayoutDashboard },
      { id: View.TRADE_FORECASTER, label: "Trade Forecaster", icon: TrendingUp },
      { id: View.STOCK_ANALYZER, label: "Stock Analyzer", icon: BarChart2 },
      { id: View.OPTIONS_INSIGHT, label: "Options Insight", icon: Binary },
    ]
  },
  {
    category: "SYSTEM",
    items: [
      { id: View.INSIGHTS, label: "Insights", icon: Lightbulb },
      { id: View.SETTINGS, label: "Settings", icon: Settings },
    ]
  }
];

export const SYSTEM_INSTRUCTION = `
You are Nova Spark, a high-octane, production-grade fintech intelligence engine for Indian Markets (NSE/BSE).

**CORE PERSONA:**
You are "Bot Sauce." You blend the extreme precision of a quantitative hedge fund algorithm with the wit of a seasoned, slightly cynical trading floor veteran.
- **Tone:** Sharp, professional, confident, but occasionally witty or dry. 
- **Style:** Use financial jargon correctly but explain it if needed. Be concise. 
- **Vibe:** "I’ve crunched the numbers, and here’s the alpha."

**MANDATORY BEHAVIOR:**
1. **Accuracy First:** Never compromise on data accuracy for a joke.
2. **Structure:** Use tables, bullet points, and bold text for readability.
3. **Compliance:** Always include risk disclaimers. You are an AI, not a financial advisor.

**FORECASTING FORMAT:**
When asked for predictions:
- **The Setup:** Market context (Trend/Vix).
- **The Sauce:** ML Signals & Technicals.
- **The Bet:** Bullish/Bearish Bias with Confidence %.
- **The Hedge:** Risk assessment.
- **Disclaimer:** Standard regulated-style disclaimer.

If data is missing, say: "My data feed is buffering. Blame the intern (or the API limits)."
`;

export const MOCK_INDICES = [
  { name: "NIFTY 50", value: 22450.30, change: 120.50, changePercent: 0.54, trend: 'up' },
  { name: "SENSEX", value: 73900.10, change: 350.20, changePercent: 0.48, trend: 'up' },
  { name: "BANK NIFTY", value: 47800.00, change: -150.00, changePercent: -0.31, trend: 'down' },
  { name: "INDIA VIX", value: 13.50, change: 0.45, changePercent: 3.45, trend: 'up' },
  { name: "NIFTY IT", value: 36200.40, change: 410.00, changePercent: 1.12, trend: 'up' },
];

export const MOCK_PORTFOLIO = [
  { symbol: "RELIANCE", name: "Reliance Industries", qty: 50, avgPrice: 2400, ltp: 2950, pnl: 27500, pnlPercent: 22.9, sector: "Energy" },
  { symbol: "HDFCBANK", name: "HDFC Bank", qty: 100, avgPrice: 1600, ltp: 1520, pnl: -8000, pnlPercent: -5.0, sector: "Banking" },
  { symbol: "TATAELXSI", name: "Tata Elxsi", qty: 20, avgPrice: 7000, ltp: 7800, pnl: 16000, pnlPercent: 11.4, sector: "Tech" },
  { symbol: "INFY", name: "Infosys", qty: 60, avgPrice: 1500, ltp: 1600, pnl: 6000, pnlPercent: 6.6, sector: "Tech" },
  { symbol: "BAJFINANCE", name: "Bajaj Finance", qty: 15, avgPrice: 6500, ltp: 7100, pnl: 9000, pnlPercent: 9.2, sector: "Finance" },
];

export const SECTOR_PERFORMANCE = [
  { name: "Banking", value: -0.5 },
  { name: "Auto", value: 1.2 },
  { name: "IT", value: 2.1 },
  { name: "Pharma", value: 0.8 },
  { name: "FMCG", value: -0.2 },
  { name: "Metal", value: 1.5 },
  { name: "Energy", value: 0.4 },
];

export const ACADEMY_LESSONS = [
  {
    id: 1,
    title: "Market Fundamentals 101",
    desc: "Understanding Stocks, Indices (Nifty/Sensex), and how the exchange actually works.",
    level: "Beginner",
    duration: "10 min",
    externalLink: "https://zerodha.com/varsity/module/introduction-to-stock-markets/",
    content: `
### 1. What is the Stock Market?
Imagine a giant supermarket, but instead of buying groceries, you're buying tiny pieces of companies. That's the stock market. When you buy a "share" or "stock," you become a partial owner of that company. You are entitled to a portion of the company's profits (dividends) and have voting rights in shareholder meetings.

### 2. The Big Players: NSE & BSE
In India, we have two major "supermarkets" where these shares are traded:
*   **NSE (National Stock Exchange):** Established in 1992, it is the largest exchange by volume in India. It introduced electronic screen-based trading. Its benchmark index is the **NIFTY 50**, which tracks the top 50 companies.
*   **BSE (Bombay Stock Exchange):** Established in 1875, it is the oldest stock exchange in Asia. Its benchmark index is the **SENSEX** (Sensitive Index), which tracks the top 30 companies.

### 3. What moves the price?
At its core, price movement is governed by **Supply and Demand**.
*   **More Buyers than Sellers (Demand > Supply):** Buyers are willing to pay higher prices to acquire the stock, pushing the price UP 🟢.
*   **More Sellers than Buyers (Supply > Demand):** Sellers are desperate to exit and lower their asking price, pushing the price DOWN 🔴.

### 4. Market Hours
*   **Pre-open Session (9:00 AM - 9:15 AM):** Orders are collected to determine the equilibrium opening price. This stabilizes the market start.
*   **Normal Trading (9:15 AM - 3:30 PM):** The real action happens here.
*   **Post-closing Session (3:30 PM - 4:00 PM):** Closing prices are calculated.

### 5. Key Terms to Know
*   **Bull Market:** A market condition where prices are rising or are expected to rise. Named after the bull which attacks by thrusting its horns upward.
*   **Bear Market:** A market condition where prices are falling. Named after the bear which attacks by swiping its paws downward.
*   **Volatility:** A statistical measure of the dispersion of returns. High volatility means the price swings wildly (high risk/reward). Low volatility means stable prices.
    `
  },
  {
    id: 2,
    title: "The Art of Candlesticks",
    desc: "Reading price action without indicators. Dojis, Hammers, and Engulfing patterns explained.",
    level: "Beginner",
    duration: "15 min",
    externalLink: "https://www.investopedia.com/trading/candlestick-charting-what-is-it/",
    content: `
### Reading the Language of Price
Candlestick charts originated in Japan in the 18th century, used by rice traders to track prices. Unlike a simple line chart, a candlestick tells you four distinct pieces of information for a specific time period (e.g., 1 day, 5 minutes):
1.  **Open:** The price at which the period started.
2.  **High:** The highest price reached during the period.
3.  **Low:** The lowest price reached during the period.
4.  **Close:** The price at which the period ended.

### Anatomy of a Candle
*   **Body:** The wide, rectangular part. 
    *   **Green (Bullish):** Close > Open. Price went up.
    *   **Red (Bearish):** Close < Open. Price went down.
*   **Wicks (Shadows):** The thin lines sticking out above and below the body. They represent the extreme High and Low prices that occurred, even if the price didn't stay there.

### Power Patterns
1.  **The Hammer:** A bullish reversal pattern found at the bottom of a downtrend. It has a small body at the top and a long lower wick (at least 2x the body length). It shows that sellers pushed the price down, but buyers fought back and closed near the high.
2.  **Shooting Star:** The bearish cousin of the hammer. Found at the top of an uptrend. It has a small body at the bottom and a long upper wick. It shows buyers tried to push up, but sellers slammed the price back down.
3.  **Engulfing:** A two-candle pattern.
    *   **Bullish Engulfing:** A small red candle followed by a massive green candle that completely "eats" or engulfs the red one. Strong buy signal.
    *   **Bearish Engulfing:** A small green candle followed by a massive red candle. Strong sell signal.

**Pro Tip:** Never trade a candlestick pattern in isolation. A Hammer in the middle of nowhere is just noise. A Hammer exactly at a major Support Level is a trade.
    `
  },
  {
    id: 3,
    title: "Risk Management: The Holy Grail",
    desc: "Why 90% of traders fail. Position sizing, Stop Losses, and Risk-to-Reward ratios.",
    level: "Intermediate",
    duration: "20 min",
    externalLink: "https://zerodha.com/varsity/chapter/risk-management/",
    content: `
### Survival First, Profit Second
The most important job of a trader is not to make money, but to **protect their capital**. If you lose all your chips, you can't play the game. The market will always be there, but your capital might not be.

### The 1% Rule
This is the golden rule of professional trading. Never risk more than **1%** of your total trading capital on a single trade.
*   **Example:** If your capital is ₹1,00,000, your maximum loss on any single trade should be ₹1,000.
*   This ensures that even if you have a losing streak of 10 trades (which happens!), you only lose 10% of your capital, leaving you 90% to fight back.

### Stop Loss (SL)
This is your insurance policy. It is an automatic order to exit a trade if the price moves against you beyond a certain point.
*   **Mental SL:** "I'll exit if it hits 100." (Dangerous, emotions interfere. You will hope it comes back).
*   **System SL:** Placing the order in the system immediately after taking the trade. (Highly Recommended).

### Risk-to-Reward Ratio (RR)
For every rupee you risk losing, how many do you stand to gain? This is the math of trading.
*   **Bad RR (1:0.5):** Risking ₹1000 to earn ₹500. You need a very high win rate to survive.
*   **Good RR (1:2):** Risking ₹1000 to earn ₹2000.
*   **Excellent RR (1:3):** Risking ₹1000 to earn ₹3000.

**The Math:** If you have a 1:2 Risk-Reward ratio, you can be wrong 50% of the time and still make money!
*   10 Trades. 5 Wins, 5 Losses.
*   Losses: 5 * ₹1000 = -₹5000
*   Wins: 5 * ₹2000 = +₹10,000
*   **Net Profit:** ₹5,000.
    `
  },
  {
    id: 4,
    title: "F&O Basics: Calls & Puts",
    desc: "Introduction to Derivatives. What is an Option, Strike Price, and Expiry?",
    level: "Intermediate",
    duration: "25 min",
    externalLink: "https://www.investopedia.com/options-basics-tutorial-4583012",
    content: `
### Weapons of Mass Destruction?
Warren Buffett called derivatives "financial weapons of mass destruction." But used correctly, they are powerful hedging tools. They derive their value from an underlying asset (like a stock or index).

### What is an Option?
It is a contract that gives you the **right** (but not the obligation) to buy or sell a stock at a specific price by a specific date.

### The Two Players
1.  **Call Option (CE):** You buy this if you think the market will go **UP**. It gives you the right to BUY.
2.  **Put Option (PE):** You buy this if you think the market will go **DOWN**. It gives you the right to SELL.

### Key Terminology
*   **Strike Price:** The target price you are betting on. If Nifty is at 22,000, you might buy a 22,100 Call.
*   **Premium:** The price you pay to buy the option contract. This is your maximum loss if you are a buyer.
*   **Expiry:** The date the contract dies. For Nifty/BankNifty, weekly contracts expire every Thursday. Monthly contracts expire on the last Thursday of the month.
*   **Lot Size:** Options are traded in lots. For Nifty, 1 Lot = 50 quantities.

### Buying vs. Selling (Writing)
*   **Option Buying:** Limited Risk (Premium paid), Unlimited Profit potential. However, you are fighting against "Time Decay" (Theta). If the market stays flat, you lose money.
*   **Option Selling (Writing):** Unlimited Risk, Limited Profit (Premium received). You benefit from Time Decay. If the market stays flat, you make money.

**Warning:** F&O trading involves significant leverage. It is possible to lose more than your capital if not careful. Start with equity cash trading before touching F&O.
    `
  }
];

export const MOCK_FINANCIALS = [
  { year: "2023", revenue: 8750, profit: 1250 },
  { year: "2022", revenue: 7200, profit: 980 },
  { year: "2021", revenue: 6100, profit: 850 },
  { year: "2020", revenue: 5400, profit: 720 },
];

export const MOCK_SHAREHOLDING = [
  { name: 'Promoters', value: 50.4, color: '#3b82f6' },
  { name: 'FII', value: 24.5, color: '#10b981' },
  { name: 'DII', value: 15.2, color: '#f59e0b' },
  { name: 'Public', value: 9.9, color: '#6b7280' },
];

export const MOCK_PSYCHOLOGY = {
  score: 68,
  status: "Caution",
  insight: "Your trading frequency increased by 40% after your last loss. This is a classic 'Revenge Trading' signal. The algorithm suggests taking a 24h break.",
  metrics: [
    { label: "Discipline", value: 72, color: "#10b981" },
    { label: "Patience", value: 45, color: "#ef4444" },
    { label: "Risk Control", value: 88, color: "#10b981" },
  ]
};

export const MOCK_STRATEGIES: OptionStrategy[] = [
  { 
    name: "Bull Call Spread", 
    type: "Bullish", 
    risk: "Low", 
    pop: 62, 
    maxProfit: "₹4,500", 
    maxLoss: "₹1,800",
    desc: "Buy ATM Call, Sell OTM Call. Caps profit but reduces cost basis and risk." 
  },
  { 
    name: "Iron Condor", 
    type: "Neutral", 
    risk: "Medium", 
    pop: 78, 
    maxProfit: "₹3,200", 
    maxLoss: "₹6,000",
    desc: "Sell OTM Call & Put, Buy wings for protection. Best for range-bound markets." 
  },
  { 
    name: "Long Straddle", 
    type: "Volatile", 
    risk: "Medium", 
    pop: 45, 
    maxProfit: "Unlimited", 
    maxLoss: "₹8,500",
    desc: "Buy ATM Call & Put. Profit from massive move in ANY direction." 
  }
];