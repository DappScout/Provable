"use client";
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#121212]">
      <div className="p-6">
        {/* Hero section */}
        <div className="text-center mb-12 mt-8">
          <h1 className="text-4xl font-bold mb-4 text-white">
            Grow your business
          </h1>
          <p className="text-[#B0B0B0] mb-8">
            Sign offers with top SEO specialists with ease
          </p>
          
          {/* Primary gradient button */}
          <Button 
            variant="primary"
            fullWidth
            onClick={() => router.push('/offers/create')}
          >
            Create an offer
          </Button>
        </div>

        {/* Button Testing Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-white">
            Button Testing - New Guidelines
          </h2>
          
          <div className="space-y-8">
            {/* Primary Buttons */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-[#98F7E9]">Primary - Main Actions</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-[#B0B0B0] text-sm mb-2">Full Width</p>
                  <Button variant="primary" width="full">
                    Create an offer
                  </Button>
                </div>
                <div>
                  <p className="text-[#B0B0B0] text-sm mb-2">Auto Width</p>
                  <Button variant="primary">
                    Submit
                  </Button>
                </div>
                <div>
                  <p className="text-[#B0B0B0] text-sm mb-2">Custom Width (200px)</p>
                  <Button variant="primary" width="200px">
                    Custom Width
                  </Button>
                </div>
              </div>
            </div>

            {/* Secondary Buttons */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-[#98F7E9]">Secondary - Alternative Actions</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-[#B0B0B0] text-sm mb-2">Full Width</p>
                  <Button variant="secondary" width="full">
                    Cancel
                  </Button>
                </div>
                <div>
                  <p className="text-[#B0B0B0] text-sm mb-2">Auto Width</p>
                  <Button variant="secondary">
                    Go Back
                  </Button>
                </div>
              </div>
            </div>

            {/* Alt1 - Text Links (Light) */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-[#98F7E9]">Alt1 - Text Links (Light)</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-[#B0B0B0] text-sm mb-2">Auto Width</p>
                  <Button variant="alt1">
                    Learn more
                  </Button>
                </div>
                <div>
                  <p className="text-[#B0B0B0] text-sm mb-2">Fit Width</p>
                  <Button variant="alt1" width="fit">
                    Read documentation
                  </Button>
                </div>
              </div>
            </div>

            {/* Alt2 - Text Links (Danger) */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-[#98F7E9]">Alt2 - Text Links (Danger)</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-[#B0B0B0] text-sm mb-2">Auto Width</p>
                  <Button variant="alt2">
                    Delete account
                  </Button>
                </div>
                <div>
                  <p className="text-[#B0B0B0] text-sm mb-2">Fit Width</p>
                  <Button variant="alt2" width="fit">
                    Remove permanently
                  </Button>
                </div>
              </div>
            </div>

            {/* Round - Special CTAs */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-[#98F7E9]">Round - Special CTAs</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-[#B0B0B0] text-sm mb-2">Auto Width</p>
                  <Button variant="round">
                    Get started
                  </Button>
                </div>
                <div>
                  <p className="text-[#B0B0B0] text-sm mb-2">Fit Width</p>
                  <Button variant="round" width="fit">
                    Start now
                  </Button>
                </div>
              </div>
            </div>

            {/* Disabled States */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-[#98F7E9]">Disabled - Non-interactive</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-[#B0B0B0] text-sm mb-2">Disabled Primary</p>
                  <Button variant="primary" disabled width="full">
                    Cannot click - conditions not met
                  </Button>
                </div>
                <div>
                  <p className="text-[#B0B0B0] text-sm mb-2">Disabled Secondary</p>
                  <Button variant="secondary" disabled>
                    Disabled button
                  </Button>
                </div>
              </div>
            </div>

            {/* Loading States */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-[#98F7E9]">Loading States</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-[#B0B0B0] text-sm mb-2">Loading Primary</p>
                  <Button variant="primary" loading width="full">
                    Processing...
                  </Button>
                </div>
                <div>
                  <p className="text-[#B0B0B0] text-sm mb-2">Loading Secondary</p>
                  <Button variant="secondary" loading>
                    Saving...
                  </Button>
                </div>
              </div>
            </div>

            {/* Width Examples */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-[#98F7E9]">Width Examples</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-[#B0B0B0] text-sm mb-2">Full Width</p>
                  <Button variant="primary" width="full">
                    Full Width Button
                  </Button>
                </div>
                <div>
                  <p className="text-[#B0B0B0] text-sm mb-2">Fit Width</p>
                  <Button variant="secondary" width="fit">
                    Fit Content
                  </Button>
                </div>
                <div>
                  <p className="text-[#B0B0B0] text-sm mb-2">Custom Width (300px)</p>
                  <Button variant="primary" width="300px">
                    Custom 300px
                  </Button>
                </div>
                <div>
                  <p className="text-[#B0B0B0] text-sm mb-2">Custom Width (50%)</p>
                  <Button variant="secondary" width="50%">
                    Half Width
                  </Button>
                </div>
              </div>
            </div>

            {/* Navigation Test Buttons */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-[#98F7E9]">Navigation Test</h3>
              <div className="space-y-4">
                <Button 
                  variant="primary" 
                  onClick={() => router.push('/offers')}
                  width="full"
                >
                  Go to Offers
                </Button>
                <Button 
                  variant="secondary" 
                  onClick={() => router.push('/profile')}
                  width="full"
                >
                  Go to Profile
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* How it works section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-white">
            How it works
          </h2>
          
          {/* Add the steps here */}
          <div className="space-y-4">
            {/* Step items would go here */}
          </div>
        </div>
      </div>
    </div>
  );
}
