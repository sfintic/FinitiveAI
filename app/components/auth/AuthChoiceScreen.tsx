// app/components/auth/AuthChoiceScreen.tsx
'use client';

import React, { useState } from 'react';
import { ChevronRight, User, Mail, Loader2 } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { AnimatedBackground } from '../AnimatedBackground';

interface AuthChoiceScreenProps {
  onShowUsernamePassword: () => void;
  onShowEmailPassword: () => void;
}

export const AuthChoiceScreen: React.FC<AuthChoiceScreenProps> = ({
  onShowUsernamePassword,
  onShowEmailPassword,
}) => {
  const { signInWithGoogle, signInWithApple } = useAuth();
  const [loading, setLoading] = useState<'google' | 'apple' | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGoogleSignIn = async () => {
    setLoading('google');
    setError(null);
    const { error } = await signInWithGoogle();
    if (error) {
      setError(error.message);
    }
    setLoading(null);
  };

  const handleAppleSignIn = async () => {
    setLoading('apple');
    setError(null);
    const { error } = await signInWithApple();
    if (error) {
      setError(error.message);
    }
    setLoading(null);
  };

  return (
    <div className="min-h-screen bg-[#0b0f1a] relative flex items-center justify-center">
      <AnimatedBackground />
      
      <div className="relative z-10 w-full max-w-md mx-auto p-6">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <img src="/finitive_logo_only.png" alt="Finitive" className="w-16 h-16" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
            Welcome to Finitive
          </h1>
          <p className="text-gray-400">Engineered for Infinite Productivity</p>
        </div>

        <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 space-y-4">
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* Google Sign In */}
          <button
            onClick={handleGoogleSignIn}
            disabled={loading === 'google'}
            className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-50 text-gray-900 p-4 rounded-xl font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading === 'google' ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            )}
            Continue with Google
          </button>

          {/* Apple Sign In */}
          <button
            onClick={handleAppleSignIn}
            disabled={loading === 'apple'}
            className="w-full flex items-center justify-center gap-3 bg-black hover:bg-gray-900 text-white p-4 rounded-xl font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading === 'apple' ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
            )}
            Continue with Apple
          </button>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-700/50"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-slate-900/90 px-3 text-gray-400">Or</span>
            </div>
          </div>

          {/* Username + Password */}
          <button
            onClick={onShowUsernamePassword}
            className="w-full flex items-center justify-between bg-slate-800/50 hover:bg-slate-800 text-gray-200 p-4 rounded-xl font-medium transition-all duration-200 border border-slate-700/50"
          >
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-cyan-400" />
              Continue with Username
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

          {/* Email + Password */}
          <button
            onClick={onShowEmailPassword}
            className="w-full flex items-center justify-between bg-slate-800/50 hover:bg-slate-800 text-gray-200 p-4 rounded-xl font-medium transition-all duration-200 border border-slate-700/50"
          >
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-cyan-400" />
              Continue with Email
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <div className="text-center mt-6 text-sm text-gray-400">
          By continuing, you agree to our{' '}
          <a href="#" className="text-cyan-400 hover:text-cyan-300">Terms of Service</a>
          {' '}and{' '}
          <a href="#" className="text-cyan-400 hover:text-cyan-300">Privacy Policy</a>
        </div>
      </div>
    </div>
  );
}; 