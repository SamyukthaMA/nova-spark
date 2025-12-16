import React, { useState, useEffect, useRef } from 'react';
import { generateForecast } from '../services/geminiService';
import { 
  Search, 
  Loader2, 
  TrendingUp, 
  AlertCircle, 
  BarChart3, 
  Target, 
  Gauge, 
  Sliders, 
  History, 
  Play, 
  Pause, 
  RefreshCw, 
  Clock, 
  ArrowRightLeft, 
  GitCommit,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  Cell, 
  ComposedChart, 
  Line, 
  Area, 
  CartesianGrid,
  ReferenceLine
} from 'recharts';

// --- MOCK DATA FOR REPLAY ---
const PAST_SCENARIOS = [
  {
    id: 'TRD-2024-084',
    symbol: 'TATASTEEL',
    date: '2024-03-10',
    type: 'Long',
    status: 'Win',
    initialPrice: 145.50,
    targetPrice: 152.00,
    stopLoss: 142.00,
    forecast: "Breakout imminent above 145.50 led by metal sector rally.",
    metricsStart: { rsi: 58, vol: 'High', sentiment: 'Bullish' },
    metricsEnd: { rsi: 72, vol: 'Ultra-High', sentiment: 'Euphoric' },
    data: [
      { day: 1, predicted: 145.5, actual: 145.5 },
      { day: 2, predicted: 147.0, actual: 146.2 },
      { day: 3, predicted: 148.5, actual: 148.8 },
      { day: 4, predicted: 150.0, actual: 151.5 },
      { day: 5, predicted: 152.0, actual: 152.4 },
    ]
  },
  {
    id: 'TRD-2024-085',
    symbol: 'HDFCBANK',
    date: '2024-03-12',
    type: 'Long',
    status: 'Loss',
    initialPrice: 1450,
    targetPrice: 1500,
    stopLoss: 1420,
    forecast: "Reversal from support zone 1440. Banks showing strength.",
    metricsStart: { rsi: 35, vol: 'Moderate', sentiment: 'Neutral' },
    metricsEnd: { rsi: 28, vol: 'High (Sell)', sentiment: 'Bearish' },
    data: [
      { day: 1, predicted: 1450, actual: 1450 },
      { day: 2, predicted: 1460, actual: 1445 },
      { day: 3, predicted: 1475, actual: 1430 },
      { day: 4, predicted: 1485, actual: 1422 },
      { day: 5, predicted: 1500, actual: 1415 },
    ]
  }
];

const MOCK_CONFIDENCE_HISTORY = [
  { day: 'Mon', score: 85 },
  { day: 'Tue', score: 65 },
  { day: 'Wed', score: 92 },
  { day: 'Thu', score: 78 },
  { day: 'Fri', score: 88 },
];

