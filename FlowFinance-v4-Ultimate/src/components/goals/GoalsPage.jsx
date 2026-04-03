import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Plus, Trash2, TrendingUp, Calendar, CheckCircle2, Zap, X } from 'lucide-react';
import toast from 'react-hot-toast';
import useStore from '../../store/useStore';
import { fmt } from '../../utils/format';

function ProgressRing({ pct, color, size = 80, stroke = 7 }) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;
  return (
    <svg width={size} height={size} className="prog-ring">
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={stroke}/>
      <motion.circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke}
        strokeLinecap="round" strokeDasharray={circ}
        initial={{ strokeDashoffset: circ }}
        animate={{ strokeDashoffset: circ - dash }}
        transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
        style={{ filter: `drop-shadow(0 0 6px ${color}80)` }}
      />
    </svg>
  );
}

function GoalCard({ goal, onDelete, delay }) {
  const [adding, setAdding] = useState(false);
  const [amount, setAmount] = useState('');
  const { updateGoalProgress } = useStore();
  const pct = Math.round((goal.current / goal.target) * 100);
  const remaining = goal.target - goal.current;
  const done = pct >= 100;

  const handleAdd = () => {
    const n = parseFloat(amount);
    if (!n || n <= 0) return;
    updateGoalProgress(goal.id, n);
    toast.success(`Added ${fmt(n, true)} to ${goal.name}!`, { icon: '🎯' });
    setAmount('');
    setAdding(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay, duration: 0.4 }}
      whileHover={{ y: -3, transition: { duration: 0.15 } }}
      className="card p-5 relative overflow-hidden gb"
      style={{ border: `1px solid ${goal.color}20` }}
    >
      {/* Background glow */}
      <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full pointer-events-none" style={{ background: goal.color, opacity: 0.06, filter: 'blur(24px)' }}/>

      {done && (
        <div className="absolute top-3 right-3">
          <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.5 }}>
            <CheckCircle2 size={18} style={{ color: '#10B981' }}/>
          </motion.div>
        </div>
      )}

      <div className="flex items-center gap-4">
        {/* Ring */}
        <div className="relative flex-shrink-0">
          <ProgressRing pct={pct} color={goal.color} size={72} stroke={6}/>
          <div className="absolute inset-0 flex items-center justify-center flex-col">
            <span className="text-lg">{goal.icon}</span>
            <span className="text-[10px] font-black sn" style={{ color: goal.color }}>{pct}%</span>
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-bold text-white mb-0.5">{goal.name}</h3>
          <div className="flex items-center gap-1.5 mb-2">
            <Calendar size={10} style={{ color: 'rgba(255,255,255,0.35)' }}/>
            <span className="text-[10px]" style={{ color: 'rgba(255,255,255,0.35)' }}>Target: {goal.deadline}</span>
          </div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-black sn" style={{ color: goal.color }}>{fmt(goal.current, true)}</span>
            <span className="text-[10px]" style={{ color: 'rgba(255,255,255,0.35)' }}>of {fmt(goal.target, true)}</span>
          </div>
          <div className="goal-bar">
            <motion.div className="goal-bar-fill" initial={{ width: 0 }} animate={{ width: `${pct}%` }}
              transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
              style={{ background: `linear-gradient(90deg,${goal.color},${goal.color}88)`, boxShadow: `0 0 8px ${goal.color}60` }}/>
          </div>
          {!done && <p className="text-[10px] mt-1" style={{ color: 'rgba(255,255,255,0.3)' }}>{fmt(remaining, true)} left to go</p>}
        </div>
      </div>

      {/* Add funds button */}
      <AnimatePresence>
        {!done && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4">
            {!adding ? (
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} onClick={() => setAdding(true)}
                className="w-full py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                style={{ background: `${goal.color}12`, border: `1px solid ${goal.color}25`, color: goal.color }}>
                <Plus size={12}/> Add Funds
              </motion.button>
            ) : (
              <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="flex gap-2">
                <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="Amount (₹)"
                  className="inp flex-1 px-3 py-2 text-xs" autoFocus
                  onKeyDown={e => e.key === 'Enter' && handleAdd()}/>
                <motion.button whileTap={{ scale: 0.95 }} onClick={handleAdd}
                  className="px-3 py-2 rounded-xl text-xs font-bold btn">Add</motion.button>
                <motion.button whileTap={{ scale: 0.95 }} onClick={() => setAdding(false)}
                  className="w-9 rounded-xl flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.4)' }}>
                  <X size={12}/>
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete */}
      <motion.button whileHover={{ scale: 1.12 }} whileTap={{ scale: 0.88 }} onClick={() => onDelete(goal.id)}
        className="absolute bottom-3 right-3 w-7 h-7 rounded-lg flex items-center justify-center transition-all"
        style={{ color: 'rgba(255,255,255,0.15)' }}
        onMouseEnter={e => { e.currentTarget.style.color = '#F43F5E'; e.currentTarget.style.background = 'rgba(244,63,94,0.1)'; }}
        onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.15)'; e.currentTarget.style.background = 'transparent'; }}>
        <Trash2 size={12}/>
      </motion.button>
    </motion.div>
  );
}

