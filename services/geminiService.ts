import { GoogleGenAI } from "@google/genai";

const generateAudioDescriptionFromPrompt = async (prompt: string, ai: GoogleGenAI): Promise<string> => {
    try {
        console.log("Generating audio description for prompt:", prompt);
        const systemInstruction = "You are an expert sound designer. Based on the following video description, create a short, evocative audio script that describes the sounds and ambiance. The script should be suitable for a text-to-speech engine to read aloud. Do not add any prefixes like 'Audio script:' or formatting. Just provide the descriptive text.";
        
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Video description: "${prompt}"`,
            config: {
                systemInstruction: systemInstruction,
            }
        });

        const description = response.text;
        console.log("Generated audio description:", description);
        return description.trim();
    } catch (error) {
        console.error("Failed to generate audio description:", error);
        // Return a fallback description in case of an error
        return `A scene depicting: ${prompt}`;
    }
};

export const generateVideoFromPrompt = async (
    prompt: string, 
    image: { data: string; mimeType: string; } | null
): Promise<{ videoUrl: string; audioDescription: string; }> => {
    if (!process.env.API_KEY) {
        throw new Error("API_KEY environment variable not set. Please add your key.");
    }

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    // Note: The VEO API via the SDK does not currently expose settings for resolution or FPS.
    // The configuration is limited to `numberOfVideos`.
    const videoParams: {
        model: string;
        prompt: string;
        config: { numberOfVideos: number };
        image?: { imageBytes: string; mimeType: string; };
    } = {
        model: 'veo-2.0-generate-001',
        prompt: prompt,
        config: {
            numberOfVideos: 1,
        },
    };

    if (image) {
        videoParams.image = {
            imageBytes: image.data,
            mimeType: image.mimeType
        };
    }


    // Generate video operation and audio description in parallel for efficiency
    const [videoOperationPromise, audioDescriptionPromise] = [
        ai.models.generateVideos(videoParams),
        generateAudioDescriptionFromPrompt(prompt, ai)
    ];

    console.log("Starting video generation process for prompt:", prompt);
    let operation = await videoOperationPromise;
    console.log("Operation started:", operation);

    while (!operation.done) {
        console.log("Operation not done yet, waiting 10 seconds...");
        await new Promise(resolve => setTimeout(resolve, 10000));
        operation = await ai.operations.getVideosOperation({ operation: operation });
        console.log("Current operation status:", operation);
    }
    
    console.log("Operation finished:", operation);

    if (operation.error) {
        throw new Error(`Video generation failed: ${operation.error.message}`);
    }

    const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;

    if (!downloadLink) {
        throw new Error("Video generation succeeded, but no download link was found.");
    }

    console.log("Fetching video from download link:", downloadLink);
    const videoResponse = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
    
    if (!videoResponse.ok) {
        throw new Error(`Failed to download the generated video. Status: ${videoResponse.statusText}`);
    }

    const videoBlob = await videoResponse.blob();
    const videoUrl = URL.createObjectURL(videoBlob);
    
    console.log("Video downloaded and blob URL created:", videoUrl);

    const audioDescription = await audioDescriptionPromise;

    return { videoUrl, audioDescription };
};

export const generateImagesFromPrompt = async (
    prompt: string,
    numberOfImages: number,
    aspectRatio: '1:1' | '16:9' | '9:16' | '4:3' | '3:4'
): Promise<string[]> => {
    if (!process.env.API_KEY) {
        throw new Error("API_KEY environment variable not set. Please add your key.");
    }
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    console.log("Generating images with settings:", { prompt, numberOfImages, aspectRatio });
    
    const response = await ai.models.generateImages({
        model: 'imagen-4.0-generate-001',
        prompt: prompt,
        config: {
            numberOfImages: numberOfImages,
            outputMimeType: 'image/png',
            aspectRatio: aspectRatio,
        },
    });

    console.log("Image generation response received:", response);

    if (!response.generatedImages || response.generatedImages.length === 0) {
        throw new Error("Image generation succeeded, but no images were returned.");
    }
    
    return response.generatedImages.map(img => img.image.imageBytes);
};