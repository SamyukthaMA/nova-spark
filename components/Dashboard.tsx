import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { MOCK_INDICES, SECTOR_PERFORMANCE } from '../constants';
import { ArrowUpRight, ArrowDownRight, Layers, Globe, Clock, Zap, Radio, Coffee } from 'lucide-react';

const data1D = [
  { name: '9:15', value: 22300 },
  { name: '10:00', value: 22350 },
  { name: '11:00', value: 22320 },
  { name: '12:00', value: 22400 },
  { name: '13:00', value: 22380 },
  { name: '14:00', value: 22420 },
  { name: '15:00', value: 22450 },
];

const data1W = [
  { name: 'Mon', value: 22100 },
  { name: 'Tue', value: 22250 },
  { name: 'Wed', value: 22150 },
  { name: 'Thu', value: 22350 },
  { name: 'Fri', value: 22450 },
];

export const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'SECTORS' | 'GLOBAL'>('OVERVIEW');
  const [timeframe, setTimeframe] = useState<'1D' | '1W' | '1M'>('1D');

  const chartData = timeframe === '1D' ? data1D : data1W;

  return (
    <div className="h-full overflow-y-auto bg-gray-100 dark:bg-black p-6 space-y-6 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      
      {/* Ticker Tape */}
      <div className="flex overflow-x-auto gap-4 pb-2 hide-scrollbar">
        {MOCK_INDICES.map((idx) => (
          <div key={idx.name} className="min-w-[160px] bg-white dark:bg-nova-card p-3 rounded-xl border border-gray-200 dark:border-nova-border shadow-sm flex-shrink-0 cursor-pointer hover:border-blue-500 transition-colors">
            <div className="flex justify-between items-start mb-1">
              <span className="text-gray-500 dark:text-gray-400 text-[10px] font-bold tracking-wider">{idx.name}</span>
            </div>
            <div className="text-lg font-mono font-medium">{idx.value.toLocaleString()}</div>
            <div className={`flex items-center text-[10px] mt-1 ${idx.trend === 'up' ? 'text-emerald-600 dark:text-emerald-500' : 'text-rose-600 dark:text-rose-500'}`}>
              {idx.trend === 'up' ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
              {idx.change} ({idx.changePercent}%)
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 dark:border-nova-border">
          {['OVERVIEW', 'SECTORS', 'GLOBAL'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`px-6 py-3 text-sm font-bold tracking-wider transition-colors border-b-2 ${activeTab === tab ? 'border-black dark:border-white text-black dark:text-white' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
              >
                  {tab}
              </button>
          ))}
      </div>

      {activeTab === 'OVERVIEW' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in">
            {/* Main Interactive Chart */}
            <div className="lg:col-span-2 space-y-6">
                <div className="bg-white dark:bg-nova-card p-6 rounded-xl border border-gray-200 dark:border-nova-border shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-sm font-semibold flex items-center">
                            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
                            NIFTY 50 Live
                        </h3>
                        <div className="flex bg-gray-100 dark:bg-nova-ash rounded-lg p-1">
                            {['1D', '1W', '1M'].map(tf => (
                                <button 
                                    key={tf}
                                    onClick={() => setTimeframe(tf as any)}
                                    className={`px-3 py-1 text-xs font-bold rounded ${timeframe === tf ? 'bg-white dark:bg-nova-card shadow' : 'text-gray-400 hover:text-gray-600'}`}
                                >
                                    {tf}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="h-[350px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData}>
                            <defs>
                            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                            </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#52525b" opacity={0.1} />
                            <XAxis dataKey="name" stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} domain={['auto', 'auto']} />
                            <Tooltip 
                                contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', color: '#fff' }}
                                itemStyle={{ color: '#3b82f6' }}
                            />
                            <Area type="monotone" dataKey="value" stroke="#3b82f6" fillOpacity={1} fill="url(#colorValue)" strokeWidth={2} />
                        </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Narrative Market Brief - NEW FEATURE */}
                <div className="bg-white dark:bg-nova-card p-6 rounded-xl border border-gray-200 dark:border-nova-border shadow-sm">
                    <h3 className="text-sm font-bold uppercase text-gray-500 flex items-center gap-2 mb-4">
                        <Coffee className="w-4 h-4"/> Morning Brief
                    </h3>
                    <div className="prose dark:prose-invert prose-sm max-w-none text-sm font-sans">
                        <p><strong>Market Context:</strong> Nifty opened slightly higher but is facing resistance at 22,500. Global cues are mixed with US futures flat. </p>
                        <p><strong>Key Risk:</strong> High volatility expected post 2 PM due to monthly F&O expiry. Banking stocks look weak relative to IT.</p>
                        <p><strong>Bot Sauce says:</strong> "Don't be a hero today. Range-bound until 2 PM. Scalp if you must, but keep stop losses tight."</p>
                    </div>
                </div>
            </div>

            {/* Market Activity */}
            <div className="space-y-6">
                 {/* Market Regime - NEW FEATURE */}
                 <div className="bg-black dark:bg-white text-white dark:text-black p-6 rounded-xl shadow-lg relative overflow-hidden">
                     <div className="relative z-10">
                        <h3 className="text-xs font-bold uppercase opacity-70 mb-2 flex items-center gap-2">
                             <Radio className="w-4 h-4" /> Market Regime
                        </h3>
                        <div className="text-2xl font-bold mb-1">High Volatility</div>
                        <div className="text-sm opacity-80">Event-Driven (Expiry)</div>
                        <div className="mt-4 flex gap-2">
                            <span className="px-2 py-1 bg-white/20 dark:bg-black/10 rounded text-[10px] font-bold">VIX 13.5</span>
                            <span className="px-2 py-1 bg-white/20 dark:bg-black/10 rounded text-[10px] font-bold">PCR 0.8</span>
                        </div>
                     </div>
                     <div className="absolute right-[-20px] bottom-[-20px] opacity-10">
                         <Zap className="w-32 h-32" />
                     </div>
                 </div>

                 {/* Breadth */}
                 <div className="bg-white dark:bg-nova-card p-6 rounded-xl border border-gray-200 dark:border-nova-border shadow-sm">
                     <h3 className="text-sm font-bold uppercase text-gray-500 mb-4">Market Breadth</h3>
                     <div className="flex items-center gap-2 mb-2 text-sm font-bold">
                         <span className="text-green-500">32 Advances</span>
                         <span className="text-gray-300">|</span>
                         <span className="text-red-500">18 Declines</span>
                     </div>
                     <div className="w-full h-2 bg-red-500 rounded-full overflow-hidden flex">
                         <div className="h-full bg-green-500" style={{width: '64%'}}></div>
                     </div>
                 </div>

                 {/* Top Movers */}
                 <div className="bg-white dark:bg-nova-card rounded-xl border border-gray-200 dark:border-nova-border shadow-sm overflow-hidden">
                     <div className="p-4 border-b border-gray-100 dark:border-nova-border/50 bg-gray-50 dark:bg-nova-ash">
                        <h3 className="text-sm font-bold uppercase text-gray-500 flex items-center gap-2">
                             <Zap className="w-4 h-4"/> Top Movers
                        </h3>
                     </div>
                     <div className="divide-y divide-gray-100 dark:divide-nova-border/50">
                         {[{s:'TATASTEEL', v:'+4.5%'}, {s:'ADANIENT', v:'+3.1%'}, {s:'INFY', v:'-1.8%'}].map(item => (
                             <div key={item.s} className="flex justify-between items-center p-4 hover:bg-gray-50 dark:hover:bg-nova-ash/20">
                                 <span className="font-bold text-sm">{item.s}</span>
                                 <span className={`font-mono text-sm ${item.v.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>{item.v}</span>
                             </div>
                         ))}
                     </div>
                 </div>
            </div>
        </div>
      )}

      {activeTab === 'SECTORS' && (
         <div className="bg-white dark:bg-nova-card p-6 rounded-xl border border-gray-200 dark:border-nova-border shadow-sm animate-fade-in">
             <h3 className="text-sm font-bold uppercase text-gray-500 mb-6">Sector Rotation (Intraday)</h3>
             <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={SECTOR_PERFORMANCE} layout="vertical" margin={{ left: 20 }}>
                        <XAxis type="number" hide />
                        <YAxis dataKey="name" type="category" width={100} tick={{fontSize: 12, fill: '#a1a1aa', fontWeight: 'bold'}} axisLine={false} tickLine={false} />
                        <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', color: '#fff' }}/>
                        <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20}>
                            {SECTOR_PERFORMANCE.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.value >= 0 ? '#10b981' : '#f43f5e'} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
             </div>
         </div>
      )}

       {activeTab === 'GLOBAL' && (
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
             <div className="bg-white dark:bg-nova-card p-6 rounded-xl border border-gray-200 dark:border-nova-border shadow-sm">
                 <h3 className="text-sm font-bold uppercase text-gray-500 mb-4 flex items-center gap-2"><Globe className="w-4 h-4"/> US Markets (Futures)</h3>
                 <div className="space-y-4">
                     <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-nova-ash rounded-lg">
                         <span className="font-bold">DOW JONES</span>
                         <span className="text-red-500 font-mono">-0.45%</span>
                     </div>
                     <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-nova-ash rounded-lg">
                         <span className="font-bold">NASDAQ</span>
                         <span className="text-green-500 font-mono">+0.12%</span>
                     </div>
                     <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-nova-ash rounded-lg">
                         <span className="font-bold">S&P 500</span>
                         <span className="text-red-500 font-mono">-0.05%</span>
                     </div>
                 </div>
             </div>
             
             <div className="bg-white dark:bg-nova-card p-6 rounded-xl border border-gray-200 dark:border-nova-border shadow-sm">
                 <h3 className="text-sm font-bold uppercase text-gray-500 mb-4 flex items-center gap-2"><Clock className="w-4 h-4"/> Commodity & FX</h3>
                 <div className="space-y-4">
                     <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-nova-ash rounded-lg">
                         <span className="font-bold">Brent Crude</span>
                         <span className="text-green-500 font-mono">$82.4</span>
                     </div>
                     <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-nova-ash rounded-lg">
                         <span className="font-bold">Gold</span>
                         <span className="text-green-500 font-mono">$2,150</span>
                     </div>
                     <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-nova-ash rounded-lg">
                         <span className="font-bold">USD/INR</span>
                         <span className="text-red-500 font-mono">82.85</span>
                     </div>
                 </div>
             </div>
         </div>
      )}
    </div>
  );
};