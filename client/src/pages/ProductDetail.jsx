import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Star, ShoppingCart } from 'lucide-react';
import { PRODUCTS } from '../data/products';

const ProductDetail = () => {
  const { id } = useParams();
  const product = PRODUCTS.find(p => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="text-center py-20 text-zinc-400" data-testid="not-found">
        <h2 className="text-2xl mb-4 text-zinc-100">Product not found</h2>
        <Link to="/products" className="text-zinc-300 hover:text-zinc-100 underline">Back to Products</Link>
      </div>
    );
  }

  return (
    <div className="pb-16" data-testid="product-detail">
      <Link to="/products" className="inline-flex items-center text-sm text-zinc-400 hover:text-zinc-200 mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Products
      </Link>
      
      <div className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden flex flex-col md:flex-row">
        <div className="md:w-1/2 h-64 md:h-auto bg-zinc-800 relative">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover opacity-90" />
        </div>
        
        <div className="p-8 md:w-1/2 flex flex-col justify-center">
          <div className="flex items-center text-zinc-400 text-sm mb-4 bg-zinc-950 inline-block px-3 py-1 rounded w-max border border-zinc-800">
            <Star className="w-4 h-4 text-zinc-500 mr-1" /> {product.rating} Rating
          </div>
          
          <h1 className="text-3xl font-medium text-zinc-100 mb-2">{product.name}</h1>
          <p className="text-2xl font-semibold text-zinc-300 mb-6">${product.price}</p>
          
          <div className="border-t border-zinc-800 pt-6 mb-8">
            <h3 className="text-sm font-medium text-zinc-400 mb-2">Description</h3>
            <p className="text-zinc-500 leading-relaxed text-sm">
              {product.description}
            </p>
          </div>
          
          <button className="flex items-center justify-center w-full py-3 px-4 bg-zinc-200 text-zinc-900 rounded font-medium hover:bg-zinc-300 transition-colors">
            <ShoppingCart className="w-5 h-5 mr-2" /> Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
