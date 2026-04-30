import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag, ShieldCheck, Zap, Star } from 'lucide-react';
import { PRODUCTS } from '../data/products';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProducts(PRODUCTS);
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const features = [
    {
      name: 'Fast Shipping',
      description: 'Get your orders delivered instantly to your door.',
      icon: <Zap className="w-5 h-5 text-zinc-400" />,
    },
    {
      name: 'Secure Payments',
      description: 'Your payment data is fully encrypted and safe.',
      icon: <ShieldCheck className="w-5 h-5 text-zinc-400" />,
    },
    {
      name: 'Vast Collection',
      description: 'Find everything you need in our extensive database.',
      icon: <ShoppingBag className="w-5 h-5 text-zinc-400" />,
    },
  ];

  return (
    <div className="flex flex-col gap-16 pb-16">
      {/* Hero Section */}
      <section className="text-center py-20 px-6 sm:px-12 bg-zinc-900 rounded-lg border border-zinc-800">
        <div className="max-w-3xl mx-auto flex flex-col items-center">
          <div className="inline-flex items-center px-3 py-1 mb-6 rounded bg-zinc-800 text-xs font-medium text-zinc-400">
            New Arrivals For 2026
          </div>
          <h1 className="text-4xl md:text-5xl font-medium text-zinc-200 mb-6 tracking-tight">
            Welcome to ShopSmart
          </h1>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto mb-10">
            Experience the future of e-commerce. Curated collections, fast delivery, and reliable quality.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto">
            <Link
              to="/products"
              className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium rounded text-zinc-900 bg-zinc-200 hover:bg-zinc-300 transition-colors"
            >
              Start Shopping
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium rounded text-zinc-300 bg-zinc-800 hover:bg-zinc-700 transition-colors border border-zinc-700"
            >
              Login <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="px-2">
        <div className="flex justify-between items-end mb-8 border-b border-zinc-800 pb-4">
          <div>
            <h2 className="text-xl font-medium text-zinc-200">Featured Products</h2>
            <p className="text-zinc-500 mt-1 text-sm">Handpicked premium items just for you.</p>
          </div>
          <Link to="/products" className="text-sm text-zinc-400 hover:text-zinc-300 flex items-center transition-colors">
            View All <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6" data-testid="loading-skeleton">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-zinc-900 rounded-lg p-4 border border-zinc-800 h-80 flex flex-col justify-end">
                <div className="w-full h-48 bg-zinc-800 rounded mb-4 animate-pulse"></div>
                <div className="h-4 bg-zinc-800 rounded w-3/4 mb-2 animate-pulse"></div>
                <div className="h-4 bg-zinc-800 rounded w-1/4 animate-pulse"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products.map(product => (
              <div key={product.id} className="bg-zinc-900 rounded-lg p-4 border border-zinc-800 transition-colors hover:border-zinc-700" data-testid="product-card">
                <div className="relative overflow-hidden rounded mb-4 h-48 bg-zinc-800">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity" />
                  <div className="absolute top-2 right-2 bg-zinc-900/90 px-2 py-1 rounded text-xs font-medium flex items-center text-zinc-300">
                    <Star className="w-3 h-3 text-zinc-500 mr-1" /> {product.rating}
                  </div>
                </div>
                <h3 className="text-sm font-medium text-zinc-300 mb-1">{product.name}</h3>
                <div className="flex justify-between items-center mt-4 pt-4 border-t border-zinc-800">
                  <span className="text-base font-medium text-zinc-200">${product.price}</span>
                  <button className="text-zinc-500 hover:text-zinc-300 transition-colors p-1">
                    <ShoppingBag className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Features */}
      <section className="bg-zinc-900 rounded-lg p-8 border border-zinc-800">
        <h2 className="text-xl font-medium text-center mb-8 text-zinc-200">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div key={feature.name} className="flex flex-col items-center text-center p-6 bg-zinc-950 rounded-lg border border-zinc-800/50">
              <div className="p-3 bg-zinc-800 rounded mb-4 text-zinc-400">
                {feature.icon}
              </div>
              <h3 className="text-base font-medium text-zinc-300 mb-2">{feature.name}</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
