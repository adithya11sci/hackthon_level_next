## 💡 Inspiration

The inspiration for **Gemetra** came from witnessing the inefficiencies in global financial infrastructure:
- **Global Payroll Pain Points**: Traditional payroll systems are plagued with:
  - High transaction fees (2-5% for international wires)
  - Delayed settlements (3-5 business days)
  - Hidden FX conversion costs
  - Complex compliance requirements across jurisdictions
  - Lack of transparency and audit trails

- **Tourist VAT Refunds**: Millions of tourists lose their VAT refunds due to slow, manual processes at airports. The current system requires physical presence, long queues, and often results in unclaimed refunds worth billions annually.

Saw an opportunity to leverage **MNEE's programmable money capabilities** to create a seamless, transparent, and cost-effective solution for both tourism and enterprise payroll needs.

---

## 🚀 What it does

**Gemetra-MNEE** is a comprehensive **on-chain payment infrastructure** that enables:

### 1. **VAT Refund Processing**
- Tourists upload invoices and VAT claim details
- AI validates eligibility and calculates refund amounts
- Instant MNEE stablecoin payments delivered to Ethereum wallets
- Complete audit trail on blockchain

### 2. **Enterprise Payroll Automation**
- Upload payroll CSV files with employee data
- AI parses salaries, deductions, and tax calculations
- Bulk MNEE payments to employees globally
- Real-time transaction tracking and verification

### 3. **Scheduled & Recurring Payments** ⭐ NEW
- Schedule one-time or recurring payments (daily, weekly, bi-weekly, monthly)
- Calendar view to visualise all scheduled payments
- Pre-approval system for automatic processing
- Auto-process payments within spending limits without MetaMask popups
- Pause, resume, or cancel scheduled payments

### 4. **AI-Powered Financial Assistant**
- Natural language queries about payroll, payments, and company data
- Real-time crypto price information
- Company analytics and insights
- Markdown-formatted responses with rich formatting

### 5. **Comprehensive Dashboard**
- Real-time token balance tracking (ETH & MNEE)
- Payment activity history with transaction hash links
- Employee management system
- Analytics and reporting

---

## 🛠️ How we built it

### **Tech Stack**

```typescript
// Frontend
- React 18 + TypeScript
- Vite (build tool)
- Tailwind CSS (styling)
- Framer Motion (animations)

// Blockchain Integration
- Wagmi (React Hooks for Ethereum)
- Viem (TypeScript interface for Ethereum)
- Ethereum Mainnet (MNEE contract: 0x8ccedbAe4916b79da7F3F612EfB2EB93A2bFD6cF)

// Backend & Storage
- Supabase (PostgreSQL database)
- LocalStorage (client-side persistence)

// AI & Services
- Google Gemini API (AI assistant)
- EmailJS (email notifications)
- Etherscan API (transaction verification)
```

---

## 🎯 Challenges we ran into

### **1. Dependency Conflicts**
- **Challenge**: Version mismatches between `wagmi`, `viem`, and `@reown/appkit`
- **Solution**: Removed `@reown/appkit`, built custom wallet modal using Wagmi hooks directly

### **2. MetaMask Transaction Warnings**
- **Challenge**: "Transaction likely to fail" warnings with Multicall3 for bulk payments
- **Solution**: Switched to optimized sequential transfers with upfront data preparation for better reliability

### **3. Stale State in Payment Recording**
- **Challenge**: Only one payment showing in activity list for bulk transfers
- **Solution**: Implemented functional state updates and individual transaction hash tracking per employee

### **4. Email Configuration**
- **Challenge**: EmailJS template configuration for dynamic recipients
- **Solution**: Updated email service to use `{{to_email}}` parameter and provided clear template setup instructions

### **5.. JSX Structure Issues**
- **Challenge**: Multiple JSX syntax errors during scheduled payments feature development
- **Solution**: Careful restructuring with React Fragments and proper div nesting

### **6.. Pre-Approval Implementation**
- **Challenge**: Implementing automatic payments without compromising security
- **Solution**: Created pre-approval spending limit system with one-time MetaMask approval, then automatic processing within limits

---

## 🏆 Accomplishments that we're proud of

