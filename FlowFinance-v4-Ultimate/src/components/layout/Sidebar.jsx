import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, ArrowLeftRight, Lightbulb, Sparkles, Target, Settings, ChevronLeft, ChevronRight, Zap, BarChart3, TrendingUp } from 'lucide-react';
import useStore from '../../store/useStore';
import { CRYPTO_TICKERS } from '../../data/mockData';

const NAV = [
  {id:'dashboard',    label:'Dashboard',    icon:LayoutDashboard},
  {id:'transactions', label:'Transactions', icon:ArrowLeftRight},
  {id:'analytics',    label:'Analytics',    icon:BarChart3},
  {id:'goals',        label:'Goals',        icon:Target,    badge:'4'},
  {id:'suggestions',  label:'AI Advisor',   icon:Sparkles,  badge:'AI'},
  {id:'settings',     label:'Settings',     icon:Settings},
];

export default function Sidebar() {
  const { sidebarOpen, toggleSidebar, activePage, setActivePage } = useStore();
  return (
    <motion.aside animate={{width:sidebarOpen?228:64}} transition={{type:'spring',stiffness:300,damping:28}}
      className="relative flex-shrink-0 h-screen flex flex-col z-30 overflow-hidden"
      style={{background:'rgba(5,6,14,0.98)',borderRight:'1px solid rgba(255,255,255,0.055)'}}>
      <div className="absolute -top-16 -left-16 w-48 h-48 rounded-full pointer-events-none" style={{background:'radial-gradient(circle,rgba(124,111,247,0.15),transparent 70%)'}}/>
      <div className="absolute bottom-32 -right-8 w-32 h-32 rounded-full pointer-events-none" style={{background:'radial-gradient(circle,rgba(34,211,238,0.08),transparent 70%)'}}/>

      <div className="flex items-center gap-3 px-4 py-5 relative" style={{borderBottom:'1px solid rgba(255,255,255,0.05)'}}>
        <motion.div whileHover={{scale:1.08,rotate:5}} className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center relative"
          style={{background:'linear-gradient(135deg,#6366F1,#7C6FF7,#22D3EE)',boxShadow:'0 0 24px rgba(124,111,247,0.6)'}}>
          <Zap size={17} className="text-white" fill="white"/>
          <div className="absolute inset-0 rounded-xl" style={{background:'linear-gradient(135deg,rgba(255,255,255,0.2),transparent)'}}/>
        </motion.div>
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div initial={{opacity:0,x:-8}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-8}} transition={{duration:0.16}}>
              <p className="text-sm font-bold text-white" style={{fontFamily:'Space Grotesk,sans-serif'}}>FlowFinance</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full pdot" style={{background:'#10B981'}}/>
                <p className="text-[10px] font-semibold" style={{color:'rgba(16,185,129,0.8)'}}>Live · April 2024</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <nav className="flex-1 px-2.5 py-4 space-y-0.5 overflow-hidden">
        {NAV.map((item) => {
          const Icon = item.icon;
          const active = activePage === item.id;
          return (
            <motion.button key={item.id} whileHover={{x:2}} whileTap={{scale:0.96}} onClick={()=>setActivePage(item.id)}
              className="relative w-full flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-150 overflow-hidden"
              style={active?{background:'linear-gradient(135deg,rgba(99,102,241,0.22),rgba(124,111,247,0.12))',border:'1px solid rgba(124,111,247,0.3)',color:'#C4B5FD'}:{border:'1px solid transparent',color:'rgba(255,255,255,0.3)'}}>
              {active && <>
                <motion.div layoutId="nav-bg" className="absolute inset-0 rounded-xl" style={{background:'linear-gradient(135deg,rgba(99,102,241,0.18),rgba(124,111,247,0.08))'}} transition={{type:'spring',stiffness:350,damping:28}}/>
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-full" style={{background:'linear-gradient(#7C6FF7,#22D3EE)'}}/>
              </>}
              <Icon size={16} className="relative flex-shrink-0" style={{color:active?'#7C6FF7':'inherit'}}/>
              <AnimatePresence>
                {sidebarOpen && (
                  <motion.div initial={{opacity:0,width:0}} animate={{opacity:1,width:'auto'}} exit={{opacity:0,width:0}} transition={{duration:0.16}}
                    className="relative flex items-center gap-2 overflow-hidden whitespace-nowrap flex-1">
                    <span className="text-[13px] font-semibold">{item.label}</span>
                    {item.badge && <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full ml-auto" style={{background:item.badge==='AI'?'linear-gradient(135deg,#6366F1,#7C6FF7)':'rgba(255,255,255,0.1)',color:'white'}}>{item.badge}</span>}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </nav>

      <AnimatePresence>
        {sidebarOpen && (
          <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0,y:10}}
            className="mx-2.5 mb-3 rounded-2xl overflow-hidden" style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
            <div className="px-3 py-2 flex items-center gap-1.5" style={{borderBottom:'1px solid rgba(255,255,255,0.04)'}}>
              <TrendingUp size={10} style={{color:'#10B981'}}/>
              <span className="text-[10px] font-bold uppercase tracking-widest" style={{color:'rgba(255,255,255,0.3)'}}>Live Markets</span>
            </div>
            {CRYPTO_TICKERS.slice(0,4).map(t => (
              <div key={t.sym} className="flex items-center justify-between px-3 py-1.5">
                <div><span className="text-[11px] font-bold text-white">{t.sym}</span><span className="text-[9px] ml-1.5" style={{color:'rgba(255,255,255,0.3)'}}>{t.name}</span></div>
                <span className="text-[10px] font-bold" style={{color:t.up?'#10B981':'#F43F5E'}}>{t.change}</span>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {sidebarOpen && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="mx-2.5 mb-3 p-3 rounded-2xl" style={{background:'rgba(124,111,247,0.08)',border:'1px solid rgba(124,111,247,0.15)'}}>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black text-white" style={{background:'linear-gradient(135deg,#6366F1,#F472B6)',boxShadow:'0 0 14px rgba(99,102,241,0.45)'}}>AK</div>
              <div><p className="text-xs font-bold text-white">Arjun Kumar</p><p className="text-[10px] font-medium" style={{color:'rgba(124,111,247,0.8)'}}>✦ Pro Member</p></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="px-2.5 pb-4 pt-1" style={{borderTop:'1px solid rgba(255,255,255,0.04)'}}>
        <motion.button whileHover={{scale:1.03}} whileTap={{scale:0.96}} onClick={toggleSidebar}
          className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-medium" style={{color:'rgba(255,255,255,0.2)'}}>
          {sidebarOpen?<><ChevronLeft size={13}/><span>Collapse</span></>:<ChevronRight size={13}/>}
        </motion.button>
      </div>
    </motion.aside>
  );
}
