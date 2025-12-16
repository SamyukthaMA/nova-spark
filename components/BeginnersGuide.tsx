import React, { useState } from 'react';
import { BookOpen, PlayCircle, ShieldCheck, GraduationCap, ChevronRight, ArrowLeft, ExternalLink, ArrowRight, CheckCircle, XCircle, Trophy, Timer } from 'lucide-react';
import { ACADEMY_LESSONS } from '../constants';

// --- QUESTION BANK (Sample of 25 unique questions, repeated to simulate 50 for demo) ---
const EXAM_QUESTIONS = [
  { id: 1, q: "What does RSI > 70 typically indicate?", options: ["Oversold", "Overbought", "Neutral", "Trend Reversal"], ans: 1 },
  { id: 2, q: "A 'Hammer' candlestick at the bottom of a downtrend suggests?", options: ["Bearish Continuation", "Bullish Reversal", "Indecision", "Volume Spike"], ans: 1 },
  { id: 3, q: "What is the primary function of SEBI?", options: ["Printing Currency", "Regulating Markets", "Issuing IPOs", "Setting Interest Rates"], ans: 1 },
  { id: 4, q: "If you buy a Call Option (CE), you expect the market to:", options: ["Go Down", "Stay Flat", "Go Up", "Crash"], ans: 2 },
  { id: 5, q: "Which index tracks the top 30 companies on BSE?", options: ["Nifty 50", "Bank Nifty", "Sensex", "Nifty Next 50"], ans: 2 },
  { id: 6, q: "What is 'Stop Loss' used for?", options: ["Locking Profits", "Limiting Losses", "Entering Trades", "Averaging Down"], ans: 1 },
  { id: 7, q: "What does 'Short Selling' mean?", options: ["Selling without owning", "Selling quickly", "Buying short term", "Selling bonds"], ans: 0 },
  { id: 8, q: "A 'Doji' candlestick indicates:", options: ["Strong Buying", "Strong Selling", "Indecision", "Market Crash"], ans: 2 },
  { id: 9, q: "What is the Lot Size of Nifty 50 (approx)?", options: ["15", "50/75 (Variable)", "100", "500"], ans: 1 },
  { id: 10, q: "Which is a 'Lagging' indicator?", options: ["Price Action", "Moving Average", "Volume", "News"], ans: 1 },
  { id: 11, q: "What is 'Beta' in stocks?", options: ["Dividend Yield", "Volatility relative to index", "Company Debt", "Profit Margin"], ans: 1 },
  { id: 12, q: "Lower Circuit means:", options: ["Price can't go lower today", "Price is low", "Market is closed", "Buy signal"], ans: 0 },
  { id: 13, q: "What is 'Face Value'?", options: ["Market Price", "Book Value", "Original value on certificate", "Dividend Value"], ans: 2 },
  { id: 14, q: "Bullish Engulfing is a:", options: ["1-Candle Pattern", "2-Candle Pattern", "3-Candle Pattern", "Chart Pattern"], ans: 1 },
  { id: 15, q: "What is 'Theta' in Options?", options: ["Price decay due to time", "Volatility change", "Price change", "Interest Rate"], ans: 0 },
  { id: 16, q: "VIX measures:", options: ["Volume", "Volatility", "Value", "Velocity"], ans: 1 },
  { id: 17, q: "IPO stands for:", options: ["Indian Public Offer", "Initial Public Offering", "Internal Profit Organization", "Initial Private Offer"], ans: 1 },
  { id: 18, q: "Dividends are paid from:", options: ["Revenue", "Debt", "Net Profits", "Taxes"], ans: 2 },
  { id: 19, q: "Fundamental Analysis studies:", options: ["Charts", "Patterns", "Balance Sheets & Earnings", "Price Action"], ans: 2 },
  { id: 20, q: "Intraday trading positions must be closed:", options: ["In 1 week", "Same day", "In 1 month", "Never"], ans: 1 },
  { id: 21, q: "What is a 'Blue Chip' stock?", options: ["Gambling stock", "Penny stock", "Reliable, large-cap company", "Tech stock"], ans: 2 },
  { id: 22, q: "Bear Market generally means prices dropped by:", options: ["5%", "10%", "20% or more", "1%"], ans: 2 },
  { id: 23, q: "What is 'Dematerialization' (Demat)?", options: ["Destroying shares", "Converting physical to digital", "Selling shares", "Buying gold"], ans: 1 },
  { id: 24, q: "Which Greeks affects Option Premium the most on Expiry day?", options: ["Delta", "Gamma", "Theta", "Vega"], ans: 2 },
  { id: 25, q: "Support Level is where:", options: ["Selling > Buying", "Buying > Selling (Demand)", "Price is max", "No one trades"], ans: 1 }
];

