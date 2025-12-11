'use client';

import { useState } from 'react';
import { supabaseBrowser } from '@/lib/supabase-browser';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const supabase = supabaseBrowser();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
  const{error}=await supabase.auth.signInWithPassword({
      email,
      password
    });
    router.refresh();

    if (error) {
      setErrorMessage(error.message);
    } else {
      router.push('/dashboard');
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: '40px auto' }}>
      <h1>Log In</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br /><br />
        
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br /><br />

        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

        <button type="submit">Log In</button>
      </form>

      <p style={{ marginTop: 20 }}>
        Don't have an account? <a href="/signup">Sign up</a>
      </p>
    </div>
  );
}
