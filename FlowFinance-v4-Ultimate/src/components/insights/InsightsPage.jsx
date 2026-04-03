import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Award, TrendingUp, TrendingDown, AlertTriangle, Zap } from 'lucide-react';
import useStore from '../../store/useStore';
import { MONTHLY_DATA, SPENDING_BY_CAT } from '../../data/mockData';
import { fmt } from '../../utils/format';

const Tip = ({active,payload,label}) => {
  if(!active||!payload?.length) return null;
  return (
    <div className="px-3 py-2.5 rounded-2xl text-xs" style={{background:'rgba(13,15,28,0.97)',border:'1px solid rgba(129,140,248,0.3)',backdropFilter:'blur(20px)'}}>
      <p className="mb-1.5 font-semibold" style={{color:'rgba(255,255,255,0.4)'}}>{label}</p>
      {payload.map(p => (
        <div key={p.dataKey} className="flex items-center gap-2 mb-1">
          <span className="w-2 h-2 rounded" style={{background:p.fill}}/>
          <span className="capitalize" style={{color:'rgba(255,255,255,0.4)'}}>{p.dataKey}:</span>
          <span className="font-bold text-white">{fmt(p.value,true)}</span>
        </div>
      ))}
    </div>
  );
};

function KpiCard({icon:Icon,title,value,sub,accent,delay,badge}) {
  return (
    <motion.div initial={{opacity:0,y:14}} animate={{opacity:1,y:0}} transition={{delay,duration:0.35}}
      whileHover={{y:-3,transition:{duration:0.15}}} className="glass p-5 relative overflow-hidden cursor-default">
      <div className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-10 translate-x-6 -translate-y-6 pointer-events-none" style={{background:accent,filter:'blur(20px)'}}/>
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{background:`${accent}18`,border:`1px solid ${accent}28`}}>
          <Icon size={18} style={{color:accent}}/>
        </div>
        {badge && <span className="pill" style={{background:`${accent}12`,color:accent,border:`1px solid ${accent}22`}}>{badge}</span>}
      </div>
      <p className="text-[10px] font-bold uppercase tracking-wider mb-0.5" style={{color:'rgba(255,255,255,0.35)'}}>{title}</p>
      <p className="text-xl font-black text-white mb-1 stat-num">{value}</p>
      <p className="text-xs leading-relaxed" style={{color:'rgba(255,255,255,0.35)'}}>{sub}</p>
    </motion.div>
  );
}

