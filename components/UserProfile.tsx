import React, { useState, useEffect, useRef } from 'react';
import { LogoutIcon, ChevronUpIcon } from './icons';

interface UserProfileProps {
    email: string;
    onLogout: () => void;
    translations: {
        logout: string;
    };
    isCollapsed: boolean;
}

const UserProfile: React.FC<UserProfileProps> = ({ email, onLogout, translations, isCollapsed }) => {
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
            {isOpen && (
                <div
                    className="absolute right-0 bottom-full mb-2 w-52 bg-zinc-800 border border-zinc-700 rounded-md shadow-lg py-1 z-20"
                    role="menu"
                    aria-orientation="vertical"
                >
                    <div className="px-3 py-2 border-b border-zinc-700">
                        <p className="text-xs text-zinc-400">Signed in as</p>
                        <p className="text-sm font-medium text-white truncate">{email}</p>
                    </div>
                    <button
                        onClick={onLogout}
                        className="w-full text-left px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 flex items-center space-x-2"
                        role="menuitem"
                    >
                        <LogoutIcon className="w-4 h-4" />
                        <span>{translations.logout}</span>
                    </button>
                </div>
            )}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center w-full text-left p-2 rounded-lg hover:bg-zinc-800/60 transition-colors ${isCollapsed ? 'justify-center' : ''}`}
                aria-haspopup="true"
                aria-expanded={isOpen}
                aria-label="Open user menu"
            >
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-600 to-blue-500 flex-shrink-0 flex items-center justify-center font-bold text-white">
                    {userInitial}
                </div>
                {!isCollapsed &&
                    <>
                        <div className="ml-2.5 flex-1 overflow-hidden">
                            <p className="text-sm font-semibold text-zinc-200 truncate">{email}</p>
                        </div>
                        <ChevronUpIcon className={`w-4 h-4 text-zinc-400 transition-transform duration-200 ${isOpen ? 'rotate-0' : 'rotate-180'}`} />
                    </>
                }
            </button>
        </div>
    );
};

export default UserProfile;
