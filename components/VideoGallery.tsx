import React from 'react';
import { EXAMPLE_VIDEOS } from '../constants';

interface VideoCardProps {
    url: string;
    prompt: string;
}

interface VideoGalleryProps {
    title: string;
    subtitle: string;
}


const VideoCard: React.FC<VideoCardProps> = ({ url, prompt }) => {
    return (
        <div className="relative rounded-lg overflow-hidden group aspect-video shadow-lg">
            <video
                src={url}
                loop
                muted
                playsInline
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                onMouseEnter={e => e.currentTarget.play()}
                onMouseLeave={e => {
                    e.currentTarget.pause();
                    e.currentTarget.currentTime = 0;
                }}
            >
                Your browser does not support the video tag.
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-4 w-full">
                <p className="text-sm text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0">{prompt}</p>
            </div>
        </div>
    );
};

const VideoGallery: React.FC<VideoGalleryProps> = ({ title, subtitle }) => {
    return (
        <section className="py-16 md:py-24 bg-gray-900">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                     <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
                        {title}
                    </h2>
                    <p className="mt-4 text-lg text-gray-400 max-w-3xl mx-auto">
                        {subtitle}
                    </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {EXAMPLE_VIDEOS.map((video, index) => (
                        <VideoCard key={index} url={video.url} prompt={video.prompt} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default VideoGallery;