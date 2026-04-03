import { motion } from 'framer-motion';
import { MoveRight } from 'lucide-react';
import useStore from '../../store/useStore';
import { fmt, fmtShort } from '../../utils/format';
import { CATEGORY_META } from '../../data/mockData';

export default function RecentTx() {
  const { transactions, setActivePage } = useStore();
  const recent = transactions.slice(0,6);
  return (
    <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.4,duration:0.45}} className="glass p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-bold text-white stat-num">Recent Transactions</h3>
          <p className="text-xs mt-0.5" style={{color:'rgba(255,255,255,0.35)'}}>Latest activity</p>
        </div>
        <motion.button whileHover={{x:2}} onClick={() => setActivePage('transactions')}
          className="flex items-center gap-1 text-xs font-semibold transition-colors"
          style={{color:'#818CF8'}}
          onMouseEnter={e=>e.currentTarget.style.color='#C7D2FE'}
          onMouseLeave={e=>e.currentTarget.style.color='#818CF8'}>
          View all <MoveRight size={12}/>
        </motion.button>
      </div>
      <div className="space-y-1">
        {recent.map((tx,i) => {
          const meta = CATEGORY_META[tx.category] || {color:'#818CF8',bg:'rgba(129,140,248,0.1)',icon:'💳'};
          return (
            <motion.div key={tx.id} initial={{opacity:0,x:-10}} animate={{opacity:1,x:0}} transition={{delay:i*0.05+0.4}}
              className="flex items-center gap-3 px-3 py-2.5 rounded-2xl row-hover">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center text-base flex-shrink-0" style={{background:`${meta.color}18`,border:`1px solid ${meta.color}30`}}>
                {meta.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-white truncate">{tx.description}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="pill" style={{background:`${meta.color}15`,color:meta.color,border:`1px solid ${meta.color}25`}}>{tx.category}</span>
                  <span className="text-[10px]" style={{color:'rgba(255,255,255,0.3)'}}>{fmtShort(tx.date)}</span>
                </div>
              </div>
              <span className="text-sm font-black flex-shrink-0 stat-num" style={{color:tx.type==='income'?'#34D399':'#FB7185'}}>
                {tx.type==='income'?'+':'-'}{fmt(tx.amount,true)}
              </span>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
