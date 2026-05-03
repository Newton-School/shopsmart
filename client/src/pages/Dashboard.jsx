import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, LogOut, Package, CreditCard, ChevronRight } from 'lucide-react';
import { authApi } from '../services/api';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Check auth status
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchProfile = async () => {
      try {
        setLoading(true);
        const data = await authApi.me();
        setUser(data);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Failed to fetch user data. Please try again later.');
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">{error}</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name}!</h1>
          <p className="text-gray-500 mt-2">{user?.email}</p>
        </div>
        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-3xl font-bold">
          {user?.name?.charAt(0)}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer flex justify-between items-center group">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-100 text-purple-600 rounded-xl">
              <Package size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Orders</p>
              <h3 className="text-xl font-bold text-gray-900">12</h3>
            </div>
          </div>
          <ChevronRight className="text-gray-300 group-hover:text-blue-500 transition-colors" />
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer flex justify-between items-center group">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 text-green-600 rounded-xl">
              <CreditCard size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Payment Methods</p>
              <h3 className="text-xl font-bold text-gray-900">2 Saved</h3>
            </div>
          </div>
          <ChevronRight className="text-gray-300 group-hover:text-blue-500 transition-colors" />
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer flex justify-between items-center group">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-orange-100 text-orange-600 rounded-xl">
              <ShoppingCart size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Cart</p>
              <h3 className="text-xl font-bold text-gray-900">0 Items</h3>
            </div>
          </div>
          <ChevronRight className="text-gray-300 group-hover:text-blue-500 transition-colors" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
