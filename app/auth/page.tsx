'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

export default function AuthPage() {
  const router = useRouter();
  const { signUp, signIn, message } = useAuth();

  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [displayName, setDisplayName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (isSignUp) {
      await signUp(email, password, displayName);
    } else {
      const success = await signIn(email, password);
      if (success) router.push('/home');
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-6 text-white">
      <div className="w-full max-w-100 space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-center text-5xl font-bold">
            ✨
            <span className="gradient bg-clip-text text-5xl tracking-tighter text-transparent">
              ClipCast
            </span>
          </h1>
          <p className="mt-2 text-gray-400">
            {isSignUp
              ? 'Join the ClipCast community'
              : 'Welcome back to ClipCast'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <input
              type="text"
              placeholder="Display Name"
              value={displayName}
              required
              className="w-full rounded-lg border border-gray-700 bg-gray-900/50 p-3 transition-colors outline-none focus:border-purple-500"
              onChange={(e) => setDisplayName(e.target.value)}
            />
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            required
            className="w-full rounded-lg border border-gray-700 bg-gray-900/50 p-3 transition-colors outline-none focus:border-purple-500"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            required
            className="w-full rounded-lg border border-gray-700 bg-gray-900/50 p-3 transition-colors outline-none focus:border-purple-500"
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Feedback Message */}
          {message && (
            <div
              className={`rounded border bg-gray-900 p-3 text-sm ${message.includes('success') || message.includes('email') ? 'border-green-900 text-green-400' : 'border-red-900 text-red-400'}`}
            >
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-linear-to-r from-purple-600 to-pink-400 p-3 text-sm font-semibold text-white transition-all hover:bg-purple-700 active:scale-[0.98] disabled:opacity-50"
          >
            {loading
              ? 'Processing...'
              : isSignUp
                ? 'Create Account'
                : 'Continue'}
          </button>
        </form>

        {/* Toggle */}
        <p className="text-center text-sm text-gray-500">
          {isSignUp ? 'Already have an account?' : 'New to ClipCast?'}
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="ml-2 font-medium text-purple-400 hover:underline"
          >
            {isSignUp ? 'Log in' : 'Sign up'}
          </button>
        </p>
      </div>
    </div>
  );
}
