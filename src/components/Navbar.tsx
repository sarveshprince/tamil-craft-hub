import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useStore } from '@/context/StoreContext';
import logo from '@/assets/logo.jpeg';
import { ShoppingCart, LogOut, Menu, X, Wifi, WifiOff } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
  const { user, username, logout, cart, isOnline } = useStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const links = [
    { to: '/', label: 'Home / முகப்பு' },
    { to: '/shop', label: 'Shop / கடை' },
    { to: '/about', label: 'About / எங்களைப்பற்றி' },
    { to: '/learning', label: 'Learning / கற்றல்' },
    ...(user === 'maker' ? [{ to: '/maker', label: 'Dashboard / பலகை' }] : []),
  ];

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto flex items-center justify-between py-3 px-4">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="Magalir Sakthi" className="w-10 h-10 rounded-full object-cover" />
          <div className="hidden sm:block">
            <span className="font-display font-bold text-lg text-gradient-warm">Magalir Sakthi</span>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {links.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm font-medium transition hover:text-primary ${location.pathname === link.to ? 'text-primary' : 'text-muted-foreground'}`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {!isOnline && <WifiOff className="w-4 h-4 text-destructive" />}
          {isOnline && <Wifi className="w-4 h-4 text-secondary" />}

          {user === 'customer' && (
            <Link to="/cart" className="relative p-2 hover:bg-muted rounded-lg transition">
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center font-bold">
                  {totalItems}
                </span>
              )}
            </Link>
          )}

          <span className="hidden sm:inline text-xs text-muted-foreground">{username}</span>

          <button onClick={handleLogout} className="p-2 hover:bg-muted rounded-lg transition" title="Logout">
            <LogOut className="w-4 h-4" />
          </button>

          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 hover:bg-muted rounded-lg">
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-border bg-card px-4 py-3 space-y-2">
          {links.map(link => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className={`block py-2 text-sm font-medium ${location.pathname === link.to ? 'text-primary' : 'text-muted-foreground'}`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