export default function InsightsPage() {
  const { transactions } = useStore();
  const income = transactions.filter(t=>t.type==='income').reduce((s,t)=>s+t.amount,0);
  const expenses = transactions.filter(t=>t.type==='expense').reduce((s,t)=>s+t.amount,0);
  const savingsRate = income>0?Math.round(((income-expenses)/income)*100):0;
  const catTotals = {};
  transactions.filter(t=>t.type==='expense').forEach(t=>{ catTotals[t.category]=(catTotals[t.category]||0)+t.amount; });
  const topCat = Object.entries(catTotals).sort((a,b)=>b[1]-a[1])[0]||['N/A',0];
  const expDiff = Math.round(((MONTHLY_DATA[5].expenses-MONTHLY_DATA[4].expenses)/MONTHLY_DATA[4].expenses)*100);
  const incDiff = Math.round(((MONTHLY_DATA[5].income-MONTHLY_DATA[4].income)/MONTHLY_DATA[4].income)*100);

  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} className="space-y-5">
      {/* Banner */}
      <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{duration:0.4}}
        className="glass-bright p-4 flex items-start gap-4" style={{background:'linear-gradient(135deg,rgba(99,102,241,0.15),rgba(139,92,246,0.08))',border:'1px solid rgba(129,140,248,0.2)'}}>
        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{background:'linear-gradient(135deg,#6366F1,#8B5CF6)',boxShadow:'0 0 20px rgba(99,102,241,0.4)'}}>
          <Zap size={18} className="text-white" fill="white"/>
        </div>
        <div>
          <p className="text-sm font-bold text-white mb-0.5 stat-num">AI Monthly Summary</p>
          <p className="text-xs leading-relaxed" style={{color:'rgba(255,255,255,0.45)'}}>
            Expenses <span className="font-bold" style={{color:'#FB7185'}}>{Math.abs(expDiff)}% {expDiff>0?'higher':'lower'}</span> vs March.
            Top spend: <span className="font-bold" style={{color:'#FCD34D'}}>{topCat[0]}</span> at {fmt(topCat[1],true)}.
            Savings rate <span className="font-bold" style={{color:'#34D399'}}>{savingsRate}%</span>.
            Income up <span className="font-bold" style={{color:'#818CF8'}}>{incDiff}%</span>.
          </p>
        </div>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard icon={Award}        title="Top Category"   value={topCat[0]}       sub={`${fmt(topCat[1],true)} spent`}                   accent="#FCD34D" delay={0.05}/>
        <KpiCard icon={TrendingDown} title="Expense Change" value={`${expDiff>0?'+':''}${expDiff}%`} sub="vs last month"              accent={expDiff>0?'#FB7185':'#34D399'} delay={0.1} badge={expDiff>10?'⚠ High':'Normal'}/>
        <KpiCard icon={TrendingUp}   title="Income Growth"  value={`+${incDiff}%`}  sub="Income increased"                                 accent="#818CF8" delay={0.15} badge="↑ Rising"/>
        <KpiCard icon={AlertTriangle} title="Savings Rate"  value={`${savingsRate}%`} sub="Target: 30–40%"                              accent="#34D399" delay={0.2} badge={savingsRate>=30?'✓ Good':'Improve'}/>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <motion.div initial={{opacity:0,y:14}} animate={{opacity:1,y:0}} transition={{delay:0.25}} className="glass p-5">
          <h3 className="text-sm font-bold text-white mb-0.5 stat-num">Income vs Expenses</h3>
          <p className="text-xs mb-4" style={{color:'rgba(255,255,255,0.35)'}}>6-month comparison</p>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MONTHLY_DATA} margin={{top:4,right:4,left:-28,bottom:0}} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false}/>
                <XAxis dataKey="month" tick={{fill:'rgba(255,255,255,0.3)',fontSize:11}} axisLine={false} tickLine={false}/>
                <YAxis tick={{fill:'rgba(255,255,255,0.25)',fontSize:10}} axisLine={false} tickLine={false} tickFormatter={v=>`₹${(v/1000).toFixed(0)}k`}/>
                <Tooltip content={<Tip/>}/>
                <Bar dataKey="income"   fill="#818CF8" radius={[6,6,0,0]} maxBarSize={22}/>
                <Bar dataKey="expenses" fill="#FB7185" radius={[6,6,0,0]} maxBarSize={22}/>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center gap-4 mt-2">
            {[{l:'Income',c:'#818CF8'},{l:'Expenses',c:'#FB7185'}].map(x => (
              <div key={x.l} className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded" style={{background:x.c,boxShadow:`0 0 5px ${x.c}`}}/>
                <span className="text-xs" style={{color:'rgba(255,255,255,0.4)'}}>{x.l}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{opacity:0,y:14}} animate={{opacity:1,y:0}} transition={{delay:0.3}} className="glass p-5">
          <h3 className="text-sm font-bold text-white mb-0.5 stat-num">Category Breakdown</h3>
          <p className="text-xs mb-4" style={{color:'rgba(255,255,255,0.35)'}}>Spending distribution</p>
          <div className="space-y-3">
            {SPENDING_BY_CAT.slice(0,7).map((cat,i) => {
              const pct = Math.round((cat.value/SPENDING_BY_CAT[0].value)*100);
              return (
                <motion.div key={cat.name} initial={{opacity:0,x:10}} animate={{opacity:1,x:0}} transition={{delay:i*0.05+0.3}}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-semibold" style={{color:'rgba(255,255,255,0.6)'}}>{cat.name}</span>
                    <span className="text-xs font-black stat-num" style={{color:'rgba(255,255,255,0.8)'}}>{fmt(cat.value,true)}</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full" style={{background:'rgba(255,255,255,0.06)'}}>
                    <motion.div initial={{width:0}} animate={{width:`${pct}%`}} transition={{delay:i*0.05+0.4,duration:0.8,ease:'easeOut'}}
                      className="h-full rounded-full" style={{background:cat.color,boxShadow:`0 0 6px ${cat.color}80`}}/>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>

      <motion.div initial={{opacity:0,y:14}} animate={{opacity:1,y:0}} transition={{delay:0.35}} className="glass p-5">
        <h3 className="text-sm font-bold text-white mb-4 stat-num">Smart Tips</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            {e:'⚠️',c:'#FCD34D',title:'Travel Budget',body:'Travel at ₹1,410 is 21% of expenses. Set a ₹1,500 monthly cap to free up funds.'},
            {e:'📈',c:'#818CF8',title:'Invest More',body:'Only 8% of income invested. Target 15%+ for long-term wealth creation.'},
            {e:'🌱',c:'#34D399',title:'3 Income Streams',body:'Salary, Freelance & Dividends detected. Great diversification — keep growing!'},
          ].map((tip,i) => (
            <motion.div key={tip.title} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{delay:i*0.08+0.4}}
              className="rounded-2xl p-4" style={{background:`${tip.c}0a`,border:`1px solid ${tip.c}22`}}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">{tip.e}</span>
                <span className="text-xs font-bold" style={{color:tip.c}}>{tip.title}</span>
              </div>
              <p className="text-xs leading-relaxed" style={{color:'rgba(255,255,255,0.4)'}}>{tip.body}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
