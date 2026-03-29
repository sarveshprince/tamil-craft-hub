import { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import { useNavigate } from 'react-router-dom';
import logo from '@/assets/logo.jpeg';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useStore();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(username, password)) {
      navigate('/');
    } else {
      setError('Invalid credentials / தவறான சான்றுகள்');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        <div className="card-3d card-3d-shadow bg-card rounded-2xl p-8 border border-border">
          <div className="flex flex-col items-center mb-8">
            <img src={logo} alt="Magalir Sakthi" className="w-28 h-28 rounded-full object-cover mb-4 border-4 border-primary/20" />
            <h1 className="text-2xl font-display font-bold text-gradient-warm">Magalir Sakthi</h1>
            <p className="font-tamil text-muted-foreground mt-1">மகளிர் சக்தி - Women Empowerment</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">Username / பயனர்பெயர்</label>
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
                placeholder="Enter username"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Password / கடவுச்சொல்</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
                placeholder="Enter password"
              />
            </div>
            {error && <p className="text-destructive text-sm">{error}</p>}
            <button type="submit" className="w-full py-3 rounded-lg bg-gradient-warm font-semibold text-primary-foreground hover:opacity-90 transition">
              Login / உள்நுழை
            </button>
          </form>
          <div className="mt-6 p-4 bg-muted rounded-lg text-xs text-muted-foreground space-y-1">
            <p className="font-semibold text-foreground">Demo Credentials:</p>
            <p>Customer: eco_shopper01 / palmClient2026</p>
            <p>Maker: artisan_rural_01 / craftMaster55</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
