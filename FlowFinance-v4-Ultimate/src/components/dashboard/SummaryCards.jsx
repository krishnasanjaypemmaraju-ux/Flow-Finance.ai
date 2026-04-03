import { motion } from 'framer-motion';
import { Wallet, TrendingUp, TrendingDown, Flame, ArrowUpRight, ArrowDownRight, Sparkles } from 'lucide-react';
import { fmt } from '../../utils/format';
import useStore from '../../store/useStore';

const CARDS = [
  {key:'balance', label:'Net Worth',      icon:Wallet,     g:'linear-gradient(135deg,#1a1040,#2d1b69,#0e2d5c)',  accent:'#7C6FF7',glow:'rgba(124,111,247,0.45)', sub:'+12.4% this month', up:true,  sparkData:[40,52,48,65,70,68,80,85]},
  {key:'income',  label:'Total Income',   icon:TrendingUp, g:'linear-gradient(135deg,#0a2e20,#0d4f35,#0a3d2e)',  accent:'#10B981',glow:'rgba(16,185,129,0.4)',   sub:'+8.2% vs March',    up:true,  sparkData:[55,60,70,65,80,85,90,88]},
  {key:'expenses',label:'Total Expenses', icon:TrendingDown,g:'linear-gradient(135deg,#2d0e1a,#4a1529,#350e20)', accent:'#F43F5E',glow:'rgba(244,63,94,0.4)',    sub:'↑ 3.1% overspend',  up:false, sparkData:[80,75,85,90,70,82,78,85]},
  {key:'savings', label:'Saved This Month',icon:Flame,     g:'linear-gradient(135deg,#2d1a00,#4a2e00,#3d2200)',  accent:'#FBBF24',glow:'rgba(251,191,36,0.35)',  sub:'of income banked',  up:true,  isRate:true, sparkData:[30,38,35,42,40,48,52,55]},
];

function Sparkline({ data, color }) {
  const max = Math.max(...data), min = Math.min(...data);
  const pts = data.map((v,i) => `${(i/(data.length-1))*100},${100-((v-min)/(max-min||1))*80}`).join(' ');
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-8 mt-2">
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.7"/>
      <polyline points={`${pts} 100,100 0,100`} fill={color} opacity="0.08"/>
    </svg>
  );
}

export default function SummaryCards({ loading }) {
  const {getSummary}=useStore();
  const s=getSummary();
  if (loading) return <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">{[0,1,2,3].map(i=><div key={i} className="sk h-40 rounded-3xl"/>)}</div>;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {CARDS.map((c,i)=>{
        const Icon=c.icon;
        const val=c.isRate?`${s.savingsRate}%`:s[c.key];
        return (
          <motion.div key={c.key}
            initial={{opacity:0,y:28,scale:0.94}} animate={{opacity:1,y:0,scale:1}}
            transition={{delay:i*0.09,duration:0.5,ease:[0.16,1,0.3,1]}}
            whileHover={{y:-5,scale:1.02,transition:{duration:0.18}}}
            className="relative rounded-3xl p-5 overflow-hidden cursor-default gb"
            style={{background:c.g,boxShadow:`0 16px 48px ${c.glow}`,border:`1px solid ${c.accent}25`}}>
            <div className="absolute inset-0 rounded-3xl pointer-events-none" style={{background:'linear-gradient(135deg,rgba(255,255,255,0.12) 0%,transparent 40%)'}}/>
            <div className="absolute -top-8 -right-8 w-28 h-28 rounded-full pointer-events-none" style={{background:c.accent,opacity:0.08,filter:'blur(20px)'}}/>
            <div className="relative">
              <div className="flex items-start justify-between mb-3">
                <p className="text-[10px] font-black text-white/60 uppercase tracking-widest">{c.label}</p>
                <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{background:'rgba(255,255,255,0.12)',backdropFilter:'blur(10px)'}}>
                  <Icon size={15} style={{color:c.accent}}/>
                </div>
              </div>
              <p className="text-[28px] font-black text-white leading-none sn">{c.isRate?val:fmt(val,true)}</p>
              <Sparkline data={c.sparkData} color={c.accent}/>
              <div className="flex items-center gap-1 mt-1">
                {c.up?<ArrowUpRight size={11} style={{color:c.accent}}/>:<ArrowDownRight size={11} style={{color:c.accent}}/>}
                <span className="text-[10px] font-semibold" style={{color:c.accent+'cc'}}>{c.sub}</span>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
