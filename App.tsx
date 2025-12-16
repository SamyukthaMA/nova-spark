import React, { useState, useEffect } from 'react';
import { View } from './types';
import { Layout } from './components/Layout';
import { ChatInterface } from './components/ChatInterface';
import { Dashboard } from './components/Dashboard';
import { Portfolio } from './components/Portfolio';
import { TradeForecaster } from './components/TradeForecaster';
import { BeginnersGuide } from './components/BeginnersGuide';
import { IntroAnimation } from './components/IntroAnimation';
import { StockAnalyzer, OptionsInsight, Insights, Settings } from './components/Modules';

const App: React.FC = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [currentView, setCurrentView] = useState<View>(View.CHAT);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  // Handle Theme Change
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const renderContent = () => {
    switch (currentView) {
      case View.CHAT:
        return <ChatInterface />;
      case View.PORTFOLIO:
        return <Portfolio />;
      case View.MARKET_PULSE:
        return <Dashboard />;
      case View.TRADE_FORECASTER:
        return <TradeForecaster />;
      case View.STOCK_ANALYZER:
        return <StockAnalyzer />;
      case View.OPTIONS_INSIGHT:
        return <OptionsInsight />;
      case View.INSIGHTS:
        return <Insights />;
      case View.BEGINNERS_GUIDE:
        return <BeginnersGuide />;
      case View.SETTINGS:
        return <Settings theme={theme} toggleTheme={toggleTheme} />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <>
      {showIntro && <IntroAnimation onComplete={() => setShowIntro(false)} />}
      
      {!showIntro && (
        <div className="animate-fade-in h-full">
          <Layout 
            currentView={currentView} 
            setCurrentView={setCurrentView}
          >
            {renderContent()}
          </Layout>
        </div>
      )}
    </>
  );
};

export default App;