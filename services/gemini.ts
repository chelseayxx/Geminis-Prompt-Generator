import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { PromptMode } from '../types';

const getSystemInstruction = (mode: PromptMode): string => {
  const baseInstruction = `You are an expert Prompt Engineer for Google's Gemini models.
  
  Your goal is to transform the user's simple request into a highly optimized, structured prompt that unlocks the full potential of Gemini.
  
  ### Instructions
  1. Analyze the User's Request.
  2. Create a comprehensive prompt using the structure below.
  3. Output ONLY the generated prompt content. Do not include markdown code blocks (like \`\`\`markdown) unless the prompt *content* itself requires code. Do not include intro/outro text.
  
  ### Target Structure
  **Role**: [Assign a specific expert persona]
  **Objective**: [Clear, action-oriented goal]
  **Context**: [Necessary background or constraints]
  **Steps**:
  1. [Step 1]
  2. [Step 2]
  ...
  **Format**: [Desired output format, e.g., Markdown, Table, JSON]
  `;

  if (mode === PromptMode.CODING) {
    return `${baseInstruction} 
    
    Since this is a CODING task:
    - Emphasize modern best practices, clean syntax, and error handling.
    - Request comments and documentation.
    - If applicable, ask for test cases.`;
  }
  
  if (mode === PromptMode.CREATIVE) {
    return `${baseInstruction}
    
    Since this is a CREATIVE task:
    - Encourage unique angles, vivid language, and high variability.
    - Allow for more expansive and less rigid output structures where appropriate.`;
  }
  
  return baseInstruction;
};

export const generateStructuredPrompt = async (userInput: string, mode: PromptMode = PromptMode.STRUCTURED): Promise<string> => {
  if (!userInput.trim()) return "";

  try {
    // Initialize the client per-request to ensure fresh environment context
    // Using process.env.API_KEY as strictly required
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `User Request: "${userInput}"\n\nPlease convert this into a ready-to-use, structured Gemini prompt.`,
      config: {
        systemInstruction: getSystemInstruction(mode),
        temperature: 0.7,
      },
    });

    return response.text || "Failed to generate prompt. Please try again.";
  } catch (error) {
    console.error("Error generating prompt:", error);
    // Return a user-friendly error string instead of throwing, so the UI can display it easily
    return "Error: Failed to connect to Gemini API. Please check your connection or API key.";
  }
};