import React from 'react';
import { NAVIGATION_ITEMS } from '../constants';
import { View } from '../types';
import { Share2, Bell } from 'lucide-react';

interface LayoutProps {
  currentView: View;
  setCurrentView: (view: View) => void;
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ currentView, setCurrentView, children }) => {
  return (
    <div className="flex h-screen bg-white dark:bg-nova-bg text-nova-card dark:text-gray-100 overflow-hidden font-sans transition-colors duration-300">
      {/* Sidebar */}
      <aside className="w-64 border-r border-gray-200 dark:border-nova-border bg-gray-50 dark:bg-nova-ash flex flex-col hidden md:flex transition-colors duration-300">
        {/* Header - Matching Logo */}
        <div className="h-28 flex flex-col items-center justify-center border-b border-gray-200 dark:border-nova-border bg-gray-100 dark:bg-black pt-4">
          <div className="relative w-40 h-16 mb-2">
             
             {/* Graph Line & Arrow - Exact Coordinates as IntroAnimation (Scaled via ViewBox) */}
             <svg className="absolute inset-0 w-full h-full z-0 overflow-visible" viewBox="0 0 400 140">
                <path 
                  d="M 20 120 L 100 80 L 180 110 L 380 20" 
                  fill="none" 
                  className="stroke-gray-300 dark:stroke-zinc-700"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                 {/* Arrow Head */}
                 <g className="stroke-gray-300 dark:stroke-zinc-700">
                    <path 
                      d="M 380 20 L 320 20" 
                      fill="none" 
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path 
                      d="M 380 20 L 340 70" 
                      fill="none" 
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                 </g>
             </svg>

             {/* Lines - Layer 10 */}
             <div className="absolute top-2 left-0 w-full h-[1px] bg-black dark:bg-white z-10"></div>
             <div className="absolute bottom-2 left-0 w-full h-[1px] bg-black dark:bg-white opacity-50 z-10"></div>
             
             {/* Text - Layer 20 (Foreground) */}
             <div className="absolute inset-0 flex items-center justify-center z-20">
                <span className="font-serif font-bold text-3xl tracking-[0.1em] text-black dark:text-white">NOVA</span>
             </div>
          </div>
          {/* Tagline */}
          <div className="mb-4">
             <span className="text-[9px] tracking-[0.2em] font-bold text-gray-800 dark:text-white uppercase">
               BET BIG. BOT SAUCE.
             </span>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-8 px-4 space-y-10">
          {NAVIGATION_ITEMS.map((section, idx) => (
            <div key={idx}>
              <h3 className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] mb-4 px-3">
                {section.category}
              </h3>
              <div className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentView === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setCurrentView(item.id as View)}
                      className={`w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 group ${
                        isActive
                          ? 'bg-black dark:bg-white text-white dark:text-black shadow-lg'
                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-nova-border dark:hover:text-white'
                      }`}
                    >
                      <Icon className={`w-4 h-4 mr-3 transition-colors ${isActive ? 'text-white dark:text-black' : 'text-gray-400 group-hover:text-black dark:group-hover:text-white'}`} />
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col relative overflow-hidden bg-gray-100 dark:bg-black">
        
        {/* Desktop Top Bar / Mobile Header */}
        <header className="h-16 border-b border-gray-200 dark:border-nova-border flex items-center justify-between px-6 bg-white dark:bg-black z-10">
          {/* Mobile Only Logo */}
          <div className="md:hidden">
             <span className="font-serif font-bold dark:text-white tracking-widest">NOVA</span>
          </div>
          
          {/* Desktop Title */}
          <div className="hidden md:block">
            <h2 className="text-sm font-medium text-gray-500 uppercase tracking-widest">{currentView}</h2>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
             <button className="text-gray-400 hover:text-black dark:hover:text-white transition-colors relative">
               <Bell className="w-5 h-5" />
               <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-black"></span>
             </button>
             <button 
                className="flex items-center gap-2 px-4 py-1.5 bg-black dark:bg-white text-white dark:text-black rounded-full text-xs font-bold uppercase tracking-wider hover:opacity-80 transition-opacity"
                onClick={() => alert("Sharing Dashboard Snapshot...")}
             >
               <Share2 className="w-3 h-3" />
               Share
             </button>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-hidden relative">
          {children}
        </main>
      </div>
    </div>
  );
};