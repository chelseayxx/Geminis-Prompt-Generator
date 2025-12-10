import React, { useState } from 'react';
import { SparkleIcon } from './SparkleIcon';
import { PromptMode } from '../types';

interface InputPanelProps {
  value: string;
  onChange: (val: string) => void;
  onGenerate: () => void;
  isLoading: boolean;
  mode: PromptMode;
  setMode: (mode: PromptMode) => void;
}

export const InputPanel: React.FC<InputPanelProps> = ({ 
  value, 
  onChange, 
  onGenerate, 
  isLoading,
  mode,
  setMode
}) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      onGenerate();
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden relative">
      <div className="p-6 pb-2">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          <span className="text-blue-600">Input</span>
          <span className="text-gray-400 font-normal text-sm">Describe your goal</span>
        </h2>
      </div>

      <div className="px-6 flex gap-2 mb-4">
        {Object.values(PromptMode).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
              mode === m 
                ? 'bg-blue-100 text-blue-700' 
                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
            }`}
          >
            {m.charAt(0) + m.slice(1).toLowerCase()}
          </button>
        ))}
      </div>
      
      <div className="flex-1 px-6 pb-20 relative">
        <textarea
          className="w-full h-full resize-none outline-none text-gray-700 text-lg leading-relaxed placeholder-gray-300"
          placeholder="e.g., I want to write a python script to scrape stock prices..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
        />
        
        <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
          <span className="text-xs text-gray-400">
            {value.length} characters
          </span>
          <button
            onClick={onGenerate}
            disabled={!value.trim() || isLoading}
            className={`
              group flex items-center gap-2 px-6 py-3 rounded-full font-medium shadow-md transition-all duration-300
              ${!value.trim() || isLoading 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-lg hover:scale-105 active:scale-95'
              }
            `}
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Thinking...</span>
              </>
            ) : (
              <>
                <SparkleIcon className="w-5 h-5 transition-transform group-hover:rotate-12" />
                <span>Structure Prompt</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};