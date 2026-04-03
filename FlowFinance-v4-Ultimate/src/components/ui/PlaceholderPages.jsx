import { motion } from 'framer-motion';
import { TrendingUp, Settings, Hammer } from 'lucide-react';

function P({ icon:Icon, title, desc, accent }) {
  return (
    <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.4}}
      className="flex flex-col items-center justify-center min-h-96 text-center">
      <motion.div animate={{y:[0,-10,0]}} transition={{duration:3,repeat:Infinity,ease:'easeInOut'}}
        className="w-20 h-20 rounded-3xl flex items-center justify-center mb-6"
        style={{background:`${accent}12`,border:`1px solid ${accent}25`,boxShadow:`0 0 40px ${accent}20`}}>
        <Icon size={32} style={{color:accent}}/>
      </motion.div>
      <h2 className="text-xl font-black text-white mb-2 stat-num">{title}</h2>
      <p className="text-sm max-w-xs leading-relaxed mb-6" style={{color:'rgba(255,255,255,0.4)'}}>{desc}</p>
      <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold" style={{background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.08)',color:'rgba(255,255,255,0.3)'}}>
        <Hammer size={12}/> Coming soon
      </div>
    </motion.div>
  );
}

export function PortfolioPage() { return <P icon={TrendingUp} title="Portfolio Tracker" desc="Track stocks, mutual funds, crypto and more with real-time data and AI-powered insights." accent="#818CF8"/>; }
export function SettingsPage()  { return <P icon={Settings}   title="Settings"          desc="Manage profile, budgets, notifications, bank connections and security settings."        accent="#A78BFA"/>; }
