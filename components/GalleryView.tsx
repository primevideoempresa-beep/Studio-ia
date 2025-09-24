import React, { useState, useMemo } from 'react';
import { EXAMPLE_VIDEOS, EXAMPLE_IMAGES } from '../constants';
import { VideoIcon, ImageIcon } from './icons';

interface GalleryViewProps {
    translations: {
        title: string;
        subtitle: string;
        filters: {
            all: string;
            videos: string;
            images: string;
        };
    };
}

type GalleryItem = {
    type: 'video' | 'image';
    prompt: string;
    url: string;
};

const MediaCard: React.FC<{ item: GalleryItem }> = ({ item }) => {
    return (
        <div className="relative rounded-lg overflow-hidden group aspect-video shadow-lg bg-gray-800">
            {item.type === 'video' ? (
                 <video
                    src={item.url}
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onMouseEnter={e => e.currentTarget.play()}
                    onMouseLeave={e => {
                        e.currentTarget.pause();
                        e.currentTarget.currentTime = 0;
                    }}
                />
            ) : (
                <img src={item.url} alt={item.prompt} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-4 w-full">
                <p className="text-sm text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">{item.prompt}</p>
            </div>
        </div>
    );
};

const GalleryView: React.FC<GalleryViewProps> = ({ translations }) => {
    const [filter, setFilter] = useState<'all' | 'video' | 'image'>('all');

    const allItems: GalleryItem[] = useMemo(() => {
        const videos: GalleryItem[] = EXAMPLE_VIDEOS.map(v => ({ ...v, type: 'video' }));
        const images: GalleryItem[] = EXAMPLE_IMAGES.map(i => ({ ...i, type: 'image' }));
        // Shuffle for variety, but keep it stable across re-renders
        return [...videos, ...images].sort(() => 0.5 - Math.random());
    }, []);

    const filteredItems = useMemo(() => {
        if (filter === 'video') return allItems.filter(item => item.type === 'video');
        if (filter === 'image') return allItems.filter(item => item.type === 'image');
        return allItems;
    }, [filter, allItems]);

    const FilterButton: React.FC<{
        label: string;
        isActive: boolean;
        onClick: () => void;
        icon?: React.ElementType;
    }> = ({ label, isActive, onClick, icon: Icon }) => (
        <button
            onClick={onClick}
            className={`px-4 py-2 text-sm font-semibold rounded-full flex items-center space-x-2 transition-colors duration-300 ${
                isActive 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
        >
            {Icon && <Icon className="w-4 h-4" />}
            <span>{label}</span>
        </button>
    );

    return (
        <div className="flex-grow p-4 sm:p-6 lg:p-8">
            <div className="container mx-auto max-w-7xl">
                <div className="text-center mb-12">
                     <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
                        {translations.title}
                    </h1>
                    <p className="mt-4 text-lg text-gray-400 max-w-3xl mx-auto">
                        {translations.subtitle}
                    </p>
                </div>
                
                <div className="flex justify-center items-center space-x-2 mb-8">
                    <FilterButton label={translations.filters.all} isActive={filter === 'all'} onClick={() => setFilter('all')} />
                    <FilterButton label={translations.filters.videos} isActive={filter === 'video'} onClick={() => setFilter('video')} icon={VideoIcon} />
                    <FilterButton label={translations.filters.images} isActive={filter === 'image'} onClick={() => setFilter('image')} icon={ImageIcon} />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredItems.map((item) => (
                        <MediaCard key={item.url} item={item} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GalleryView;
