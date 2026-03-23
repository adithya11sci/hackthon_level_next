import React, { useState, useRef, useEffect } from 'react';
import { Bot, BarChart3, Upload, Plus, Sparkles, TrendingUp, DollarSign, Users, Calendar, Loader2 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function App() {
  const [chatMessage, setChatMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([
    { role: 'assistant', content: 'Hello! I am your FinSight AI advisor powered by Groq Llama-3. Ask me anything about your expenses, payroll, or runway.' }
  ]);
  const [simulation, setSimulation] = useState({ salaryIncrease: 0, newHires: 0 });
  const chatEndRef = useRef<HTMLDivElement>(null);

  const mockData = [
    { month: 'Jan', expenses: 4000, payroll: 2400 },
    { month: 'Feb', expenses: 3000, payroll: 1398 },
    { month: 'Mar', expenses: 2000, payroll: 9800 },
    { month: 'Apr', expenses: 2780, payroll: 3908 },
    { month: 'May', expenses: 1890, payroll: 4800 },
    { month: 'Jun', expenses: 2390, payroll: 3800 },
  ];

  // Auto-scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  const handleChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim() || isLoading) return;
    
    const newUserMsg = { role: 'user', content: chatMessage };
    setChatHistory(prev => [...prev, newUserMsg]);
    setChatMessage('');
    setIsLoading(true);
    
    try {
      const messagesForApi = [...chatHistory, newUserMsg].map(m => ({
        role: m.role,
        content: m.content
      }));
      
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "llama3-8b-8192",
          messages: [
            { 
              role: "system", 
              content: "You are FinSight AI, a financial advisor for startups. Give short, concise, and highly actionable advice regarding budget, payroll, runway, and expenses. Limit responses to 2-3 sentences max. Do not use bold formatting or markdown asterisks." 
            },
            ...messagesForApi
          ],
          temperature: 0.7,
          max_tokens: 150
        })
      });
      
      const data = await response.json();
      const aiText = data.choices?.[0]?.message?.content || "Sorry, I couldn't process that. Please try again.";
      
      setChatHistory(prev => [...prev, { role: 'assistant', content: aiText }]);
    } catch (error) {
      console.error("Groq API Error:", error);
      setChatHistory(prev => [...prev, { role: 'assistant', content: "Network error communicating with Groq AI server." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const currentRunway = Math.max(0, 14 - (simulation.salaryIncrease * 0.1) - (simulation.newHires * 0.5)).toFixed(1);
  const runwayDiff = ((simulation.salaryIncrease * 0.1) + (simulation.newHires * 0.5)).toFixed(1);

  return (
    <div className="min-h-screen bg-gray-950 text-white p-4 md:p-8 font-sans">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <TrendingUp className="text-teal-400 w-8 h-8"/> 
            FinSight AI
          </h1>
          <p className="text-gray-400 text-sm mt-1">Modern AI-powered financial decision platform</p>
        </div>
        <button className="flex items-center gap-2 bg-gray-900 border border-gray-800 hover:bg-gray-800 px-4 py-2 rounded-lg transition-colors text-sm font-medium">
          <Upload className="w-4 h-4"/> 
          Upload Data
        </button>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl">
              <div className="flex justify-between items-center text-gray-400 mb-2">
                <span className="text-sm font-medium">Total Expenses</span>
                <DollarSign className="w-4 h-4 text-rose-400"/>
              </div>
              <p className="text-3xl font-bold text-white">$43,200</p>
            </div>
            <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl">
              <div className="flex justify-between items-center text-gray-400 mb-2">
                <span className="text-sm font-medium">Total Payroll</span>
                <Users className="w-4 h-4 text-blue-400"/>
              </div>
              <p className="text-3xl font-bold text-white">$28,500</p>
            </div>
            <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-teal-500/10 rounded-bl-full"></div>
              <div className="flex justify-between items-center text-gray-400 mb-2">
                <span className="text-sm font-medium">Est. Runway</span>
                <Calendar className="w-4 h-4 text-teal-400"/>
              </div>
              <p className="text-3xl font-bold text-teal-400">{currentRunway} Months</p>
            </div>
          </div>

          {/* Charts */}
          <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl">
            <h2 className="text-lg font-semibold flex items-center gap-2 mb-6">
              <BarChart3 className="w-5 h-5 text-gray-400"/> 
              Monthly Trends
            </h2>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                  <XAxis dataKey="month" stroke="#9ca3af" axisLine={false} tickLine={false} />
                  <YAxis stroke="#9ca3af" axisLine={false} tickLine={false} tickFormatter={(value) => `$${value}`} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px', color: '#fff' }} 
                    itemStyle={{ color: '#fff' }}
                  />
                  <Line type="monotone" dataKey="expenses" stroke="#fb7185" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                  <Line type="monotone" dataKey="payroll" stroke="#60a5fa" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* AI Recommendations */}
          <div className="bg-gray-900 border border-gray-800 border-l-4 border-l-teal-500 p-6 rounded-xl">
            <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-teal-400"/> 
              Smart Recommendations
            </h2>
            <ul className="space-y-3">
              <li className="bg-gray-800/50 p-4 rounded-lg flex flex-col md:flex-row md:items-center justify-between gap-4 border border-gray-800">
                <span className="text-sm">Reduce Marketing spend by 15% across underperforming campaigns</span>
                <button className="bg-gray-200 hover:bg-white text-gray-900 px-4 py-1.5 rounded-md text-sm font-medium transition-colors">Apply Optimization</button>
              </li>
              <li className="bg-gray-800/50 p-4 rounded-lg flex flex-col md:flex-row md:items-center justify-between gap-4 border border-gray-800">
                <span className="text-sm">Reallocate $500 from redundant SaaS subscriptions to R&D budget</span>
                <button className="bg-gray-200 hover:bg-white text-gray-900 px-4 py-1.5 rounded-md text-sm font-medium transition-colors">Review Subs</button>
              </li>
            </ul>
          </div>
        </div>

        <div className="space-y-6">
          {/* What-If Simulator */}
          <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl">
            <h2 className="text-lg font-semibold mb-4">What-If Simulation Engine</h2>
            <div className="space-y-5">
               <div>
                 <label className="text-sm text-gray-400 block mb-2">Salary Increase Adjustments (%)</label>
                 <input 
                   type="range"
                   min="0" max="20" step="1"
                   className="w-full accent-teal-500" 
                   value={simulation.salaryIncrease} 
                   onChange={e => setSimulation({...simulation, salaryIncrease: +e.target.value})}
                 />
                 <div className="text-right text-sm mt-1">{simulation.salaryIncrease}%</div>
               </div>
               <div>
                 <label className="text-sm text-gray-400 block mb-2">Target New Hires Count</label>
                 <input 
                   type="number" 
                   className="w-full bg-gray-950 border border-gray-800 rounded-md px-3 py-2 text-white focus:outline-none focus:border-teal-500" 
                   value={simulation.newHires} 
                   onChange={e => setSimulation({...simulation, newHires: +e.target.value})}
                 />
               </div>
               <div className="pt-4 border-t border-gray-800">
                 <div className="flex justify-between text-sm mb-2">
                   <span className="text-gray-400">Projected Run Rate Impact:</span>
                   <span className="text-rose-400 font-bold">-{runwayDiff} Months</span>
                 </div>
                 <div className="flex justify-between text-sm">
                   <span className="text-gray-400">Simulated Runway:</span>
                   <span className="font-bold text-lg text-teal-400">{currentRunway} Months</span>
                 </div>
               </div>
            </div>
          </div>

          {/* AI Chatbot */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl h-[450px] flex flex-col">
            <div className="p-4 border-b border-gray-800 flex items-center gap-2">
              <div className="bg-teal-500/20 p-2 rounded-lg">
                <Bot className="w-5 h-5 text-teal-400"/> 
              </div>
              <div>
                <h2 className="font-semibold text-sm">FinSight Guide</h2>
                <div className="text-xs text-teal-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400 inline-block"></span> 
                  Powered by Llama-3 (Groq)
                </div>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {chatHistory.map((msg, i) => {
                const isUser = msg.role === 'user';
                return (
                  <div key={i} className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
                    <div className={`p-3 rounded-xl max-w-[85%] text-sm ${isUser ? "bg-teal-600 text-white rounded-br-sm" : "bg-gray-800 text-gray-200 rounded-bl-sm"}`}>
                      {msg.content}
                    </div>
                  </div>
                );
              })}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="p-3 rounded-xl max-w-[85%] text-sm bg-gray-800 text-gray-200 rounded-bl-sm flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-teal-400" />
                    Analyzing...
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            <div className="p-4 border-t border-gray-800 bg-gray-950/50 rounded-b-xl">
              <form onSubmit={handleChat} className="flex gap-2 relative">
                <input 
                  value={chatMessage}
                  onChange={e => setChatMessage(e.target.value)}
                  disabled={isLoading}
                  placeholder="Where am I overspending?"
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg pl-4 pr-12 py-2.5 text-sm focus:outline-none focus:border-teal-500 disabled:opacity-50"
                />
                <button type="submit" disabled={!chatMessage.trim() || isLoading} className="absolute right-1.5 top-1.5 bottom-1.5 bg-teal-500 hover:bg-teal-400 disabled:opacity-50 disabled:hover:bg-teal-500 text-gray-950 p-1.5 rounded-md transition-colors">
                  <Plus className="w-4 h-4"/>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
