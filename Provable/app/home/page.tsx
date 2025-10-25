"use client";
import React from 'react';

export default function HomePage() {
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
              {/* SEO Glowing 3D Text */}
              <div 
                className="text-[100px] font-black tracking-wide select-none"
                style={{
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  color: '#A5D8FF',
                  textShadow: `
                    0 0 10px rgba(165, 216, 255, 1),
                    0 0 20px rgba(165, 216, 255, 0.8),
                    0 0 30px rgba(165, 216, 255, 0.6),
                    0 0 40px rgba(74, 144, 226, 0.5),
                    0 0 70px rgba(74, 144, 226, 0.4),
                    0 0 100px rgba(74, 144, 226, 0.3),
                    0 5px 3px rgba(0, 0, 0, 0.3),
                    0 8px 10px rgba(0, 0, 0, 0.2),
                    2px 2px 0 rgba(74, 144, 226, 0.5),
                    4px 4px 0 rgba(74, 144, 226, 0.3),
                    6px 6px 0 rgba(74, 144, 226, 0.2)
                  `,
                  WebkitTextStroke: '3px rgba(74, 144, 226, 0.3)',
                  filter: 'brightness(1.2)',
                  transform: 'perspective(500px) rotateY(-5deg)'
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

            {/* Target Icon 3D */}
            <div className="flex-shrink-0 ml-12 mt-4">
              <div className="relative w-40 h-40" style={{ transform: 'perspective(1000px) rotateY(-10deg)' }}>
                {/* Outer red ring */}
                <div 
                  className="absolute inset-0 rounded-full flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, #EF4444 0%, #DC2626 50%, #B91C1C 100%)',
                    boxShadow: `
                      0 10px 30px rgba(220, 38, 38, 0.4),
                      inset 0 -5px 15px rgba(0, 0, 0, 0.3),
                      inset 0 5px 10px rgba(255, 100, 100, 0.3)
                    `
                  }}>
                  {/* White ring */}
                  <div 
                    className="w-[75%] h-[75%] rounded-full flex items-center justify-center"
                    style={{
                      background: 'linear-gradient(135deg, #FFFFFF 0%, #F3F4F6 100%)',
                      boxShadow: 'inset 0 2px 8px rgba(0, 0, 0, 0.2)'
                    }}>
                    {/* Middle red ring */}
                    <div 
                      className="w-[70%] h-[70%] rounded-full flex items-center justify-center"
                      style={{
                        background: 'linear-gradient(135deg, #EF4444 0%, #DC2626 50%, #B91C1C 100%)',
                        boxShadow: `
                          0 5px 15px rgba(220, 38, 38, 0.3),
                          inset 0 -3px 8px rgba(0, 0, 0, 0.3),
                          inset 0 3px 6px rgba(255, 100, 100, 0.3)
                        `
                      }}>
                      {/* Inner white circle */}
                      <div 
                        className="w-[45%] h-[45%] rounded-full"
                        style={{
                          background: 'linear-gradient(135deg, #FFFFFF 0%, #F3F4F6 100%)',
                          boxShadow: 'inset 0 2px 5px rgba(0, 0, 0, 0.2)'
                        }}>
                </div>
                </div>
              </div>
            </div>

                {/* Arrow */}
                <div className="absolute -left-12 top-1/2 -translate-y-1/2 z-10" style={{ transform: 'rotate(-12deg)' }}>
                  {/* Arrow shaft */}
                  <div 
                    className="relative h-2 w-14 rounded-full"
                    style={{
                      background: 'linear-gradient(90deg, #60A5FA 0%, #3B82F6 100%)',
                      boxShadow: `
                        0 2px 8px rgba(59, 130, 246, 0.5),
                        0 4px 12px rgba(59, 130, 246, 0.3),
                        inset 0 1px 2px rgba(255, 255, 255, 0.3),
                        inset 0 -1px 2px rgba(0, 0, 0, 0.2)
                      `
                    }}>
                  </div>
                  {/* Arrow head */}
                  <div 
                    className="absolute -right-2 top-1/2 -translate-y-1/2"
                    style={{
                      width: 0,
                      height: 0,
                      borderTop: '8px solid transparent',
                      borderBottom: '8px solid transparent',
                      borderLeft: '12px solid #3B82F6',
                      filter: 'drop-shadow(0 2px 4px rgba(59, 130, 246, 0.4))'
                    }}>
                </div>
                  {/* Arrow tail feathers */}
                  <div className="absolute -left-1 top-1/2 -translate-y-1/2 flex gap-0.5">
                    <div 
                      style={{
                        width: 0,
                        height: 0,
                        borderTop: '4px solid transparent',
                        borderBottom: '4px solid transparent',
                        borderRight: '6px solid #3B82F6'
                      }}>
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
