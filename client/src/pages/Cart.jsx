import { useCart } from "../context/CartContext";
import { Trash2, Minus, Plus } from "lucide-react";
import { Link } from "react-router-dom";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart();

  if (cart.length === 0) {
    return (
      <div className="bg-[#F8F9FA] min-h-screen pt-32 pb-20 px-4 flex flex-col items-center justify-center font-sans">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          Your Cart is Empty
        </h1>
        <p className="text-gray-600 mb-8 max-w-md text-center">
          It looks like you haven&apos;t added anything to your cart yet.
          Discover our premium audio products.
        </p>
        <Link
          to="/"
          className="bg-[#003D29] text-white px-8 py-4 rounded-full font-semibold hover:bg-green-900 transition-colors shadow-lg shadow-green-900/20"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#F8F9FA] min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-12">
          Shopping Cart
        </h1>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Cart Items */}
          <div className="flex-1">
            <div className="space-y-6">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-4xl p-6 flex flex-col sm:flex-row items-center gap-6 shadow-sm border border-gray-100 relative"
                >
                  <div className="bg-[#F8F9FA] rounded-2xl w-32 h-32 flex items-center justify-center p-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="max-h-full object-contain"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-center sm:pr-12 w-full">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-2xl font-bold text-gray-900">
                        {item.name}
                      </h3>
                      <p className="text-xl font-bold text-[#003D29]">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                    <p className="text-sm text-gray-500 mb-6">
                      {item.material || "Premium Selection"}
                    </p>

                    <div className="flex items-center justify-between">
                      {/* Quantity Control */}
                      <div className="flex items-center gap-4 bg-gray-50 rounded-full px-4 py-2 border border-gray-200">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white hover:text-red-500 transition-colors shadow-sm"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="font-semibold text-lg min-w-6 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white hover:text-green-600 transition-colors shadow-sm"
                        >
                          <Plus size={16} />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors absolute sm:static top-6 right-6"
                        aria-label="Remove item"
                      >
                        <Trash2 size={24} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Checkout Summary */}
          <div className="w-full lg:w-100">
            <div className="bg-white rounded-4xl p-8 shadow-sm border border-gray-100 sticky top-32">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">
                Order Summary
              </h2>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-semibold text-gray-900">
                    ${getCartTotal().toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="font-semibold text-green-600">Free</span>
                </div>
                <div className="flex justify-between text-gray-600 pb-4 border-b border-gray-100">
                  <span>Tax (Est.)</span>
                  <span className="font-semibold text-gray-900">
                    ${(getCartTotal() * 0.08).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-xl font-bold text-gray-900 pt-2">
                  <span>Total</span>
                  <span>${(getCartTotal() * 1.08).toFixed(2)}</span>
                </div>
              </div>

              <button className="w-full bg-[#003D29] text-white py-4 rounded-full font-bold text-lg hover:bg-green-900 transition-all shadow-lg shadow-green-900/20 active:scale-[0.98]">
                Proceed to Checkout
              </button>
              <div className="mt-6 text-center text-sm font-medium text-gray-500 flex items-center justify-center gap-2">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect
                    x="3"
                    y="11"
                    width="18"
                    height="11"
                    rx="2"
                    ry="2"
                  ></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
                Secure Checkout
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
