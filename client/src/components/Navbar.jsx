import { Menu, Phone, Search, ShoppingCart, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

const Navbar = () => {
  const { getCartCount } = useCart();

  return (
    <nav className="w-full bg-white z-50 font-sans">
      {/* Top Bar */}
      <div className="bg-[#003D29] text-white py-2 text-xs font-medium">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1">
              <Phone size={14} />
              <span>+001234567890</span>
            </span>
          </div>
          <div className="hidden md:block text-center flex-1">
            Get 50% Off on Selected Items | Shop Now
          </div>
          <div className="flex items-center space-x-4">
            <span>Eng</span>
            <span>Location</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between gap-4 md:gap-8">
            {/* Left: Mobile Menu & Logo */}
            <div className="flex items-center gap-4">
              <button className="md:hidden p-1 text-gray-600 hover:text-black">
                <Menu size={24} />
              </button>
              <Link
                to="/"
                className="flex items-center gap-2 text-2xl font-bold text-[#003D29]"
              >
                <div className="w-8 h-8 bg-[#003D29] text-white rounded-md flex items-center justify-center">
                  <ShoppingCart size={18} />
                </div>
                <span>Shopcart</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-700">
              <Link to="/categories" className="hover:text-[#003D29]">
                Categories
              </Link>
              <Link to="/deals" className="hover:text-[#003D29]">
                Deals
              </Link>
              <Link to="/whats-new" className="hover:text-[#003D29]">
                What&apos;s New
              </Link>
              <Link to="/delivery" className="hover:text-[#003D29]">
                Delivery
              </Link>
            </div>

            {/* Right: Search, Account, Cart */}
            <div className="flex items-center gap-4 flex-1 md:flex-none justify-end">
              <div className="hidden md:flex relative w-64">
                <input
                  type="text"
                  placeholder="Search Product"
                  className="w-full bg-gray-100 rounded-full py-2.5 pl-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-[#003D29]/20"
                />
                <Search
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#003D29] cursor-pointer"
                  size={18}
                />
              </div>

              <Link
                to="/profile"
                className="flex items-center gap-2 text-gray-700 hover:text-[#003D29]"
                aria-label="Account"
              >
                <User size={22} />
                <span className="hidden lg:block text-sm font-medium">
                  Account
                </span>
              </Link>

              <Link
                to="/cart"
                className="flex items-center gap-2 text-gray-700 hover:text-[#003D29] relative"
                aria-label="Cart"
              >
                <div className="relative">
                  <ShoppingCart size={22} />
                  {getCartCount() > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                      {getCartCount()}
                    </span>
                  )}
                </div>
                <span className="hidden lg:block text-sm font-medium">
                  Cart
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
