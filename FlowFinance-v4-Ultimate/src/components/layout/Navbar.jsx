import { motion } from 'framer-motion';
import { Bell, Shield, Eye } from 'lucide-react';
import useStore from '../../store/useStore';
import { CRYPTO_TICKERS } from '../../data/mockData';

const TITLES = {dashboard:'Overview',transactions:'Transactions',analytics:'Analytics',goals:'Goals',suggestions:'AI Advisor',settings:'Settings'};

export default function Navbar() {
  const {role,setRole,activePage}=useStore();
  return (
    <motion.header initial={{y:-20,opacity:0}} animate={{y:0,opacity:1}} className="flex flex-col z-20 relative"
      style={{background:'rgba(5,6,14,0.85)',borderBottom:'1px solid rgba(255,255,255,0.055)',backdropFilter:'blur(20px)'}}>

      {/* Ticker strip */}
      <div className="overflow-hidden py-1.5 px-4" style={{borderBottom:'1px solid rgba(255,255,255,0.04)',background:'rgba(255,255,255,0.02)'}}>
        <div className="ticker-inner flex gap-0">
          {[...CRYPTO_TICKERS,...CRYPTO_TICKERS].map((t,i)=>(
            <div key={i} className="flex items-center gap-2 px-5 whitespace-nowrap">
              <span className="text-[10px] font-bold text-white">{t.sym}</span>
              <span className="text-[10px]" style={{color:'rgba(255,255,255,0.4)'}}>{t.price}</span>
              <span className="text-[10px] font-bold" style={{color:t.up?'#10B981':'#F43F5E'}}>{t.change}</span>
              <span className="text-[10px]" style={{color:'rgba(255,255,255,0.15)'}}>·</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main navbar */}
      <div className="flex items-center justify-between px-6 py-3">
        <div>
          <h1 className="text-lg font-bold text-white sn">{TITLES[activePage]||'Dashboard'}</h1>
          <p className="text-[11px] mt-0.5" style={{color:'rgba(255,255,255,0.3)'}}>Friday, 3 April 2026</p>
        </div>
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1 p-1 rounded-xl" style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.07)'}}>
            {['viewer','admin'].map(r=>(
              <motion.button key={r} whileTap={{scale:0.95}} onClick={()=>setRole(r)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all duration-200"
                style={role===r?{background:'linear-gradient(135deg,rgba(99,102,241,0.3),rgba(124,111,247,0.2))',color:'#C4B5FD',border:'1px solid rgba(124,111,247,0.3)'}:{color:'rgba(255,255,255,0.25)'}}>
                {r==='admin'?<Shield size={10}/>:<Eye size={10}/>} {r}
              </motion.button>
            ))}
          </div>
          <motion.button whileHover={{scale:1.08}} whileTap={{scale:0.93}} className="relative w-9 h-9 rounded-xl flex items-center justify-center transition-all"
            style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.07)',color:'rgba(255,255,255,0.35)'}}>
            <Bell size={15}/><span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full" style={{background:'#F43F5E',boxShadow:'0 0 6px rgba(244,63,94,0.8)'}}/>
          </motion.button>
          <motion.div whileHover={{scale:1.06}} className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-black text-white cursor-pointer"
            style={{background:'linear-gradient(135deg,#6366F1,#F472B6)',boxShadow:'0 0 18px rgba(99,102,241,0.45)'}}>AK</motion.div>
        </div>
      </div>
    </motion.header>
  );
}
