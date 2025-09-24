import React, { useState, useEffect } from 'react';
import { GoogleIcon, GithubIcon } from './icons';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    mode: 'login' | 'signup';
    setMode: (mode: 'login' | 'signup') => void;
    onAuthSuccess: (email: string, mode: 'login' | 'signup') => void;
    translations: {
        modalTitleLogin: string;
        modalTitleSignUp: string;
        emailLabel: string;
        passwordLabel: string;
        confirmPasswordLabel: string;
        loginButton: string;
        signUpButton: string;
        switchToSignUp: string;
        switchToLogin: string;
        orDivider: string;
        continueWithGoogle: string;
        continueWithGithub: string;
        modalTitleVerify: string;
        verifyInstructions: string;
        verificationCodeLabel: string;
        verifyButton: string;
        resendCode: string;
        invalidCode: string;
        demoCodeMessage: string;
    };
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, mode, setMode, onAuthSuccess, translations }) => {
    // Shared state
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    // Verification flow state
    type AuthStep = 'details' | 'verify';
    const [authStep, setAuthStep] = useState<AuthStep>('details');
    const [verificationCode, setVerificationCode] = useState('');
    const [verificationInput, setVerificationInput] = useState('');
    const [verificationError, setVerificationError] = useState<string | null>(null);

    // Reset state completely when modal is opened or mode is switched
    useEffect(() => {
        if (isOpen) {
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            setVerificationInput('');
            setVerificationError(null);
            setAuthStep('details');
        }
    }, [isOpen, mode]);

    if (!isOpen) return null;

    const generateAndSetCode = () => {
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        setVerificationCode(code);
        // In a real app, an API call would be made to send the email.
        // We log it to the console for simulation purposes.
        console.log(`[SIMULATION] Verification code for ${email} is: ${code}`);
    };

    const handleDetailsSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (mode === 'login') {
            onAuthSuccess(email, 'login');
            onClose();
        } else { // signup
            if (password !== confirmPassword) {
                // This is a simplistic error handling. A real app would have better UX.
                alert("Passwords do not match.");
                return;
            }
            generateAndSetCode();
            setAuthStep('verify');
        }
    };

    const handleVerificationSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (verificationInput === verificationCode) {
            onAuthSuccess(email, 'signup');
            onClose();
        } else {
            setVerificationError(translations.invalidCode);
            setVerificationInput('');
        }
    };

    const handleResendCode = () => {
        generateAndSetCode();
        setVerificationInput('');
        setVerificationError(null);
    };

    const renderDetailsView = () => (
        <>
            <h2 className="text-2xl font-bold text-center text-white mb-6">
                {mode === 'login' ? translations.modalTitleLogin : translations.modalTitleSignUp}
            </h2>

            <form onSubmit={handleDetailsSubmit} className="space-y-6">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300">{translations.emailLabel}</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                        className="mt-1 w-full px-3 py-2 text-white bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-300">{translations.passwordLabel}</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                        className="mt-1 w-full px-3 py-2 text-white bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                {mode === 'signup' && (
                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300">{translations.confirmPasswordLabel}</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                            required
                            className="mt-1 w-full px-3 py-2 text-white bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                )}
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition-colors duration-300"
                >
                    {mode === 'login' ? translations.loginButton : translations.signUpButton}
                </button>
            </form>

            <div className="my-6">
                <div className="relative">
                    <div className="absolute inset-0 flex items-center" aria-hidden="true">
                        <div className="w-full border-t border-gray-600" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="bg-gray-800 px-2 text-gray-400">{translations.orDivider}</span>
                    </div>
                </div>
            </div>

            <div className="space-y-3">
                <button type="button" className="w-full inline-flex justify-center items-center space-x-3 py-2.5 px-4 border border-gray-600 text-gray-300 rounded-md shadow-sm bg-gray-700/50 hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500">
                    <GoogleIcon />
                    <span className="text-sm font-medium">{translations.continueWithGoogle}</span>
                </button>
                <button type="button" className="w-full inline-flex justify-center items-center space-x-3 py-2.5 px-4 border border-gray-600 text-gray-300 rounded-md shadow-sm bg-gray-700/50 hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500">
                    <GithubIcon />
                    <span className="text-sm font-medium">{translations.continueWithGithub}</span>
                </button>
            </div>

            <div className="mt-6 text-center">
                <button onClick={() => setMode(mode === 'login' ? 'signup' : 'login')} className="text-sm text-blue-400 hover:underline">
                    {mode === 'login' ? translations.switchToSignUp : translations.switchToLogin}
                </button>
            </div>
        </>
    );

    const verificationInstructionsParts = translations.verifyInstructions.split('{email}');
    const demoMessageParts = translations.demoCodeMessage.split('{code}');

    return (
        <div 
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
        >
            <div 
                className="bg-gray-800 border border-gray-700 rounded-lg shadow-xl w-full max-w-md m-4 p-8 relative transform transition-all duration-300 scale-95"
                onClick={e => e.stopPropagation()}
            >
                <button 
                    onClick={onClose} 
                    className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                    aria-label="Close modal"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>

                {mode === 'signup' && authStep === 'verify' ? (
                     <>
                        <h2 className="text-2xl font-bold text-center text-white mb-4">
                            {translations.modalTitleVerify}
                        </h2>
                        <p className="text-center text-gray-300 mb-6 text-sm">
                            {verificationInstructionsParts[0]}
                            <span className="font-medium text-white">{email}</span>
                            {verificationInstructionsParts[1]}
                        </p>
                        <div className="my-4 p-3 bg-yellow-900/50 border border-yellow-700 rounded-md text-center">
                            <p className="text-sm text-yellow-200">
                                {demoMessageParts[0]}
                                <strong className="font-bold text-white tracking-widest">{verificationCode}</strong>
                                {demoMessageParts[1]}
                            </p>
                        </div>
                        <form onSubmit={handleVerificationSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="verificationCode" className="sr-only">{translations.verificationCodeLabel}</label>
                                <input
                                    type="text"
                                    id="verificationCode"
                                    value={verificationInput}
                                    onChange={(e) => {
                                        const val = e.target.value.replace(/[^0-9]/g, '');
                                        if (val.length <= 6) setVerificationInput(val);
                                    }}
                                    required
                                    maxLength={6}
                                    autoComplete="one-time-code"
                                    className="w-full px-3 py-2 text-white bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-center text-3xl tracking-[0.3em]"
                                    placeholder="------"
                                />
                            </div>
                            {verificationError && <p className="text-red-400 text-sm text-center">{verificationError}</p>}
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition-colors duration-300"
                            >
                                {translations.verifyButton}
                            </button>
                        </form>
                        <div className="mt-6 text-center">
                            <button onClick={handleResendCode} className="text-sm text-blue-400 hover:underline">
                                {translations.resendCode}
                            </button>
                        </div>
                    </>
                ) : (
                    renderDetailsView()
                )}
            </div>
        </div>
    );
};

export default AuthModal;