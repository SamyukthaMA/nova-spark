import React, { useState } from 'react';
import { Upload, FileText, CheckCircle, PieChart, AlertTriangle, Brain, Zap } from 'lucide-react';
import { PieChart as RePie, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { MOCK_PORTFOLIO, MOCK_PSYCHOLOGY } from '../constants';

export const Portfolio: React.FC = () => {
  const [isUploaded, setIsUploaded] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleUpload = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setIsUploaded(true);
    }, 2000);
  };

  const allocationData = [
    { name: 'Large Cap', value: 65, color: '#10b981' },
    { name: 'Mid Cap', value: 25, color: '#3b82f6' },
    { name: 'Small Cap', value: 10, color: '#f59e0b' },
  ];

  if (!isUploaded) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-6 bg-gray-100 dark:bg-black text-gray-900 dark:text-gray-100">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="bg-white dark:bg-nova-card border-2 border-dashed border-gray-300 dark:border-nova-border rounded-2xl p-10 hover:border-blue-500 transition-colors cursor-pointer" onClick={handleUpload}>
             {isAnalyzing ? (
               <div className="animate-pulse flex flex-col items-center">
                 <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mb-4">
                    <PieChart className="w-8 h-8 text-blue-500 animate-spin" />
                 </div>
                 <h3 className="text-lg font-bold">Analyzing Alpha...</h3>
                 <p className="text-sm text-gray-500 mt-2">Crunching volatility metrics.</p>
               </div>
             ) : (
               <div className="flex flex-col items-center">
                 <div className="w-16 h-16 bg-gray-100 dark:bg-nova-ash rounded-full flex items-center justify-center mb-4">
                    <Upload className="w-8 h-8 text-gray-400" />
                 </div>
                 <h3 className="text-lg font-bold">Upload Portfolio</h3>
                 <p className="text-sm text-gray-500 mt-2">Drag & Drop CSV, Excel, or PDF</p>
                 <p className="text-xs text-gray-400 mt-1">Supported Brokers: Zerodha, Groww, Upstox</p>
                 <button className="mt-6 px-6 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg font-medium text-sm hover:opacity-90 transition-opacity">
                    Select File
                 </button>
               </div>
             )}
          </div>
          <div className="flex items-start gap-3 text-left p-4 bg-blue-50 dark:bg-blue-900/10 rounded-lg border border-blue-100 dark:border-blue-900/20">
             <FileText className="w-5 h-5 text-blue-500 mt-0.5"/>
             <div>
               <p className="text-sm font-bold text-blue-700 dark:text-blue-400">Secure Analysis</p>
               <p className="text-xs text-blue-600 dark:text-blue-300">Your data is processed in-memory and is not stored persistently. We parse for allocation, beta, and overlap risks.</p>
             </div>
          </div>
        </div>
      </div>
    );
  }

  // Analyzed View
  return (
    <div className="h-full overflow-y-auto p-6 space-y-6 bg-gray-100 dark:bg-black text-gray-900 dark:text-gray-100 animate-fade-in">
        <div className="flex justify-between items-center">
           <div>
             <h2 className="text-2xl font-serif font-bold">Portfolio Diagnostics</h2>
             <p className="text-sm text-gray-500">File: zerodha_holdings.csv <CheckCircle className="inline w-3 h-3 text-green-500"/></p>
           </div>
           <button onClick={() => setIsUploaded(false)} className="text-sm text-red-500 hover:underline">Reset</button>
        </div>

        {/* Behavioral Psychology Mirror - NEW FEATURE */}
        <div className="bg-gradient-to-r from-indigo-900 to-purple-900 text-white p-6 rounded-xl relative overflow-hidden shadow-lg">
           <div className="absolute top-0 right-0 p-6 opacity-20">
              <Brain className="w-32 h-32" />
           </div>
           <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="col-span-2">
                 <h3 className="text-lg font-bold flex items-center gap-2 mb-2">
                    <Brain className="w-5 h-5" /> Trader Psychology Mirror
                 </h3>
                 <p className="text-sm opacity-90 mb-4 font-light leading-relaxed">
                    {MOCK_PSYCHOLOGY.insight}
                 </p>
                 <div className="flex gap-4">
                    {MOCK_PSYCHOLOGY.metrics.map(m => (
                       <div key={m.label} className="bg-white/10 rounded-lg p-3 backdrop-blur-sm min-w-[100px]">
                          <div className="text-[10px] uppercase opacity-70 mb-1">{m.label}</div>
                          <div className="text-xl font-bold" style={{color: m.color}}>{m.value}/100</div>
                       </div>
                    ))}
                 </div>
              </div>
              <div className="flex flex-col justify-center items-end border-l border-white/10 pl-6">
                 <div className="text-4xl font-mono font-bold">{MOCK_PSYCHOLOGY.score}</div>
                 <div className="text-sm opacity-70">Psych Score</div>
                 <div className="mt-2 px-3 py-1 bg-yellow-500 text-black text-xs font-bold rounded-full uppercase">
                    {MOCK_PSYCHOLOGY.status}
                 </div>
              </div>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Allocation Chart */}
            <div className="bg-white dark:bg-nova-card p-6 rounded-xl border border-gray-200 dark:border-nova-border flex flex-col items-center">
               <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4 w-full text-left">Market Cap Split</h3>
               <div className="w-full h-48">
                 <ResponsiveContainer width="100%" height="100%">
                    <RePie data={allocationData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                      {allocationData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </RePie>
                 </ResponsiveContainer>
               </div>
               <div className="flex gap-4 mt-4">
                  {allocationData.map(d => (
                    <div key={d.name} className="flex items-center text-xs">
                      <span className="w-2 h-2 rounded-full mr-1" style={{backgroundColor: d.color}}></span>
                      {d.name} ({d.value}%)
                    </div>
                  ))}
               </div>
            </div>

            {/* Risk Metrics */}
            <div className="bg-white dark:bg-nova-card p-6 rounded-xl border border-gray-200 dark:border-nova-border space-y-6">
               <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500">Risk Audit</h3>
               
               <div>
                  <div className="flex justify-between text-sm mb-1">
                     <span>Beta Score</span>
                     <span className="font-mono font-bold text-red-500">1.45 (High)</span>
                  </div>
                  <div className="h-2 bg-gray-100 dark:bg-nova-ash rounded-full overflow-hidden">
                     <div className="h-full bg-red-500 w-[85%]"></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Portfolio is 45% more volatile than Nifty.</p>
               </div>

               <div>
                  <div className="flex justify-between text-sm mb-1">
                     <span>Diversification Score</span>
                     <span className="font-mono font-bold text-yellow-500">6.2/10</span>
                  </div>
                  <div className="h-2 bg-gray-100 dark:bg-nova-ash rounded-full overflow-hidden">
                     <div className="h-full bg-yellow-500 w-[62%]"></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Heavy overlap in Finance sector.</p>
               </div>
            </div>

            {/* Insights */}
            <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-900/20 p-6 rounded-xl">
               <div className="flex items-center gap-2 mb-4">
                  <AlertTriangle className="w-5 h-5 text-amber-500"/>
                  <h3 className="text-amber-700 dark:text-amber-500 font-bold">Bot Sauce Analysis</h3>
               </div>
               <p className="text-sm text-amber-800 dark:text-amber-200/80 italic mb-4">
                 "Look, you love Banks. I get it. But if HDFC sneezes, your portfolio catches pneumonia. Consider hedging with some Pharma or just buying Gold like a sensible boomer."
               </p>
               <button className="w-full py-2 bg-amber-500 text-white rounded-lg text-sm font-bold hover:bg-amber-600 transition-colors">
                 Generate Rebalancing Plan
               </button>
            </div>
        </div>

        {/* Holdings List */}
        <div className="bg-white dark:bg-nova-card rounded-xl border border-gray-200 dark:border-nova-border overflow-hidden">
            <table className="w-full text-left text-sm">
                 <thead className="bg-gray-50 dark:bg-nova-ash text-xs uppercase text-gray-500">
                     <tr>
                         <th className="px-6 py-3">Stock</th>
                         <th className="px-6 py-3">Sector</th>
                         <th className="px-6 py-3 text-right">Weight</th>
                         <th className="px-6 py-3 text-right">P&L</th>
                     </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-100 dark:divide-nova-border/50">
                     {MOCK_PORTFOLIO.map((stock) => (
                         <tr key={stock.symbol} className="hover:bg-gray-50 dark:hover:bg-nova-ash/30 transition-colors">
                             <td className="px-6 py-4 font-bold">{stock.symbol}</td>
                             <td className="px-6 py-4 text-gray-500">{stock.sector}</td>
                             <td className="px-6 py-4 text-right">{(Math.random() * 15 + 2).toFixed(1)}%</td>
                             <td className={`px-6 py-4 text-right font-medium ${stock.pnl >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                 {stock.pnl >= 0 ? '+' : ''}{stock.pnlPercent}%
                             </td>
                         </tr>
                     ))}
                 </tbody>
            </table>
        </div>
    </div>
  );
};