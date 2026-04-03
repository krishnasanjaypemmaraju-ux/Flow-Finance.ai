import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Save } from 'lucide-react';
import toast from 'react-hot-toast';
import useStore from '../../store/useStore';
import { CATEGORIES } from '../../data/mockData';

const EMPTY = { description:'', amount:'', category:'Food & Dining', type:'expense', date:new Date().toISOString().split('T')[0] };

export default function TransactionModal() {
  const { modalOpen, modalMode, editingTransaction, closeModal, addTransaction, updateTransaction } = useStore();
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (modalOpen) {
      setForm(modalMode==='edit'&&editingTransaction ? {description:editingTransaction.description,amount:editingTransaction.amount.toString(),category:editingTransaction.category,type:editingTransaction.type,date:editingTransaction.date} : EMPTY);
      setErrors({});
    }
  }, [modalOpen, modalMode, editingTransaction]);

  const set = (k,v) => { setForm(f=>({...f,[k]:v})); if(errors[k]) setErrors(e=>{const n={...e};delete n[k];return n;}); };

  const validate = () => {
    const e={};
    if(!form.description.trim()) e.description='Required';
    if(!form.amount||isNaN(+form.amount)||+form.amount<=0) e.amount='Enter valid amount';
    if(!form.date) e.date='Required';
    return e;
  };

  const handleSubmit = () => {
    const errs=validate();
    if(Object.keys(errs).length){setErrors(errs);return;}
    const payload={description:form.description.trim(),amount:parseFloat(form.amount),category:form.category,type:form.type,date:form.date};
    if(modalMode==='add'){addTransaction(payload);toast.success('Transaction added!',{icon:'✅'});}
    else{updateTransaction(editingTransaction.id,payload);toast.success('Updated!',{icon:'✏️'});}
    closeModal();
  };

  return (
    <AnimatePresence>
      {modalOpen && (
        <>
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={closeModal}
            className="fixed inset-0 z-50" style={{background:'rgba(0,0,0,0.75)',backdropFilter:'blur(10px)'}}/>
          <motion.div initial={{opacity:0,scale:0.92,y:24}} animate={{opacity:1,scale:1,y:0}} exit={{opacity:0,scale:0.92,y:24}}
            transition={{type:'spring',stiffness:340,damping:26}}
            className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{pointerEvents:'none'}}>
            <div className="w-full max-w-md rounded-3xl p-6" style={{background:'rgba(13,15,28,0.98)',border:'1px solid rgba(129,140,248,0.25)',boxShadow:'0 32px 80px rgba(0,0,0,0.7),0 0 60px rgba(99,102,241,0.15)',pointerEvents:'all',backdropFilter:'blur(20px)'}}>
              
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-base font-bold text-white stat-num">{modalMode==='add'?'✨ Add Transaction':'✏️ Edit Transaction'}</h2>
                  <p className="text-xs mt-0.5" style={{color:'rgba(255,255,255,0.35)'}}>{modalMode==='add'?'Record a new financial entry':'Update this transaction'}</p>
                </div>
                <motion.button whileHover={{scale:1.1,rotate:90}} whileTap={{scale:0.9}} transition={{duration:0.2}} onClick={closeModal}
                  className="w-8 h-8 rounded-xl flex items-center justify-center transition-all"
                  style={{background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.1)',color:'rgba(255,255,255,0.5)'}}>
                  <X size={15}/>
                </motion.button>
              </div>

              {/* Type toggle */}
              <div className="flex rounded-2xl p-1 mb-5" style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)'}}>
                {['income','expense'].map(t => (
                  <motion.button key={t} whileTap={{scale:0.97}} onClick={()=>set('type',t)}
                    className="flex-1 py-2.5 rounded-xl text-sm font-bold capitalize transition-all duration-200"
                    style={form.type===t
                      ? {background:t==='income'?'linear-gradient(135deg,#059669,#34D399)':'linear-gradient(135deg,#E11D48,#FB7185)',color:'white',boxShadow:`0 4px 16px ${t==='income'?'rgba(52,211,153,0.35)':'rgba(251,113,133,0.35)'}`}
                      : {color:'rgba(255,255,255,0.3)'}}>
                    {t==='income'?'↑ Income':'↓ Expense'}
                  </motion.button>
                ))}
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold mb-1.5" style={{color:'rgba(255,255,255,0.5)'}}>Description</label>
                  <input type="text" value={form.description} onChange={e=>set('description',e.target.value)} placeholder="e.g. Netflix Subscription"
                    className="input-dark w-full px-3 py-2.5 text-sm"/>
                  {errors.description && <p className="text-[11px] mt-1" style={{color:'#FB7185'}}>{errors.description}</p>}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold mb-1.5" style={{color:'rgba(255,255,255,0.5)'}}>Amount (₹)</label>
                    <input type="number" min="0" step="0.01" value={form.amount} onChange={e=>set('amount',e.target.value)} placeholder="0.00"
                      className="input-dark w-full px-3 py-2.5 text-sm font-mono"/>
                    {errors.amount && <p className="text-[11px] mt-1" style={{color:'#FB7185'}}>{errors.amount}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1.5" style={{color:'rgba(255,255,255,0.5)'}}>Date</label>
                    <input type="date" value={form.date} onChange={e=>set('date',e.target.value)} className="input-dark w-full px-3 py-2.5 text-sm"/>
                    {errors.date && <p className="text-[11px] mt-1" style={{color:'#FB7185'}}>{errors.date}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold mb-1.5" style={{color:'rgba(255,255,255,0.5)'}}>Category</label>
                  <select value={form.category} onChange={e=>set('category',e.target.value)} className="input-dark w-full px-3 py-2.5 text-sm cursor-pointer">
                    {CATEGORIES.map(c=><option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <motion.button whileHover={{scale:1.01}} whileTap={{scale:0.97}} onClick={closeModal}
                  className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all"
                  style={{background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.1)',color:'rgba(255,255,255,0.5)'}}>
                  Cancel
                </motion.button>
                <motion.button whileHover={{scale:1.01}} whileTap={{scale:0.97}} onClick={handleSubmit}
                  className="flex-1 py-2.5 rounded-xl text-sm font-bold btn-glow flex items-center justify-center gap-2">
                  {modalMode==='add'?<><Plus size={14}/>Add Transaction</>:<><Save size={14}/>Save Changes</>}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
