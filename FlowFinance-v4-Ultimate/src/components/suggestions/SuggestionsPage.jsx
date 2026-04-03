import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, TrendingUp, PiggyBank, ShieldCheck, AlertTriangle, Lightbulb, Target, ArrowRight, CheckCircle2, RefreshCw, BarChart2 } from 'lucide-react';
import useStore from '../../store/useStore';
import { fmt } from '../../utils/format';
import { SPENDING_BY_CAT } from '../../data/mockData';

function SuggestionCard({ icon: Icon, title, body, accent, border, bg, badge, actionLabel, delay=0, priority }) {
  const [done, setDone] = useState(false);
  return (
    <motion.div initial={{opacity:0,y:14}} animate={{opacity:1,y:0}} transition={{delay,duration:0.35}}
      whileHover={{y:-2,transition:{duration:0.15}}}
      className="suggestion-card relative overflow-hidden"
      style={{background:bg,border:`1px solid ${border}`}}>
      <div className="absolute inset-0 rounded-[18px] pointer-events-none" style={{background:'linear-gradient(135deg,rgba(255,255,255,0.03) 0%,transparent 60%)'}}/>
      {priority && (
        <span className="absolute top-3 right-3 pill" style={{
          background: priority==='high'?'rgba(251,113,133,0.15)':priority==='medium'?'rgba(252,211,77,0.12)':'rgba(52,211,153,0.12)',
          color:       priority==='high'?'#FB7185':priority==='medium'?'#FCD34D':'#34D399',
          border:`1px solid ${priority==='high'?'rgba(251,113,133,0.25)':priority==='medium'?'rgba(252,211,77,0.2)':'rgba(52,211,153,0.2)'}`,
        }}>{priority}</span>
      )}
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{background:`${accent}18`,border:`1px solid ${accent}28`}}>
          <Icon size={18} style={{color:accent}}/>
        </div>
        <div className="flex-1 min-w-0 pr-14">
          <div className="flex items-center gap-2 mb-1">
            <p className="text-sm font-bold text-white stat-num">{title}</p>
            {badge && <span className="pill" style={{background:`${accent}15`,color:accent,border:`1px solid ${accent}25`}}>{badge}</span>}
          </div>
          <p className="text-xs leading-relaxed" style={{color:'rgba(255,255,255,0.45)'}}>{body}</p>
          {actionLabel && (
            <motion.button whileHover={{x:2}} whileTap={{scale:0.96}} onClick={() => setDone(true)}
              className="mt-2.5 flex items-center gap-1.5 text-xs font-bold transition-colors"
              style={{color: done ? '#34D399' : accent}}>
              {done ? <><CheckCircle2 size={12}/> Done!</> : <><ArrowRight size={11}/> {actionLabel}</>}
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function BudgetBar({ label, spent, budget, color, icon, delay }) {
  const pct = Math.min(Math.round((spent/budget)*100),100);
  const over = pct >= 90;
  return (
    <motion.div initial={{opacity:0,x:10}} animate={{opacity:1,x:0}} transition={{delay,duration:0.3}}
      className="p-3 rounded-2xl" style={{background:over?'rgba(251,113,133,0.08)':'rgba(255,255,255,0.04)',border:`1px solid ${over?'rgba(251,113,133,0.2)':'rgba(255,255,255,0.07)'}`}}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2"><span className="text-sm">{icon}</span><span className="text-xs font-semibold text-white">{label}</span></div>
        <div className="text-right">
          <span className="text-xs font-black stat-num" style={{color: over?'#FB7185':'rgba(255,255,255,0.8)'}}>{fmt(spent,true)}</span>
          <span className="text-[10px]" style={{color:'rgba(255,255,255,0.3)'}}> / {fmt(budget,true)}</span>
        </div>
      </div>
      <div className="h-1.5 rounded-full" style={{background:'rgba(255,255,255,0.06)'}}>
        <motion.div initial={{width:0}} animate={{width:`${pct}%`}} transition={{delay:delay+0.2,duration:0.7,ease:'easeOut'}}
          className="h-full rounded-full" style={{background:over?'linear-gradient(90deg,#FB7185,#F472B6)':`linear-gradient(90deg,${color},${color}99)`,boxShadow:over?'0 0 8px rgba(251,113,133,0.5)':`0 0 6px ${color}60`}}/>
      </div>
      <div className="flex justify-between mt-1.5">
        <span className="text-[10px]" style={{color:'rgba(255,255,255,0.25)'}}>{pct}% used</span>
        {over ? <span className="text-[10px] font-bold" style={{color:'#FB7185'}}>⚠ Limit near!</span> : pct<60 && <span className="text-[10px] font-bold" style={{color:'#34D399'}}>On track ✓</span>}
      </div>
    </motion.div>
  );
}

function InvestCard({ title, ret, risk, desc, icon, color, delay }) {
  const [saved, setSaved] = useState(false);
  return (
    <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay,duration:0.3}}
      whileHover={{y:-3,transition:{duration:0.15}}}
      className="p-4 rounded-2xl" style={{background:'rgba(255,255,255,0.04)',border:`1px solid ${color}20`}}>
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{background:`${color}15`,border:`1px solid ${color}25`}}>{icon}</div>
        <span className="pill" style={{background:risk==='Low'?'rgba(52,211,153,0.12)':risk==='Medium'?'rgba(252,211,77,0.1)':'rgba(251,113,133,0.1)',color:risk==='Low'?'#34D399':risk==='Medium'?'#FCD34D':'#FB7185',border:`1px solid ${risk==='Low'?'rgba(52,211,153,0.2)':risk==='Medium'?'rgba(252,211,77,0.15)':'rgba(251,113,133,0.15)'}`}}>
          {risk} risk
        </span>
      </div>
      <p className="text-sm font-bold text-white mb-1 stat-num">{title}</p>
      <p className="text-xs mb-3 leading-relaxed" style={{color:'rgba(255,255,255,0.4)'}}>{desc}</p>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px]" style={{color:'rgba(255,255,255,0.3)'}}>Expected return</p>
          <p className="text-sm font-black stat-num" style={{color:'#34D399'}}>{ret}</p>
        </div>
        <motion.button whileTap={{scale:0.94}} onClick={() => setSaved(true)}
          className="text-xs font-bold px-3 py-1.5 rounded-xl transition-all"
          style={saved?{background:'rgba(52,211,153,0.15)',color:'#34D399',border:'1px solid rgba(52,211,153,0.25)'}:{background:`${color}15`,color,border:`1px solid ${color}25`}}>
          {saved ? '✓ Saved' : 'Explore'}
        </motion.button>
      </div>
    </motion.div>
  );
}

