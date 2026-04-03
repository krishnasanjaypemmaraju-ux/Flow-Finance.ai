import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp } from 'lucide-react';
import { MONTHLY_DATA } from '../../data/mockData';
import { fmt } from '../../utils/format';

const Tip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="px-4 py-3 rounded-2xl text-xs" style={{background:'rgba(13,15,28,0.97)',border:'1px solid rgba(129,140,248,0.3)',backdropFilter:'blur(20px)',boxShadow:'0 8px 32px rgba(0,0,0,0.6)'}}>
      <p className="font-semibold mb-2" style={{color:'rgba(255,255,255,0.5)'}}>{label} 2024</p>
      {payload.map(p => (
        <div key={p.dataKey} className="flex items-center gap-2 mb-1">
          <span className="w-2 h-2 rounded-full" style={{background:p.color,boxShadow:`0 0 6px ${p.color}`}}/>
          <span className="capitalize" style={{color:'rgba(255,255,255,0.5)'}}>{p.dataKey}:</span>
          <span className="font-bold text-white">{fmt(p.value,true)}</span>
        </div>
      ))}
    </div>
  );
};

export default function BalanceChart() {
  return (
    <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.25,duration:0.45}}
      className="glass p-5 h-full relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-64 h-32 opacity-20 pointer-events-none" style={{background:'radial-gradient(ellipse,rgba(99,102,241,0.5) 0%,transparent 70%)'}}/>

      <div className="flex items-center justify-between mb-4 relative">
        <div>
          <h3 className="text-sm font-bold text-white stat-num">Balance Trend</h3>
          <p className="text-xs mt-0.5" style={{color:'rgba(255,255,255,0.35)'}}>6-month performance</p>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold" style={{background:'rgba(52,211,153,0.12)',border:'1px solid rgba(52,211,153,0.25)',color:'#34D399'}}>
          <TrendingUp size={11}/> +18.3%
        </div>
      </div>

      <div className="flex items-center gap-4 mb-4">
        {[{l:'Balance',c:'#818CF8'},{l:'Income',c:'#34D399'},{l:'Expenses',c:'#FB7185'}].map(x => (
          <div key={x.l} className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full" style={{background:x.c,boxShadow:`0 0 6px ${x.c}`}}/>
            <span className="text-xs font-medium" style={{color:'rgba(255,255,255,0.45)'}}>{x.l}</span>
          </div>
        ))}
      </div>

      <div className="h-52 relative">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={MONTHLY_DATA} margin={{top:4,right:4,left:-28,bottom:0}}>
            <defs>
              <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#818CF8" stopOpacity={0.25}/>
                <stop offset="95%" stopColor="#818CF8" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="ig" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#34D399" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#34D399" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="eg" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#FB7185" stopOpacity={0.15}/>
                <stop offset="95%" stopColor="#FB7185" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false}/>
            <XAxis dataKey="month" tick={{fill:'rgba(255,255,255,0.3)',fontSize:11}} axisLine={false} tickLine={false}/>
            <YAxis tick={{fill:'rgba(255,255,255,0.25)',fontSize:10}} axisLine={false} tickLine={false} tickFormatter={v=>`₹${(v/1000).toFixed(0)}k`}/>
            <Tooltip content={<Tip/>}/>
            <Area type="monotone" dataKey="balance"  stroke="#818CF8" strokeWidth={2.5} fill="url(#bg)" dot={false} activeDot={{r:5,fill:'#818CF8',stroke:'#0D0F1C',strokeWidth:2}}/>
            <Area type="monotone" dataKey="income"   stroke="#34D399" strokeWidth={1.5} fill="url(#ig)" dot={false} activeDot={{r:4,fill:'#34D399',stroke:'#0D0F1C',strokeWidth:2}}/>
            <Area type="monotone" dataKey="expenses" stroke="#FB7185" strokeWidth={1.5} fill="url(#eg)" dot={false} activeDot={{r:4,fill:'#FB7185',stroke:'#0D0F1C',strokeWidth:2}}/>
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
