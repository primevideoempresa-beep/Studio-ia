import React from 'react';
import { HomeIcon, VideoIcon, ImageIcon, AssetsIcon, GalleryIcon, UsersIcon, SettingsIcon } from './icons';
import { User } from '../App';
import UserProfile from './UserProfile';
import LanguageSelector from './LanguageSelector';
import UserAuth from './UserAuth';

interface SidebarProps {
    translations: {
        home: string;
        title: string;
        video: string;
        image: string;
        assets: string;
        gallery: string;
        admin: string;
    };
    activeItem: string;
    onNavItemClick: (itemId: string) => void;
    isAdmin: boolean;
    currentUser: User | null;
    isAuthenticated: boolean;
    onLogout: () => void;
    currentLanguage: string;
    onLanguageChange: (lang: string) => void;
    onLogin: () => void;
    onSignUp: () => void;
}

interface NavItem {
    id: string;
    name: string;
    icon: React.ElementType;
    isHot?: boolean;
}

const Logo: React.FC = () => (
    <div className="flex items-center space-x-2.5 px-2">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-pink-500" />
        <span className="text-lg font-bold text-white tracking-wide">Studio IA</span>
    </div>
);

const NavLink: React.FC<{ item: NavItem, isActive: boolean, onClick: () => void }> = ({ item, isActive, onClick }) => (
    <a
        href="#"
        onClick={(e) => {
            e.preventDefault();
            onClick();
        }}
        className={`flex items-center space-x-3 p-2.5 rounded-lg transition-colors duration-200 ease-in-out relative ${
            isActive
                ? 'bg-zinc-800 text-white'
                : 'text-zinc-400 hover:bg-zinc-800/60 hover:text-white'
        }`}
        aria-current={isActive ? 'page' : undefined}
    >
        {isActive && <div className="absolute left-0 top-0 h-full w-1 bg-purple-500 rounded-r-full"></div>}
        <item.icon className="w-5 h-5 shrink-0 ml-2" />
        <span className="font-semibold flex-grow text-sm">{item.name}</span>
        {item.isHot && (
            <span className="w-2 h-2 bg-pink-500 rounded-full animate-pulse mr-2"></span>
        )}
    </a>
);


const Sidebar: React.FC<SidebarProps> = ({ 
    translations, 
    activeItem, 
    onNavItemClick, 
    isAdmin,
    currentUser,
    isAuthenticated,
    onLogout,
    currentLanguage,
    onLanguageChange,
    onLogin,
    onSignUp
}) => {
    
    const mainNavItems: NavItem[] = [
        { id: 'home', name: translations.home, icon: HomeIcon },
        { id: 'video', name: translations.video, icon: VideoIcon },
        { id: 'image', name: translations.image, icon: ImageIcon },
    ];
    
    const managementNavItems: NavItem[] = [
        { id: 'assets', name: translations.assets, icon: AssetsIcon, isHot: true },
        { id: 'gallery', name: translations.gallery, icon: GalleryIcon },
    ];

    if (isAdmin) {
        managementNavItems.push({ id: 'admin', name: translations.admin, icon: UsersIcon });
    }

    return (
        <aside className="w-60 h-screen bg-[#111111] text-gray-300 p-4 flex flex-col fixed top-0 left-0 shadow-2xl z-20 border-r border-zinc-800/50">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-zinc-800/50">
                 <Logo />
            </div>

            <div className="flex flex-col space-y-2">
                {mainNavItems.map((item) => (
                    <NavLink 
                        key={item.id} 
                        item={item} 
                        isActive={activeItem === item.id}
                        onClick={() => onNavItemClick(item.id)} 
                    />
                ))}
            </div>

            <div className="mt-6 pt-6 border-t border-zinc-800/50">
                <nav className="flex flex-col space-y-2">
                    {managementNavItems.map((item) => (
                         <NavLink 
                            key={item.id} 
                            item={item} 
                            isActive={activeItem === item.id} 
                            onClick={() => onNavItemClick(item.id)} 
                        />
                    ))}
                </nav>
            </div>
            
            <div className="mt-auto pt-4 border-t border-zinc-800/50 space-y-2">
                 <div className="flex items-center justify-between px-2">
                    <button className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg">
                        <SettingsIcon className="w-5 h-5"/>
                    </button>
                    <LanguageSelector currentLanguage={currentLanguage} onLanguageChange={onLanguageChange} />
                </div>
                {isAuthenticated && currentUser ? (
                     <UserProfile 
                        email={currentUser.email}
                        onLogout={onLogout}
                        translations={{ logout: "Logout" }} // This can be improved
                    />
                ) : (
                    <div className="p-2">
                        <button 
                            onClick={onSignUp}
                            className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300 text-sm font-medium">
                            Sign Up
                        </button>
                    </div>
                )}
            </div>
        </aside>
    );
};

export default Sidebar;