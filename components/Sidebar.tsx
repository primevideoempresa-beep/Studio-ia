import React from 'react';
import { HomeIcon, VideoIcon, ImageIcon, AssetsIcon, GalleryIcon, UsersIcon } from './icons';

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
}

interface NavItem {
    id: string;
    name: string;
    icon: React.ElementType;
    isHot?: boolean;
}

const LogoIcon = () => (
    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-pink-500" />
)

const HamburgerIcon = () => (
     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="3" y1="12" x2="21" y2="12"></line>
        <line x1="3" y1="6" x2="21" y2="6"></line>
        <line x1="3" y1="18" x2="21" y2="18"></line>
    </svg>
)

const NavLink: React.FC<{ item: NavItem, isActive: boolean, onClick: () => void }> = ({ item, isActive, onClick }) => (
    <a
        href="#"
        onClick={(e) => {
            e.preventDefault();
            onClick();
        }}
        className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ease-in-out ${
            isActive
                ? 'bg-gradient-to-r from-purple-600 to-blue-500 text-white shadow-lg'
                : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
        }`}
        aria-current={isActive ? 'page' : undefined}
    >
        <item.icon className="w-5 h-5 shrink-0" />
        <span className="font-medium flex-grow text-sm">{item.name}</span>
        {item.isHot && (
            <span className="w-2 h-2 bg-pink-500 rounded-full animate-pulse"></span>
        )}
    </a>
);


const Sidebar: React.FC<SidebarProps> = ({ translations, activeItem, onNavItemClick, isAdmin }) => {
    
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
        <aside className="w-60 h-screen bg-[#111111] text-gray-300 p-4 flex flex-col fixed top-0 left-0 shadow-2xl z-20 border-r border-zinc-800">
            <div className="flex items-center justify-between px-2 pb-4 mb-4">
                 <div className="flex items-center space-x-2">
                    <LogoIcon/>
                    <span className="text-lg font-bold text-white">Studio IA</span>
                </div>
                <HamburgerIcon className="text-zinc-400"/>
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

            <div className="mt-8">
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
        </aside>
    );
};

export default Sidebar;