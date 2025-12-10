import React, { useState } from 'react';
import { InputPanel } from './components/InputPanel';
import { OutputPanel } from './components/OutputPanel';
import { generateStructuredPrompt } from './services/gemini';
import { PromptState, PromptMode } from './types';
import { SparkleIcon } from './components/SparkleIcon';

export default function App() {
  const [state, setState] = useState<PromptState>({
    userInput: '',
    generatedPrompt: '',
    isLoading: false,
    error: null,
  });

  const [mode, setMode] = useState<PromptMode>(PromptMode.STRUCTURED);

  const handleInputChange = (val: string) => {
    setState(prev => ({ ...prev, userInput: val }));
  };

  const handleGenerate = async () => {
    if (!state.userInput.trim()) return;

    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const result = await generateStructuredPrompt(state.userInput, mode);
      setState(prev => ({ 
        ...prev, 
        generatedPrompt: result, 
        isLoading: false 
      }));
    } catch (err) {
      setState(prev => ({ 
        ...prev, 
        error: "Failed to generate prompt. Please check your connection and try again.", 
        isLoading: false 
      }));
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F4F9] flex flex-col font-sans text-gray-900">
      {/* Header */}
      <header className="px-6 py-4 flex items-center justify-between bg-white/50 backdrop-blur-sm sticky top-0 z-10 border-b border-gray-200/50">
        <div className="flex items-center gap-2">
           <div className="bg-gradient-to-tr from-blue-500 to-purple-500 p-1.5 rounded-lg text-white">
             <SparkleIcon className="w-5 h-5" />
           </div>
           <h1 className="text-lg font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-purple-600">
             Gemini Prompt Architect
           </h1>
        </div>
        <div className="text-xs font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full border border-gray-200">
          Powered by Gemini 2.5 Flash
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-[1600px] mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-8rem)]">
          {/* Left Column: Input */}
          <div className="h-full">
            <InputPanel 
              value={state.userInput}
              onChange={handleInputChange}
              onGenerate={handleGenerate}
              isLoading={state.isLoading}
              mode={mode}
              setMode={setMode}
            />
          </div>

          {/* Right Column: Output */}
          <div className="h-full">
            <OutputPanel 
              content={state.generatedPrompt}
              isLoading={state.isLoading}
              error={state.error}
            />
          </div>
        </div>
      </main>
    </div>
  );
}