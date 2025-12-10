export interface PromptState {
  userInput: string;
  generatedPrompt: string;
  isLoading: boolean;
  error: string | null;
}

export enum PromptMode {
  STRUCTURED = 'STRUCTURED', // Standard breakdown
  CREATIVE = 'CREATIVE',     // More open-ended
  CODING = 'CODING',         // Code specific
}