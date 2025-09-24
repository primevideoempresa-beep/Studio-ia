import React, { useState, useEffect, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import ImageGenerator from './components/ImageGenerator';
import LoadingIndicator from './components/LoadingIndicator';
import GalleryView from './components/GalleryView';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import AssetsView from './components/AssetsView';
import AdminView from './components/AdminView';
import Hero from './components/Hero';
import { generateVideoFromPrompt, generateImagesFromPrompt } from './services/geminiService';
import { LOADING_MESSAGES } from './constants';
import { translations } from './translations';
import { DownloadIcon, SpeakerOnIcon, SpeakerOffIcon, ImageIcon } from './components/icons';

export interface Asset {
  id: string;
  type: 'video' | 'image';
  prompt: string;
  data: string; // URL for video, base64 for image
  audioDescription?: string;
  createdAt: number;
}

export interface User {
    email: string;
    createdAt: number;
}

const ADMIN_EMAIL = 'admin@studioia.com';

const App: React.FC = () => {
    // App state
    const [language, setLanguage] = useState<string>('pt');
    const [activeView, setActiveView] = useState('home');
    const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
    const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
    const [currentUser, setCurrentUser] = useState<User | null>({email: 'p@example.com', createdAt: Date.now()});
    const [isAdmin, setIsAdmin] = useState<boolean>(false);

    // User management state
    const [allUsers, setAllUsers] = useState<User[]>([]);

    // Assets state
    const [allAssets, setAllAssets] = useState<Asset[]>([]);
    const [lastGeneratedVideo, setLastGeneratedVideo] = useState<Asset | null>(null);
    const [lastGeneratedImages, setLastGeneratedImages] = useState<Asset[]>([]);

    // Video state
    const [videoPrompt, setVideoPrompt] = useState<string>('');
    const [videoImage, setVideoImage] = useState<{ data: string; mimeType: string; previewUrl: string } | null>(null);
    const [isVidLoading, setIsVidLoading] = useState<boolean>(false);
    const [vidError, setVidError] = useState<string | null>(null);
    const [loadingMessage, setLoadingMessage] = useState<string>(LOADING_MESSAGES[0]);
    const [isNarrationPlaying, setIsNarrationPlaying] = useState<boolean>(false);

    // Image state
    const [imagePrompt, setImagePrompt] = useState('');
    const [numberOfImages, setNumberOfImages] = useState(4);
    const [aspectRatio, setAspectRatio] = useState<'1:1' | '16:9' | '9:16' | '4:3' | '3:4'>('16:9');
    const [isImgLoading, setIsImgLoading] = useState(false);
    const [imgError, setImgError] = useState<string | null>(null);


    const t = translations[language];
    const imageGeneratorTranslations = { ...t.imageCreation, ...t.imageGenerator };


    // Check for saved user session on initial load
    useEffect(() => {
        try {
            const savedUser = localStorage.getItem('studioIaCurrentUser');
            if (savedUser) {
                const user: User = JSON.parse(savedUser);
                setIsAuthenticated(true);
                setCurrentUser(user);
                setIsAdmin(user.email === ADMIN_EMAIL);
            } else {
                 // For demo purposes, log in a default user
                const demoUser = { email: 'p@example.com', createdAt: Date.now() };
                setIsAuthenticated(true);
                setCurrentUser(demoUser);
                localStorage.setItem('studioIaCurrentUser', JSON.stringify(demoUser));
            }
            const savedAllUsers = localStorage.getItem('studioIaUsers');
             if (savedAllUsers) {
                setAllUsers(JSON.parse(savedAllUsers));
            }
        } catch (error) {
            console.error("Failed to parse user from localStorage", error);
            localStorage.removeItem('studioIaCurrentUser');
        }
    }, []);

    useEffect(() => {
        let intervalId: number | undefined;
        if (isVidLoading) {
            let messageIndex = 0;
            setLoadingMessage(LOADING_MESSAGES[messageIndex]);
            intervalId = window.setInterval(() => {
                messageIndex = (messageIndex + 1) % LOADING_MESSAGES.length;
                setLoadingMessage(LOADING_MESSAGES[messageIndex]);
            }, 5000);
        }
        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [isVidLoading]);
    
    // Clean up all video blob URLs and speech synthesis on component unmount
    useEffect(() => {
        return () => {
            allAssets.forEach(asset => {
                if (asset.type === 'video') {
                    URL.revokeObjectURL(asset.data);
                }
            });
             if (videoImage) {
                URL.revokeObjectURL(videoImage.previewUrl);
            }
            if ('speechSynthesis' in window) {
                window.speechSynthesis.cancel();
            }
        }
    }, [allAssets, videoImage]);

    const handleVideoImageUpload = (file: File) => {
        if (!file.type.startsWith('image/')) {
            setVidError("Invalid file type. Please upload an image.");
            return;
        }
        if (videoImage) { // If there's an old image, revoke its URL
            URL.revokeObjectURL(videoImage.previewUrl);
        }
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = (reader.result as string).split(',')[1];
            setVideoImage({
                data: base64String,
                mimeType: file.type,
                previewUrl: URL.createObjectURL(file)
            });
        };
        reader.readAsDataURL(file);
    };

    const handleRemoveVideoImage = () => {
        if (videoImage) {
            URL.revokeObjectURL(videoImage.previewUrl);
            setVideoImage(null);
        }
    };

    const handleGenerateVideo = useCallback(async () => {
        if ((!videoPrompt.trim() && !videoImage) || isVidLoading) return;

        setIsVidLoading(true);
        setVidError(null);
        setLastGeneratedVideo(null);
        
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
        }
        setIsNarrationPlaying(false);

        console.log("Generating video for prompt:", videoPrompt);

        try {
            const result = await generateVideoFromPrompt(
                videoPrompt, 
                videoImage ? { data: videoImage.data, mimeType: videoImage.mimeType } : null
            );
            const newVideoAsset: Asset = {
                id: crypto.randomUUID(),
                type: 'video',
                prompt: videoPrompt,
                data: result.videoUrl,
                audioDescription: result.audioDescription,
                createdAt: Date.now()
            };
            setLastGeneratedVideo(newVideoAsset);
            setAllAssets(prevAssets => [newVideoAsset, ...prevAssets]);
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : "An unknown error occurred during video generation.";
            setVidError(`${t.error.prefix} ${errorMessage}`);
            console.error(err);
        } finally {
            setIsVidLoading(false);
        }
    }, [videoPrompt, isVidLoading, t, videoImage]);

     const handleGenerateImages = useCallback(async () => {
        if (!imagePrompt.trim() || isImgLoading) return;

        setIsImgLoading(true);
        setImgError(null);
        setLastGeneratedImages([]);

        try {
            const result = await generateImagesFromPrompt(imagePrompt, numberOfImages, aspectRatio);
             const newImageAssets: Asset[] = result.map(base64Data => ({
                id: crypto.randomUUID(),
                type: 'image',
                prompt: imagePrompt,
                data: base64Data,
                createdAt: Date.now()
            }));
            setLastGeneratedImages(newImageAssets);
            setAllAssets(prevAssets => [...newImageAssets, ...prevAssets]);
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : "An unknown error occurred during image generation.";
            setImgError(`${t.error.imagePrefix} ${errorMessage}`);
            console.error(err);
        } finally {
            setIsImgLoading(false);
        }
    }, [imagePrompt, isImgLoading, numberOfImages, aspectRatio, t]);

    const handleDownloadAsset = (asset: Asset) => {
        const link = document.createElement('a');
        const fileNameBase = (asset.prompt || `generated-${asset.type}`)
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .slice(0, 50);

        if (asset.type === 'video') {
            link.href = asset.data;
            link.setAttribute('download', `${fileNameBase}.mp4`);
        } else { // image
            link.href = `data:image/png;base64,${asset.data}`;
            link.download = `${fileNameBase}.png`;
        }
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleDeleteAsset = (assetId: string) => {
        const assetToDelete = allAssets.find(asset => asset.id === assetId);
        if (assetToDelete && assetToDelete.type === 'video') {
            URL.revokeObjectURL(assetToDelete.data);
        }
        setAllAssets(prev => prev.filter(asset => asset.id !== assetId));

        if(lastGeneratedVideo?.id === assetId) {
            setLastGeneratedVideo(null);
        }
        setLastGeneratedImages(prev => prev.filter(img => img.id !== assetId));
    };
    
    const handleToggleNarration = () => {
        if (!lastGeneratedVideo?.audioDescription || !('speechSynthesis' in window)) {
            return;
        }

        if (isNarrationPlaying) {
            window.speechSynthesis.cancel();
            setIsNarrationPlaying(false);
        } else {
            const utterance = new SpeechSynthesisUtterance(lastGeneratedVideo.audioDescription);
            utterance.lang = language.split('-')[0]; // Use base language for TTS
            utterance.onend = () => {
                setIsNarrationPlaying(false);
            };
            utterance.onerror = (event) => {
                console.error('SpeechSynthesisUtterance.onerror', event);
                setIsNarrationPlaying(false);
            };
            window.speechSynthesis.speak(utterance);
            setIsNarrationPlaying(true);
        }
    };

    const handleOpenAuthModal = (mode: 'login' | 'signup') => {
        setAuthMode(mode);
        setIsAuthModalOpen(true);
    };
    
    const handleAuthSuccess = (email: string, mode: 'login' | 'signup') => {
        const usersFromStorage = localStorage.getItem('studioIaUsers');
        let currentUsers: User[] = usersFromStorage ? JSON.parse(usersFromStorage) : [];
        
        let user = currentUsers.find(u => u.email === email);

        if (!user) {
            // If user doesn't exist, create them (for both login and signup in this simple case)
            user = { email, createdAt: Date.now() };
            currentUsers.push(user);
            localStorage.setItem('studioIaUsers', JSON.stringify(currentUsers));
            setAllUsers(currentUsers);
        }
        
        if (user) {
            localStorage.setItem('studioIaCurrentUser', JSON.stringify(user));
            setIsAuthenticated(true);
            setCurrentUser(user);
            setIsAdmin(user.email === ADMIN_EMAIL);
        }
    };


    const handleLogout = () => {
        localStorage.removeItem('studioIaCurrentUser');
        setIsAuthenticated(false);
        setCurrentUser(null);
        setIsAdmin(false);
        if (activeView === 'admin') {
            setActiveView('home');
        }
    };

    const handleNavItemClick = (viewId: string) => {
        if (viewId === 'admin' && !isAdmin) {
            setActiveView('home'); // Redirect non-admins
            return;
        }
        setActiveView(viewId);
    };

    const renderVideoView = () => (
        <>
        <div className="flex-grow flex flex-col justify-center">
            <Hero 
                prompt={videoPrompt} 
                setPrompt={setVideoPrompt} 
                onGenerate={handleGenerateVideo} 
                isLoading={isVidLoading}
                isAuthenticated={isAuthenticated}
                onRequestAuth={() => handleOpenAuthModal('login')}
                onImageUpload={handleVideoImageUpload}
                imagePreviewUrl={videoImage?.previewUrl ?? null}
                onRemoveImage={handleRemoveVideoImage}
                titleStart={t.hero.titleStart}
                titleGradient={t.hero.titleGradient}
                placeholder={t.hero.placeholder}
                buttonText={t.hero.buttonText}
                buttonLoadingText={t.hero.buttonLoadingText}
                buttonTextAuthRequired={t.hero.buttonTextAuthRequired}
                imageUploadTooltip={t.hero.imageUploadTooltip}
            />
            <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                {isVidLoading && <LoadingIndicator message={loadingMessage} />}
                
                {vidError && (
                    <div className="my-8 p-4 bg-red-900/50 border border-red-700 text-red-200 rounded-md text-center">
                        <p className="font-semibold">{t.error.title}</p>
                        <p>{vidError}</p>
                    </div>
                )}
                
                {lastGeneratedVideo && !isVidLoading && (
                    <div className="my-8">
                        <h2 className="text-2xl font-bold text-center mb-4 text-white">{t.videoResult.title}</h2>
                        <div className="aspect-video rounded-lg overflow-hidden shadow-2xl shadow-blue-500/20 border border-blue-500/30">
                            <video
                                key={lastGeneratedVideo.data}
                                src={lastGeneratedVideo.data}
                                controls
                                autoPlay
                                loop
                                className="w-full h-full object-contain bg-black"
                            >
                                Your browser does not support the video tag.
                            </video>
                        </div>
                        <div className="mt-6 text-center flex items-center justify-center space-x-4">
                            <button
                                onClick={() => handleDownloadAsset(lastGeneratedVideo)}
                                className="bg-green-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-green-700 transition-all duration-300 inline-flex items-center justify-center space-x-2"
                                aria-label="Download generated video"
                            >
                                <DownloadIcon className="h-5 w-5" />
                                <span>{t.videoResult.downloadButton}</span>
                            </button>
                            {'speechSynthesis' in window && lastGeneratedVideo.audioDescription && (
                               <button
                                    onClick={handleToggleNarration}
                                    className="bg-purple-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-purple-700 transition-all duration-300 inline-flex items-center justify-center space-x-2"
                                    aria-label={isNarrationPlaying ? t.videoResult.narrationButtonStop : t.videoResult.narrationButtonPlay}
                                >
                                    {isNarrationPlaying ? <SpeakerOffIcon /> : <SpeakerOnIcon />}
                                    <span>{isNarrationPlaying ? t.videoResult.narrationButtonStop : t.videoResult.narrationButtonPlay}</span>
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
        <Footer 
            copyright={t.footer.copyright}
            links={t.footer.links}
        />
        </>
    );

    const renderImageView = () => (
        <div className="flex flex-1 overflow-hidden">
            {/* Left Panel */}
            <div className="w-[420px] flex-shrink-0 bg-[#161616] p-6 flex flex-col border-r border-zinc-800">
                <ImageGenerator
                    prompt={imagePrompt}
                    setPrompt={setImagePrompt}
                    onGenerate={handleGenerateImages}
                    isLoading={isImgLoading}
                    isAuthenticated={isAuthenticated}
                    onRequestAuth={() => handleOpenAuthModal('login')}
                    translations={imageGeneratorTranslations}
                    numberOfImages={numberOfImages}
                    setNumberOfImages={setNumberOfImages}
                    aspectRatio={aspectRatio}
                    setAspectRatio={setAspectRatio}
                />
            </div>

            {/* Right Panel */}
            <div className="flex-1 flex flex-col bg-zinc-900 p-6 overflow-y-auto">
                {isImgLoading ? (
                    <div className="flex-grow flex items-center justify-center">
                        <LoadingIndicator message={t.imageGenerator.loadingMessage.replace('{count}', numberOfImages.toString())} />
                    </div>
                ) : imgError ? (
                    <div className="flex-grow flex items-center justify-center">
                        <div className="p-4 bg-red-900/50 border border-red-700 text-red-200 rounded-md text-center">
                            <p className="font-semibold">{t.error.title}</p>
                            <p>{imgError}</p>
                        </div>
                    </div>
                ) : lastGeneratedImages.length > 0 ? (
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                        {lastGeneratedImages.map((asset) => (
                            <div key={asset.id} className="group relative rounded-lg overflow-hidden shadow-lg border border-zinc-800 aspect-video">
                                <img 
                                    src={`data:image/png;base64,${asset.data}`}
                                    alt={`Generated image for prompt: ${asset.prompt}`}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <button
                                        onClick={() => handleDownloadAsset(asset)}
                                        className="bg-green-600 text-white px-5 py-2.5 rounded-md font-semibold hover:bg-green-700 transition-all duration-300 inline-flex items-center justify-center space-x-2"
                                        aria-label={`Download image for ${asset.prompt}`}
                                    >
                                        <DownloadIcon />
                                        <span>{t.imageResult.downloadButton}</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex-grow flex flex-col items-center justify-center text-center text-zinc-600">
                        <ImageIcon className="w-24 h-24 mb-6 text-zinc-700" />
                        <h2 className="text-xl font-semibold text-zinc-400 mb-2">{t.imageCreation.noGenerations}</h2>
                        <p className="max-w-xs">{t.imageGenerator.subtitle}</p>
                    </div>
                )}
            </div>
        </div>
    );


    const renderMainContent = () => {
        switch(activeView) {
            case 'home':
            case 'video':
                return renderVideoView();
            case 'image':
                return renderImageView();
            case 'assets':
                return (
                    <>
                        <AssetsView 
                            assets={allAssets}
                            onDelete={handleDeleteAsset}
                            onDownload={handleDownloadAsset}
                            translations={t.assetsView}
                        />
                        <Footer copyright={t.footer.copyright} links={t.footer.links} />
                    </>
                );
            case 'gallery':
                return (
                    <>
                        <GalleryView translations={t.gallery} />
                        <Footer copyright={t.footer.copyright} links={t.footer.links} />
                    </>
                );
            case 'admin':
                if (isAdmin) {
                    return (
                       <>
                         <AdminView 
                            users={allUsers}
                            translations={t.adminView}
                         />
                         <Footer copyright={t.footer.copyright} links={t.footer.links} />
                       </>
                    );
                }
                return renderVideoView(); // fallback for non-admins trying to access admin
            default:
                return renderVideoView();
        }
    };

    return (
        <div className="min-h-screen bg-zinc-950 flex text-zinc-300">
            <Sidebar 
                translations={t.sidebar}
                activeItem={activeView}
                onNavItemClick={handleNavItemClick}
                isAdmin={isAdmin}
                currentUser={currentUser}
                onLogout={handleLogout}
                currentLanguage={language}
                onLanguageChange={setLanguage}
                onLogin={() => handleOpenAuthModal('login')}
                onSignUp={() => handleOpenAuthModal('signup')}
                isAuthenticated={isAuthenticated}
            />
            <AuthModal 
                isOpen={isAuthModalOpen}
                onClose={() => setIsAuthModalOpen(false)}
                mode={authMode}
                setMode={setAuthMode}
                translations={t.auth}
                onAuthSuccess={handleAuthSuccess}
            />
            <main className="flex-1 flex flex-col ml-60 bg-zinc-900">
                {renderMainContent()}
            </main>
        </div>
    );
};

export default App;