import React from 'react';

interface UserAuthProps {
    onLogin: () => void;
    onSignUp: () => void;
    translations: {
        login: string;
        signUp: string;
    };
}

const UserAuth: React.FC<UserAuthProps> = ({ onLogin, onSignUp, translations }) => {
    return (
        <div className="flex items-center space-x-2">
            <button 
                onClick={onLogin}
                className="text-gray-300 hover:text-white transition-colors duration-300 px-3 py-2 rounded-md text-sm font-medium">
                {translations.login}
            </button>
            <button 
                onClick={onSignUp}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300 text-sm font-medium">
                {translations.signUp}
            </button>
        </div>
    );
};

export default UserAuth;
