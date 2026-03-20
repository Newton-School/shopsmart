import { ChevronDown, Filter } from "lucide-react";
import { useState } from "react";
import ProductModal from "./ProductModal";

const PRODUCTS = [
  {
    id: 1,
    name: "Wireless Headset",
    price: 199,
    material: "Organic Cotton",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=400",
    reviews: 121,
  },
  {
    id: 2,
    name: "Studio Pro",
    price: 299,
    material: "Premium Aluminum",
    image:
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&q=80&w=400",
    reviews: 342,
  },
  {
    id: 3,
    name: "Acoustic Noise",
    price: 149,
    material: "Matte Plastic",
    image:
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&q=80&w=400",
    reviews: 89,
  },
  {
    id: 4,
    name: "Bass Booster",
    price: 249,
    material: "Leather Pads",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=400",
    reviews: 215,
  },
  {
    id: 5,
    name: "Gamer Elite",
    price: 189,
    material: "RGB Polymer",
    image:
      "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=400",
    reviews: 450,
  },
  {
    id: 6,
    name: "Sport Earbuds",
    price: 89,
    material: "Silicone",
    image:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&q=80&w=400",
    reviews: 52,
  },
  {
    id: 7,
    name: "Classic Beats",
    price: 119,
    material: "Retro Steel",
    image:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&q=80&w=400",
    reviews: 93,
  },
  {
    id: 8,
    name: "DJ Monitor X",
    price: 349,
    material: "Carbon Fiber",
    image:
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&q=80&w=400",
    reviews: 671,
  },
];

const Hero = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <div className="bg-white min-h-screen font-sans w-full relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-20">
        {/* Main Hero Banner */}
        <div className="w-full bg-[#FBF0E4] rounded-3xl overflow-hidden relative flex flex-col md:flex-row items-center mb-12 shadow-sm min-h-125">
          {/* Text Content */}
          <div className="w-full md:w-1/2 p-10 md:p-20 z-10 flex flex-col items-start justify-center">
            <h1 className="text-4xl md:text-5xl lg:text-[4rem] leading-[1.1] font-bold text-[#003D29] mb-8 max-w-lg">
              Grab Upto 50% Off On Selected Headphone
            </h1>
            <button className="bg-[#003D29] text-white px-8 py-3.5 rounded-full text-base font-semibold hover:bg-green-900 transition-colors shadow-md">
              Buy Now
            </button>
          </div>

          {/* Image Content */}
          <div className="w-full md:w-1/2 static md:absolute right-0 top-0 h-full flex justify-end items-end md:items-center">
            <img
              src="https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=800"
              alt="Model with Headphones"
              className="w-full h-full object-cover md:object-contain object-bottom-right scale-110 md:scale-125 origin-bottom translate-y-4 md:translate-y-8 pr-12"
            />
          </div>
        </div>

        {/* Filter / Category Pills */}
        <div className="flex flex-wrap items-center gap-4 mb-20">
          {[
            "Headphone Type",
            "Price",
            "Review",
            "Color",
            "Material",
            "Offer",
          ].map((filter) => (
            <button
              key={filter}
              className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors"
            >
              {filter}
              <ChevronDown size={14} className="text-gray-500" />
            </button>
          ))}
          <button className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors ml-auto md:ml-0">
            All Filters
            <Filter size={14} className="text-gray-500" />
          </button>
        </div>

        {/* Headphones For You Section */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Headphones For You!
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {PRODUCTS.map((product) => (
              <div
                key={product.id}
                className="group relative cursor-pointer"
                onClick={() => setSelectedProduct(product)}
              >
                <div className="w-full aspect-4/5 bg-[#F8F9FA] rounded-[30px] overflow-hidden mb-4 relative p-6 flex items-center justify-center">
                  <button
                    className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-opacity z-10"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProduct(product);
                    }}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-gray-400 hover:text-[#003D29]"
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                  </button>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-auto max-h-50 object-contain group-hover:scale-110 transition-transform duration-500 drop-shadow-xl"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-gray-900 text-lg">
                      {product.name}
                    </h3>
                    <p className="font-bold text-gray-900 text-lg">
                      ${product.price}
                    </p>
                  </div>
                  <p className="text-sm text-gray-500">{product.material}</p>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg
                        key={i}
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="#003D29"
                        stroke="none"
                        className="text-[#003D29]"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                    <span className="text-sm text-gray-500 ml-1">
                      ({product.reviews})
                    </span>
                  </div>
                  <button
                    className="w-full py-3 mt-2 border border-black rounded-full text-sm font-semibold hover:bg-black hover:text-white transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProduct(product);
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ProductModal
        isOpen={!!selectedProduct}
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
};

export default Hero;
