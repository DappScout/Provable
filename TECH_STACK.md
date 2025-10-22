# SEOsolver Technology Stack

## Overview
SEOsolver is a blockchain-based platform that combines smart contracts for job management with a modern web frontend. The project consists of two main components: a Solidity smart contract system and a Next.js web application.

## Backend - Smart Contracts

### Core Technologies
- **Solidity** (^0.8.19) - Primary smart contract language
- **Foundry** - Development framework for Ethereum smart contracts
- **OpenZeppelin Contracts** - Standard library for secure smart contract development

### Smart Contract Architecture
The system includes several interconnected contracts:

- **SEOEscrow.sol** - Main contract managing job lifecycle and escrow functionality
- **SEOFinance.sol** - Handles payment processing and financial operations
- **SEOArbiter.sol** - Dispute resolution mechanism
- **SEOValidationOracle.sol** - External validation services
- **TemplateManager.sol** - Job template management
- **ScoreCalculations.sol** - Scoring and rating system

### Key Features
- Multi-token support (ETH and ERC20 tokens)
- Escrow-based payment system
- Dispute resolution mechanism
- Job template management
- Reentrancy protection and access control

## Frontend - Web Application

### Core Technologies
- **Next.js 15.3.4** - React framework with App Router
- **React 19** - UI library
- **TypeScript 5** - Type-safe JavaScript
- **Tailwind CSS 4.1.15** - Utility-first CSS framework

### Blockchain Integration
- **Coinbase OnchainKit** - Web3 integration and wallet connection
- **Wagmi 2.16.3** - React hooks for Ethereum
- **Viem 2.31.6** - TypeScript interface for Ethereum
- **Base Chain** - Target blockchain network

### UI/UX Technologies
- **Farcaster MiniApp SDK** - Social protocol integration
- **GSAP 3.13.0** - Animation library
- **Lucide React** - Icon library
- **Shadcn/ui** - Component library with New York style
- **Class Variance Authority** - Component variant management

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **MiniKit Config** - MiniApp configuration for Base ecosystem

## Project Structure

```
SEOsolver/
├── src/                    # Smart contracts
│   ├── SEOEscrow.sol      # Main escrow contract
│   ├── SEOFinance.sol     # Payment handling
│   ├── SEOArbiter.sol     # Dispute resolution
│   └── interfaces/        # Contract interfaces
├── test/                   # Smart contract tests
├── Provable/              # Frontend application
│   ├── app/               # Next.js App Router
│   ├── components/        # React components
│   ├── lib/               # Utility functions
│   └── public/            # Static assets
└── lib/                   # Foundry dependencies
```

## Key Integrations

### Blockchain Features
- **Base Network** - Primary blockchain for deployment
- **Multi-wallet Support** - Coinbase Wallet, MetaMask, etc.
- **Token Support** - Native ETH and ERC20 tokens
- **MiniApp Integration** - Farcaster social protocol

### Development Workflow
- **Foundry** for smart contract development and testing
- **Next.js** for full-stack web development
- **TypeScript** for type safety across the stack
- **Tailwind CSS** for responsive design

## Deployment & Configuration

### Smart Contracts
- Uses Foundry for compilation and deployment
- OpenZeppelin contracts for security standards
- Remappings for library imports

### Frontend
- Next.js with App Router architecture
- Tailwind CSS with PostCSS processing
- MiniApp configuration for Base ecosystem
- Environment-based configuration

## Security Considerations
- ReentrancyGuard for smart contract protection
- Access control with Ownable pattern
- SafeERC20 for token operations
- Input validation and error handling

This stack provides a robust foundation for a decentralized job marketplace with modern web3 integration and user-friendly interface.

