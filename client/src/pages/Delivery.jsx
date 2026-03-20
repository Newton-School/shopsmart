import { ChevronRight, Truck, Clock, ShieldCheck, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

export default function Delivery() {
  return (
    <div className="bg-white min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link to="/" className="hover:text-[#003D29]">
            Home
          </Link>
          <ChevronRight size={14} />
          <span className="text-gray-900 font-medium">
            Delivery Information
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="text-[#003D29] bg-[#FBF0E4] w-16 h-16 rounded-2xl flex items-center justify-center mb-8 shadow-sm">
              <Truck size={32} strokeWidth={2.5} />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#003D29] leading-tight mb-6">
              Fast & Reliable Delivery Network
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-10">
              We know you want to experience your new audio gear as quickly as
              possible. That&apos;s why we&apos;ve partnered with the
              world&apos;s best logistics networks.
            </p>

            <div className="space-y-8">
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center shrink-0 border border-gray-100 shadow-sm">
                  <Clock size={24} className="text-[#003D29]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Same-Day Dispatch
                  </h3>
                  <p className="text-gray-500 leading-relaxed">
                    Orders placed before 2 PM local time are dispatched the
                    exact same business day, so your gear arrives faster.
                  </p>
                </div>
              </div>
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center shrink-0 border border-gray-100 shadow-sm">
                  <MapPin size={24} className="text-[#003D29]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Global Tracking
                  </h3>
                  <p className="text-gray-500 leading-relaxed">
                    Track your package in real-time right from your account.
                    You&apos;ll never have to wonder where your headphones are.
                  </p>
                </div>
              </div>
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center shrink-0 border border-gray-100 shadow-sm">
                  <ShieldCheck size={24} className="text-[#003D29]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Insured Shipping
                  </h3>
                  <p className="text-gray-500 leading-relaxed">
                    Every package is fully insured against damage or loss during
                    transit, giving you complete peace of mind.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#F8F9FA] rounded-[3rem] p-12 relative overflow-hidden h-full flex flex-col justify-center">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#FBF0E4] rounded-full blur-[100px] -z-10 translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-100/50 rounded-full blur-[100px] -z-10 -translate-x-1/2 translate-y-1/2"></div>

            <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b border-gray-200 pb-6">
              Delivery Options
            </h2>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between hover:border-[#003D29]/20 transition-colors">
                <div>
                  <h4 className="font-bold text-lg text-gray-900">
                    Standard Shipping
                  </h4>
                  <p className="text-gray-500 text-sm">3-5 Business Days</p>
                </div>
                <span className="font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full text-sm">
                  Free
                </span>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#003D29]/20 shadow-[#003D29]/5 relative flex items-center justify-between">
                <span className="absolute -top-3 left-6 bg-[#003D29] text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                  Most Popular
                </span>
                <div>
                  <h4 className="font-bold text-lg text-gray-900">
                    Express Delivery
                  </h4>
                  <p className="text-gray-500 text-sm">1-2 Business Days</p>
                </div>
                <span className="font-bold text-gray-900 bg-gray-50 px-3 py-1 border border-gray-100 rounded-full text-sm">
                  $12.99
                </span>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between hover:border-[#003D29]/20 transition-colors">
                <div>
                  <h4 className="font-bold text-lg text-gray-900">
                    Next Day Morning
                  </h4>
                  <p className="text-gray-500 text-sm">Before 12 PM Next Day</p>
                </div>
                <span className="font-bold text-gray-900 bg-gray-50 px-3 py-1 border border-gray-100 rounded-full text-sm">
                  $24.99
                </span>
              </div>
            </div>

            <div className="mt-10 px-6 py-4 bg-gray-100 rounded-xl text-center text-sm font-medium text-gray-600">
              International shipping available at checkout.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
