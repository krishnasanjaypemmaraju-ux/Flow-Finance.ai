import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, ArrowUpDown, ArrowUp, ArrowDown, Pencil, Trash2, ChevronDown, Plus } from 'lucide-react';
import toast from 'react-hot-toast';
import useStore from '../../store/useStore';
import { CATEGORIES, CATEGORY_META } from '../../data/mockData';
import { fmt, fmtDate } from '../../utils/format';

function Empty({ q }) {
  return (
    <motion.div initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} className="flex flex-col items-center justify-center py-20 text-center">
      <div className="text-5xl mb-4 opacity-40">🔍</div>
      <p className="text-sm font-bold text-white mb-1 stat-num">No transactions found</p>
      <p className="text-xs" style={{color:'rgba(255,255,255,0.3)'}}>{q ? `No results for "${q}"` : 'Try adjusting filters'}</p>
    </motion.div>
  );
}

function SortBtn({ field, label, sortBy, sortDir, setSortBy, setSortDir }) {
  const active = sortBy === field;
  return (
    <button onClick={() => { if(active) setSortDir(sortDir==='asc'?'desc':'asc'); else { setSortBy(field); setSortDir('desc'); } }}
      className="flex items-center gap-1 text-xs font-semibold transition-colors"
      style={{color: active ? '#818CF8' : 'rgba(255,255,255,0.3)'}}>
      {label}
      {active ? (sortDir==='asc' ? <ArrowUp size={10}/> : <ArrowDown size={10}/>) : <ArrowUpDown size={10} className="opacity-40"/>}
    </button>
  );
}

export default function TransactionsPage() {
  const { role, searchQuery, setSearchQuery, categoryFilter, setCategoryFilter, sortBy, setSortBy, sortDir, setSortDir, getFiltered, deleteTransaction, openEditModal, openAddModal } = useStore();
  const txs = getFiltered();

  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} className="space-y-4">
      {/* Filter bar */}
      <div className="glass p-4 flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-44">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2" style={{color:'rgba(255,255,255,0.3)'}}/>
          <input type="text" value={searchQuery} onChange={e=>setSearchQuery(e.target.value)} placeholder="Search transactions…"
            className="input-dark w-full pl-9 pr-3 py-2 text-sm"/>
        </div>

        <div className="relative">
          <Filter size={12} className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{color:'rgba(255,255,255,0.3)'}}/>
          <ChevronDown size={11} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{color:'rgba(255,255,255,0.3)'}}/>
          <select value={categoryFilter} onChange={e=>setCategoryFilter(e.target.value)}
            className="input-dark pl-8 pr-8 py-2 text-sm appearance-none cursor-pointer min-w-36">
            <option value="All">All Categories</option>
            {CATEGORIES.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>

        <div className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs" style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)'}}>
          <span style={{color:'rgba(255,255,255,0.25)'}}>Sort:</span>
          <SortBtn field="date" label="Date" {...{sortBy,sortDir,setSortBy,setSortDir}}/>
          <span style={{color:'rgba(255,255,255,0.1)'}}>|</span>
          <SortBtn field="amount" label="Amount" {...{sortBy,sortDir,setSortBy,setSortDir}}/>
        </div>

        <span className="text-xs font-medium px-2.5 py-1.5 rounded-xl" style={{background:'rgba(129,140,248,0.1)',color:'#818CF8',border:'1px solid rgba(129,140,248,0.2)'}}>{txs.length} results</span>

        {role==='admin' && (
          <motion.button whileHover={{scale:1.03}} whileTap={{scale:0.96}} onClick={openAddModal}
            className="btn-glow flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm">
            <Plus size={14}/> Add
          </motion.button>
        )}
      </div>

      {/* Table */}
      <div className="glass overflow-hidden">
        <div className="grid px-5 py-3 text-[10px] font-bold uppercase tracking-wider"
          style={{gridTemplateColumns:'2fr 1.2fr 1fr 0.8fr '+(role==='admin'?'0.6fr':''), borderBottom:'1px solid rgba(255,255,255,0.06)', color:'rgba(255,255,255,0.3)'}}>
          <span>Description</span><span>Amount</span><span>Category</span><span>Date</span>
          {role==='admin' && <span className="text-right">Actions</span>}
        </div>

        {txs.length===0 ? <Empty q={searchQuery}/> : (
          <div>
            <AnimatePresence initial={false}>
              {txs.map((tx,i) => {
                const meta = CATEGORY_META[tx.category]||{color:'#818CF8',bg:'rgba(129,140,248,0.1)',icon:'💳'};
                return (
                  <motion.div key={tx.id}
                    initial={{opacity:0,y:-6}} animate={{opacity:1,y:0}} exit={{opacity:0,x:-20,height:0}}
                    transition={{delay:i*0.02,duration:0.22}}
                    className="grid items-center px-5 py-3.5 row-hover"
                    style={{gridTemplateColumns:'2fr 1.2fr 1fr 0.8fr '+(role==='admin'?'0.6fr':''), borderBottom:'1px solid rgba(255,255,255,0.04)'}}>

                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center text-sm flex-shrink-0" style={{background:`${meta.color}15`,border:`1px solid ${meta.color}25`}}>{meta.icon}</div>
                      <span className="text-xs font-semibold text-white truncate">{tx.description}</span>
                    </div>

                    <span className="text-sm font-black stat-num" style={{color:tx.type==='income'?'#34D399':'#FB7185'}}>
                      {tx.type==='income'?'+':'-'}{fmt(tx.amount)}
                    </span>

                    <span className="pill w-fit" style={{background:`${meta.color}12`,color:meta.color,border:`1px solid ${meta.color}25`}}>{tx.category}</span>

                    <span className="text-xs" style={{color:'rgba(255,255,255,0.35)'}}>{fmtDate(tx.date)}</span>

                    {role==='admin' && (
                      <div className="flex items-center justify-end gap-1">
                        <motion.button whileHover={{scale:1.15}} whileTap={{scale:0.88}} onClick={()=>openEditModal(tx)}
                          className="w-7 h-7 rounded-lg flex items-center justify-center transition-all"
                          style={{color:'rgba(255,255,255,0.3)'}}
                          onMouseEnter={e=>{e.currentTarget.style.color='#818CF8';e.currentTarget.style.background='rgba(129,140,248,0.12)';}}
                          onMouseLeave={e=>{e.currentTarget.style.color='rgba(255,255,255,0.3)';e.currentTarget.style.background='transparent';}}>
                          <Pencil size={12}/>
                        </motion.button>
                        <motion.button whileHover={{scale:1.15}} whileTap={{scale:0.88}} onClick={()=>{deleteTransaction(tx.id);toast.success('Deleted!',{icon:'🗑️'});}}
                          className="w-7 h-7 rounded-lg flex items-center justify-center transition-all"
                          style={{color:'rgba(255,255,255,0.3)'}}
                          onMouseEnter={e=>{e.currentTarget.style.color='#FB7185';e.currentTarget.style.background='rgba(251,113,133,0.1)';}}
                          onMouseLeave={e=>{e.currentTarget.style.color='rgba(255,255,255,0.3)';e.currentTarget.style.background='transparent';}}>
                          <Trash2 size={12}/>
                        </motion.button>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </motion.div>
  );
}
