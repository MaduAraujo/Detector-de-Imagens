import { GoogleGenAI, GenerateContentResponse, Type } from "@google/genai";

// Ensure the API key is available in the environment variables
const apiKey = process.env.API_KEY;
if (!apiKey) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey });

export interface AnalysisData {
    isSensitive: boolean;
    description: string;
    identifiedObjects: string[];
    keyInsights: string[];
}

/**
 * Converts a File object to a base64 encoded string.
 * @param file The file to convert.
 * @returns A promise that resolves with the base64 string.
 */
const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            // result is a data URL (e.g., "data:image/jpeg;base64,..."), we only need the base64 part
            const result = reader.result as string;
            resolve(result.split(',')[1]);
        };
        reader.onerror = (error) => reject(error);
    });
};

/**
 * Analyzes an image using the Gemini API and requests a structured JSON output.
 * @param imageFile The image file to analyze.
 * @returns A promise that resolves with the structured analysis from the API.
 */
export const analyzeImage = async (imageFile: File): Promise<AnalysisData> => {
    try {
        const base64Image = await fileToBase64(imageFile);
        const imagePart = {
            inlineData: {
                mimeType: imageFile.type,
                data: base64Image,
            },
        };
        
        const textPart = {
            text: `Execute uma análise em duas etapas. Primeiro, atue como um moderador de conteúdo e determine se a imagem contém conteúdo sensível (violência explícita, sangue, ferimentos graves, cortes, automutilação). Responda com um campo booleano 'isSensitive'. 
Independentemente do resultado da primeira etapa, prossiga para a segunda etapa. Na segunda etapa, descreva detalhadamente tudo que você vê na imagem. Analise objetos, cores, emoções e o contexto geral. Forneça a resposta em um formato JSON estruturado com os seguintes campos: 'description' (uma descrição geral), 'identifiedObjects' (um array de strings listando objetos chave) e 'keyInsights' (um array de strings com percepções importantes).
Importante: toda a resposta, incluindo os valores dentro do JSON, deve ser em português do Brasil.`,
        };

        const response: GenerateContentResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: { parts: [imagePart, textPart] },
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        isSensitive: { type: Type.BOOLEAN },
                        description: { type: Type.STRING },
                        identifiedObjects: {
                            type: Type.ARRAY,
                            items: { type: Type.STRING }
                        },
                        keyInsights: {
                            type: Type.ARRAY,
                            items: { type: Type.STRING }
                        }
                    }
                }
            }
        });
        
        const jsonText = response.text.trim();
        return JSON.parse(jsonText) as AnalysisData;

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        if (error instanceof Error) {
            throw new Error(`Failed to analyze image: ${error.message}`);
        }
        throw new Error("An unknown error occurred during image analysis.");
    }
};