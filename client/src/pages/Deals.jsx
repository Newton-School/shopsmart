import { ChevronRight, Percent } from "lucide-react";
import { Link } from "react-router-dom";

export default function Deals() {
  const deals = [
    {
      title: "Special Deal 1",
      discount: "50% Off",
      name: "Premium Wireless Headset",
      originalPrice: "$299",
      price: "$149",
      image:
        "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&q=80",
    },
    {
      title: "Weekend Offer",
      discount: "30% Off",
      name: "Sport Bluetooth Earbuds",
      originalPrice: "$129",
      price: "$89",
      image:
        "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&q=80",
    },
    {
      title: "Limited Time",
      discount: "$50 Off",
      name: "Studio Pro Monitors",
      originalPrice: "$349",
      price: "$299",
      image:
        "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&q=80",
    },
  ];

  return (
    <div className="bg-[#FBF0E4]/30 min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link to="/" className="hover:text-[#003D29]">
            Home
          </Link>
          <ChevronRight size={14} />
          <span className="text-gray-900 font-medium">Deals</span>
        </div>

        <div className="flex items-center gap-4 mb-12">
          <div className="w-16 h-16 bg-[#003D29] text-white rounded-2xl flex items-center justify-center shadow-lg">
            <Percent size={32} />
          </div>
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-[#003D29]">
              Exclusive Deals
            </h1>
            <p className="text-gray-600 mt-2 text-lg">
              Hurry up! These offers won&apos;t last long.
            </p>
          </div>
        </div>

        <div className="space-y-12">
          {deals.map((deal, idx) => (
            <div
              key={idx}
              className="bg-white rounded-[3rem] p-8 md:p-12 shadow-sm border border-[#003D29]/10 flex flex-col md:flex-row items-center gap-12 group hover:shadow-xl transition-shadow duration-300 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-100 h-100 bg-[#003D29]/5 rounded-full blur-[100px] -z-10 translate-x-1/2 -translate-y-1/2"></div>

              <div className="w-full md:w-1/3 bg-[#F8F9FA] rounded-4xl p-8 flex justify-center items-center aspect-square">
                <img
                  src={deal.image}
                  alt={deal.name}
                  className="w-full h-auto object-contain max-h-75 group-hover:scale-110 transition-transform duration-500 drop-shadow-2xl"
                />
              </div>

              <div className="flex-1 w-full space-y-6">
                <span className="inline-block px-4 py-2 bg-red-100 text-red-600 font-bold rounded-full text-sm tracking-wide uppercase">
                  {deal.discount}
                </span>
                <h3 className="text-4xl font-bold text-gray-900 mb-2">
                  {deal.name}
                </h3>
                <p className="text-gray-500 text-lg leading-relaxed max-w-xl">
                  {deal.title} - Get the best audio experience at a fraction of
                  the price. Limited stock available.
                </p>
                <div className="flex items-baseline gap-4 pt-4">
                  <span className="text-3xl font-bold text-[#003D29]">
                    {deal.price}
                  </span>
                  <span className="text-xl text-gray-400 line-through">
                    {deal.originalPrice}
                  </span>
                </div>

                <button className="bg-[#003D29] text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-green-900 transition-colors shadow-md mt-4">
                  Claim Deal
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
