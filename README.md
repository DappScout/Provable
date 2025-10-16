# SEOsolver

A decentralized escrow platform for SEO services, built with Solidity smart contracts and a Next.js frontend as a Farcaster MiniApp.

## Overview

SEOsolver enables secure transactions between clients and freelancers for SEO services through:
- **Smart Contract Escrow**: Trustless payment holding and release
- **Dispute Resolution**: Independent arbiter system for conflict resolution
- **Multi-token Support**: Works with both native ETH and ERC20 tokens
- **Farcaster Integration**: Built as a MiniApp for seamless social integration

## Architecture

### Smart Contracts

The platform consists of three core contracts:

- **SEOEscrow** - Main controller managing job lifecycle and state transitions
- **SEOFinance** - Isolated financial custody and payment handling
- **SEOArbiter** - Dispute resolution with arbiter whitelist management

Additional contracts (in development):
- `SEOValidationOracle.sol` - Oracle for SEO metrics validation
- `TemplateManager.sol` - Job template management
- `ScoreCalculations.sol` - SEO scoring logic

### Frontend

Built with Next.js 15 and Coinbase OnchainKit, deployed as a Farcaster MiniApp with:
- Wallet integration via OnchainKit
- Farcaster authentication and social features
- Responsive UI for job creation and management

## Quick Start

### Prerequisites

- [Foundry](https://book.getfoundry.sh/getting-started/installation) for smart contracts
- [Node.js](https://nodejs.org/) (v18+) for frontend development

### Smart Contracts

```bash
# Install dependencies
forge install

# Build contracts
forge build

# Run tests
forge test -vvv

# Format code
forge fmt
```

### Frontend

```bash
# Navigate to frontend directory
cd SEOsolver

# Install dependencies
npm install

# Run development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

## Development

### Running Tests

```bash
# Run all tests with verbose output
forge test -vvv

# Run specific test
forge test --match-test testFunctionName -vvv

# Generate coverage report
forge coverage --report summary
```

### Contract Deployment

> **Note**: Deployment scripts are under development. Manual deployment requires proper ordering due to circular dependencies between SEOEscrow and SEOFinance.

```bash
# Start local node
anvil

# Deploy contracts (example)
forge script script/Deploy.s.sol --rpc-url <RPC_URL> --private-key <PRIVATE_KEY>
```

## Project Status

**Current State:**
- ✅ Core escrow contracts implemented
- ✅ Payment handling (ETH + ERC20)
- ✅ Dispute resolution system
- ✅ Basic frontend with Farcaster MiniApp integration
- ⏳ Test coverage in progress
- ⏳ Oracle and validation systems planned
- ⏳ Template management system planned

## Documentation

- [CLAUDE.md](./CLAUDE.md) - Development guide for Claude Code
- [Foundry Book](https://book.getfoundry.sh/) - Foundry documentation
- [OnchainKit Docs](https://docs.base.org/onchainkit) - Frontend blockchain integration

## Contributing

> **TODO**: Add contribution guidelines

## License

> **TODO**: Add license information

## Security

> **TODO**: Add security considerations and audit status
