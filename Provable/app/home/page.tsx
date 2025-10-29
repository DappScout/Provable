"use client";
import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

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
              {/* SEO 3D Image with Glow Effect */}
              <div className="relative w-[150px] h-[112px] md:w-[200px] md:h-[150px]">
                {/* Blurred duplicate for glow effect */}
                <Image
                  src="/SEO.png"
                  alt=""
                  fill
                  sizes="(max-width: 768px) 200px, (max-width: 1024px) 250px, 300px"
                  className="object-contain blur-lg opacity-60 scale-110"
                  priority
                />
                {/* Main image */}
                <Image
                  src="/SEO.png"
                  alt="SEO"
                  fill
                  sizes="(max-width: 768px) 200px, (max-width: 1024px) 250px, 300px"
                  className="object-contain relative z-10"
                  priority
                />
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

            {/* Target with Arrow 3D Image with Glow Effect */}
            <div className="flex-shrink-0 ml-12 mt-4">
            <div className="relative w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48">
                {/* Blurred duplicate for glow effect */}
                <Image
                 src="/Arrow.png"
                 alt=""
                 fill
                 sizes="(max-width: 768px) 128px, (max-width: 1024px) 160px, 192px"
                 className="object-contain blur-lg opacity-60 scale-110"
                 priority
                />
                {/* Main image */}
                <Image
                 src="/Arrow.png"
                 alt="Target with arrow"
                 fill
                 sizes="(max-width: 768px) 128px, (max-width: 1024px) 160px, 192px"
                 className="object-contain relative z-10"
                 priority
                />
              </div>
            </div>
          </div>

          {/* Create Offer Button */}
          <div className="mt-16 flex justify-center">
          <Button 
             variant="round"     // or "primary", "secondary"
             size="lg"           // or "sm", "md" 
             width="auto"        // or "full", "fit", "300px"
           >
             Create an offer
           </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
