import React from 'react';

interface FooterProps {
    copyright: string;
    links: string[];
}

const Footer: React.FC<FooterProps> = ({ copyright, links }) => {
    return (
        <footer className="bg-gray-950/50 border-t border-gray-800 backdrop-blur-sm">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
                    <p className="text-gray-400">{copyright.replace('{year}', new Date().getFullYear().toString())}</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        {links.map(link => (
                             <a key={link} href="#" className="text-gray-400 hover:text-white transition-colors">{link}</a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;