import React, { useState } from 'react';
import { 
  Search, 
  TrendingUp, 
  ArrowRight, 
  BarChart2, 
  Activity, 
  Shield, 
  Bell, 
  User, 
  Lock,
  ChevronRight,
  TrendingDown,
  DollarSign,
  Sun,
  Moon,
  Sliders,
  Newspaper,
  Users,
  Briefcase,
  Crosshair
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell, PieChart, Pie } from 'recharts';
import { MOCK_FINANCIALS, MOCK_SHAREHOLDING, MOCK_STRATEGIES } from '../constants';

// --- Stock Analyzer Module ---
export const StockAnalyzer: React.FC = () => {
  return (
    <div className="h-full overflow-y-auto p-6 space-y-8 bg-gray-100 dark:bg-black text-gray-900 dark:text-gray-100">
      <div className="flex flex-col md:flex-row justify-between items-end mb-4 gap-4">
        <div>
          <h2 className="text-2xl font-serif font-bold">Stock Analyzer</h2>
          <p className="text-sm text-gray-500 mt-1">Deep fundamental and technical scan</p>
        </div>
        <div className="relative w-full md:w-auto">
          <Search className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
          <input 
            type="text" 
            placeholder="Search Symbol..." 
            className="pl-10 pr-4 py-2 bg-white dark:bg-nova-ash border border-gray-200 dark:border-nova-border rounded-lg text-sm focus:outline-none focus:border-gray-400 w-full md:w-64"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Col - Overview */}
        <div className="space-y-6">
            <div className="bg-white dark:bg-nova-card p-6 rounded-xl border border-gray-200 dark:border-nova-border">
                <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-2xl">RELIANCE</h3>
                    <div className="text-right">
                        <div className="text-xl font-mono font-bold">₹2,950.45</div>
                        <div className="text-green-500 text-xs font-mono">+35.00 (1.2%)</div>
                    </div>
                </div>
                <div className="text-xs text-gray-500 uppercase tracking-wider mb-6">Reliance Industries Ltd. | Energy</div>
                <div className="space-y-3">
                    {[
                    { label: 'Market Cap', value: '₹19.8 Lakh Cr' },
                    { label: 'P/E Ratio', value: '24.5' },
                    { label: 'P/B Ratio', value: '2.1' },
                    { label: 'Div Yield', value: '0.8%' },
                    { label: 'Book Value', value: '₹1,250' },
                    { label: 'ROE', value: '14.2%' },
                    { label: 'ROCE', value: '16.5%' },
                    { label: 'Debt/Eq', value: '0.42' },
                    ].map((stat, i) => (
                    <div key={i} className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-nova-border/50 last:border-0">
                        <span className="text-sm text-gray-500">{stat.label}</span>
                        <span className="font-mono font-medium">{stat.value}</span>
                    </div>
                    ))}
                </div>
            </div>

            {/* Shareholding Pattern */}
            <div className="bg-white dark:bg-nova-card p-6 rounded-xl border border-gray-200 dark:border-nova-border">
                <h3 className="font-bold text-sm uppercase tracking-wider text-gray-500 mb-4 flex items-center gap-2"><Users className="w-4 h-4"/> Shareholding</h3>
                <div className="h-48 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie 
                                data={MOCK_SHAREHOLDING} 
                                innerRadius={40} 
                                outerRadius={60} 
                                paddingAngle={5} 
                                dataKey="value"
                            >
                                {MOCK_SHAREHOLDING.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', color: '#fff', fontSize: '12px' }}/>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-4">
                    {MOCK_SHAREHOLDING.map(s => (
                        <div key={s.name} className="flex items-center text-xs">
                             <div className="w-2 h-2 rounded-full mr-2" style={{backgroundColor: s.color}}></div>
                             <span className="text-gray-500 mr-auto">{s.name}</span>
                             <span className="font-bold">{s.value}%</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        {/* Center Col - Technicals & Performance */}
        <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-nova-card p-6 rounded-xl border border-gray-200 dark:border-nova-border flex flex-col items-center justify-center text-center">
                    <h3 className="w-full text-left font-bold text-sm uppercase tracking-wider text-gray-500 mb-4">Technical Rating</h3>
                    <div className="w-32 h-32 rounded-full border-8 border-gray-200 dark:border-nova-border flex items-center justify-center relative mb-4">
                        <div className="absolute inset-0 border-8 border-green-500 rounded-full border-t-transparent border-l-transparent rotate-45"></div>
                        <div className="text-center">
                        <span className="block text-2xl font-bold">Buy</span>
                        <span className="text-xs text-gray-500">Strong</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 w-full text-xs mt-2">
                         <div className="bg-gray-50 dark:bg-nova-ash p-2 rounded">
                             <div className="text-gray-500 mb-1">RSI (14)</div>
                             <div className="font-bold">64.2</div>
                         </div>
                         <div className="bg-gray-50 dark:bg-nova-ash p-2 rounded">
                             <div className="text-gray-500 mb-1">MACD</div>
                             <div className="font-bold text-green-500">Bullish</div>
                         </div>
                         <div className="bg-gray-50 dark:bg-nova-ash p-2 rounded">
                             <div className="text-gray-500 mb-1">ADX</div>
                             <div className="font-bold">28.0</div>
                         </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-nova-card p-6 rounded-xl border border-gray-200 dark:border-nova-border">
                    <h3 className="font-bold text-sm uppercase tracking-wider text-gray-500 mb-4">Price Performance</h3>
                    <div className="space-y-4">
                        {[
                            { p: '1 Week', v: '+2.4%', c: 'text-green-500' },
                            { p: '1 Month', v: '-1.2%', c: 'text-red-500' },
                            { p: '3 Months', v: '+12.5%', c: 'text-green-500' },
                            { p: '1 Year', v: '+45.0%', c: 'text-green-500' },
                            { p: 'YTD', v: '+8.4%', c: 'text-green-500' }
                        ].map((m) => (
                            <div key={m.p}>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-gray-500">{m.p}</span>
                                    <span className={`font-mono font-bold ${m.c}`}>{m.v}</span>
                                </div>
                                <div className="h-1 w-full bg-gray-100 dark:bg-nova-ash rounded-full overflow-hidden">
                                    <div className={`h-full ${m.c.includes('green') ? 'bg-green-500' : 'bg-red-500'}`} style={{width: Math.abs(parseFloat(m.v)) * 2 + '%'}}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Financials Chart */}
            <div className="bg-white dark:bg-nova-card p-6 rounded-xl border border-gray-200 dark:border-nova-border">
                <h3 className="font-bold text-sm uppercase tracking-wider text-gray-500 mb-6 flex items-center gap-2"><DollarSign className="w-4 h-4"/> Financial Trend (Revenue vs Profit)</h3>
                <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={MOCK_FINANCIALS}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#333" opacity={0.1} vertical={false}/>
                            <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} />
                            <YAxis axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} />
                            <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', color: '#fff' }}/>
                            <Bar dataKey="revenue" name="Revenue (Cr)" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={30} />
                            <Bar dataKey="profit" name="Profit (Cr)" fill="#10b981" radius={[4, 4, 0, 0]} barSize={30} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Peer Comparison */}
            <div className="bg-white dark:bg-nova-card rounded-xl border border-gray-200 dark:border-nova-border overflow-hidden">
                <div className="p-4 bg-gray-50 dark:bg-nova-ash border-b border-gray-200 dark:border-nova-border">
                    <h3 className="font-bold text-sm uppercase tracking-wider text-gray-500 flex items-center gap-2"><Briefcase className="w-4 h-4"/> Peer Comparison</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-white dark:bg-nova-card text-xs text-gray-500 border-b border-gray-100 dark:border-nova-border/50">
                            <tr>
                                <th className="px-6 py-3 font-medium">Company</th>
                                <th className="px-6 py-3 font-medium">Price</th>
                                <th className="px-6 py-3 font-medium">P/E</th>
                                <th className="px-6 py-3 font-medium">Mkt Cap</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-nova-border/50">
                            {[
                                { n: 'Reliance', p: '2,950', pe: '24.5', m: '19.8T' },
                                { n: 'TCS', p: '4,100', pe: '29.2', m: '15.2T' },
                                { n: 'HDFC Bank', p: '1,450', pe: '18.4', m: '11.5T' },
                                { n: 'Bharti Airtel', p: '1,200', pe: '65.0', m: '7.8T' },
                            ].map((row, idx) => (
                                <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-nova-ash/20">
                                    <td className="px-6 py-3 font-bold">{row.n}</td>
                                    <td className="px-6 py-3 font-mono">₹{row.p}</td>
                                    <td className="px-6 py-3 font-mono">{row.pe}</td>
                                    <td className="px-6 py-3 font-mono">{row.m}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* News */}
            <div className="bg-white dark:bg-nova-card p-6 rounded-xl border border-gray-200 dark:border-nova-border">
                <h3 className="font-bold text-sm uppercase tracking-wider text-gray-500 mb-4 flex items-center gap-2"><Newspaper className="w-4 h-4"/> Recent News</h3>
                <div className="space-y-4">
                     {[
                         "Reliance to acquire 100% stake in localized solar tech firm.",
                         "Jio Financial Services launches new lending app for merchants.",
                         "Oil prices surge as geopolitical tensions rise in Middle East."
                     ].map((news, i) => (
                         <div key={i} className="flex gap-4 items-start pb-4 border-b border-gray-100 dark:border-nova-border/50 last:border-0 last:pb-0">
                             <div className="min-w-[4px] h-4 bg-blue-500 rounded-full mt-1"></div>
                             <div>
                                 <p className="text-sm font-medium leading-relaxed">{news}</p>
                                 <p className="text-xs text-gray-500 mt-1">2 hours ago • MoneyControl</p>
                             </div>
                         </div>
                     ))}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

// --- Options Insight Module ---
export const OptionsInsight: React.FC = () => {
    const [view, setView] = useState<'Chain' | 'Strategy'>('Chain');

  return (
    <div className="h-full overflow-y-auto p-6 space-y-6 bg-gray-100 dark:bg-black text-gray-900 dark:text-gray-100">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-serif font-bold">Options Intelligence</h2>
        <div className="flex gap-2">
            <div className="flex bg-white dark:bg-nova-card rounded-lg border border-gray-200 dark:border-nova-border p-1">
                <button 
                  onClick={() => setView('Chain')}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${view === 'Chain' ? 'bg-black text-white dark:bg-white dark:text-black' : 'text-gray-500'}`}
                >
                    Option Chain
                </button>
                <button 
                  onClick={() => setView('Strategy')}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${view === 'Strategy' ? 'bg-black text-white dark:bg-white dark:text-black' : 'text-gray-500'}`}
                >
                    Strategy Builder
                </button>
            </div>
        </div>
      </div>
      
      {/* STRATEGY BUILDER - NEW FEATURE */}
      {view === 'Strategy' && (
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in">
             <div className="lg:col-span-1 bg-white dark:bg-nova-card p-6 rounded-xl border border-gray-200 dark:border-nova-border">
                 <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <Crosshair className="w-5 h-5"/> Strategy Input
                 </h3>
                 <div className="space-y-4">
                    <div>
                        <label className="text-xs font-bold text-gray-500 uppercase">Outlook</label>
                        <select className="w-full mt-1 bg-gray-50 dark:bg-nova-ash border border-gray-200 dark:border-nova-border rounded-lg p-2.5">
                            <option>Bullish (Moderate)</option>
                            <option>Bullish (Aggressive)</option>
                            <option>Bearish (Moderate)</option>
                            <option>Bearish (Aggressive)</option>
                            <option>Neutral (Range Bound)</option>
                            <option>Volatile (Breakout)</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-xs font-bold text-gray-500 uppercase">Expiry</label>
                        <select className="w-full mt-1 bg-gray-50 dark:bg-nova-ash border border-gray-200 dark:border-nova-border rounded-lg p-2.5">
                            <option>Current Week</option>
                            <option>Next Week</option>
                            <option>Monthly</option>
                        </select>
                    </div>
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors mt-4">
                        Find Best Strategies
                    </button>
                 </div>
             </div>

             <div className="lg:col-span-2 space-y-4">
                 <h3 className="text-sm font-bold uppercase text-gray-500">AI Suggested Strategies</h3>
                 {MOCK_STRATEGIES.map((strat, i) => (
                    <div key={i} className="bg-white dark:bg-nova-card p-6 rounded-xl border border-gray-200 dark:border-nova-border hover:border-blue-500 transition-colors cursor-pointer group">
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <h4 className="text-xl font-bold group-hover:text-blue-500 transition-colors">{strat.name}</h4>
                                <p className="text-sm text-gray-500 mt-1">{strat.desc}</p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                                strat.type === 'Bullish' ? 'bg-green-100 text-green-700' : 
                                strat.type === 'Bearish' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'
                            }`}>
                                {strat.type}
                            </span>
                        </div>
                        <div className="grid grid-cols-4 gap-4 mt-6 text-center">
                            <div className="bg-gray-50 dark:bg-nova-ash p-2 rounded-lg">
                                <div className="text-[10px] text-gray-500 uppercase">Prob. of Profit</div>
                                <div className="text-lg font-mono font-bold text-green-500">{strat.pop}%</div>
                            </div>
                            <div className="bg-gray-50 dark:bg-nova-ash p-2 rounded-lg">
                                <div className="text-[10px] text-gray-500 uppercase">Max Profit</div>
                                <div className="text-lg font-mono font-bold">{strat.maxProfit}</div>
                            </div>
                            <div className="bg-gray-50 dark:bg-nova-ash p-2 rounded-lg">
                                <div className="text-[10px] text-gray-500 uppercase">Max Loss</div>
                                <div className="text-lg font-mono font-bold text-red-500">{strat.maxLoss}</div>
                            </div>
                            <div className="bg-gray-50 dark:bg-nova-ash p-2 rounded-lg">
                                <div className="text-[10px] text-gray-500 uppercase">Risk Profile</div>
                                <div className="text-lg font-mono font-bold">{strat.risk}</div>
                            </div>
                        </div>
                    </div>
                 ))}
             </div>
         </div>
      )}

      {view === 'Chain' && (
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 animate-fade-in">
          
          {/* Main Option Chain Table - Spans 3 Cols */}
          <div className="xl:col-span-3 space-y-6">
              <div className="bg-white dark:bg-nova-card rounded-xl border border-gray-200 dark:border-nova-border overflow-hidden">
                <div className="grid grid-cols-9 bg-gray-50 dark:bg-nova-ash p-3 text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-wider text-center border-b border-gray-200 dark:border-nova-border">
                <div className="col-span-4 bg-green-500/5 text-green-600 dark:text-green-400 py-1 rounded">Calls (CE)</div>
                <div className="py-1"></div>
                <div className="col-span-4 bg-red-500/5 text-red-600 dark:text-red-400 py-1 rounded">Puts (PE)</div>
                </div>
                <div className="grid grid-cols-9 text-[10px] md:text-xs border-b border-gray-200 dark:border-nova-border text-center py-2 font-mono bg-gray-50 dark:bg-nova-ash/50 text-gray-400">
                <div>OI Chg</div>
                <div>OI</div>
                <div>Vol</div>
                <div>LTP</div>
                <div className="text-black dark:text-white font-sans">Strike</div>
                <div>LTP</div>
                <div>Vol</div>
                <div>OI</div>
                <div>OI Chg</div>
                </div>
                
                {[22300, 22350, 22400, 22450, 22500, 22550, 22600, 22650, 22700, 22750].map((strike, i) => {
                    const isATM = i === 4;
                    return (
                    <div key={strike} className={`grid grid-cols-9 py-3 text-xs font-mono border-b border-gray-100 dark:border-nova-border/50 text-center hover:bg-gray-50 dark:hover:bg-nova-ash/30 transition-colors items-center ${isATM ? 'bg-yellow-50 dark:bg-yellow-900/10 border-yellow-200 dark:border-yellow-900/30' : ''}`}>
                        <div className="text-green-500">+{(Math.random()*10).toFixed(1)}L</div>
                        <div className="text-gray-500">{(Math.random()*100).toFixed(1)}L</div>
                        <div className="text-gray-400 hidden md:block">{(Math.random()*50).toFixed(1)}K</div>
                        <div className={`font-bold ${i < 4 ? 'text-green-600' : 'text-gray-600 dark:text-gray-400'}`}>{(Math.random()*200).toFixed(1)}</div>
                        
                        <div className={`font-bold rounded py-1 px-2 mx-auto ${isATM ? 'bg-black text-white dark:bg-white dark:text-black' : 'bg-gray-100 dark:bg-nova-ash'}`}>{strike}</div>
                        
                        <div className={`font-bold ${i > 4 ? 'text-green-600' : 'text-gray-600 dark:text-gray-400'}`}>{(Math.random()*200).toFixed(1)}</div>
                        <div className="text-gray-400 hidden md:block">{(Math.random()*50).toFixed(1)}K</div>
                        <div className="text-gray-500">{(Math.random()*100).toFixed(1)}L</div>
                        <div className="text-red-500">-{(Math.random()*5).toFixed(1)}L</div>
                    </div>
                )})}
              </div>

              {/* OI Graph */}
              <div className="bg-white dark:bg-nova-card p-6 rounded-xl border border-gray-200 dark:border-nova-border">
                 <h3 className="font-bold text-sm uppercase tracking-wider text-gray-500 mb-6">Open Interest Buildup (Intraday)</h3>
                 <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                         <BarChart data={[
                             { strike: '22300', call: 120, put: 45 },
                             { strike: '22400', call: 150, put: 80 },
                             { strike: '22500', call: 90, put: 200 },
                             { strike: '22600', call: 40, put: 120 },
                             { strike: '22700', call: 20, put: 80 },
                         ]}>
                             <CartesianGrid strokeDasharray="3 3" stroke="#333" opacity={0.1} vertical={false}/>
                             <XAxis dataKey="strike" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} />
                             <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', color: '#fff' }}/>
                             <Bar dataKey="call" name="Call OI" fill="#ef4444" radius={[4, 4, 0, 0]} barSize={20} />
                             <Bar dataKey="put" name="Put OI" fill="#10b981" radius={[4, 4, 0, 0]} barSize={20} />
                         </BarChart>
                    </ResponsiveContainer>
                 </div>
              </div>
          </div>
          
          {/* Right Col - Summary & Greeks */}
          <div className="space-y-6">
               <div className="bg-white dark:bg-nova-card p-6 rounded-xl border border-gray-200 dark:border-nova-border shadow-sm">
                  <h4 className="font-bold mb-4 text-sm uppercase text-gray-500">Sentiment Indicators</h4>
                  <div className="space-y-6">
                      <div>
                          <div className="text-xs text-gray-500 mb-1">PCR (Put Call Ratio)</div>
                          <div className="text-3xl font-mono font-bold text-emerald-500">1.24</div>
                          <p className="text-[10px] text-gray-400 mt-1">Bullish. Puts are being written more aggressively.</p>
                      </div>
                      <div className="h-[1px] bg-gray-100 dark:bg-nova-border"></div>
                      <div>
                          <div className="text-xs text-gray-500 mb-1">Max Pain</div>
                          <div className="text-3xl font-mono font-bold text-blue-500">22,500</div>
                          <p className="text-[10px] text-gray-400 mt-1">Expiry likely to converge here.</p>
                      </div>
                      <div className="h-[1px] bg-gray-100 dark:bg-nova-border"></div>
                      <div>
                          <div className="text-xs text-gray-500 mb-1">IV Percentile</div>
                          <div className="text-3xl font-mono font-bold text-yellow-500">42%</div>
                          <p className="text-[10px] text-gray-400 mt-1">Volatility is moderate. Good for debit spreads.</p>
                      </div>
                  </div>
               </div>

               {/* Greeks */}
               <div className="bg-white dark:bg-nova-card p-6 rounded-xl border border-gray-200 dark:border-nova-border">
                   <h4 className="font-bold mb-4 text-sm uppercase text-gray-500">Option Greeks (ATM)</h4>
                   <div className="space-y-3 text-sm">
                       <div className="flex justify-between items-center">
                           <span className="text-gray-500">Delta</span>
                           <span className="font-mono">0.52</span>
                       </div>
                       <div className="flex justify-between items-center">
                           <span className="text-gray-500">Theta</span>
                           <span className="font-mono text-red-500">-12.4</span>
                       </div>
                       <div className="flex justify-between items-center">
                           <span className="text-gray-500">Gamma</span>
                           <span className="font-mono">0.004</span>
                       </div>
                       <div className="flex justify-between items-center">
                           <span className="text-gray-500">Vega</span>
                           <span className="font-mono">18.2</span>
                       </div>
                   </div>
               </div>

               <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/20 p-4 rounded-xl">
                    <div className="flex items-start gap-3">
                    <Activity className="w-5 h-5 text-blue-500 mt-0.5" />
                    <div>
                        <h4 className="font-bold text-blue-700 dark:text-blue-400 text-sm">Strategy Tip</h4>
                        <p className="text-xs text-blue-600 dark:text-blue-300 mt-1">
                         With PCR {'>'} 1 and Rising IV, consider a <strong>Bull Call Spread</strong> to cap risk.
                        </p>
                    </div>
                    </div>
                </div>
          </div>
      </div>
      )}
    </div>
  );
};

// --- Insights Module ---
export const Insights: React.FC = () => {
  return (
    <div className="h-full overflow-y-auto p-6 space-y-6 bg-gray-100 dark:bg-black text-gray-900 dark:text-gray-100">
      <h2 className="text-2xl font-serif font-bold mb-6">Market Intelligence</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-purple-900 to-indigo-900 rounded-xl p-6 text-white relative overflow-hidden shadow-lg">
          <div className="absolute top-0 right-0 p-4 opacity-20">
            <TrendingUp className="w-24 h-24" />
          </div>
          <h3 className="text-lg font-bold mb-2">Sector Rotation Alert</h3>
          <p className="text-sm opacity-80 mb-4">Capital is flowing from IT into Pharma and FMCG defensively.</p>
          <button className="text-xs bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded transition-colors">Read Analysis</button>
        </div>

        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 text-white relative overflow-hidden shadow-lg">
          <div className="absolute top-0 right-0 p-4 opacity-20">
             <DollarSign className="w-24 h-24" />
          </div>
          <h3 className="text-lg font-bold mb-2">FII/DII Activity</h3>
          <p className="text-sm opacity-80 mb-4">Net Institutional buying recorded for 3rd consecutive session.</p>
          <div className="flex gap-4 text-xs font-mono">
              <div>
                  <span className="block opacity-50">FII</span>
                  <span className="text-green-400">+1,200 Cr</span>
              </div>
              <div>
                  <span className="block opacity-50">DII</span>
                  <span className="text-green-400">+450 Cr</span>
              </div>
          </div>
        </div>

        <div className="bg-white dark:bg-nova-card p-6 rounded-xl border border-gray-200 dark:border-nova-border flex flex-col justify-between">
            <div>
                 <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-2">Global Cues</h3>
                 <div className="space-y-2">
                     <div className="flex justify-between text-sm"><span>US 10Y Yield</span> <span className="text-red-500">4.2%</span></div>
                     <div className="flex justify-between text-sm"><span>Brent Oil</span> <span className="text-green-500">$82.4</span></div>
                     <div className="flex justify-between text-sm"><span>Gift Nifty</span> <span className="text-green-500">+45 pts</span></div>
                 </div>
            </div>
        </div>
      </div>
    </div>
  );
};

interface SettingsProps {
    theme: 'dark' | 'light';
    toggleTheme: () => void;
}

export const Settings: React.FC<SettingsProps> = ({ theme, toggleTheme }) => {
    const [risk, setRisk] = useState(50);
    const [capital, setCapital] = useState(10);

  return (
    <div className="h-full overflow-y-auto p-6 space-y-8 bg-gray-100 dark:bg-black text-gray-900 dark:text-gray-100">
      <h2 className="text-2xl font-serif font-bold">System Settings</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Personalization */}
          <div className="bg-white dark:bg-nova-card rounded-xl border border-gray-200 dark:border-nova-border p-6 space-y-6">
              <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500"><Sliders className="w-5 h-5"/></div>
                  <h3 className="font-bold">Personalization Engine</h3>
              </div>

              <div>
                  <label className="text-sm text-gray-500 mb-2 block">Risk Tolerance Score: {risk}/100</label>
                  <input 
                    type="range" 
                    min="0" max="100" 
                    value={risk} 
                    onChange={(e) => setRisk(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                      <span>Conservative</span>
                      <span>Aggressive</span>
                  </div>
              </div>

              <div>
                  <label className="text-sm text-gray-500 mb-2 block">Capital Allocation per Trade (Lakhs)</label>
                   <div className="flex gap-2">
                       {[5, 10, 20, 50].map(val => (
                           <button 
                             key={val}
                             onClick={() => setCapital(val)}
                             className={`px-4 py-2 rounded-lg text-sm border ${capital === val ? 'bg-black dark:bg-white text-white dark:text-black border-transparent' : 'border-gray-200 dark:border-nova-border'}`}
                           >
                               ₹{val}L
                           </button>
                       ))}
                   </div>
              </div>

              <div>
                  <label className="text-sm text-gray-500 mb-2 block">Preferred Sectors</label>
                  <div className="flex flex-wrap gap-2">
                      {['Banking', 'IT', 'Pharma', 'Auto', 'Energy'].map(s => (
                          <span key={s} className="px-3 py-1 bg-gray-100 dark:bg-nova-ash rounded-full text-xs cursor-pointer hover:bg-gray-200 dark:hover:bg-nova-border transition-colors">
                              {s}
                          </span>
                      ))}
                  </div>
              </div>
          </div>

          {/* System Config */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-nova-card rounded-xl border border-gray-200 dark:border-nova-border divide-y divide-gray-100 dark:divide-nova-border">
                <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-gray-100 dark:bg-nova-ash rounded-lg text-gray-600 dark:text-gray-300">
                           {theme === 'dark' ? <Moon className="w-5 h-5"/> : <Sun className="w-5 h-5"/>}
                        </div>
                        <div>
                            <p className="font-medium">Appearance</p>
                            <p className="text-xs text-gray-500">Current: {theme === 'dark' ? 'Black & Ash' : 'Light Mode'}</p>
                        </div>
                    </div>
                    <button 
                        onClick={toggleTheme}
                        className="px-4 py-2 bg-gray-100 dark:bg-nova-ash rounded-lg text-xs font-medium hover:opacity-80 transition-opacity"
                    >
                        Toggle Theme
                    </button>
                </div>
                
                <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-500/10 rounded-lg text-purple-500"><Bell className="w-5 h-5"/></div>
                        <div>
                        <p className="font-medium">Notifications</p>
                        <p className="text-xs text-gray-500">Alerts for breakouts & news</p>
                        </div>
                    </div>
                    <input type="checkbox" defaultChecked className="toggle-checkbox w-5 h-5 accent-blue-500"/>
                </div>

                <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-500/10 rounded-lg text-green-500"><Shield className="w-5 h-5"/></div>
                        <div>
                        <p className="font-medium">Privacy & Security</p>
                        <p className="text-xs text-gray-500">2FA and API Keys</p>
                        </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
            </div>
            
            <div className="text-center pt-4">
                <p className="text-xs text-gray-400">Nova Spark v1.7.0 (Stable)</p>
                <p className="text-[10px] text-gray-500 mt-1">© 2024 Nova Financial Intelligence Systems</p>
            </div>
          </div>
      </div>
    </div>
  );
};