import React from 'react';
import LanguageSelector from './LanguageSelector';
import UserAuth from './UserAuth';
import UserProfile from './UserProfile';
import { User } from '../App';

interface TopBarProps {
    currentLanguage: string;
    onLanguageChange: (lang: string) => void;
    onLogin: () => void;
    onSignUp: () => void;
    onLogout: () => void;
    isAuthenticated: boolean;
    currentUser: User | null;
    translations: {
        login: string;
        signUp: string;
        logout: string;
    };
}

const TopBar: React.FC<TopBarProps> = ({ 
    currentLanguage, 
    onLanguageChange,
    onLogin,
    onSignUp,
    onLogout,
    isAuthenticated,
    currentUser,
    translations
}) => {
    return (
        <header className="sticky top-0 z-10 py-3 px-4 sm:px-6 lg:px-8 bg-gray-900/50 backdrop-blur-sm border-b border-gray-800">
            <div className="flex justify-end items-center space-x-4">
                <LanguageSelector 
                    currentLanguage={currentLanguage} 
                    onLanguageChange={onLanguageChange} 
                />
                {isAuthenticated && currentUser ? (
                    <UserProfile 
                        email={currentUser.email}
                        onLogout={onLogout}
                        translations={{ logout: translations.logout }}
                    />
                ) : (
                    <UserAuth 
                        onLogin={onLogin} 
                        onSignUp={onSignUp}
                        translations={translations}
                    />
                )}
            </div>
        </header>
    );
};

export default TopBar;
