'use client';
import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      setMessage(error.message);
    } else {
      setMessage('Check your email for a verification link!');
    }
  };

  return (
    <form onSubmit={handleSignup} className="flex flex-col gap-4 max-w-sm mx-auto mt-10">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        className="input"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
        className="input"
      />
      <button type="submit" className="btn">Sign Up</button>
      {message && <p>{message}</p>}
    </form>
  );
}
