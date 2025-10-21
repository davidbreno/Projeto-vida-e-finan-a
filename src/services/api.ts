const API_URL = 'http://localhost:4000/api';

export async function getUserData(token: string) {
  const res = await fetch(`${API_URL}/user/me`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) throw new Error('Erro ao buscar dados do usuário');
  return await res.json();
}

export async function saveDashboardState(token: string, state: any) {
  const res = await fetch(`${API_URL}/user/me`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(state)
  });
  if (!res.ok) throw new Error('Erro ao salvar dados');
  return await res.json();
}
