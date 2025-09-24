import React from 'react';
import { WandIcon, MapPinIcon, ReferenceCharacterIcon } from './icons';

type AspectRatio = '1:1' | '16:9' | '9:16' | '4:3' | '3:4';

interface ImageGeneratorProps {
    prompt: string;
    setPrompt: (prompt: string) => void;
    onGenerate: () => void;
    isLoading: boolean;
    isAuthenticated: boolean;
    onRequestAuth: () => void;
    translations: {
        title: string;
        placeholder: string;
        characterCount: string;
        referenceCharacter: string;
        model: string;
        quantity: string;
        buttonText: string;
        buttonLoadingText: string;
    };
    numberOfImages: number;
    setNumberOfImages: (n: number) => void;
    aspectRatio: AspectRatio;
    setAspectRatio: (ratio: AspectRatio) => void;
}

const ImageGenerator: React.FC<ImageGeneratorProps> = ({ 
    prompt, 
    setPrompt, 
    onGenerate, 
    isLoading,
    isAuthenticated,
    onRequestAuth,
    translations: t,
    numberOfImages,
    setNumberOfImages,
    aspectRatio,
    setAspectRatio,
}) => {

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isLoading || !prompt.trim()) return;

        if (isAuthenticated) {
            onGenerate();
        } else {
            onRequestAuth();
        }
    };

    const NumberStepper: React.FC = () => {
        const increment = () => setNumberOfImages(Math.min(10, numberOfImages + 1));
        const decrement = () => setNumberOfImages(Math.max(1, numberOfImages - 1));

        return (
            <div className="flex items-center space-x-2 text-white">
                <span className="text-sm">{numberOfImages}</span>
                <div className="flex flex-col">
                    <button onClick={increment} disabled={isLoading} className="h-4 w-4 flex items-center justify-center text-zinc-400 hover:text-white disabled:opacity-50">&#9650;</button>
                    <button onClick={decrement} disabled={isLoading} className="h-4 w-4 flex items-center justify-center text-zinc-400 hover:text-white disabled:opacity-50">&#9660;</button>
                </div>
            </div>
        );
    };

    return (
        <form onSubmit={handleFormSubmit} className="flex flex-col h-full space-y-4 text-zinc-300">
            <h1 className="text-lg font-semibold text-white">{t.title}</h1>

            <div className="flex-grow flex flex-col bg-[#212121] border border-zinc-700 rounded-lg p-3">
                <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder={t.placeholder}
                    className="w-full flex-grow bg-transparent text-zinc-300 placeholder-zinc-500 border-none focus:outline-none focus:ring-0 resize-none text-sm"
                    disabled={isLoading}
                    maxLength={1250}
                />
                <div className="flex justify-between items-center text-xs text-zinc-500 mt-1 flex-shrink-0">
                    <span>{t.characterCount.replace('{count}', String(prompt.length))}</span>
                    <div className="flex items-center space-x-2">
                        <MapPinIcon className="cursor-pointer hover:text-white"/>
                        <WandIcon className="cursor-pointer hover:text-white"/>
                    </div>
                </div>
            </div>

            <div className="p-3 bg-[#212121] border border-zinc-700 rounded-lg flex items-center space-x-3 cursor-pointer hover:bg-zinc-800/50 transition-colors">
                 <div className="w-10 h-10 border-2 border-dashed border-zinc-600 rounded flex items-center justify-center">
                    <ReferenceCharacterIcon className="w-6 h-6 text-zinc-500"/>
                 </div>
                 <span className="text-sm">{t.referenceCharacter}</span>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
                <select disabled={isLoading} className="w-full text-sm bg-[#212121] border border-zinc-700 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-500">
                    <option>{t.model}</option>
                </select>
                <select value={aspectRatio} onChange={(e) => setAspectRatio(e.target.value as AspectRatio)} disabled={isLoading} className="w-full text-sm bg-[#212121] border border-zinc-700 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-500">
                    <option value="16:9">16:9</option>
                    <option value="9:16">9:16</option>
                    <option value="1:1">1:1</option>
                    <option value="4:3">4:3</option>
                    <option value="3:4">3:4</option>
                </select>
            </div>


            <div className="mt-auto flex items-center justify-between bg-[#212121] border border-zinc-700 p-2 rounded-lg">
                <div className="flex items-center space-x-4 pl-2">
                   <span className="text-sm">{t.quantity}</span>
                   <NumberStepper />
                </div>
                <button
                    type="submit"
                    disabled={isLoading || !prompt.trim()}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-2.5 rounded-lg font-semibold hover:opacity-90 transition-opacity duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 min-w-[140px]"
                >
                     {isLoading ? (
                        <>
                            <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <span>{t.buttonLoadingText}</span>
                        </>
                    ) : (
                        <span>{t.buttonText}</span>
                    )}
                </button>
            </div>
        </form>
    );
};

export default ImageGenerator;