export default function SuggestionsPage() {
  const { getSummary } = useStore();
  const { income, expenses, savingsRate } = getSummary();
  const leftover = income - expenses;

  const budgets = [
    {label:'Food & Dining',spent:768, budget:600, color:'#FCD34D',icon:'🍔'},
    {label:'Shopping',     spent:812, budget:1000,color:'#A78BFA',icon:'🛍️'},
    {label:'Travel',       spent:1410,budget:2000,color:'#FB923C',icon:'✈️'},
    {label:'Housing',      spent:1780,budget:2000,color:'#818CF8',icon:'🏠'},
    {label:'Entertainment',spent:29,  budget:200, color:'#F472B6',icon:'🎬'},
  ];

  const investments = [
    {title:'Nifty 50 Index Fund',ret:'12–15% p.a.',risk:'Low',   desc:"Track India's top 50 companies. Best for long-term wealth.",     icon:'📊',color:'#818CF8'},
    {title:'Liquid Mutual Fund', ret:'6–7% p.a.',  risk:'Low',   desc:'Park emergency funds safely. Better returns than savings FD.',    icon:'💧',color:'#67E8F9'},
    {title:'US Tech ETF',        ret:'14–18% p.a.',risk:'Medium',desc:'Invest in Apple, Google, Microsoft. USD exposure + growth.',      icon:'🌐',color:'#A78BFA'},
    {title:'Gold ETF',           ret:'8–10% p.a.', risk:'Low',   desc:'Hedge against inflation. Ideal 5–10% portfolio allocation.',      icon:'🥇',color:'#FCD34D'},
    {title:'P2P Lending',        ret:'10–12% p.a.',risk:'High',  desc:'Lend to businesses, earn fixed returns. Higher risk, higher gain.',icon:'🤝',color:'#FB7185'},
    {title:'REITs',              ret:'8–11% p.a.', risk:'Medium',desc:'Real estate exposure without buying property. Quarterly divs.',   icon:'🏢',color:'#34D399'},
  ];

  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} className="space-y-5">

      {/* Hero */}
      <motion.div initial={{opacity:0,y:14}} animate={{opacity:1,y:0}} transition={{duration:0.4}}
        className="relative rounded-3xl p-6 overflow-hidden"
        style={{background:'linear-gradient(135deg,#312E81,#4C1D95,#831843)',boxShadow:'0 16px 48px rgba(99,102,241,0.4), 0 0 80px rgba(139,92,246,0.2)'}}>
        <div className="absolute inset-0 rounded-3xl" style={{background:'linear-gradient(135deg,rgba(255,255,255,0.08) 0%,transparent 50%)',pointerEvents:'none'}}/>
        <div className="orb w-72 h-72 -top-20 -right-20 opacity-20" style={{background:'radial-gradient(circle,#818CF8,transparent)',animationDelay:'-2s'}}/>
        <div className="orb w-48 h-48 -bottom-16 -left-16 opacity-15" style={{background:'radial-gradient(circle,#F472B6,transparent)',animationDelay:'-4s'}}/>

        <div className="relative">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles size={16} className="text-yellow-300" fill="currentColor"/>
            <span className="text-[11px] font-bold uppercase tracking-widest" style={{color:'rgba(255,255,255,0.6)'}}>AI Financial Advisor</span>
          </div>
          <h2 className="text-2xl font-black text-white mb-1 stat-num">You have {fmt(leftover,true)} left</h2>
          <p className="text-sm" style={{color:'rgba(255,255,255,0.6)'}}>Savings rate: <span className="text-white font-bold">{savingsRate}%</span> · Here's how to make it grow 🚀</p>
        </div>

        <div className="relative grid grid-cols-3 gap-3 mt-5">
          {[
            {label:'Invest',    value:fmt(Math.round(leftover*0.5),true), icon:'📈', color:'rgba(129,140,248,0.25)'},
            {label:'Emergency', value:fmt(Math.round(leftover*0.3),true), icon:'🛡️', color:'rgba(52,211,153,0.2)'},
            {label:'Lifestyle', value:fmt(Math.round(leftover*0.2),true), icon:'✨', color:'rgba(244,114,182,0.2)'},
          ].map((s,i) => (
            <motion.div key={s.label} initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:i*0.08+0.3}}
              className="rounded-2xl p-3 text-center" style={{background:s.color,backdropFilter:'blur(10px)',border:'1px solid rgba(255,255,255,0.1)'}}>
              <p className="text-xl mb-1">{s.icon}</p>
              <p className="text-white font-black text-sm stat-num">{s.value}</p>
              <p className="text-[10px] mt-0.5 font-medium" style={{color:'rgba(255,255,255,0.5)'}}>{s.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* Left col */}
        <div className="lg:col-span-2 space-y-5">

          {/* Suggestions */}
          <div className="glass p-5">
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb size={16} style={{color:'#FCD34D'}}/>
              <h3 className="text-sm font-bold text-white stat-num">Personalized Suggestions</h3>
            </div>
            <div className="space-y-3">
              <SuggestionCard icon={AlertTriangle} title="Food spending is over budget!"
                body={`You spent ₹768 on food — ₹168 over your ₹600 budget. Try cooking at home 3×/week to save ~₹300 next month.`}
                accent="#FCD34D" bg="rgba(252,211,77,0.06)" border="rgba(252,211,77,0.18)" badge="Over budget" priority="high" actionLabel="Set food limit" delay={0.05}/>
              <SuggestionCard icon={PiggyBank} title="Start a monthly SIP today"
                body={`You have ${fmt(leftover,true)} free. Investing ${fmt(Math.round(leftover*0.3),true)} in a Nifty 50 SIP monthly can grow to ${fmt(Math.round(leftover*0.3*150),true)}+ in 10 years at 12% returns.`}
                accent="#818CF8" bg="rgba(129,140,248,0.07)" border="rgba(129,140,248,0.2)" badge="High impact" priority="high" actionLabel="Start SIP now" delay={0.1}/>
              <SuggestionCard icon={ShieldCheck} title="Build your emergency fund"
                body={`You need 6 months of expenses (${fmt(expenses*6,true)}) in a liquid fund. Currently ~${Math.min(Math.round((income-expenses)/expenses),6)} months covered. Park ${fmt(Math.round(leftover*0.3),true)}/month to close the gap fast.`}
                accent="#34D399" bg="rgba(52,211,153,0.06)" border="rgba(52,211,153,0.2)" priority="medium" actionLabel="Open liquid fund" delay={0.15}/>
              <SuggestionCard icon={Target} title={`Boost savings rate to 40%`}
                body={`You're at ${savingsRate}% savings rate. The financial independence target is 40%. Reduce discretionary spend by ${fmt(Math.max(0,Math.round(income*0.4-leftover)),true)}/month to hit the goal.`}
                accent="#A78BFA" bg="rgba(167,139,250,0.07)" border="rgba(167,139,250,0.2)" badge="Goal" priority="medium" actionLabel="Create goal" delay={0.2}/>
            </div>
          </div>

          {/* Investment ideas */}
          <div className="glass p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <TrendingUp size={16} style={{color:'#818CF8'}}/>
                <h3 className="text-sm font-bold text-white stat-num">Where to Invest Your Surplus</h3>
              </div>
              <span className="text-xs" style={{color:'rgba(255,255,255,0.35)'}}>Free: <span className="font-bold" style={{color:'#818CF8'}}>{fmt(leftover,true)}</span></span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {investments.map((inv,i) => <InvestCard key={inv.title} {...inv} ret={inv.ret} delay={i*0.06+0.2}/>)}
            </div>
          </div>
        </div>

        {/* Right col */}
        <div className="space-y-5">

          {/* Budget tracker */}
          <div className="glass p-5">
            <div className="flex items-center gap-2 mb-4">
              <BarChart2 size={16} style={{color:'#818CF8'}}/>
              <h3 className="text-sm font-bold text-white stat-num">Budget Tracker</h3>
            </div>
            <div className="space-y-2.5">
              {budgets.map((b,i) => <BudgetBar key={b.label} {...b} delay={i*0.07+0.1}/>)}
            </div>
          </div>

          {/* Money Health Score */}
          <div className="glass p-5">
            <div className="flex items-center gap-2 mb-4">
              <ShieldCheck size={16} style={{color:'#34D399'}}/>
              <h3 className="text-sm font-bold text-white stat-num">Money Health Score</h3>
            </div>
            <div className="flex items-center justify-center mb-4">
              <div className="relative w-24 h-24">
                <svg viewBox="0 0 36 36" className="w-24 h-24 -rotate-90">
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="3"/>
                  <motion.circle cx="18" cy="18" r="15.9" fill="none" strokeWidth="3"
                    stroke="url(#sg)" strokeDasharray="100 100"
                    initial={{strokeDashoffset:100}} animate={{strokeDashoffset:28}}
                    transition={{delay:0.5,duration:1.4,ease:'easeOut'}} strokeLinecap="round"/>
                  <defs>
                    <linearGradient id="sg" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#818CF8"/>
                      <stop offset="100%" stopColor="#34D399"/>
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-black text-white stat-num">72</span>
                  <span className="text-[10px]" style={{color:'rgba(255,255,255,0.35)'}}>/ 100</span>
                </div>
              </div>
            </div>
            <p className="text-center text-xs font-bold mb-3" style={{color:'#34D399'}}>Good Financial Health ✦</p>
            {[
              {label:'Savings rate',  ok:savingsRate>=30, val:`${savingsRate}%`},
              {label:'Emergency fund',ok:false,           val:'4/6 months'},
              {label:'Investments',   ok:true,            val:fmt(1200,true)+'/mo'},
              {label:'Debt',          ok:true,            val:'None ✓'},
            ].map((item,i) => (
              <motion.div key={item.label} initial={{opacity:0,x:8}} animate={{opacity:1,x:0}} transition={{delay:i*0.07+0.4}}
                className="flex items-center justify-between py-2" style={{borderBottom:i<3?'1px solid rgba(255,255,255,0.05)':'none'}}>
                <span className="text-xs" style={{color:'rgba(255,255,255,0.4)'}}>{item.label}</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold" style={{color:'rgba(255,255,255,0.7)'}}>{item.val}</span>
                  <span className="text-sm">{item.ok ? '✅' : '⚠️'}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Quick actions */}
          <div className="glass p-5">
            <h3 className="text-sm font-bold text-white mb-3 stat-num">Quick Actions</h3>
            <div className="space-y-2">
              {[
                {label:'Set monthly budget',   icon:'🎯',color:'#818CF8'},
                {label:'Start SIP ₹5,000/mo',  icon:'📈',color:'#34D399'},
                {label:'Create savings goal',  icon:'🏆',color:'#FCD34D'},
                {label:'Review subscriptions', icon:'🔍',color:'#FB7185'},
              ].map((a,i) => (
                <motion.button key={a.label} whileHover={{x:4}} whileTap={{scale:0.97}}
                  initial={{opacity:0,x:8}} animate={{opacity:1,x:0}} transition={{delay:i*0.05+0.3}}
                  className="w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all row-hover"
                  style={{border:'1px solid rgba(255,255,255,0.06)'}}>
                  <span className="text-base">{a.icon}</span>
                  <span className="text-xs font-semibold text-white flex-1">{a.label}</span>
                  <ArrowRight size={13} style={{color:a.color}}/>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
