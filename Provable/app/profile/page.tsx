"use client";
import { User, Shield, CheckCircle, Wrench, ExternalLink, Trophy, Star } from 'lucide-react';

export default function ProfilePage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#121212' }}>
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6" style={{ color: '#FFFFFF' }}>SEO Professional Profile</h1>
        
        {/* Smart Contract Status */}
        <div className="mb-8 p-4 rounded-lg border-2 border-[#4CAF50] bg-[#1E1E1E]">
          <div className="flex items-center mb-3">
            <Shield className="w-5 h-5 text-[#4CAF50] mr-2" />
            <h2 className="text-lg font-medium text-[#FFFFFF]">Verified on Base Blockchain</h2>
          </div>
          <p className="text-[#B0B0B0] mb-3">
            Your reputation and contracts are secured by smart contracts deployed on Base Sepolia. 
            All your work history and payments are transparently recorded on-chain.
          </p>
          <div className="flex items-center text-sm">
            <span className="text-[#B0B0B0]">Smart Contract System:</span>
            <a 
              href="https://sepolia.basescan.org/address/0xbb967c5987b5e82e75f2c4f15b79e6268bf3d0c7" 
              target="_blank" 
              rel="noopener noreferrer"
              className="ml-2 text-[#2196F3] hover:underline flex items-center"
            >
              View on Basescan <ExternalLink className="w-3 h-3 ml-1" />
            </a>
          </div>
        </div>

        {/* Building Notice */}
        <div className="mb-8 p-4 rounded-lg border-2 border-[#FFC107] bg-[#1E1E1E]">
          <div className="flex items-center mb-3">
            <Wrench className="w-5 h-5 text-[#FFC107] mr-2" />
            <h2 className="text-lg font-medium text-[#FFFFFF]">🚧 Building... Profile Integration</h2>
          </div>
          <p className="text-[#B0B0B0]">
            We're building the profile system that will connect to your on-chain reputation. 
            Soon you'll be able to showcase your verified work history and client reviews.
          </p>
        </div>

        {/* Chainlink Automation Status */}
        <div className="mb-8 p-4 rounded-lg border-2 border-[#4CAF50] bg-[#1E1E1E]">
          <div className="flex items-center mb-3">
            <CheckCircle className="w-5 h-5 text-[#4CAF50] mr-2" />
            <h2 className="text-lg font-medium text-[#FFFFFF]">Chainlink Automation Active</h2>
          </div>
          <p className="text-[#B0B0B0] mb-3">
            Automated job completion is live! Jobs are automatically completed after a 7-day review period using Chainlink Keepers. 
            No manual intervention needed for payment release.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div className="flex items-center">
              <span className="text-[#B0B0B0]">Review Period:</span>
              <span className="ml-2 text-[#FFFFFF] font-medium">7 days</span>
            </div>
            <div className="flex items-center">
              <span className="text-[#B0B0B0]">Max Jobs Checked:</span>
              <span className="ml-2 text-[#FFFFFF] font-medium">20 per run</span>
            </div>
          </div>
        </div>

        {/* System Features */}
        <div className="space-y-6">
          {/* Next on Roadmap */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-[#FFFFFF]">🚀 Next on Roadmap</h3>
            
            <div className="p-4 rounded-lg bg-[#1E1E1E] border border-[#757575]">
              <h4 className="font-medium text-[#FFFFFF] mb-2">Dynamic Profile Dashboard</h4>
              <p className="text-[#B0B0B0] text-sm">
                Elegant interface to showcase your on-chain reputation, job history, earnings, and client reviews - all pulled directly from our deployed smart contracts.
              </p>
            </div>
          </div>

          {/* Blockchain Benefits */}
          <div className="p-4 rounded-lg bg-[#1E1E1E] border border-[#757575]">
            <h3 className="text-lg font-medium text-[#FFFFFF] mb-4">Why Blockchain-Based Profiles?</h3>
            <ul className="space-y-2 text-[#B0B0B0]">
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-[#4CAF50] mr-2" />
                Immutable work history that can't be faked or deleted
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-[#4CAF50] mr-2" />
                Transparent payment records and dispute resolution
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-[#4CAF50] mr-2" />
                Own your reputation data - no platform lock-in
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-[#4CAF50] mr-2" />
                Automatic escrow and payment release upon job completion
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-[#4CAF50] mr-2" />
                Cross-platform reputation portability
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
