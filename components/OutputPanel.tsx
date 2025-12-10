import React, { useState, useEffect } from 'react';
import { SparkleIcon } from './SparkleIcon';

interface OutputPanelProps {
  content: string;
  isLoading: boolean;
  error: string | null;
}

export const OutputPanel: React.FC<OutputPanelProps> = ({ content, isLoading, error }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  const handleCopy = async () => {
    if (!content) return;
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  if (error) {
    return (
      <div className="h-full flex items-center justify-center p-6 bg-red-50 rounded-2xl border border-red-100 text-red-600">
        <div className="text-center">
          <p className="font-semibold mb-2">Something went wrong</p>
          <p className="text-sm opacity-80">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden relative group">
       <div className="p-6 pb-2 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
            Optimized Prompt
          </span>
        </h2>
        {content && (
          <button
            onClick={handleCopy}
            className={`
              flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all
              ${copied 
                ? 'bg-green-100 text-green-700' 
                : 'bg-gray-100 text-gray-600 hover:bg-blue-50 hover:text-blue-600'
              }
            `}
          >
            {copied ? (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Copied
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Copy
              </>
            )}
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-6 pt-2">
        {isLoading ? (
          <div className="space-y-4 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-32 bg-gray-100 rounded-lg w-full mt-6"></div>
            <div className="space-y-2 mt-4">
               <div className="h-3 bg-gray-200 rounded w-full"></div>
               <div className="h-3 bg-gray-200 rounded w-full"></div>
               <div className="h-3 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        ) : content ? (
          <div className="prose prose-sm md:prose-base max-w-none text-gray-700">
            <pre className="whitespace-pre-wrap font-sans bg-transparent p-0 border-0 text-gray-800 leading-relaxed">
              {content}
            </pre>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-gray-400 opacity-60">
            <SparkleIcon className="w-12 h-12 mb-4 text-gray-300" />
            <p>Your structured prompt will appear here.</p>
          </div>
        )}
      </div>
      
      {/* Decorative gradient blur at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </div>
  );
};