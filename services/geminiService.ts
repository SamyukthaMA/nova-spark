import { GoogleGenAI, Chat, GenerativeModel } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";

let ai: GoogleGenAI | null = null;
let model: GenerativeModel | null = null;
let chatSession: Chat | null = null;

// Initialize the API client (Vite-safe)
const initializeAI = () => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (!apiKey) {
    console.error(
      "VITE_GEMINI_API_KEY is missing. Check your .env.local file."
    );
    return null;
  }

  if (!ai) {
    ai = new GoogleGenAI({ apiKey });
  }

  return ai;
};

// Get or create the chat session
const getChatSession = async () => {
  const aiInstance = initializeAI();
  if (!aiInstance) {
    throw new Error("AI not initialized. Gemini API key missing.");
  }

  if (!chatSession) {
    chatSession = aiInstance.chats.create({
      model: "gemini-2.5-flash",
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.2, // Low temperature for analytical fintech responses
      },
    });
  }

  return chatSession;
};

// Stream chat messages
export const sendMessageStream = async (message: string) => {
  try {
    const chat = await getChatSession();
    return await chat.sendMessageStream({ message });
  } catch (error) {
    console.error("Error sending message to Gemini:", error);
    throw error;
  }
};

// One-shot generation for forecasting tools
export const generateForecast = async (
  symbol: string,
  timeframe: string
) => {
  const aiInstance = initializeAI();
  if (!aiInstance) {
    throw new Error("AI not initialized. Gemini API key missing.");
  }

  const prompt = `
Analyze the stock ${symbol} for the ${timeframe} timeframe.

Follow the Nova Spark mandatory forecast structure:
- Market Context
- Technical Indicators
- ML Signal Summary
- Risk Assessment
- Disclaimer

Use careful, probabilistic language.
`;

  try {
    const response = await aiInstance.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.2,
      },
    });

    return response.text;
  } catch (error) {
    console.error("Error generating forecast:", error);
    throw error;
  }
};
