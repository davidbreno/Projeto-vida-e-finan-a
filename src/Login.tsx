import { useState } from 'react';

const API_URL = 'http://localhost:4000/api/auth';

export default function Login({ onLogin }: { onLogin: (token: string) => void }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    try {
      const endpoint = isRegister ? '/register' : '/login';
      const res = await fetch(API_URL + endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Erro');
      if (isRegister) {
        setIsRegister(false);
        setUsername('');
        setPassword('');
        setError('Cadastro realizado! Faça login.');
      } else {
        onLogin(data.token);
      }
    } catch (err: any) {
      setError(err.message);
    }
  }

  return (
    <div className='flex min-h-screen items-center justify-center bg-dashboard-background'>
      <form className='w-full max-w-sm rounded-xl border border-dashboard-border bg-dashboard-surface p-8 shadow-card flex flex-col gap-4' onSubmit={handleSubmit}>
        <h2 className='text-2xl font-bold text-dashboard-accent mb-2'>{isRegister ? 'Cadastro' : 'Login'}</h2>
        <input
          className='rounded px-3 py-2 border border-dashboard-border bg-dashboard-background text-dashboard-text'
          type='text'
          placeholder='Usuário'
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
        <input
          className='rounded px-3 py-2 border border-dashboard-border bg-dashboard-background text-dashboard-text'
          type='password'
          placeholder='Senha'
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        {error && <div className='text-red-500 text-sm'>{error}</div>}
        <button type='submit' className='rounded bg-dashboard-accent text-white py-2 font-semibold hover:bg-dashboard-accent/80'>
          {isRegister ? 'Cadastrar' : 'Entrar'}
        </button>
        <button type='button' className='text-sm text-dashboard-muted mt-2' onClick={() => setIsRegister(r => !r)}>
          {isRegister ? 'Já tem conta? Faça login' : 'Não tem conta? Cadastre-se'}
        </button>
      </form>
    </div>
  );
}