✅ Successfully integrated MNEE stablecoin on Ethereum Mainnet
✅ Maintained all existing functionality during migration

### **2. Scheduled Payments System**
✅ Built comprehensive scheduling system with calendar view
✅ Implemented pre-approval for automatic processing
✅ Created intuitive UI with list and calendar views

### **3. AI Assistant Enhancement**
✅ Trained AI on MNEE company and token knowledge
✅ Improved question detection and response formatting
✅ Integrated markdown rendering for rich text display

### **4. User Experience Improvements**
✅ Custom wallet selection modal with filtering
✅ Network status indicators and warnings
✅ Transaction hash links in activity lists
✅ Email notifications with dynamic content

### **5. Hackathon Alignment**
✅ Fully aligned with MNEE Hackathon requirements
✅ Uses real MNEE contract on Ethereum Mainnet
✅ Demonstrates programmable money capabilities
✅ Covers all three tracks: AI & Agents, Commerce, Financial Automation

---

## 📚 What we learned

### **Technical Learnings**

1. **Ethereum Development**: Deep dive into Wagmi, Viem, and ERC20 token interactions
2. **State Management**: Importance of functional updates to prevent stale state closures
3. **Transaction Optimization**: Balancing user experience (single transaction) with reliability (sequential transfers)
4. **Wallet Integration**: Building custom wallet modals vs. using pre-built libraries
5. **LocalStorage Patterns**: Client-side persistence strategies for scheduled payments

### **Product Learnings**

1. **User Security Concerns**: Users want control over automatic payments, leading to pre-approval system
2. **Visualization Matters**: Calendar view significantly improves understanding of scheduled payments
3. **Progressive Disclosure**: Showing due payments alerts before auto-processing improves trust
4. **Error Communication**: Clear error messages and warnings improve user experience

### **Blockchain Learnings**

1. **MNEE Specifics**: MNEE only exists on Mainnet, requiring careful network handling
2. **Gas Estimation**: MetaMask's gas estimation can be conservative, requiring alternative approaches
3. **Transaction Finality**: Understanding Ethereum's confirmation times for user expectations
4. **ERC20 Standards**: Leveraging standard interfaces for maximum compatibility

---

## 🔮 What's next for Gemetra

### **Immediate Next Steps (Next 1-2 Months)**

1. **Multi-Signature Payment Approvals**
   - Require multiple signatures for large payments (>$10k)
   - Role-based approval permissions
   - Configurable approval thresholds

2. **Automated Tax Withholding**
   - Calculate and withhold taxes automatically
   - Multi-jurisdiction tax support
   - Send tax portion to tax authority wallets

3. **Expense Reimbursement Automation**
   - Employees submit expenses via app
   - AI validates receipts and calculates reimbursement
   - Automatic MNEE payment on approval

4. **Payment Analytics & Forecasting**
   - AI-powered payment analytics dashboard
   - Predict future payment needs
   - Cash flow forecasting and optimization

5. **Subscription Management**
   - Recurring subscription payments in MNEE
   - Automatic renewal with wallet balance checks
   - Prorated refunds on cancellation

### **Medium-Term Features (3-6 Months)**

6. **Creator Revenue Splits**
   - Automatically split MNEE payments between creators, collaborators, and platforms
   - Configurable split percentages
   - Real-time revenue distribution

7. **E-commerce Checkout Integration**
   - One-click MNEE checkout for online stores
   - Shopping cart aggregation with single transaction
   - Multi-vendor marketplace payments

8. **Tip Jar & Donation System**
   - One-click tipping for creators and service providers
   - Recurring donations (Patreon-style)
   - Anonymous or public donation options

9. **Escrow Services for Marketplaces**
   - Hold MNEE in escrow until delivery confirmation
   - Automatic release on delivery or dispute resolution
   - Multi-party escrow for complex transactions

10. **Loyalty Points & Rewards Program**
    - Convert loyalty points to MNEE
    - Automatic reward distribution based on purchase history
    - Tiered rewards system with smart contract logic

11. **Smart Contract-Based Budgeting**
    - Set spending limits per category (payroll, operations, marketing)
    - Automatic budget enforcement via smart contracts
    - Alerts when approaching budget limits

