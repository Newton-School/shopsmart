import { Link } from 'react-router-dom';
import { Star, ShoppingBag } from 'lucide-react';
import { PRODUCTS } from '../data/products';

const Products = () => {
  return (
    <div className="flex flex-col gap-8 pb-16">
      <div className="border-b border-zinc-800 pb-4">
        <h1 className="text-2xl font-semibold text-zinc-100">All Products</h1>
        <p className="text-zinc-500 mt-1 text-sm">Browse our complete collection.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {PRODUCTS.map(product => (
          <Link to={`/products/${product.id}`} key={product.id} className="bg-zinc-900 rounded-lg p-4 border border-zinc-800 transition-colors hover:border-zinc-700 block group" data-testid={`product-${product.id}`}>
            <div className="relative overflow-hidden rounded mb-4 h-48 bg-zinc-800">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
              <div className="absolute top-2 right-2 bg-zinc-900/90 px-2 py-1 rounded text-xs font-medium flex items-center text-zinc-300">
                <Star className="w-3 h-3 text-zinc-500 mr-1" /> {product.rating}
              </div>
            </div>
            <h3 className="text-sm font-medium text-zinc-300 mb-1">{product.name}</h3>
            <div className="flex justify-between items-center mt-4 pt-4 border-t border-zinc-800">
              <span className="text-base font-medium text-zinc-200">${product.price}</span>
              <button className="text-zinc-500 hover:text-zinc-300 transition-colors p-1" onClick={(e) => e.preventDefault()}>
                <ShoppingBag className="w-4 h-4" />
              </button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Products;
