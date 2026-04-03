import { useState } from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, Sector, ResponsiveContainer } from 'recharts';
import { SPENDING_BY_CAT } from '../../data/mockData';
import { fmt } from '../../utils/format';

const ActiveShape = ({ cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, value }) => (
  <g>
    <text x={cx} y={cy-12} textAnchor="middle" fill="white" fontSize={12} fontWeight={700} fontFamily="Space Grotesk,sans-serif">{payload.name}</text>
    <text x={cx} y={cy+8} textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize={11}>{fmt(value,true)}</text>
    <Sector cx={cx} cy={cy} innerRadius={innerRadius} outerRadius={outerRadius+8} startAngle={startAngle} endAngle={endAngle} fill={fill}/>
    <Sector cx={cx} cy={cy} innerRadius={outerRadius+12} outerRadius={outerRadius+14} startAngle={startAngle} endAngle={endAngle} fill={fill} opacity={0.5}/>
  </g>
);

export default function SpendingChart() {
  const [active, setActive] = useState(0);
  const total = SPENDING_BY_CAT.reduce((s,c) => s+c.value, 0);
  return (
    <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.3,duration:0.45}}
      className="glass p-5 h-full relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-48 h-32 opacity-15 pointer-events-none" style={{background:'radial-gradient(ellipse,rgba(167,139,250,0.5) 0%,transparent 70%)'}}/>
      <div className="flex items-center justify-between mb-4 relative">
        <div>
          <h3 className="text-sm font-bold text-white stat-num">Spending Breakdown</h3>
          <p className="text-xs mt-0.5" style={{color:'rgba(255,255,255,0.35)'}}>Total: {fmt(total,true)}</p>
        </div>
        <div className="px-2.5 py-1 rounded-xl text-xs font-bold" style={{background:'rgba(167,139,250,0.12)',border:'1px solid rgba(167,139,250,0.25)',color:'#A78BFA'}}>Apr 2024</div>
      </div>
      <div className="flex gap-4">
        <div className="w-36 h-36 flex-shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie activeIndex={active} activeShape={ActiveShape} data={SPENDING_BY_CAT}
                cx="50%" cy="50%" innerRadius={40} outerRadius={56}
                dataKey="value" onMouseEnter={(_,i) => setActive(i)}>
                {SPENDING_BY_CAT.map((e,i) => <Cell key={i} fill={e.color} stroke="transparent"/>)}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex-1 space-y-2 overflow-y-auto max-h-36">
          {SPENDING_BY_CAT.map((c,i) => (
            <motion.div key={c.name} initial={{opacity:0,x:10}} animate={{opacity:1,x:0}} transition={{delay:i*0.04+0.3}}
              className="flex items-center justify-between cursor-pointer group" onMouseEnter={() => setActive(i)}>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full" style={{background:c.color,boxShadow:`0 0 5px ${c.color}`}}/>
                <span className="text-xs font-medium group-hover:text-white transition-colors" style={{color:'rgba(255,255,255,0.5)'}}>{c.name}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px]" style={{color:'rgba(255,255,255,0.3)'}}>{Math.round((c.value/total)*100)}%</span>
                <span className="text-xs font-bold text-white" style={{fontFamily:'JetBrains Mono,monospace'}}>{fmt(c.value,true)}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
