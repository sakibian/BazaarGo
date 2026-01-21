
import { GoogleGenAI, Modality, Type } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

export interface ChatMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}

export const chatWithGemini = async (message: string, history: ChatMessage[] = []) => {
  const ai = getAI();
  const chat = ai.chats.create({
    model: 'gemini-3-pro-preview',
    config: {
      systemInstruction: 'You are BazaarGo Assistant, a helpful shopping guide for a premium e-commerce platform in Bangladesh. Help users find products, explain features, and discuss gadgets. Use a friendly, professional tone. If asked about shipping, mention we deliver across Bangladesh in 24-48 hours.',
    },
    history: history,
  });
  
  const response = await chat.sendMessage({ message });
  return response.text;
};

export const getProductInsight = async (productName: string) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Provide a quick expert insight for the product: ${productName}. Mention its current trendiness and a pros/cons summary for a tech-savvy buyer in Bangladesh. Keep it concise.`,
    config: {
      tools: [{ googleSearch: {} }],
    },
  });
  
  return {
    text: response.text,
    sources: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
  };
};

export const findNearbyPickups = async (lat: number, lng: number) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: `Find 3 real courier service points (like Sundarban, SA Paribahan, RedX) near these coordinates in Bangladesh for a package delivery.`,
    config: {
      tools: [{ googleMaps: {} }],
      toolConfig: {
        retrievalConfig: {
          latLng: {
            latitude: lat,
            longitude: lng
          }
        }
      }
    },
  });
  
  return {
    text: response.text,
    sources: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
  };
};
