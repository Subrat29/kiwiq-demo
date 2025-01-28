"use client";

import React from 'react';
import { ArrowRight, Send, Sparkles } from 'lucide-react';
import { Message } from '@/types';

interface ReportAssistantProps {
  messages: Message[];
  currentQuery: string;
  isStreaming: boolean;
  onQueryChange: (query: string) => void;
  onQuerySubmit: (query: string) => void;
}

export function ReportAssistant({
  messages,
  currentQuery,
  isStreaming,
  onQueryChange,
  onQuerySubmit
}: ReportAssistantProps) {
  const suggestedQuestions = [
    "What are the key findings?",
    "Show sentiment analysis",
    "Compare with past insights",
    "Identify trends"
  ];

  return (
    <div className="w-[400px] flex flex-col glass-panel">
      <div className="p-4 border-b border-neutral-700/50">
        <h2 className="font-semibold text-white flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-green-500" />
          Report Assistant
        </h2>
        <p className="text-sm text-neutral-400 mt-1">
          I can help you analyze this market report. What would you like to know?
        </p>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(message => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[80%] p-3 rounded-lg ${
              message.type === 'user'
                ? 'bg-green-500/10 text-green-500'
                : 'bg-neutral-700/50 text-neutral-200'
            }`}>
              <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              {message.streaming && (
                <span className="inline-block w-1.5 h-4 ml-1 bg-green-500 animate-pulse" />
              )}
            </div>
          </div>
        ))}
      </div>
      
      {messages.length === 0 && (
        <div className="p-4 border-t border-neutral-700/50">
          <p className="text-sm font-medium text-neutral-300 mb-2">Suggested questions:</p>
          <div className="space-y-2">
            {suggestedQuestions.map((question, index) => (
              <button
                key={index}
                className="w-full p-2 text-left text-sm text-neutral-400 hover:text-neutral-200 rounded-lg hover:bg-neutral-700/50 transition-colors flex items-center group"
                onClick={() => onQuerySubmit(question)}
              >
                {question}
                <ArrowRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ))}
          </div>
        </div>
      )}
      
      <div className="p-4 border-t border-neutral-700/50">
        <div className="relative">
          <input
            type="text"
            value={currentQuery}
            onChange={(e) => onQueryChange(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && onQuerySubmit(currentQuery)}
            placeholder="Ask a question about the report..."
            className="input-field pr-10"
          />
          <button
            onClick={() => onQuerySubmit(currentQuery)}
            disabled={!currentQuery.trim() || isStreaming}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-neutral-400 hover:text-green-500 disabled:opacity-50 disabled:hover:text-neutral-400"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}