export const TradeForecaster: React.FC = () => {
  // Navigation & Data State
  const [activeTab, setActiveTab] = useState<'LIVE' | 'REPLAY'>('LIVE');
  const [symbol, setSymbol] = useState('');
  const [timeframe, setTimeframe] = useState('Short-term');
  const [loading, setLoading] = useState(false);
  const [forecast, setForecast] = useState<string | null>(null);
  
  // Real-time Data Feed Simulation
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [minutesAgo, setMinutesAgo] = useState(0);

  // Simulator State
  const [entryPrice, setEntryPrice] = useState(2500);
  const [stopLoss, setStopLoss] = useState(2450);
  const [target, setTarget] = useState(2650);
  const [quantity, setQuantity] = useState(100);
  const [holdingPeriod, setHoldingPeriod] = useState(3); // Days

  // Replay State
  const [selectedScenarioId, setSelectedScenarioId] = useState(PAST_SCENARIOS[0].id);
  const [replayProgress, setReplayProgress] = useState(5); // Index of data array
  const [isPlaying, setIsPlaying] = useState(false);
  const replayTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // --- REAL-TIME DATA LOGIC ---
  useEffect(() => {
    // Clock Timer (Updates "Updated X mins ago" display)
    const clockInterval = setInterval(() => {
      setMinutesAgo(prev => {
        if (prev >= 20) {
          // Auto-refresh data every 20 mins
          handleRefreshData();
          return 0;
        }
        return prev + 1;
      });
    }, 60000); // 1 minute

    return () => clearInterval(clockInterval);
  }, []);

  const handleRefreshData = () => {
    setLoading(true);
    setTimeout(() => {
      setLastUpdated(new Date());
      setMinutesAgo(0);
      setLoading(false);
    }, 1500);
  };

  // --- REPLAY LOGIC ---
  const selectedScenario = PAST_SCENARIOS.find(s => s.id === selectedScenarioId) || PAST_SCENARIOS[0];

  useEffect(() => {
    if (isPlaying) {
      replayTimerRef.current = setInterval(() => {
        setReplayProgress(prev => {
          if (prev >= selectedScenario.data.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 800);
    } else if (replayTimerRef.current) {
      clearInterval(replayTimerRef.current);
    }
    return () => {
      if (replayTimerRef.current) clearInterval(replayTimerRef.current);
    };
  }, [isPlaying, selectedScenario]);

  // --- SIMULATOR LOGIC ---
  const calculateMetrics = () => {
    const risk = entryPrice - stopLoss;
    const reward = target - entryPrice;
    const ratio = risk === 0 ? 0 : reward / risk;
    
    // Simple heuristic for probability band
    let baseProb = 50;
    if (ratio >= 1.5 && ratio <= 3) baseProb += 15; // Sweet spot
    if (ratio > 4) baseProb -= 10; // Too aggressive
    if (holdingPeriod > 5) baseProb -= 5; // Higher time risk
    
    const maxProfit = (target - entryPrice) * quantity;
    const maxLoss = (entryPrice - stopLoss) * quantity;

    return {
      rr: isFinite(ratio) ? ratio.toFixed(2) : '0.00',
      probLow: Math.max(0, baseProb - 5),
      probHigh: Math.min(99, baseProb + 5),
      maxProfit,
      maxLoss
    };
  };

  const simMetrics = calculateMetrics();

  // --- FORECAST HANDLER ---
  const handleForecast = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!symbol) return;
    
    setLoading(true);
    setForecast(null);
    try {
      const result = await generateForecast(symbol, timeframe);
      setForecast(result);
    } catch (err) {
      setForecast("Error: Unable to generate forecast. Market data service may be interrupted.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full overflow-y-auto bg-gray-100 dark:bg-black p-6 flex flex-col items-center text-gray-900 dark:text-gray-100 transition-colors duration-300">
       <div className="w-full max-w-7xl space-y-6">
         
         {/* HEADER & CONTROLS */}
         <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-b border-gray-200 dark:border-nova-border pb-6">
            <div className="flex items-center gap-4">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-200 dark:bg-nova-card border border-gray-300 dark:border-nova-border">
                  <TrendingUp className="w-6 h-6 text-black dark:text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-serif font-bold">AI Trade Forecaster</h2>
                  <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                    <span className="flex items-center gap-1 text-green-600 dark:text-green-500 animate-pulse">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                      Real-time Data Feed
                    </span>
                    <span className="text-gray-300">|</span>
                    <Clock className="w-3 h-3"/>
                    <span>Updated {minutesAgo}m ago</span>
                    <button onClick={handleRefreshData} className="ml-2 hover:text-black dark:hover:text-white transition-colors">
                      <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
                    </button>
                  </div>
                </div>
            </div>

            {/* TAB SWITCHER */}
            <div className="bg-white dark:bg-nova-card p-1 rounded-lg border border-gray-200 dark:border-nova-border flex">
              <button 
                onClick={() => setActiveTab('LIVE')}
                className={`px-4 py-2 text-sm font-bold rounded-md transition-colors flex items-center gap-2 ${activeTab === 'LIVE' ? 'bg-black text-white dark:bg-white dark:text-black shadow' : 'text-gray-500 hover:text-black dark:hover:text-white'}`}
              >
                <TrendingUp className="w-4 h-4"/> Live Forecast
              </button>
              <button 
                onClick={() => setActiveTab('REPLAY')}
                className={`px-4 py-2 text-sm font-bold rounded-md transition-colors flex items-center gap-2 ${activeTab === 'REPLAY' ? 'bg-black text-white dark:bg-white dark:text-black shadow' : 'text-gray-500 hover:text-black dark:hover:text-white'}`}
              >
                <History className="w-4 h-4"/> Trade Replay
              </button>
            </div>
         </div>

         {/* --- LIVE FORECAST VIEW --- */}
         {activeTab === 'LIVE' && (
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fade-in">
             
             {/* LEFT COLUMN: INPUTS & SIMULATOR (4 Cols) */}
             <div className="lg:col-span-4 space-y-6">
                {/* 1. INPUT FORM */}
                <form onSubmit={handleForecast} className="bg-white dark:bg-nova-card p-6 rounded-xl border border-gray-200 dark:border-nova-border space-y-6 shadow-sm relative overflow-hidden">
                    <div className="space-y-4 relative z-10">
                        <div className="space-y-2">
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Stock Symbol (NSE/BSE)</label>
                        <div className="relative">
                            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                            <input 
                                type="text" 
                                value={symbol}
                                onChange={(e) => setSymbol(e.target.value.toUpperCase())}
                                placeholder="e.g. RELIANCE" 
                                className="w-full bg-gray-50 dark:bg-nova-ash border border-gray-200 dark:border-nova-border rounded-lg py-2.5 pl-10 pr-4 focus:ring-1 focus:ring-black dark:focus:ring-white outline-none uppercase font-mono transition-colors"
                            />
                        </div>
                        </div>
                        <div className="space-y-2">
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Time Horizon</label>
                        <select 
                            value={timeframe}
                            onChange={(e) => setTimeframe(e.target.value)}
                            className="w-full bg-gray-50 dark:bg-nova-ash border border-gray-200 dark:border-nova-border rounded-lg py-2.5 px-4 focus:ring-1 focus:ring-black dark:focus:ring-white outline-none transition-colors"
                        >
                            <option value="Intraday">Intraday (1 Day)</option>
                            <option value="Short-term">Short-term (1-5 Days)</option>
                            <option value="Medium-term">Medium-term (1-3 Weeks)</option>
                        </select>
                        </div>
                    </div>
                    
                    <button 
                        type="submit" 
                        disabled={loading || !symbol}
                        className="w-full bg-black dark:bg-white hover:opacity-90 text-white dark:text-black font-medium py-3 rounded-lg transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed shadow-lg relative z-10"
                    >
                        {loading ? (
                            <>
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            Calculating...
                            </>
                        ) : (
                            "Generate Prediction"
                        )}
                    </button>
                    {/* Decorator */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl -mr-16 -mt-16 pointer-events-none"></div>
                </form>

                {/* 2. ENHANCED SIMULATOR */}
                <div className="bg-white dark:bg-nova-card p-6 rounded-xl border border-gray-200 dark:border-nova-border shadow-sm">
                  <div className="flex items-center gap-2 mb-4 border-b border-gray-100 dark:border-nova-border/50 pb-3">
                    <Sliders className="w-4 h-4 text-blue-500" />
                    <h3 className="text-sm font-bold uppercase text-gray-500">"What-If" Trade Simulator</h3>
                  </div>
                  
                  <div className="space-y-4">
                     {/* Row 1: Qty & Period */}
                     <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-[10px] text-gray-400 uppercase font-bold">Quantity</label>
                          <input type="number" value={quantity} onChange={e => setQuantity(Number(e.target.value))} className="w-full mt-1 bg-gray-50 dark:bg-nova-ash border border-gray-200 dark:border-nova-border rounded p-1.5 text-center text-xs font-mono" />
                        </div>
                        <div>
                          <label className="text-[10px] text-gray-400 uppercase font-bold">Hold (Days)</label>
                          <input type="number" value={holdingPeriod} onChange={e => setHoldingPeriod(Number(e.target.value))} className="w-full mt-1 bg-gray-50 dark:bg-nova-ash border border-gray-200 dark:border-nova-border rounded p-1.5 text-center text-xs font-mono" />
                        </div>
                     </div>

                     {/* Row 2: Price Levels */}
                     <div className="grid grid-cols-3 gap-2 text-center">
                        <div>
                          <label className="text-[10px] text-gray-500">Entry</label>
                          <input type="number" value={entryPrice} onChange={e => setEntryPrice(Number(e.target.value))} className="w-full bg-gray-50 dark:bg-nova-ash border border-gray-200 dark:border-nova-border rounded p-1 text-center text-xs font-mono" />
                        </div>
                        <div>
                          <label className="text-[10px] text-gray-500 text-red-500">Stop</label>
                          <input type="number" value={stopLoss} onChange={e => setStopLoss(Number(e.target.value))} className="w-full bg-gray-50 dark:bg-nova-ash border border-gray-200 dark:border-nova-border rounded p-1 text-center text-xs font-mono" />
                        </div>
                        <div>
                          <label className="text-[10px] text-gray-500 text-green-500">Target</label>
                          <input type="number" value={target} onChange={e => setTarget(Number(e.target.value))} className="w-full bg-gray-50 dark:bg-nova-ash border border-gray-200 dark:border-nova-border rounded p-1 text-center text-xs font-mono" />
                        </div>
                     </div>

                     {/* Dynamic Probability Band */}
                     <div className="bg-gray-50 dark:bg-nova-ash rounded-lg p-3 mt-2">
                        <div className="flex justify-between items-center mb-1">
                           <span className="text-[10px] uppercase font-bold text-gray-500">Win Probability</span>
                           <span className="text-xs font-bold text-blue-500">{simMetrics.probLow}% - {simMetrics.probHigh}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-gray-200 dark:bg-black rounded-full overflow-hidden">
                           <div className="h-full bg-gradient-to-r from-blue-400 to-blue-600" style={{ marginLeft: `${simMetrics.probLow}%`, width: `${simMetrics.probHigh - simMetrics.probLow}%` }}></div>
                        </div>
                     </div>

                     {/* Results Footer */}
                     <div className="pt-2 border-t border-gray-100 dark:border-nova-border grid grid-cols-2 gap-4">
                        <div>
                           <div className="text-[10px] text-gray-400">Projected Profit</div>
                           <div className="text-sm font-mono font-bold text-green-500">+₹{simMetrics.maxProfit.toLocaleString()}</div>
                        </div>
                        <div className="text-right">
                           <div className="text-[10px] text-gray-400">Risk Ratio</div>
                           <div className={`text-sm font-mono font-bold ${Number(simMetrics.rr) > 2 ? 'text-green-500' : 'text-yellow-500'}`}>1 : {simMetrics.rr}</div>
                        </div>
                     </div>
                  </div>
                </div>
             </div>

             {/* RIGHT COLUMN: ANALYTICS (8 Cols) */}
             <div className="lg:col-span-8 space-y-6">
                 
                 {/* 1. CONFIDENCE DECOMPOSITION */}
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white dark:bg-nova-card p-5 rounded-xl border border-gray-200 dark:border-nova-border">
                        <div className="flex items-center gap-2 mb-4">
                            <Target className="w-5 h-5 text-purple-500"/>
                            <h3 className="text-sm font-bold uppercase tracking-wider">Confidence Decomposition</h3>
                        </div>
                        <div className="space-y-4">
                           {[
                             { l: 'Technical Score', v: 85, c: 'bg-green-500', tip: 'Alignment of RSI, MACD, and Moving Averages' },
                             { l: 'Volatility Confidence', v: 45, c: 'bg-yellow-500', tip: 'Stability of price action (VIX)' },
                             { l: 'Liquidity Score', v: 92, c: 'bg-blue-500', tip: 'Volume depth and order book health' },
                             { l: 'Model Agreement', v: 78, c: 'bg-purple-500', tip: 'Consensus between LSTM and XGBoost models' },
                           ].map(metric => (
                             <div key={metric.l} className="group relative">
                               <div className="flex justify-between text-[10px] mb-1 text-gray-500 uppercase font-bold">
                                 <span className="flex items-center gap-1 cursor-help" title={metric.tip}>
                                    {metric.l} 
                                    <AlertCircle className="w-3 h-3 text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                                 </span>
                                 <span>{metric.v}%</span>
                               </div>
                               <div className="h-2 w-full bg-gray-100 dark:bg-nova-ash rounded-full overflow-hidden">
                                 <div className={`h-full ${metric.c} transition-all duration-1000 ease-out`} style={{width: loading ? '0%' : `${metric.v}%`}}></div>
                               </div>
                             </div>
                           ))}
                        </div>
                    </div>

                    <div className="space-y-4">
                        {/* Volatility Card */}
                        <div className="bg-white dark:bg-nova-card p-5 rounded-xl border border-gray-200 dark:border-nova-border h-[48%] flex flex-col justify-center">
                            <div className="flex items-center gap-2 mb-3">
                                <Gauge className="w-4 h-4 text-gray-500"/>
                                <h3 className="text-sm font-bold">Volatility Regime</h3>
                            </div>
                            <div className="relative h-4 bg-gray-100 dark:bg-nova-ash rounded-full overflow-hidden mb-2">
                                <div className="absolute left-0 top-0 h-full w-1/3 bg-green-500/50"></div>
                                <div className="absolute left-1/3 top-0 h-full w-1/3 bg-yellow-500/50"></div>
                                <div className="absolute right-0 top-0 h-full w-1/3 bg-red-500/50"></div>
                                <div className="absolute top-0 h-full w-1 bg-black dark:bg-white transition-all duration-1000 shadow-glow" style={{left: loading ? '10%' : '65%'}}></div>
                            </div>
                            <div className="flex justify-between text-xs text-gray-500">
                                <span>Low</span>
                                <span className="font-bold text-yellow-600 dark:text-yellow-500">Event Risk (IV: 18.2)</span>
                                <span>High</span>
                            </div>
                        </div>

                        {/* Accuracy Chart */}
                        <div className="bg-white dark:bg-nova-card p-5 rounded-xl border border-gray-200 dark:border-nova-border h-[48%]">
                            <div className="flex items-center gap-2 mb-2">
                                <BarChart3 className="w-4 h-4 text-gray-500"/>
                                <h3 className="text-sm font-bold">Recent Accuracy (5 Days)</h3>
                            </div>
                            <ResponsiveContainer width="100%" height="70%">
                                <BarChart data={MOCK_CONFIDENCE_HISTORY}>
                                    <XAxis dataKey="day" tick={{fontSize: 10}} axisLine={false} tickLine={false} />
                                    <Tooltip 
                                        contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', color: '#fff' }}
                                        cursor={{fill: 'transparent'}}
                                    />
                                    <Bar dataKey="score" radius={[4, 4, 0, 0]} barSize={30}>
                                        {MOCK_CONFIDENCE_HISTORY.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.score > 80 ? '#10b981' : '#3b82f6'} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                 </div>

                 {/* 2. FORECAST RESULT AREA */}
                 {forecast && (
                <div className="bg-white dark:bg-nova-card rounded-xl border border-gray-200 dark:border-nova-border overflow-hidden animate-fade-in shadow-sm">
                    <div className="bg-gray-50 dark:bg-nova-ash border-b border-gray-200 dark:border-nova-border p-4 flex items-center justify-between">
                    <span className="font-bold font-serif flex items-center">
                        <TrendingUp className="w-4 h-4 mr-2" />
                        FORECAST: {symbol}
                    </span>
                    <span className="text-xs text-gray-500 bg-white dark:bg-black px-2 py-1 rounded border border-gray-200 dark:border-nova-border">
                        {new Date().toLocaleDateString()}
                    </span>
                    </div>
                    <div className="p-6">
                        <div className="prose dark:prose-invert max-w-none prose-sm font-sans leading-relaxed whitespace-pre-wrap">
                        {forecast}
                        </div>
                    </div>
                    <div className="bg-amber-50 dark:bg-amber-900/10 border-t border-amber-100 dark:border-amber-900/20 p-4 flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0" />
                    <p className="text-xs text-amber-700 dark:text-amber-500/80">
                        DISCLAIMER: Nova Spark projections are probabilistic in nature and based on historical data patterns. They do not constitute financial advice. Market investments are subject to risk.
                    </p>
                    </div>
                </div>
                )}
                {!forecast && !loading && (
                  <div className="h-40 border-2 border-dashed border-gray-200 dark:border-nova-border rounded-xl flex flex-col items-center justify-center text-gray-400">
                     <TrendingUp className="w-8 h-8 mb-2 opacity-50" />
                     <span className="text-sm">Enter a symbol to generate AI analysis</span>
                  </div>
                )}
             </div>
         </div>
         )}

         {/* --- TRADE REPLAY VIEW --- */}
         {activeTab === 'REPLAY' && (
           <div className="animate-fade-in space-y-6">
             
             {/* Replay Controls & Selector */}
             <div className="bg-white dark:bg-nova-card p-4 rounded-xl border border-gray-200 dark:border-nova-border flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4 w-full md:w-auto">
                   <div className="relative">
                      <select 
                        value={selectedScenarioId}
                        onChange={(e) => {
                          setSelectedScenarioId(e.target.value);
                          setReplayProgress(0);
                          setIsPlaying(false);
                        }}
                        className="appearance-none bg-gray-50 dark:bg-nova-ash border border-gray-200 dark:border-nova-border rounded-lg py-2 pl-4 pr-10 text-sm font-bold min-w-[250px]"
                      >
                         {PAST_SCENARIOS.map(s => (
                           <option key={s.id} value={s.id}>{s.symbol} - {s.status} ({s.date})</option>
                         ))}
                      </select>
                      <History className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
                   </div>
                   
                   {/* Status Badge */}
                   <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${selectedScenario.status === 'Win' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {selectedScenario.status}
                   </span>
                </div>

                <div className="flex items-center gap-4 w-full md:w-auto">
                   <button 
                     onClick={() => setIsPlaying(!isPlaying)}
                     className="w-10 h-10 flex items-center justify-center rounded-full bg-black dark:bg-white text-white dark:text-black hover:opacity-90 transition-opacity"
                   >
                     {isPlaying ? <Pause className="w-4 h-4 fill-current"/> : <Play className="w-4 h-4 fill-current ml-0.5"/>}
                   </button>
                   
                   <div className="flex-1 md:w-64">
                      <input 
                        type="range" 
                        min="0" 
                        max={selectedScenario.data.length - 1} 
                        value={replayProgress}
                        onChange={(e) => setReplayProgress(Number(e.target.value))}
                        className="w-full h-2 bg-gray-200 dark:bg-nova-ash rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="flex justify-between text-[10px] text-gray-500 mt-1 uppercase font-bold">
                        <span>Prediction Start</span>
                        <span>Trade Close</span>
                      </div>
                   </div>
                </div>
             </div>

             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Chart Area */}
                <div className="lg:col-span-2 bg-white dark:bg-nova-card p-6 rounded-xl border border-gray-200 dark:border-nova-border h-[400px]">
                   <h3 className="text-sm font-bold uppercase text-gray-500 mb-4 flex justify-between">
                      <span>Price Action Replay</span>
                      <span className="text-xs normal-case bg-gray-100 dark:bg-nova-ash px-2 py-1 rounded">
                         Target: {selectedScenario.targetPrice} | Stop: {selectedScenario.stopLoss}
                      </span>
                   </h3>
                   <ResponsiveContainer width="100%" height="90%">
                      <ComposedChart data={selectedScenario.data}>
                         <CartesianGrid strokeDasharray="3 3" stroke="#333" opacity={0.1} />
                         <XAxis dataKey="day" hide />
                         <YAxis domain={['auto', 'auto']} tick={{fontSize: 10}} width={40} axisLine={false} tickLine={false} />
                         <Tooltip contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', color: '#fff' }} />
                         {/* Forecast Line (Always visible, Dashed) */}
                         <Line 
                            type="monotone" 
                            dataKey="predicted" 
                            stroke="#3b82f6" 
                            strokeDasharray="5 5" 
                            strokeWidth={2}
                            dot={false}
                            name="Predicted Path"
                         />
                         {/* Actual Line (Revealed by slider) */}
                         <Line 
                            type="monotone" 
                            dataKey={(entry) => selectedScenario.data.indexOf(entry) <= replayProgress ? entry.actual : null} 
                            stroke={selectedScenario.status === 'Win' ? '#10b981' : '#ef4444'} 
                            strokeWidth={3}
                            dot={{r: 4}}
                            name="Actual Price"
                            connectNulls={false}
                         />
                         <ReferenceLine y={selectedScenario.targetPrice} stroke="#10b981" strokeDasharray="3 3" label={{ value: 'TP', position: 'right', fontSize: 10, fill: '#10b981' }} />
                         <ReferenceLine y={selectedScenario.stopLoss} stroke="#ef4444" strokeDasharray="3 3" label={{ value: 'SL', position: 'right', fontSize: 10, fill: '#ef4444' }} />
                      </ComposedChart>
                   </ResponsiveContainer>
                </div>

                {/* "What Changed?" Delta View */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white dark:bg-nova-card p-6 rounded-xl border border-gray-200 dark:border-nova-border">
                       <h3 className="text-sm font-bold uppercase text-gray-500 mb-4 flex items-center gap-2">
                          <GitCommit className="w-4 h-4"/> "What Changed?" Delta
                       </h3>
                       <p className="text-xs text-gray-400 mb-4">Comparing metrics at Forecast Time vs. Trade End.</p>
                       
                       <div className="space-y-4">
                          {[
                            { 
                                l: 'RSI (14)', 
                                start: selectedScenario.metricsStart.rsi, 
                                end: selectedScenario.metricsEnd.rsi, 
                                diff: selectedScenario.metricsEnd.rsi - selectedScenario.metricsStart.rsi 
                            },
                            { 
                                l: 'Volume', 
                                start: selectedScenario.metricsStart.vol, 
                                end: selectedScenario.metricsEnd.vol, 
                                diff: null 
                            },
                            { 
                                l: 'Sentiment', 
                                start: selectedScenario.metricsStart.sentiment, 
                                end: selectedScenario.metricsEnd.sentiment, 
                                diff: null 
                            }
                          ].map((m, i) => (
                             <div key={i} className="bg-gray-50 dark:bg-nova-ash p-3 rounded-lg text-sm">
                                <div className="flex justify-between font-bold text-gray-500 text-[10px] uppercase mb-2">
                                   <span>Metric</span>
                                   <span>Impact</span>
                                </div>
                                <div className="flex justify-between items-center mb-1">
                                   <span className="font-bold">{m.l}</span>
                                   {m.diff !== null && (
                                     <span className={`text-xs font-mono font-bold ${m.diff > 0 ? 'text-green-500' : 'text-red-500'}`}>
                                        {m.diff > 0 ? '+' : ''}{m.diff}
                                     </span>
                                   )}
                                </div>
                                <div className="flex items-center gap-2 text-xs opacity-70">
                                   <span className="line-through">{m.start}</span>
                                   <ArrowRightLeft className="w-3 h-3"/>
                                   <span className="font-bold text-black dark:text-white">{m.end}</span>
                                </div>
                             </div>
                          ))}
                       </div>
                    </div>
                    
                    {/* Outcome Card */}
                    <div className={`p-6 rounded-xl border flex items-start gap-3 ${
                        selectedScenario.status === 'Win' 
                        ? 'bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-900/30' 
                        : 'bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-900/30'
                    }`}>
                        {selectedScenario.status === 'Win' ? <CheckCircle2 className="w-5 h-5 text-green-600"/> : <XCircle className="w-5 h-5 text-red-600"/>}
                        <div>
                           <h4 className={`font-bold text-sm ${selectedScenario.status === 'Win' ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'}`}>
                              Outcome Analysis
                           </h4>
                           <p className={`text-xs mt-1 ${selectedScenario.status === 'Win' ? 'text-green-600 dark:text-green-300' : 'text-red-600 dark:text-red-300'}`}>
                              {selectedScenario.status === 'Win' 
                                ? "Technical targets met. High volume supported the breakout as predicted." 
                                : "Stop loss triggered. Unexpected reversal due to sector weakness."}
                           </p>
                        </div>
                    </div>
                </div>
             </div>
           </div>
         )}

       </div>
    </div>
  );
};