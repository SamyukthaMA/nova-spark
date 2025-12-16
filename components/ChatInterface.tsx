import React, { useState, useRef, useEffect } from 'react';
import { Message } from '../types';
import { sendMessageStream } from '../services/geminiService';
import { Send, Mic, Paperclip, Copy, StopCircle } from 'lucide-react';

export const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'model',
      content: "System Online. I am Nova Spark—Bot Sauce at your service. Ready to crunch some numbers or are we just watching the charts bleed today?",
      timestamp: Date.now()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const responseStream = await sendMessageStream(userMsg.content);
      
      const aiMsgId = (Date.now() + 1).toString();
      setMessages(prev => [...prev, {
        id: aiMsgId,
        role: 'model',
        content: '',
        timestamp: Date.now(),
        isStreaming: true
      }]);

      let fullText = '';
      
      for await (const chunk of responseStream) {
        const text = chunk.text;
        if (text) {
          fullText += text;
          setMessages(prev => prev.map(msg => 
            msg.id === aiMsgId ? { ...msg, content: fullText } : msg
          ));
        }
      }
      
      setMessages(prev => prev.map(msg => 
        msg.id === aiMsgId ? { ...msg, isStreaming: false } : msg
      ));

    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, {
        id: (Date.now() + 2).toString(),
        role: 'model',
        content: "API Hiccup. My neural pathways are a bit congested. Try asking me that again in a second.",
        timestamp: Date.now()
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-black transition-colors duration-300">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`relative max-w-[85%] md:max-w-[70%] rounded-xl p-5 shadow-sm ${
                msg.role === 'user'
                  ? 'bg-black text-white dark:bg-white dark:text-black'
                  : 'bg-gray-100 dark:bg-nova-card text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-nova-border'
              }`}
            >
              {/* AI Header */}
              {msg.role === 'model' && (
                <div className="flex items-center justify-between mb-2 pb-2 border-b border-gray-200 dark:border-nova-border/50">
                  <div className="flex items-center space-x-2">
                     <div className="w-2 h-2 rounded-full bg-black dark:bg-white animate-pulse"></div>
                     <span className="text-xs font-bold tracking-wider text-black dark:text-white">NOVA SPARK</span>
                  </div>
                  <div className="flex space-x-2">
                    <button onClick={() => copyToClipboard(msg.content)} className="text-gray-400 hover:text-black dark:hover:text-white transition-colors" title="Copy">
                      <Copy className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              )}

              {/* Content */}
              <div className="prose dark:prose-invert prose-sm max-w-none font-sans leading-relaxed whitespace-pre-wrap">
                {msg.content}
                {msg.isStreaming && <span className="inline-block w-1.5 h-4 ml-1 bg-black dark:bg-white animate-pulse align-middle"></span>}
              </div>
            </div>
          </div>
        ))}
        {isTyping && !messages.find(m => m.isStreaming) && (
           <div className="flex justify-start">
             <div className="bg-gray-100 dark:bg-nova-card rounded-xl p-4 border border-gray-200 dark:border-nova-border flex items-center space-x-2">
               <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce"></div>
               <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce delay-75"></div>
               <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce delay-150"></div>
             </div>
           </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area - Compacted */}
      <div className="p-3 bg-gray-50 dark:bg-nova-ash border-t border-gray-200 dark:border-nova-border transition-colors duration-300">
        <div className="max-w-4xl mx-auto relative">
          <div className="flex items-center gap-2 bg-white dark:bg-nova-card p-1.5 rounded-lg border border-gray-200 dark:border-nova-border focus-within:border-gray-400 dark:focus-within:border-gray-500 transition-colors shadow-sm">
            
            {/* Upload Button */}
            <button className="p-2 text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-nova-border rounded-lg transition-colors">
              <Paperclip className="w-4 h-4" />
            </button>

            {/* Text Area - Reduced Height */}
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask Bot Sauce..."
              className="flex-1 bg-transparent border-0 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:ring-0 resize-none py-2 text-sm"
              rows={1}
              style={{ minHeight: '36px', maxHeight: '80px' }}
            />

            {/* Mic & Send */}
            <div className="flex items-center gap-1">
              <button 
                className={`p-2 rounded-lg transition-colors ${isListening ? 'text-red-500 bg-red-50' : 'text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-nova-border'}`}
                onClick={() => setIsListening(!isListening)}
              >
                <Mic className="w-4 h-4" />
              </button>
              
              <button
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className={`p-2 rounded-lg transition-all ${
                  input.trim() && !isTyping
                    ? 'bg-black dark:bg-white text-white dark:text-black shadow-md hover:scale-105'
                    : 'bg-gray-200 dark:bg-nova-border text-gray-400 cursor-not-allowed'
                }`}
              >
                {isTyping ? <StopCircle className="w-4 h-4 animate-pulse" /> : <Send className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};