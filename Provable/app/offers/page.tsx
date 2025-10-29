"use client";
import { CheckCircle, Wrench, ExternalLink } from 'lucide-react';

export default function OffersPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#121212' }}>
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6" style={{ color: '#FFFFFF' }}>SEO Offers & Contracts</h1>
        
        {/* Smart Contract Status */}
        <div className="mb-8 p-4 rounded-lg border-2 border-[#4CAF50] bg-[#1E1E1E]">
          <div className="flex items-center mb-3">
            <CheckCircle className="w-5 h-5 text-[#4CAF50] mr-2" />
            <h2 className="text-lg font-medium text-[#FFFFFF]">Smart Contracts Deployed on Base</h2>
          </div>
          <p className="text-[#B0B0B0] mb-3">
            Our SEO escrow smart contracts are now live on Base Sepolia testnet! 
            You can create trustless SEO service agreements with automated payments.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div className="flex items-center">
              <span className="text-[#B0B0B0]">SEOEscrow:</span>
              <a 
                href="https://sepolia.basescan.org/address/0xbb967c5987b5e82e75f2c4f15b79e6268bf3d0c7" 
                target="_blank" 
                rel="noopener noreferrer"
                className="ml-2 text-[#2196F3] hover:underline flex items-center"
              >
                0xbb96...D0c7 <ExternalLink className="w-3 h-3 ml-1" />
              </a>
            </div>
            <div className="flex items-center">
              <span className="text-[#B0B0B0]">SEOFinance:</span>
              <a 
                href="https://sepolia.basescan.org/address/0x43392c48fbe5e6e115dd7517106af3a31ba27ce5" 
                target="_blank" 
                rel="noopener noreferrer"
                className="ml-2 text-[#2196F3] hover:underline flex items-center"
              >
                0x4339...7ce5 <ExternalLink className="w-3 h-3 ml-1" />
              </a>
            </div>
          </div>
        </div>

        {/* Chainlink Automation Status */}
        <div className="mb-8 p-4 rounded-lg border-2 border-[#4CAF50] bg-[#1E1E1E]">
          <div className="flex items-center mb-3">
            <CheckCircle className="w-5 h-5 text-[#4CAF50] mr-2" />
            <h2 className="text-lg font-medium text-[#FFFFFF]">Chainlink Automation Active</h2>
          </div>
          <p className="text-[#B0B0B0] mb-3">
            Automatic job completion is live! Contracts are automatically completed after a 7-day review period. 
            No manual intervention needed - payments are released automatically when jobs are finished.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div className="flex items-center">
              <span className="text-[#B0B0B0]">Review Period:</span>
              <span className="ml-2 text-[#FFFFFF] font-medium">7 days automatic</span>
            </div>
            <div className="flex items-center">
              <span className="text-[#B0B0B0]">Batch Processing:</span>
              <span className="ml-2 text-[#FFFFFF] font-medium">Up to 20 jobs per run</span>
            </div>
          </div>
        </div>

        {/* Building Notice */}
        <div className="mb-8 p-4 rounded-lg border-2 border-[#FFC107] bg-[#1E1E1E]">
          <div className="flex items-center mb-3">
            <Wrench className="w-5 h-5 text-[#FFC107] mr-2" />
            <h2 className="text-lg font-medium text-[#FFFFFF]">🚧 Building... Frontend Integration</h2>
          </div>
          <p className="text-[#B0B0B0]">
            The smart contracts are ready, but we're still building the frontend interface to interact with them. 
            Soon you'll be able to create offers, manage contracts, and handle payments directly from this page.
          </p>
        </div>

        {/* Next on Roadmap */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-[#FFFFFF] mb-4">🚀 Next on Roadmap</h3>
          
          <div className="p-4 rounded-lg bg-[#1E1E1E] border border-[#757575]">
            <h4 className="font-medium text-[#FFFFFF] mb-2">Interactive Offers Dashboard</h4>
            <p className="text-[#B0B0B0] text-sm">
              Beautiful UI to seamlessly interact with our deployed smart contracts - create jobs, sign contracts, and manage payments with just a few clicks.
            </p>
          </div>
        </div>

        {/* Contract Features */}
        <div className="mt-8 p-4 rounded-lg bg-[#1E1E1E] border border-[#757575]">
          <h3 className="text-lg font-medium text-[#FFFFFF] mb-4">Smart Contract Features:</h3>
          <ul className="space-y-2 text-[#B0B0B0]">
            <li className="flex items-center">
              <CheckCircle className="w-4 h-4 text-[#4CAF50] mr-2" />
              Trustless escrow with automated payment release
            </li>
            <li className="flex items-center">
              <CheckCircle className="w-4 h-4 text-[#4CAF50] mr-2" />
              Built-in dispute resolution system
            </li>
            <li className="flex items-center">
              <CheckCircle className="w-4 h-4 text-[#4CAF50] mr-2" />
              Support for ERC20 tokens and ETH payments
            </li>
            <li className="flex items-center">
              <CheckCircle className="w-4 h-4 text-[#4CAF50] mr-2" />
              Platform fee collection (2.5%)
            </li>
            <li className="flex items-center">
              <CheckCircle className="w-4 h-4 text-[#4CAF50] mr-2" />
              Maximum 5 concurrent jobs per client
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
