import React, { useState, useEffect, useRef } from 'react';
import { LogoutIcon } from './icons';

interface UserProfileProps {
    email: string;
    onLogout: () => void;
    translations: {
        logout: string;
    };
}

const UserProfile: React.FC<UserProfileProps> = ({ email, onLogout, translations }) => {
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const userInitial = email ? email.charAt(0).toUpperCase() : '?';

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wrapperRef]);

    return (
        <div className="relative" ref={wrapperRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-700 text-white hover:bg-gray-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500"
                aria-haspopup="true"
                aria-expanded={isOpen}
                aria-label="Open user menu"
            >
                <span className="text-lg font-semibold">{userInitial}</span>
            </button>

            {isOpen && (
                <div
                    className="absolute right-0 mt-2 w-56 bg-gray-800 border border-gray-700 rounded-md shadow-lg py-1 z-20"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="menu-button"
                >
                    <div className="px-4 py-2 border-b border-gray-700">
                        <p className="text-sm text-gray-300">Signed in as</p>
                        <p className="text-sm font-medium text-white truncate">{email}</p>
                    </div>
                    <button
                        onClick={onLogout}
                        className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 flex items-center space-x-2"
                        role="menuitem"
                    >
                        <LogoutIcon className="w-5 h-5" />
                        <span>{translations.logout}</span>
                    </button>
                </div>
            )}
        </div>
    );
};

export default UserProfile;