import React from 'react';

interface LoadingIndicatorProps {
    message: string;
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ message }) => {
    return (
        <div className="my-16 text-center">
            <div className="flex flex-col items-center justify-center space-y-4">
                <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <h2 className="text-xl font-semibold text-white">Generating Your Video</h2>
                <p className="mt-2 text-gray-400 max-w-md mx-auto">{message}</p>
            </div>
        </div>
    );
};

export default LoadingIndicator;