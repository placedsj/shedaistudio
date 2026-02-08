

import { GoogleGenAI, Type } from "@google/genai";
import { ImageSizeType, LLMConfigResponse, GenerateConfigResponse } from '../types';

export const generateConfigFromPrompt = async (prompt: string, currentSpec: any, options?: {
    useSearchGrounding?: boolean;
    useMapsGrounding?: boolean;
    deepThinking?: boolean;
}): Promise<GenerateConfigResponse> => {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const baseConfig: any = {
        systemInstruction: `You are LUNAI, a world-class architectural configurator for PLACED SHEDS. 
        
        CORE MISSION:
        1. Update the JSON config based on user desires.
        2. Provide "advice" - architectural reasoning.
        3. For non-config queries, provide helpful information.
        
        ARCHITECTURAL KNOWLEDGE:
        - High pitch (9-12) is best for Saint John (heavy snow).
        - "Shed Loo" requires a 10x16 minimum footprint for privacy.
        - "Modern Studio" styles look best with Slate or Midnight colors.
        
        Respond ONLY with JSON if it's a configuration update. For general questions, respond in markdown.`,
    };

    const modelToUse = options?.useMapsGrounding ? 'gemini-2.5-flash' : (options?.useSearchGrounding ? 'gemini-3-flash-preview' : 'gemini-3-pro-preview');

    const contents = `Current Config: ${JSON.stringify(currentSpec)}. User prompt: ${prompt}`;

    const config: any = {
        ...baseConfig,
        responseMimeType: options?.useMapsGrounding || options?.useSearchGrounding ? undefined : "application/json",
        responseSchema: options?.useMapsGrounding || options?.useSearchGrounding ? undefined : {
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
                electricalTier: { type: Type.STRING }, // Added electricalTier to schema
                explanation: { type: Type.STRING },
                advice: { type: Type.STRING }
            }
        },
    };

    if (options?.deepThinking && modelToUse === 'gemini-3-pro-preview') {
        config.thinkingConfig = { thinkingBudget: 32768 };
    }

    const tools = [];
    if (options?.useSearchGrounding) {
        tools.push({ googleSearch: {} });
    }
    if (options?.useMapsGrounding) {
        // Assume geolocation is obtained elsewhere and passed as a coordinate.
        // For this example, we'll hardcode a location if not provided.
        const position = await getCurrentGeolocation();
        if (position) {
             tools.push({ googleMaps: {} });
             config.toolConfig = {
                retrievalConfig: {
                    latLng: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    }
                }
            };
        } else {
            console.warn("Geolocation not available for Maps grounding.");
        }
    }
    if (tools.length > 0) {
        config.tools = tools;
    }

    const response = await ai.models.generateContent({
        model: modelToUse,
        contents,
        config
    });

    try {
        const text = response.text?.trim();
        const groundingUrls = response.candidates?.[0]?.groundingMetadata?.groundingChunks?.map((chunk: any) => ({
            uri: chunk.web?.uri || chunk.maps?.uri,
            title: chunk.web?.title || chunk.maps?.title,
        })).filter(url => url.uri);

        if (options?.useMapsGrounding || options?.useSearchGrounding) {
            return { text: text || '', groundingUrls }; // Return raw text and grounding URLs
        }

        // Attempt to parse JSON for config updates
        let jsonResponse: LLMConfigResponse | null = null;
        try {
            jsonResponse = JSON.parse(text) as LLMConfigResponse;
        } catch (jsonError) {
            // If it's not JSON, it might be a general text response
            return { text: text || '', groundingUrls };
        }
        return { ...jsonResponse, groundingUrls };

    } catch (e) {
        console.error("LUNAI Process Error", e);
        return { text: "Error processing your request.", groundingUrls: [] };
    }
};

export const generateImage = async (prompt: string, imageSize: ImageSizeType = '1K') => {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
        model: 'gemini-3-pro-image-preview',
        contents: { parts: [{ text: prompt }] },
        config: { imageConfig: { aspectRatio: '1:1', imageSize } },
    });
    for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
            return `data:image/png;base64,${part.inlineData.data}`;
        }
    }
    throw new Error("No image data found in response.");
};

export const editImage = async (base64Image: string, mimeType: string, prompt: string) => {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
            parts: [
                { inlineData: { data: base64Image.split(',')[1], mimeType } },
                { text: prompt },
            ],
        },
    });
    for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
            return `data:image/png;base64,${part.inlineData.data}`;
        }
    }
    throw new Error("No image data found in response for editing.");
};

export const generateVideo = async (base64Image: string | null, prompt: string, aspectRatio: '16:9' | '9:16') => {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const imagePart = base64Image ? { imageBytes: base64Image.split(',')[1], mimeType: 'image/png' } : undefined; // Assuming PNG for simplicity

    let operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: prompt || 'A short video based on the image.',
        image: imagePart,
        config: {
            numberOfVideos: 1,
            resolution: '720p',
            aspectRatio: aspectRatio,
        }
    });

    while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 10000));
        operation = await ai.operations.getVideosOperation({ operation: operation });
    }

    const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
    if (downloadLink) {
        // The API key is already managed by the GoogleGenAI instance for the download link.
        return `${downloadLink}&key=${process.env.API_KEY}`;
    }
    throw new Error("No video download link found.");
};

// Helper for Geolocation
async function getCurrentGeolocation(): Promise<GeolocationPosition | null> {
    return new Promise((resolve) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => resolve(position),
                (error) => {
                    console.error("Error getting geolocation:", error);
                    resolve(null);
                },
                { enableHighAccuracy: false, timeout: 5000, maximumAge: 0 }
            );
        } else {
            console.warn("Geolocation is not supported by this browser.");
            resolve(null);
        }
    });
}

// Utility to convert File to Base64
export const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = error => reject(error);
    });
};

// Utility to get MIME type from Base64 string
export const getMimeTypeFromBase64 = (base64String: string): string => {
    const match = base64String.match(/^data:(.*?);base64,/);
    return match ? match[1] : 'application/octet-stream';
};