const ICONS = ['🏠','💻','✈️','🚗','🏋️','📚','💍','🎵','🌴','💰'];
const COLORS = ['#7C6FF7','#10B981','#F97316','#FBBF24','#F472B6','#22D3EE','#F43F5E','#A78BFA'];

export default function GoalsPage() {
  const { goals, addGoal, deleteGoal } = useStore();
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ name: '', target: '', deadline: '', icon: '🎯', color: '#7C6FF7' });

  const total = goals.reduce((s, g) => s + g.target, 0);
  const saved = goals.reduce((s, g) => s + g.current, 0);
  const pct = total > 0 ? Math.round((saved / total) * 100) : 0;

  const handleAdd = () => {
    if (!form.name || !form.target) return;
    addGoal({ name: form.name, target: parseFloat(form.target), current: 0, deadline: form.deadline || 'Dec 2024', icon: form.icon, color: form.color });
    toast.success('Goal created! 🎯');
    setShowAdd(false);
    setForm({ name: '', target: '', deadline: '', icon: '🎯', color: '#7C6FF7' });
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">

      {/* Overview banner */}
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
        className="relative rounded-3xl p-6 overflow-hidden"
        style={{ background: 'linear-gradient(135deg,#1a0e3d,#0d2940,#1a0e3d)', border: '1px solid rgba(124,111,247,0.25)', boxShadow: '0 16px 48px rgba(124,111,247,0.2)' }}>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg,rgba(255,255,255,0.06) 0%,transparent 50%)', pointerEvents: 'none' }}/>
        <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle,rgba(124,111,247,0.2),transparent 70%)' }}/>

        <div className="relative flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Target size={16} style={{ color: '#7C6FF7' }}/>
              <span className="text-[11px] font-black uppercase tracking-widest" style={{ color: 'rgba(124,111,247,0.7)' }}>Financial Goals</span>
            </div>
            <h2 className="text-2xl font-black text-white mb-1 sn">{pct}% of all goals reached</h2>
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>{fmt(saved, true)} saved of {fmt(total, true)} total target</p>
          </div>
          <div className="relative">
            <ProgressRing pct={pct} color="#7C6FF7" size={90} stroke={8}/>
            <div className="absolute inset-0 flex items-center justify-center flex-col">
              <span className="text-xl font-black text-white sn">{pct}%</span>
              <span className="text-[9px]" style={{ color: 'rgba(255,255,255,0.4)' }}>overall</span>
            </div>
          </div>
        </div>

        <div className="relative grid grid-cols-3 gap-3 mt-5">
          {[
            { label: 'Active Goals', value: goals.length, icon: '🎯' },
            { label: 'Completed', value: goals.filter(g => g.current >= g.target).length, icon: '✅' },
            { label: 'Total Saved', value: fmt(saved, true), icon: '💰' },
          ].map((s, i) => (
            <div key={s.label} className="rounded-2xl p-3 text-center" style={{ background: 'rgba(255,255,255,0.07)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <p className="text-xl mb-1">{s.icon}</p>
              <p className="text-white font-black sn text-sm">{s.value}</p>
              <p className="text-[10px] mt-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>{s.label}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Add button */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-white sn">Your Goals ({goals.length})</h3>
        <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} onClick={() => setShowAdd(true)}
          className="btn flex items-center gap-2 px-4 py-2 rounded-xl text-sm">
          <Plus size={14}/> New Goal
        </motion.button>
      </div>

      {/* Add Goal Modal */}
      <AnimatePresence>
        {showAdd && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowAdd(false)}
              className="fixed inset-0 z-50" style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(10px)' }}/>
            <motion.div initial={{ opacity: 0, scale: 0.92, y: 24 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.92, y: 24 }}
              transition={{ type: 'spring', stiffness: 340, damping: 26 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ pointerEvents: 'none' }}>
              <div className="w-full max-w-md rounded-3xl p-6" style={{ background: 'rgba(8,10,22,0.98)', border: '1px solid rgba(124,111,247,0.25)', boxShadow: '0 32px 80px rgba(0,0,0,0.7)', pointerEvents: 'all' }}>
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-base font-black text-white sn">🎯 Create New Goal</h2>
                  <motion.button whileHover={{ rotate: 90 }} onClick={() => setShowAdd(false)}
                    className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.4)' }}>
                    <X size={15}/>
                  </motion.button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold mb-1.5" style={{ color: 'rgba(255,255,255,0.4)' }}>Goal Name</label>
                    <input className="inp w-full px-3 py-2.5 text-sm" placeholder="e.g. Europe Trip" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}/>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold mb-1.5" style={{ color: 'rgba(255,255,255,0.4)' }}>Target Amount (₹)</label>
                      <input type="number" className="inp w-full px-3 py-2.5 text-sm" placeholder="100000" value={form.target} onChange={e => setForm(f => ({ ...f, target: e.target.value }))}/>
                    </div>
                    <div>
                      <label className="block text-xs font-bold mb-1.5" style={{ color: 'rgba(255,255,255,0.4)' }}>Deadline</label>
                      <input className="inp w-full px-3 py-2.5 text-sm" placeholder="Dec 2024" value={form.deadline} onChange={e => setForm(f => ({ ...f, deadline: e.target.value }))}/>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-2" style={{ color: 'rgba(255,255,255,0.4)' }}>Icon</label>
                    <div className="flex flex-wrap gap-2">
                      {ICONS.map(ic => (
                        <button key={ic} onClick={() => setForm(f => ({ ...f, icon: ic }))}
                          className="w-9 h-9 rounded-xl text-xl flex items-center justify-center transition-all"
                          style={{ background: form.icon === ic ? 'rgba(124,111,247,0.25)' : 'rgba(255,255,255,0.05)', border: `1px solid ${form.icon === ic ? 'rgba(124,111,247,0.5)' : 'rgba(255,255,255,0.08)'}` }}>
                          {ic}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-2" style={{ color: 'rgba(255,255,255,0.4)' }}>Color</label>
                    <div className="flex gap-2">
                      {COLORS.map(col => (
                        <button key={col} onClick={() => setForm(f => ({ ...f, color: col }))}
                          className="w-7 h-7 rounded-full transition-all"
                          style={{ background: col, boxShadow: form.color === col ? `0 0 12px ${col}` : 'none', transform: form.color === col ? 'scale(1.2)' : 'scale(1)', outline: form.color === col ? `2px solid ${col}` : 'none', outlineOffset: '2px' }}/>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-5">
                  <button onClick={() => setShowAdd(false)} className="flex-1 py-2.5 rounded-xl text-sm font-bold" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.4)' }}>Cancel</button>
                  <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.97 }} onClick={handleAdd} className="flex-1 py-2.5 rounded-xl text-sm font-black btn flex items-center justify-center gap-2">
                    <Target size={14}/> Create Goal
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Goal cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {goals.map((g, i) => (
          <GoalCard key={g.id} goal={g} onDelete={(id) => { deleteGoal(id); toast.success('Goal deleted'); }} delay={i * 0.08}/>
        ))}
        {goals.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="col-span-2 text-center py-20">
            <p className="text-4xl mb-3">🎯</p>
            <p className="text-sm font-bold text-white sn">No goals yet</p>
            <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.35)' }}>Create your first financial goal above</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
