import { Sparkles, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function WhatsNew() {
  const products = [
    {
      title: "Next-Gen Audio",
      name: "Spatial Audio Max",
      arrivalDate: "Just Arrived",
      price: "$399",
      image:
        "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800&q=80",
    },
    {
      title: "Limited Edition",
      name: "Midnight Series",
      arrivalDate: "This Week",
      price: "$249",
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
    },
    {
      title: "Pro Streaming",
      name: "CastMic V2",
      arrivalDate: "Coming Soon",
      price: "$149",
      image:
        "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&q=80",
    },
  ];

  return (
    <div className="bg-white min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link to="/" className="hover:text-[#003D29]">
            Home
          </Link>
          <ChevronRight size={14} />
          <span className="text-gray-900 font-medium">What&apos;s New</span>
        </div>

        <div className="text-center max-w-3xl mx-auto mb-20 flex flex-col items-center">
          <div className="bg-amber-100 text-amber-600 px-4 py-2 rounded-full inline-flex items-center gap-2 font-bold mb-6 mx-auto uppercase tracking-widest text-sm">
            <Sparkles size={16} />
            Fresh Drops
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-[#003D29] leading-tight mb-6">
            Discover What&apos;s New
          </h1>
          <p className="text-xl text-gray-500 leading-relaxed max-w-2xl text-center">
            Stay ahead of the curve with our latest arrivals. The next
            generation of premium audio is here.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {products.map((product, idx) => (
            <div
              key={idx}
              className="group relative bg-[#F8F9FA] rounded-[2.5rem] overflow-hidden p-8 hover:bg-[#FBF0E4]/50 transition-colors duration-500 border border-transparent hover:border-[#FBF0E4] shadow-sm flex flex-col"
            >
              <span className="inline-block px-4 py-2 bg-white text-[#003D29] font-bold rounded-full text-xs tracking-wide uppercase shadow-sm self-start mb-8">
                {product.arrivalDate}
              </span>

              <div className="flex-1 flex justify-center items-center py-8">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-auto object-contain max-h-62.5 group-hover:-translate-y-4 transition-transform duration-500 drop-shadow-xl"
                />
              </div>

              <div className="mt-auto pt-8 border-t border-gray-200">
                <p className="text-gray-500 font-medium mb-1">
                  {product.title}
                </p>
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-gray-900">
                    {product.name}
                  </h3>
                  <span className="text-xl font-bold text-[#003D29]">
                    {product.price}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
