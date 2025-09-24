import React from 'react';
import { DownloadIcon, TrashIcon } from './icons';
import { Asset } from '../App';

interface AssetsViewProps {
    assets: Asset[];
    onDelete: (id: string) => void;
    onDownload: (asset: Asset) => void;
    translations: {
        title: string;
        subtitle: string;
        noAssetsTitle: string;
        noAssetsMessage: string;
        deleteButton: string;
        downloadButton: string;
    };
}

const AssetCard: React.FC<{
    asset: Asset;
    onDelete: (id: string) => void;
    onDownload: (asset: Asset) => void;
    translations: { deleteButton: string; downloadButton: string };
}> = ({ asset, onDelete, onDownload, translations }) => {
    return (
        <div className="group relative aspect-square rounded-lg overflow-hidden shadow-lg bg-gray-800 border border-gray-700/50">
            {asset.type === 'image' && (
                <img src={`data:image/png;base64,${asset.data}`} alt={asset.prompt} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
            )}
            {asset.type === 'video' && (
                <video 
                    src={asset.data} 
                    loop 
                    muted 
                    playsInline 
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
                    onMouseEnter={e => e.currentTarget.play().catch(console.error)} 
                    onMouseLeave={e => e.currentTarget.pause()} 
                />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                <p className="text-xs text-white mb-2 line-clamp-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{asset.prompt}</p>
                <div className="flex items-center justify-end space-x-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100">
                    <button 
                        onClick={() => onDownload(asset)} 
                        className="p-2 rounded-full bg-green-600/80 text-white hover:bg-green-600 backdrop-blur-sm transition-all"
                        aria-label={translations.downloadButton}
                    >
                        <DownloadIcon className="w-4 h-4" />
                    </button>
                    <button 
                        onClick={() => onDelete(asset.id)} 
                        className="p-2 rounded-full bg-red-600/80 text-white hover:bg-red-600 backdrop-blur-sm transition-all"
                        aria-label={translations.deleteButton}
                    >
                        <TrashIcon className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
};

const AssetsView: React.FC<AssetsViewProps> = ({ assets, onDelete, onDownload, translations }) => {
    return (
        <div className="flex-grow p-4 sm:p-6 lg:p-8">
            <div className="container mx-auto max-w-7xl">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{translations.title}</h1>
                <p className="text-gray-400 mb-8">{translations.subtitle}</p>

                {assets.length === 0 ? (
                    <div className="text-center py-20 bg-gray-800/30 border border-gray-700/50 rounded-lg">
                        <svg className="mx-auto h-12 w-12 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                        </svg>
                        <h2 className="mt-4 text-xl font-semibold text-white">{translations.noAssetsTitle}</h2>
                        <p className="text-gray-400 mt-2 max-w-md mx-auto">{translations.noAssetsMessage}</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {assets.map(asset => (
                            <AssetCard 
                                key={asset.id} 
                                asset={asset} 
                                onDelete={onDelete} 
                                onDownload={onDownload}
                                translations={translations}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AssetsView;
