import React from 'react';
import { HomeIcon, VideoIcon, ImageIcon, AssetsIcon, GalleryIcon, SettingsIcon, UserIcon, ChevronsLeftIcon } from './icons';
import { User } from '../App';
import UserProfile from './UserProfile';
import LanguageSelector from './LanguageSelector';

interface SidebarProps {
    translations: {
        home: string;
        title: string;
        video: string;
        image: string;
        assets: string;
        gallery: string;
    };
    activeItem: string;
    onNavItemClick: (itemId: string) => void;
    currentUser: User | null;
    isAuthenticated: boolean;
    onLogout: () => void;
    currentLanguage: string;
    onLanguageChange: (lang: string) => void;
    onLogin: () => void;
    onSignUp: () => void;
    isSidebarCollapsed: boolean;
    onToggleSidebar: () => void;
}

interface NavItem {
    id: string;
    name: string;
    icon: React.ElementType;
    isHot?: boolean;
}

const Logo: React.FC<{ isCollapsed: boolean }> = ({ isCollapsed }) => (
    <div className={`flex items-center space-x-2.5 ${isCollapsed ? 'justify-center' : ''}`}>
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-pink-500 flex-shrink-0" />
        {!isCollapsed && <span className="text-lg font-bold text-white tracking-wide">Studio IA</span>}
    </div>
);

const NavLink: React.FC<{ item: NavItem, isActive: boolean, onClick: () => void, isCollapsed: boolean }> = ({ item, isActive, onClick, isCollapsed }) => (
    <a
        href="#"
        onClick={(e) => {
            e.preventDefault();
            onClick();
        }}
        className={`flex items-center p-2.5 rounded-lg transition-colors duration-200 ease-in-out relative ${
            isActive
                ? 'bg-zinc-800 text-white'
                : 'text-zinc-400 hover:bg-zinc-800/60 hover:text-white'
        } ${isCollapsed ? 'justify-center' : 'space-x-3'}`}
        aria-current={isActive ? 'page' : undefined}
        title={isCollapsed ? item.name : undefined}
    >
        {isActive && <div className="absolute left-0 top-0 h-full w-1 bg-purple-500 rounded-r-full"></div>}
        <item.icon className={`w-5 h-5 shrink-0 ${!isCollapsed ? 'ml-2' : ''}`} />
        {!isCollapsed && <span className="font-semibold flex-grow text-sm">{item.name}</span>}
        {!isCollapsed && item.isHot && (
            <span className="w-2 h-2 bg-pink-500 rounded-full animate-pulse mr-2"></span>
        )}
    </a>
);


const Sidebar: React.FC<SidebarProps> = ({ 
    translations, 
    activeItem, 
    onNavItemClick, 
    currentUser,
    isAuthenticated,
    onLogout,
    currentLanguage,
    onLanguageChange,
    onLogin,
    onSignUp,
    isSidebarCollapsed,
    onToggleSidebar
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

    return (
        <aside className={`h-screen bg-[#111111] text-gray-300 flex flex-col fixed top-0 left-0 shadow-2xl z-20 border-r border-zinc-800/50 transition-all duration-300 ${isSidebarCollapsed ? 'w-20 p-2' : 'w-60 p-4'}`}>
            <button
                onClick={onToggleSidebar}
                className="absolute top-1/2 -right-3 z-30 transform -translate-y-1/2 bg-zinc-700 hover:bg-purple-600 text-zinc-200 hover:text-white w-7 h-7 rounded-full flex items-center justify-center border-4 border-zinc-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-purple-500 transition-all"
                aria-label={isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
                <ChevronsLeftIcon className={`w-4 h-4 transition-transform duration-300 ${isSidebarCollapsed ? 'rotate-180' : ''}`} />
            </button>
            
            <div className={`pb-4 mb-4 border-b border-zinc-800/50 ${isSidebarCollapsed ? '' : 'px-2'}`}>
                 <Logo isCollapsed={isSidebarCollapsed} />
            </div>

            <div className="flex flex-col space-y-2">
                {mainNavItems.map((item) => (
                    <NavLink 
                        key={item.id} 
                        item={item} 
                        isActive={activeItem === item.id}
                        onClick={() => onNavItemClick(item.id)} 
                        isCollapsed={isSidebarCollapsed}
                    />
                ))}
            </div>

            <div className={`mt-6 pt-6 border-t border-zinc-800/50 ${isSidebarCollapsed ? 'mx-auto' : ''}`}>
                <nav className="flex flex-col space-y-2">
                    {managementNavItems.map((item) => (
                         <NavLink 
                            key={item.id} 
                            item={item} 
                            isActive={activeItem === item.id} 
                            onClick={() => onNavItemClick(item.id)} 
                            isCollapsed={isSidebarCollapsed}
                        />
                    ))}
                </nav>
            </div>
            
            <div className="mt-auto pt-4 border-t border-zinc-800/50 space-y-2">
                 <div className={`flex items-center ${isSidebarCollapsed ? 'justify-center' : 'justify-between px-2'}`}>
                    <button className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg">
                        <SettingsIcon className="w-5 h-5"/>
                    </button>
                    {!isSidebarCollapsed && <LanguageSelector currentLanguage={currentLanguage} onLanguageChange={onLanguageChange} />}
                </div>
                {isAuthenticated && currentUser ? (
                     <UserProfile 
                        email={currentUser.email}
                        onLogout={onLogout}
                        translations={{ logout: "Logout" }}
                        isCollapsed={isSidebarCollapsed}
                    />
                ) : (
                    <div className="p-2">
                        <button 
                            onClick={onSignUp}
                            className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300 text-sm font-medium flex items-center justify-center"
                            title={isSidebarCollapsed ? "Sign Up" : ""}
                        >
                            {isSidebarCollapsed ? <UserIcon className="w-5 h-5" /> : <span>Sign Up</span>}
                        </button>
                    </div>
                )}
            </div>
        </aside>
    );
};

export default Sidebar;