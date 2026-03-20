import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Categories() {
  const categories = [
    {
      name: "Over-Ear Headphones",
      count: "120+ Products",
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
    },
    {
      name: "In-Ear Earbuds",
      count: "85+ Products",
      image:
        "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&q=80",
    },
    {
      name: "Noise Cancelling",
      count: "40+ Products",
      image:
        "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&q=80",
    },
    {
      name: "Gaming Headsets",
      count: "60+ Products",
      image:
        "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800&q=80",
    },
    {
      name: "Studio Monitors",
      count: "25+ Products",
      image:
        "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&q=80",
    },
    {
      name: "Sports & Active",
      count: "55+ Products",
      image:
        "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&q=80",
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
          <span className="text-gray-900 font-medium">Categories</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-[#003D29] mb-4">
          Shop by Category
        </h1>
        <p className="text-gray-600 mb-12 max-w-2xl text-lg">
          Explore our wide range of premium audio equipment designed for every
          lifestyle, profession, and passion.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              className="group cursor-pointer rounded-3xl overflow-hidden bg-[#F8F9FA] relative aspect-4/3 flex items-center justify-center p-8"
            >
              <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent z-10 transition-opacity group-hover:from-black/80"></div>
              <img
                src={cat.image}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute bottom-0 left-0 w-full p-8 z-20">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {cat.name}
                </h3>
                <p className="text-gray-200">{cat.count}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
