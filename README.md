# FinSight AI 🚀

A modern AI-powered financial decision platform built for small businesses and startups to track, manage, and forecast their financial metrics.

## Core Features

1. **Upload Data**: Parse CSV or Excel files containing payroll, expenses, and transaction logs.
2. **Interactive Dashboard**: Visualizes your monthly trends using Recharts, showing total expenses, payroll distributions, and overall runway.
3. **AI Financial Insights**:
   * Analyzes spending patterns
   * Detects inefficiencies automatically
   * Suggests immediate cost optimizations
4. **What-If Simulation Engine**: Test how variables like "Salary Adjustments" or "New Hires" affect your overall runway instantly.
5. **Smart Recommendations**: Actionable insights like "Reduce Marketing spend by 15%".
6. **Chatbot Assistant**: Direct conversational interface powered by **Groq Llama-3** to ask specific questions like "Where am I overspending?".

## Tech Stack

- **Frontend**: React 18, Tailwind CSS, Vite
- **Icons**: Lucide React
- **Charts**: Recharts
- **AI**: Groq API (Llama-3-8b-8192)

## Getting Started

Clone the repository and set up the local development server:

\\\ash
git clone https://github.com/adithya11sci/hackthon_level_next.git
cd hackthon_level_next
\\\

Install dependencies:

\\\ash
npm install
\\\
*(You can also use 'pnpm install' or 'yarn install')*

Set your Environment Variables:
Create a \.env\ file in the root folder and add your Groq API key:
\\\env
VITE_GROQ_API_KEY=your_groq_api_key_here
\\\

Start the development server:

\\\ash
npm run dev
\\\

Open [http://localhost:5173](http://localhost:5173) with your browser to see the result.
