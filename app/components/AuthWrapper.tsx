'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { User } from '@supabase/supabase-js';

// Login/Signup Component
const passwordRequirements = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
const AuthPage = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [accountCreated, setAccountCreated] = useState(false);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      if (isSignUp) {
        if (!passwordRequirements.test(password)) {
          setMessage('Password must be at least 8 characters, include a capital letter, a number, and a symbol.');
          setLoading(false);
          return;
        }
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { username },
            emailRedirectTo: `${window.location.origin}/auth/callback`
          }
        });
        if (error) throw error;
        setAccountCreated(true);
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
      }
    } catch (error: any) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (accountCreated) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#0b0f1a] text-gray-200">
        <h2 className="text-2xl font-bold mb-4">Account Created!</h2>
        <p className="mb-2">Please check your email to verify your account.</p>
        <button
          className="mt-4 px-4 py-2 bg-cyan-500 rounded text-slate-900 font-semibold"
          onClick={() => {
            setIsSignUp(false);
            setAccountCreated(false);
            setEmail('');
            setPassword('');
            setUsername('');
            setMessage('');
          }}
        >
          Back to Login
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0f1a] flex items-center justify-center px-4">
      {/* Background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo and title */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 text-cyan-300">
            <svg viewBox="0 0 100 60" className="w-full h-full drop-shadow-[0_0_8px_#00d9ff]">
              <path d="M15,30 Q15,15 30,15 L40,15 Q55,15 55,30 Q55,45 40,45 L35,45 L35,30 L40,30 Q45,30 45,25 Q45,20 40,20 L30,20 Q25,20 25,25 Q25,30 30,30 L35,30 L35,45 L30,45 Q15,45 15,30 Z" fill="currentColor"/>
              <path d="M85,30 Q85,15 70,15 L60,15 Q45,15 45,30 Q45,45 60,45 L65,45 L65,30 L60,30 Q55,30 55,25 Q55,20 60,20 L70,20 Q75,20 75,25 Q75,30 70,30 L65,30 L65,45 L70,45 Q85,45 85,30 Z" fill="currentColor"/>
            </svg>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Finitive
          </h1>
          <p className="text-gray-400 mt-2">Engineered for Infinite Productivity</p>
        </div>

        {/* Auth form */}
        <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-100 mb-2">
              {isSignUp ? 'Create Account' : 'Welcome Back'}
            </h2>
            <p className="text-gray-400 text-sm">
              {isSignUp ? 'Start your productivity journey' : 'Continue your goal achievement'}
            </p>
          </div>

          <form onSubmit={handleAuth} className="space-y-4">
            {isSignUp && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-800/60 border border-slate-600/50 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/50 transition-all duration-200"
                  placeholder="your username"
                  required
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-slate-800/60 border border-slate-600/50 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/50 transition-all duration-200"
                placeholder="your@email.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-slate-800/60 border border-slate-600/50 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/50 transition-all duration-200"
                placeholder="••••••••"
                minLength={8}
                required
              />
              {isSignUp && (
                <div className="text-xs text-gray-400 mt-1">
                  Password must be at least 8 characters, include a capital letter, a number, and a symbol.
                </div>
              )}
            </div>
            {message && (
              <div className={`p-3 rounded-lg text-sm ${
                message.includes('Check your email') || message.includes('Success')
                  ? 'bg-green-500/20 border border-green-500/30 text-green-300'
                  : 'bg-red-500/20 border border-red-500/30 text-red-300'
              }`}>
                {message}
              </div>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-cyan-400 to-blue-400 text-slate-900 py-3 px-4 rounded-lg font-medium hover:from-cyan-300 hover:to-blue-300 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {loading ? 'Loading...' : (isSignUp ? 'Create Account' : 'Sign In')}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setIsSignUp(!isSignUp); // Fix: should toggle isSignUp, not call setIsSignUp with itself
                setMessage('');
              }}
              className="text-cyan-400 hover:text-cyan-300 text-sm transition-colors duration-200"
            >
              {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
            </button>
          </div>
        </div>

        {/* Demo note */}
        <div className="mt-6 text-center">
          <p className="text-gray-500 text-xs">
            V1.0 - Your data is securely stored and only visible to you
          </p>
        </div>
      </div>
    </div>
  );
};

// Loading component
const LoadingScreen = () => (
  <div className="min-h-screen bg-[#0b0f1a] flex items-center justify-center">
    <div className="text-center">
      <div className="w-16 h-16 mx-auto mb-4 text-cyan-300 animate-pulse">
        <svg viewBox="0 0 100 60" className="w-full h-full drop-shadow-[0_0_8px_#00d9ff]">
          <path d="M15,30 Q15,15 30,15 L40,15 Q55,15 55,30 Q55,45 40,45 L35,45 L35,30 L40,30 Q45,30 45,25 Q45,20 40,20 L30,20 Q25,20 25,25 Q25,30 30,30 L35,30 L35,45 L30,45 Q15,45 15,30 Z" fill="currentColor"/>
          <path d="M85,30 Q85,15 70,15 L60,15 Q45,15 45,30 Q45,45 60,45 L65,45 L65,30 L60,30 Q55,30 55,25 Q55,20 60,20 L70,20 Q75,20 75,25 Q75,30 70,30 L65,30 L65,45 L70,45 Q85,45 85,30 Z" fill="currentColor"/>
        </svg>
      </div>
      <p className="text-gray-400">Loading Finitive...</p>
    </div>
  </div>
);

// Main AuthWrapper component
interface AuthWrapperProps {
  children: React.ReactNode;
}

export default function AuthWrapper({ children }: AuthWrapperProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
      setLoading(false);
    };

    getSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user || null);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  if (!user) {
    return <AuthPage />;
  }

  return (
    <div className="relative">
      {/* Add logout button to header */}
      <div className="absolute top-4 right-4 z-50">
        <button
          onClick={async () => {
            await supabase.auth.signOut();
          }}
          className="bg-slate-800/60 hover:bg-slate-700/60 text-gray-300 hover:text-white px-3 py-1 rounded-lg text-sm transition-all duration-200 backdrop-blur-sm border border-slate-600/50"
        >
          Sign Out
        </button>
      </div>
      {children}
    </div>
  );
}