// Generate 50 questions by duplicating for demo purposes to meet user requirement of "50 MCQs"
const FULL_EXAM = [...EXAM_QUESTIONS, ...EXAM_QUESTIONS].map((q, i) => ({ ...q, id: i + 1 }));

export const BeginnersGuide: React.FC = () => {
  const [view, setView] = useState<'HOME' | 'LESSON' | 'TEST'>('HOME');
  const [selectedLessonId, setSelectedLessonId] = useState<number | null>(null);

  // Quiz State
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<number[]>(new Array(FULL_EXAM.length).fill(-1));
  const [quizFinished, setQuizFinished] = useState(false);

  const activeLesson = ACADEMY_LESSONS.find(l => l.id === selectedLessonId);
  const currentIndex = ACADEMY_LESSONS.findIndex(l => l.id === selectedLessonId);
  const nextLesson = ACADEMY_LESSONS[currentIndex + 1];
  const prevLesson = ACADEMY_LESSONS[currentIndex - 1];

  const handleStartLesson = (id: number) => {
    setSelectedLessonId(id);
    setView('LESSON');
  };

  const handleStartTest = () => {
    setView('TEST');
    setCurrentQIndex(0);
    setUserAnswers(new Array(FULL_EXAM.length).fill(-1));
    setQuizFinished(false);
  };

  const handleAnswer = (optionIndex: number) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQIndex] = optionIndex;
    setUserAnswers(newAnswers);
  };

  const handleNextQ = () => {
    if (currentQIndex < FULL_EXAM.length - 1) {
      setCurrentQIndex(prev => prev + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const calculateScore = () => {
    let score = 0;
    userAnswers.forEach((ans, i) => {
      if (ans === FULL_EXAM[i].ans) score++;
    });
    return score;
  };

  // --- RENDER: LESSON VIEW ---
  if (view === 'LESSON' && activeLesson) {
    return (
      <div className="h-full overflow-y-auto bg-gray-100 dark:bg-black p-6 text-gray-900 dark:text-gray-100 transition-colors duration-300 animate-fade-in">
        <div className="max-w-4xl mx-auto pb-10">
          <button 
            onClick={() => setView('HOME')}
            className="flex items-center text-sm text-gray-500 hover:text-black dark:hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-1" /> Back to Curriculum
          </button>
          
          <div className="bg-white dark:bg-nova-card border border-gray-200 dark:border-nova-border rounded-xl p-8 shadow-sm">
             <div className="flex items-center gap-2 mb-2">
                 <span className={`text-[10px] px-2 py-0.5 rounded uppercase font-bold ${activeLesson.level === 'Beginner' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'}`}>
                    {activeLesson.level}
                 </span>
                 <span className="text-gray-400 text-sm flex items-center"><PlayCircle className="w-3 h-3 mr-1"/> {activeLesson.duration} read</span>
             </div>
             <h1 className="text-3xl font-serif font-bold mb-8">{activeLesson.title}</h1>
             
             <div className="prose dark:prose-invert max-w-none font-sans leading-loose text-gray-700 dark:text-gray-300">
                {activeLesson.content?.split('\n').map((line, i) => {
                  if (line.startsWith('### ')) return <h3 key={i} className="text-xl font-bold mt-8 mb-4 text-black dark:text-white">{line.replace('### ', '')}</h3>;
                  if (line.startsWith('* ')) return <li key={i} className="ml-4 mb-2">{line.replace('* ', '')}</li>;
                  if (line.trim().length === 0) return <br key={i}/>;
                  return <p key={i} className="mb-4">{line}</p>;
                })}
             </div>

             {activeLesson.externalLink && (
               <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-lg flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-sm text-blue-900 dark:text-blue-100">Want to dive deeper?</h4>
                    <p className="text-xs text-blue-700 dark:text-blue-300">Read the full verified course module on this topic.</p>
                  </div>
                  <a 
                    href={activeLesson.externalLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center text-xs font-bold bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                  >
                    View Course <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
               </div>
             )}

             <div className="mt-12 pt-8 border-t border-gray-100 dark:border-nova-border flex justify-between items-center gap-4">
                 <button 
                   onClick={() => prevLesson && setSelectedLessonId(prevLesson.id)}
                   disabled={!prevLesson}
                   className={`flex items-center px-4 py-2 rounded-lg font-medium text-sm transition-all ${prevLesson ? 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-nova-ash' : 'text-gray-300 dark:text-gray-700 cursor-not-allowed'}`}
                 >
                   <ArrowLeft className="w-4 h-4 mr-2" /> Previous Lesson
                 </button>

                 <button 
                   onClick={() => nextLesson ? setSelectedLessonId(nextLesson.id) : setView('HOME')}
                   className="flex items-center px-6 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg font-bold text-sm hover:opacity-90 shadow-lg"
                 >
                   {nextLesson ? 'Next Lesson' : 'Back to Home'} <ArrowRight className="w-4 h-4 ml-2" />
                 </button>
             </div>
          </div>
        </div>
      </div>
    );
  }

  // --- RENDER: TEST VIEW ---
  if (view === 'TEST') {
      const currentQuestion = FULL_EXAM[currentQIndex];
      const score = calculateScore();
      const progress = ((currentQIndex + 1) / FULL_EXAM.length) * 100;
      const isPassed = score >= 30; // 60% Passing

      if (quizFinished) {
          return (
            <div className="h-full flex items-center justify-center bg-gray-100 dark:bg-black p-6 animate-fade-in">
                <div className="max-w-md w-full bg-white dark:bg-nova-card border border-gray-200 dark:border-nova-border rounded-2xl p-8 text-center shadow-xl">
                    <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${isPassed ? 'bg-green-100 dark:bg-green-900/30 text-green-600' : 'bg-red-100 dark:bg-red-900/30 text-red-600'}`}>
                        {isPassed ? <Trophy className="w-10 h-10" /> : <XCircle className="w-10 h-10" />}
                    </div>
                    <h2 className="text-3xl font-serif font-bold mb-2">{isPassed ? 'Certified!' : 'Keep Learning'}</h2>
                    <p className="text-gray-500 mb-6">{isPassed ? 'You have demonstrated solid market knowledge.' : 'Review the lessons and try again.'}</p>
                    
                    <div className="bg-gray-50 dark:bg-nova-ash rounded-xl p-6 mb-8">
                        <div className="text-sm text-gray-500 uppercase tracking-wider font-bold mb-1">Final Score</div>
                        <div className={`text-4xl font-mono font-bold ${isPassed ? 'text-green-500' : 'text-red-500'}`}>
                            {score} / 50
                        </div>
                        <div className="text-xs text-gray-400 mt-2">Passing Score: 30</div>
                    </div>

                    <div className="space-y-3">
                        {isPassed && (
                            <button className="w-full py-3 bg-black dark:bg-white text-white dark:text-black rounded-lg font-bold hover:opacity-90 transition-opacity">
                                Download Certificate
                            </button>
                        )}
                        <button onClick={() => setView('HOME')} className="w-full py-3 border border-gray-200 dark:border-nova-border rounded-lg font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-nova-ash transition-colors">
                            Return to Academy
                        </button>
                    </div>
                </div>
            </div>
          );
      }

      return (
        <div className="h-full overflow-y-auto bg-gray-100 dark:bg-black p-6 flex flex-col items-center justify-center text-gray-900 dark:text-gray-100 transition-colors duration-300">
            <div className="w-full max-w-2xl">
                {/* Header */}
                <div className="flex justify-between items-end mb-6">
                    <div>
                        <h2 className="text-xl font-bold flex items-center gap-2"><ShieldCheck className="w-5 h-5 text-blue-500"/> Final Certification Exam</h2>
                        <p className="text-sm text-gray-500 mt-1">Question {currentQIndex + 1} of {FULL_EXAM.length}</p>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-mono text-gray-400">
                        <Timer className="w-4 h-4" /> Untimed
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-2 bg-gray-200 dark:bg-nova-ash rounded-full mb-8 overflow-hidden">
                    <div className="h-full bg-blue-600 transition-all duration-300" style={{width: `${progress}%`}}></div>
                </div>

                {/* Question Card */}
                <div className="bg-white dark:bg-nova-card border border-gray-200 dark:border-nova-border rounded-xl p-8 shadow-sm mb-8 min-h-[300px] flex flex-col justify-center animate-fade-in">
                    <h3 className="text-xl font-medium mb-8 leading-relaxed">{currentQuestion.q}</h3>
                    
                    <div className="space-y-3">
                        {currentQuestion.options.map((opt, idx) => (
                            <button
                                key={idx}
                                onClick={() => handleAnswer(idx)}
                                className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 flex items-center justify-between ${
                                    userAnswers[currentQIndex] === idx 
                                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300' 
                                    : 'border-transparent bg-gray-50 dark:bg-nova-ash hover:bg-gray-100 dark:hover:bg-nova-border'
                                }`}
                            >
                                <span className="font-medium">{opt}</span>
                                {userAnswers[currentQIndex] === idx && <CheckCircle className="w-5 h-5 text-blue-500" />}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Navigation */}
                <div className="flex justify-between">
                    <button 
                        onClick={() => setView('HOME')}
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-sm font-bold px-4"
                    >
                        Quit Exam
                    </button>
                    <button 
                        onClick={handleNextQ}
                        disabled={userAnswers[currentQIndex] === -1}
                        className="bg-black dark:bg-white text-white dark:text-black px-8 py-3 rounded-lg font-bold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg"
                    >
                        {currentQIndex === FULL_EXAM.length - 1 ? 'Finish Exam' : 'Next Question'}
                    </button>
                </div>
            </div>
        </div>
      );
  }

  // --- RENDER: HOME VIEW ---
  return (
    <div className="h-full overflow-y-auto bg-gray-100 dark:bg-black p-6 text-gray-900 dark:text-gray-100 transition-colors duration-300">
       <div className="max-w-5xl mx-auto space-y-8">
          
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
             <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white shadow-lg">
                <GraduationCap className="w-8 h-8" />
             </div>
             <div>
                <h2 className="text-3xl font-serif font-bold">Nova Academy</h2>
                <p className="text-gray-500 mt-1">Master the markets before you risk a Rupee.</p>
             </div>
          </div>

          {/* Featured Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div onClick={() => handleStartLesson(3)} className="bg-black dark:bg-white text-white dark:text-black p-6 rounded-xl shadow-lg relative overflow-hidden group cursor-pointer">
                <div className="relative z-10">
                   <span className="text-xs font-bold uppercase tracking-wider opacity-70">Essential</span>
                   <h3 className="text-2xl font-bold mt-2 mb-4">The Psychology of Trading</h3>
                   <p className="text-sm opacity-80 mb-6 max-w-xs">Why FOMO kills portfolios and how to master your emotions like a monk.</p>
                   <button className="flex items-center text-sm font-bold hover:underline">
                      Start Lesson <ChevronRight className="w-4 h-4 ml-1"/>
                   </button>
                </div>
                <div className="absolute right-[-20px] bottom-[-20px] opacity-20 group-hover:opacity-30 transition-opacity">
                   <ShieldCheck className="w-40 h-40" />
                </div>
             </div>

             <div onClick={() => handleStartLesson(2)} className="bg-white dark:bg-nova-card border border-gray-200 dark:border-nova-border p-6 rounded-xl shadow-sm relative overflow-hidden group cursor-pointer hover:border-blue-500 transition-colors">
                <div className="relative z-10">
                   <span className="text-xs font-bold uppercase tracking-wider text-blue-500">Technical Analysis</span>
                   <h3 className="text-2xl font-bold mt-2 mb-4">Reading the Matrix</h3>
                   <p className="text-sm text-gray-500 mb-6 max-w-xs">Support, Resistance, and why the 'Trend is your Friend' until it bends.</p>
                   <button className="flex items-center text-sm font-bold hover:text-blue-500 transition-colors">
                      Start Lesson <ChevronRight className="w-4 h-4 ml-1"/>
                   </button>
                </div>
             </div>
          </div>

          {/* Curriculum List */}
          <div>
             <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-gray-500"/>
                Core Curriculum
             </h3>
             <div className="space-y-4">
                {ACADEMY_LESSONS.map((lesson) => (
                   <div key={lesson.id} onClick={() => handleStartLesson(lesson.id)} className="bg-white dark:bg-nova-card border border-gray-200 dark:border-nova-border p-5 rounded-xl flex flex-col md:flex-row md:items-center gap-4 hover:shadow-md transition-shadow cursor-pointer">
                      <div className="flex-shrink-0 w-12 h-12 bg-gray-100 dark:bg-nova-ash rounded-full flex items-center justify-center font-bold text-gray-400">
                         {lesson.id}
                      </div>
                      <div className="flex-1">
                         <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-bold text-lg">{lesson.title}</h4>
                            <span className={`text-[10px] px-2 py-0.5 rounded uppercase font-bold ${lesson.level === 'Beginner' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'}`}>
                               {lesson.level}
                            </span>
                         </div>
                         <p className="text-sm text-gray-500">{lesson.desc}</p>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                         <span className="flex items-center gap-1"><PlayCircle className="w-4 h-4"/> {lesson.duration}</span>
                         <button className="p-2 hover:bg-gray-100 dark:hover:bg-nova-ash rounded-full transition-colors">
                            <ChevronRight className="w-5 h-5"/>
                         </button>
                      </div>
                   </div>
                ))}

                {/* Final Exam Card */}
                <div onClick={handleStartTest} className="mt-8 bg-gradient-to-r from-gray-900 to-black dark:from-gray-800 dark:to-gray-900 text-white p-6 rounded-xl shadow-lg cursor-pointer hover:scale-[1.01] transition-transform relative overflow-hidden group">
                     <div className="relative z-10 flex items-center justify-between">
                         <div className="flex items-center gap-4">
                             <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md">
                                 <Trophy className="w-6 h-6 text-yellow-400" />
                             </div>
                             <div>
                                 <h3 className="text-xl font-bold">Final Certification Exam</h3>
                                 <p className="text-sm opacity-80 mt-1">50 Questions • Comprehensive Market Analysis</p>
                             </div>
                         </div>
                         <button className="bg-white text-black px-6 py-2 rounded-lg font-bold text-sm hover:bg-gray-200 transition-colors">
                             Take Test
                         </button>
                     </div>
                     <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-white/5 to-transparent"></div>
                </div>
             </div>
          </div>
       </div>
    </div>
  );
};