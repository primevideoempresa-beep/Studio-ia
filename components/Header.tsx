import React from 'react';
import LanguageSelector from './LanguageSelector';

interface HeaderProps {
    navLinks: string[];
    signIn: string;
    tryForFree: string;
    currentLanguage: string;
    onLanguageChange: (lang: string) => void;
}

const LogoIcon = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
        <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 7L12 12L22 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 12V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const Header: React.FC<HeaderProps> = ({ navLinks, signIn, tryForFree, currentLanguage, onLanguageChange }) => {

    return (
        <header className="absolute top-0 left-0 right-0 z-10 py-4">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <a href="#" className="flex items-center space-x-2">
                        <LogoIcon />
                        <span className="text-xl font-bold text-white">Studio IA</span>
                    </a>
                    <nav className="hidden md:flex items-center space-x-6">
                        {navLinks.map((link) => (
                            <a key={link} href="#" className="text-gray-300 hover:text-white transition-colors duration-300">{link}</a>
                        ))}
                    </nav>
                </div>
                <div className="flex items-center space-x-4">
                    <LanguageSelector currentLanguage={currentLanguage} onLanguageChange={onLanguageChange} />
                    <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300 hidden sm:block">{signIn}</a>
                    <a href="#" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300">{tryForFree}</a>
                </div>
            </div>
        </header>
    );
};

export default Header;