12. **Invoice Factoring & Early Payment**
    - Businesses can sell invoices for immediate MNEE payment
    - Smart contract manages invoice lifecycle
    - Automatic payment on invoice due date

13. **Yield Farming for Treasury**
    - Automatically invest idle MNEE in DeFi protocols
    - Earn yield while maintaining liquidity
    - Automatic withdrawal when payments are due

14. **Cross-Chain Payment Bridge**
    - Bridge MNEE payments to other chains (if MNEE supports it)
    - Automatic conversion and routing
    - Multi-chain payroll support

15. **Payment Scheduling with Conditions**
    - Schedule payments that only execute if conditions are met
    - Example: Pay employee only if they complete training
    - Smart contract-based condition checking

### **Advanced Features (6-12 Months)**

16. **AI Agent Treasury Management**
    - Autonomous AI agents with their own MNEE wallets
    - Agents can receive payments, make decisions, and execute transactions
    - Smart contract-based agent permissions and spending limits

17. **Multi-Agent Payment Orchestration**
    - Coordinate payments across multiple AI agents
    - Agent-to-agent payments for task completion
    - Commission-based agent payments

18. **Conditional Agent Payments**
    - Smart contract-based conditional payments
    - Pay agents only when specific conditions are met
    - Time-locked payments with automatic release

19. **Automated Currency Hedging**
    - Automatically hedge currency exposure for international payments
    - Convert MNEE to local stablecoins when needed
    - Minimize FX risk for global payroll

20. **NFT-Based Payment Receipts**
    - Each payment generates an NFT receipt
    - Immutable proof of payment on blockchain
    - Collectible payment history

### **Long-Term Vision**

- **DAO Governance**: Transition to community-driven governance
- **Protocol Expansion**: Support for additional blockchains and tokens
- **Enterprise Integrations**: Partnerships with HR platforms, accounting software, and payment gateways
- **Global Expansion**: Multi-country VAT support (EU, UK, Singapore, Saudi Arabia)
- **DeFi Integration**: Deeper integration with DeFi protocols for yield optimization

---

### **Key Features Showcase**

1. **Scheduled Payments Calendar View**
   - Visual calendar showing all scheduled payments
   - Click dates to see payment details
   - Green highlights for dates with payments

2. **Pre-Approval System**
   - Set spending limits for automatic processing
   - One-time MetaMask approval
   - Automatic payment execution within limits

3. **Bulk Payroll Processing**
   - Upload CSV or select employees
   - Preview and confirm payments
   - Individual transaction hashes per employee

4. **AI Assistant**
   - Ask questions about payroll, payments, MNEE
   - Get real-time crypto prices
   - Company analytics and insights

5. **Transaction Tracking**
   - Clickable Etherscan links for all transactions
   - Complete payment history
   - Real-time balance updates

---

## 🏅 Hackathon Track

This project aligns with **all three tracks** of the MNEE Hackathon:

✅ **AI & Agent Payments**: AI-powered salary computation, payment automation, and intelligent financial assistant

✅ **Commerce & Creator Tools**: VAT refund checkout systems, payroll automation, and scheduled payments

✅ **Financial Automation**: Programmable invoicing, automated payroll, scheduled payments, and pre-approval systems

---

## 🎯 Impact

**Gemetra-MNEE** demonstrates the power of programmable money by:

- **Reducing Costs**: Eliminating 2-5% international wire fees
- **Increasing Speed**: Instant settlements vs. 3-5 business days
- **Improving Transparency**: All transactions on public blockchain
- **Enabling Automation**: Scheduled and recurring payments without manual intervention
- **Enhancing Security**: Pre-approval system balances automation with user control

---

## 🚀 Try It Out

1. **Connect Your Wallet**: MetaMask, WalletConnect, Coinbase Wallet, or Nightly
2. **Add Employees**: Import CSV or add manually
3. **Schedule Payments**: Create one-time or recurring payments
4. **Set Pre-Approval**: Enable automatic processing within limits
5. **View Calendar**: See all scheduled payments on the calendar
6. **Process Payments**: Manual or automatic execution
7. **20+ more features fully working**