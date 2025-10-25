"use client";
import React from 'react';

export default function HomeExample() {
  return (
    <div className="min-h-screen bg-[#121212]">
      {/* Main Content */}
      <div className="overflow-auto">
        {/* Hero Section */}
        <div className="px-6 pt-12 pb-8">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h1 className="text-white text-3xl font-bold mb-4">
                Grow your business
              </h1>
              <p className="text-[#B0B0B0] text-base leading-relaxed">
                Sign offers with top SEO<br />specialists with ease
              </p>
            </div>
            <div className="flex-shrink-0 ml-8">
              {/* SEO Glowing Text - Replace with actual image once available */}
              <div className="text-[80px] font-bold tracking-wider"
                   style={{
                     color: '#7CB3E8',
                     textShadow: '0 0 20px rgba(124, 179, 232, 0.8), 0 0 40px rgba(124, 179, 232, 0.6), 0 0 60px rgba(124, 179, 232, 0.4)',
                     WebkitTextStroke: '2px rgba(124, 179, 232, 0.5)'
                   }}>
                SEO
              </div>
            </div>
          </div>
        </div>

        {/* How it works Section */}
        <div className="px-6 pt-8">
          <h2 className="text-white text-3xl font-bold mb-12">
            How it works
          </h2>

          <div className="flex items-start justify-between">
            {/* Steps List */}
            <div className="flex-1 space-y-8">
              {/* Step 1 */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#6DD4C5] flex items-center justify-center flex-shrink-0">
                  <span className="text-[#121212] text-xl font-bold">1</span>
                </div>
                <p className="text-white text-lg">Find a SEO specialist</p>
              </div>

              {/* Step 2 */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#6DD4C5] flex items-center justify-center flex-shrink-0">
                  <span className="text-[#121212] text-xl font-bold">2</span>
                </div>
                <p className="text-white text-lg">Agree on budget and timeline</p>
              </div>

              {/* Step 3 */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#6DD4C5] flex items-center justify-center flex-shrink-0">
                  <span className="text-[#121212] text-xl font-bold">3</span>
                </div>
                <p className="text-white text-lg">The work gets done</p>
              </div>

              {/* Step 4 */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#6DD4C5] flex items-center justify-center flex-shrink-0">
                  <span className="text-[#121212] text-xl font-bold">4</span>
                </div>
                <p className="text-white text-lg">You reach website growth your goals</p>
              </div>
            </div>

            {/* Target Icon - Replace with actual image once available */}
            <div className="flex-shrink-0 ml-8 mt-8">
              <div className="relative w-32 h-32">
                {/* Target circles */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-lg">
                  <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center">
                      <div className="w-8 h-8 rounded-full bg-white"></div>
                    </div>
                  </div>
                </div>
                {/* Arrow */}
                <div className="absolute -left-8 top-1/2 -translate-y-1/2">
                  <div className="relative">
                    <div className="w-12 h-1 bg-gradient-to-r from-blue-400 to-blue-500 rotate-[-15deg]"></div>
                    <div className="absolute right-0 top-1/2 -translate-y-1/2">
                      <div className="w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[10px] border-l-blue-500"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Create Offer Button */}
          <div className="mt-16 flex justify-center">
            <button className="bg-[#6DD4C5] hover:bg-[#5EC3B4] text-[#121212] text-lg font-semibold px-12 py-4 rounded-3xl transition-colors">
              Create an offer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

