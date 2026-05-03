import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, LogOut } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="bg-zinc-900 border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-lg font-medium text-zinc-200">
              ShopSmart
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/products" className="text-zinc-400 hover:text-zinc-200 px-3 py-2 rounded text-sm font-medium transition-colors">
              Products
            </Link>
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="text-zinc-400 hover:text-zinc-200 px-3 py-2 rounded text-sm font-medium flex items-center gap-1 transition-colors">
                  <User size={16} /> Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-zinc-400 hover:text-zinc-200 px-3 py-2 rounded text-sm font-medium flex items-center gap-1 transition-colors"
                >
                  <LogOut size={16} /> Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-zinc-400 hover:text-zinc-200 px-3 py-2 rounded text-sm font-medium transition-colors">
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-zinc-800 text-zinc-300 hover:bg-zinc-700 px-4 py-2 rounded text-sm font-medium transition-colors border border-zinc-700"
                >
                  Sign Up
                </Link>
              </>
            )}
            <button className="text-zinc-400 hover:text-zinc-200 relative p-2 transition-colors">
              <ShoppingCart size={20} />
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold leading-none text-zinc-900 transform translate-x-1/4 -translate-y-1/4 bg-zinc-300 rounded-full">
                0
              </span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
