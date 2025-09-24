import React from 'react';
import { SparkleIcon, ImagePlusIcon } from './icons';

interface HeroProps {
    prompt: string;
    setPrompt: (prompt: string) => void;
    onGenerate: () => void;
    isLoading: boolean;
    isAuthenticated: boolean;
    onRequestAuth: () => void;
    onImageUpload: (file: File) => void;
    imagePreviewUrl: string | null;
    onRemoveImage: () => void;
    titleStart: string;
    titleGradient: string;
    placeholder: string;
    buttonText: string;
    buttonLoadingText: string;
    buttonTextAuthRequired: string;
    imageUploadTooltip: string;
}

const Hero: React.FC<HeroProps> = ({
    prompt,
    setPrompt,
    onGenerate,
    isLoading,
    isAuthenticated,
    onRequestAuth,
    onImageUpload,
    imagePreviewUrl,
    onRemoveImage,
    titleStart,
    titleGradient,
    placeholder,
    buttonText,
    buttonLoadingText,
    buttonTextAuthRequired,
    imageUploadTooltip
}) => {

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isLoading || (!prompt.trim() && !imagePreviewUrl)) return;
        if (isAuthenticated) {
            onGenerate();
        } else {
            onRequestAuth();
        }
    };

    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const handleImageIconClick = () => {
        fileInputRef.current?.click();
    };
    
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            onImageUpload(file);
        }
        // Reset file input to allow uploading the same file again
        if (event.target) {
            event.target.value = '';
        }
    };

    return (
        <div className="flex-grow flex items-center justify-center p-4">
            <div className="w-full max-w-3xl">
                <h1 className="text-4xl md:text-6xl font-bold text-center text-white mb-10">
                    {titleStart}{' '}
                    <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
                        {titleGradient}
                    </span>
                </h1>

                <form
                    onSubmit={handleFormSubmit}
                    className="relative bg-zinc-800/50 rounded-2xl p-4 shadow-2xl border border-zinc-700/80"
                >
                    <textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder={placeholder}
                        className="w-full h-32 bg-transparent text-zinc-200 placeholder-zinc-500 border-none focus:outline-none focus:ring-0 resize-none text-lg p-2"
                        disabled={isLoading}
                    />

                    {imagePreviewUrl && (
                        <div className="relative inline-block m-2">
                            <img src={imagePreviewUrl} alt="Image preview" className="h-20 w-20 rounded-md object-cover" />
                            <button
                                type="button"
                                onClick={onRemoveImage}
                                className="absolute -top-2 -right-2 bg-zinc-900 text-white rounded-full p-0.5 w-6 h-6 flex items-center justify-center leading-none text-sm hover:bg-red-600 transition-colors"
                                aria-label="Remove image"
                            >
                                &#x2715;
                            </button>
                        </div>
                    )}

                    <div className="flex justify-between items-center mt-2">
                        <div className="flex items-center space-x-2">
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                className="hidden"
                                accept="image/png, image/jpeg, image/webp"
                                disabled={isLoading}
                            />
                            <button
                                type="button"
                                onClick={handleImageIconClick}
                                title={imageUploadTooltip}
                                disabled={isLoading}
                                className="p-2 text-zinc-400 hover:text-white rounded-md transition-colors disabled:opacity-50"
                                aria-label={imageUploadTooltip}
                            >
                                <ImagePlusIcon className="w-6 h-6" />
                            </button>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading || (isAuthenticated && !prompt.trim() && !imagePreviewUrl)}
                            className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-8 py-3 rounded-full font-semibold hover:opacity-90 transition-all duration-300 disabled:bg-zinc-700 disabled:text-zinc-400 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shrink-0 shadow-lg shadow-purple-500/10"
                        >
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <span>{buttonLoadingText}</span>
                                </>
                            ) : (
                                <>
                                    <SparkleIcon className="w-5 h-5" />
                                    <span>
                                        {isAuthenticated ? buttonText : buttonTextAuthRequired}
                                    </span>
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Hero;