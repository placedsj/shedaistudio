
import { GoogleGenAI, Type } from "@google/genai";

export const generateConfigFromPrompt = async (prompt: string, currentSpec: any) => {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const response = await ai.models.generateContent({
        model: "gemini-3-pro-preview",
        contents: `Current Config: ${JSON.stringify(currentSpec)}. User prompt: ${prompt}`,
        config: {
            systemInstruction: `You are LUNAI, a world-class architectural configurator for PLACED SHEDS. 
            
            CORE MISSION:
            1. Update the JSON config based on user desires.
            2. Provide "advice" - architectural reasoning.
            
            ARCHITECTURAL KNOWLEDGE:
            - High pitch (9-12) is best for Saint John (heavy snow).
            - "Shed Loo" requires a 10x16 minimum footprint for privacy.
            - "Modern Studio" styles look best with Slate or Midnight colors.
            
            Respond ONLY with JSON.`,
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    style: { type: Type.STRING },
                    weather: { type: Type.STRING },
                    width: { type: Type.NUMBER },
                    depth: { type: Type.NUMBER },
                    pitch: { type: Type.NUMBER },
                    wallColor: { type: Type.STRING },
                    addons: {
                        type: Type.OBJECT,
                        properties: {
                            ramp: { type: Type.BOOLEAN },
                            solar: { type: Type.BOOLEAN },
                            ac: { type: Type.BOOLEAN },
                            shedLoo: { type: Type.BOOLEAN }
                        }
                    },
                    explanation: { type: Type.STRING },
                    advice: { type: Type.STRING } // New: The "Architectural Advisor" block
                }
            }
        }
    });

    try {
        const text = response.text?.trim();
        if (!text) return null;
        return JSON.parse(text);
    } catch (e) {
        console.error("LUNAI JSON Parse Error", e);
        return null;
    }
};
