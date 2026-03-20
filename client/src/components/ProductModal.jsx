import { X } from "lucide-react";
import PropTypes from "prop-types";
import { useCart } from "../context/CartContext";

const ProductModal = ({ product, isOpen, onClose }) => {
  const { addToCart } = useCart();

  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-3xl overflow-hidden shadow-2xl w-full max-w-4xl flex flex-col md:flex-row relative animate-in fade-in zoom-in duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
        >
          <X size={20} className="text-gray-600" />
        </button>

        {/* Image Section */}
        <div className="w-full md:w-1/2 bg-[#F8F9FA] p-8 flex items-center justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-auto object-contain max-h-100 drop-shadow-2xl"
          />
        </div>

        {/* Details Section */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {product.name}
            </h2>
            <p className="text-2xl font-semibold text-[#003D29]">
              ${product.price}
            </p>
          </div>

          <p className="text-gray-600 mb-8 leading-relaxed">
            {product.description ||
              "Experience premium sound quality and ultimate comfort with these modern headphones. Perfect for music lovers and professionals alike."}
          </p>

          <div className="space-y-4 mb-8">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <span className="text-gray-500">Material</span>
              <span className="font-medium text-gray-900">
                {product.material || "Premium Audio Grade"}
              </span>
            </div>
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <span className="text-gray-500">Connectivity</span>
              <span className="font-medium text-gray-900">Bluetooth 5.0</span>
            </div>
          </div>

          <button
            onClick={() => {
              addToCart(product);
              // Optional: close modal after adding, or show a toast
              onClose();
            }}
            className="w-full py-4 bg-[#003D29] text-white rounded-full font-semibold text-lg hover:bg-green-900 transition-colors shadow-md"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

ProductModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  product: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number,
    description: PropTypes.string,
    material: PropTypes.string,
  }),
};

export default ProductModal;
