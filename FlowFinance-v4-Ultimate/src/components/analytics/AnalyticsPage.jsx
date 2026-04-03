import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, RadarChart,
  PolarGrid, PolarAngleAxis, Radar,
} from 'recharts';
import { BarChart3, Zap, TrendingUp } from 'lucide-react';
import { MONTHLY_DATA, SPENDING_BY_CAT, HEATMAP_DATA } from '../../data/mockData';
import { fmt } from '../../utils/format';
import useStore from '../../store/useStore';

const Tip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="px-3 py-2.5 rounded-2xl text-xs" style={{ background: 'rgba(8,10,22,0.98)', border: '1px solid rgba(124,111,247,0.3)', boxShadow: '0 8px 32px rgba(0,0,0,0.6)' }}>
      <p className="font-bold mb-2" style={{ color: 'rgba(255,255,255,0.45)' }}>{label}</p>
      {payload.map(p => (
        <div key={p.dataKey} className="flex items-center gap-2 mb-1">
          <span className="w-2 h-2 rounded-full" style={{ background: p.color || p.fill }}/>
          <span className="capitalize" style={{ color: 'rgba(255,255,255,0.45)' }}>{p.dataKey}:</span>
          <span className="font-black text-white sn">{fmt(p.value, true)}</span>
        </div>
      ))}
    </div>
  );
};

// Spending heatmap
function SpendingHeatmap() {
  const [hovered, setHovered] = useState(null);
  const weeks = [];
  for (let i = 0; i < 16; i++) weeks.push(HEATMAP_DATA.slice(i * 7, i * 7 + 7));

  const colors = ['rgba(255,255,255,0.04)', 'rgba(124,111,247,0.25)', 'rgba(124,111,247,0.45)', 'rgba(124,111,247,0.7)', 'rgba(124,111,247,0.95)'];
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="card p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-black text-white sn">Spending Activity</h3>
          <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.35)' }}>Daily transaction heatmap — last 16 weeks</p>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-[10px]" style={{ color: 'rgba(255,255,255,0.3)' }}>Less</span>
          {colors.map((c, i) => <span key={i} className="w-3 h-3 rounded-sm" style={{ background: c, border: '1px solid rgba(255,255,255,0.05)' }}/>)}
          <span className="text-[10px]" style={{ color: 'rgba(255,255,255,0.3)' }}>More</span>
        </div>
      </div>

      <div className="flex gap-1">
        <div className="flex flex-col gap-1 mr-1 pt-5">
          {days.map(d => <span key={d} className="text-[9px] h-3 flex items-center" style={{ color: 'rgba(255,255,255,0.2)', width: '10px' }}>{d}</span>)}
        </div>
        <div className="flex gap-1 overflow-x-auto pb-1">
          {weeks.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-1">
              {week.map((day, di) => (
                <motion.div key={day.date} whileHover={{ scale: 1.4, zIndex: 10 }}
                  className="hm-cell w-3 h-3 relative" style={{ background: colors[day.value], border: '1px solid rgba(255,255,255,0.04)' }}
                  onMouseEnter={() => setHovered(day)} onMouseLeave={() => setHovered(null)}/>
              ))}
            </div>
          ))}
        </div>
      </div>

      {hovered && (
        <div className="mt-2 text-[10px]" style={{ color: 'rgba(255,255,255,0.45)' }}>
          {hovered.date} · Activity level: {['None', 'Low', 'Medium', 'High', 'Very High'][hovered.value]}
        </div>
      )}
    </motion.div>
  );
}

// Spending DNA radar
function SpendingDNA() {
  const data = SPENDING_BY_CAT.slice(0, 7).map(c => ({
    category: c.name.split(' ')[0],
    value: c.value,
    fullMark: 2000,
  }));

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="card p-5">
      <h3 className="text-sm font-black text-white mb-0.5 sn">Spending DNA</h3>
      <p className="text-xs mb-4" style={{ color: 'rgba(255,255,255,0.35)' }}>Your unique spending pattern</p>
      <div className="h-52">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data} margin={{ top: 8, right: 24, bottom: 8, left: 24 }}>
            <PolarGrid stroke="rgba(255,255,255,0.07)" radialLines={false}/>
            <PolarAngleAxis dataKey="category" tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 10 }}/>
            <Radar name="spending" dataKey="value" stroke="#7C6FF7" fill="#7C6FF7" fillOpacity={0.15} strokeWidth={2}/>
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}

// Monthly savings waterfall
function SavingsWaterfall() {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="card p-5">
      <h3 className="text-sm font-black text-white mb-0.5 sn">Savings Waterfall</h3>
      <p className="text-xs mb-4" style={{ color: 'rgba(255,255,255,0.35)' }}>Monthly savings accumulation</p>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={MONTHLY_DATA} margin={{ top: 4, right: 4, left: -28, bottom: 0 }}>
            <defs>
              <linearGradient id="sg" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#7C6FF7" stopOpacity={0.4}/>
                <stop offset="100%" stopColor="#7C6FF7" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false}/>
            <XAxis dataKey="month" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} axisLine={false} tickLine={false}/>
            <YAxis tick={{ fill: 'rgba(255,255,255,0.25)', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => `₹${(v/1000).toFixed(0)}k`}/>
            <Tooltip content={<Tip/>}/>
            <Area type="monotone" dataKey="savings" stroke="#7C6FF7" strokeWidth={2.5} fill="url(#sg)" dot={{ r: 4, fill: '#7C6FF7', stroke: '#05060E', strokeWidth: 2 }} activeDot={{ r: 6 }}/>
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}

// Income breakdown stacked bar
function IncomeBreakdown() {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="card p-5">
      <h3 className="text-sm font-black text-white mb-0.5 sn">Income vs Expenses</h3>
      <p className="text-xs mb-4" style={{ color: 'rgba(255,255,255,0.35)' }}>Monthly comparison</p>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={MONTHLY_DATA} margin={{ top: 4, right: 4, left: -28, bottom: 0 }} barGap={3}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false}/>
            <XAxis dataKey="month" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} axisLine={false} tickLine={false}/>
            <YAxis tick={{ fill: 'rgba(255,255,255,0.25)', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => `₹${(v/1000).toFixed(0)}k`}/>
            <Tooltip content={<Tip/>}/>
            <Bar dataKey="income" fill="#10B981" radius={[5, 5, 0, 0]} maxBarSize={22}/>
            <Bar dataKey="expenses" fill="#F43F5E" radius={[5, 5, 0, 0]} maxBarSize={22}/>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="flex gap-4 mt-2">
        {[{ l: 'Income', c: '#10B981' }, { l: 'Expenses', c: '#F43F5E' }].map(x => (
          <div key={x.l} className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded" style={{ background: x.c, boxShadow: `0 0 5px ${x.c}` }}/>
            <span className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>{x.l}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// Category efficiency score cards
function CategoryScores() {
  const cats = SPENDING_BY_CAT.slice(0, 5).map(c => {
    const score = Math.floor(Math.random() * 40) + 55;
    return { ...c, score };
  });

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="card p-5">
      <h3 className="text-sm font-black text-white mb-0.5 sn">Spending Efficiency</h3>
      <p className="text-xs mb-4" style={{ color: 'rgba(255,255,255,0.35)' }}>How efficiently you spend per category</p>
      <div className="space-y-3">
        {cats.map((c, i) => (
          <motion.div key={c.name} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 + 0.3 }}>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <span className="text-sm">{['🏠','🍜','✈️','🛍️','📈'][i]}</span>
                <span className="text-xs font-semibold" style={{ color: 'rgba(255,255,255,0.6)' }}>{c.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black sn" style={{ color: c.score >= 75 ? '#10B981' : c.score >= 60 ? '#FBBF24' : '#F43F5E' }}>{c.score}/100</span>
                <span className="text-[10px]" style={{ color: 'rgba(255,255,255,0.3)' }}>{fmt(c.value, true)}</span>
              </div>
            </div>
            <div className="goal-bar">
              <motion.div className="goal-bar-fill" initial={{ width: 0 }} animate={{ width: `${c.score}%` }}
                transition={{ delay: i * 0.06 + 0.4, duration: 0.8, ease: 'easeOut' }}
                style={{ background: c.score >= 75 ? 'linear-gradient(90deg,#10B981,#34D399)' : c.score >= 60 ? 'linear-gradient(90deg,#FBBF24,#F97316)' : 'linear-gradient(90deg,#F43F5E,#FB7185)' }}/>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default function AnalyticsPage() {
  const { getSummary } = useStore();
  const { income, expenses, savingsRate } = getSummary();

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">

      {/* Header banner */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        className="card p-5 flex items-center gap-4" style={{ background: 'linear-gradient(135deg,rgba(124,111,247,0.12),rgba(34,211,238,0.06))', border: '1px solid rgba(124,111,247,0.2)' }}>
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg,#6366F1,#7C6FF7)', boxShadow: '0 0 24px rgba(124,111,247,0.45)' }}>
          <BarChart3 size={22} className="text-white"/>
        </div>
        <div className="flex-1">
          <h2 className="text-base font-black text-white sn">Deep Analytics</h2>
          <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>Savings rate <span className="font-bold" style={{ color: '#10B981' }}>{savingsRate}%</span> · Income <span className="font-bold" style={{ color: '#7C6FF7' }}>{fmt(income, true)}</span> · Expenses <span className="font-bold" style={{ color: '#F43F5E' }}>{fmt(expenses, true)}</span></p>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black" style={{ background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.25)', color: '#10B981' }}>
          <TrendingUp size={11}/> +18.3% YTD
        </div>
      </motion.div>

      {/* Full-width heatmap */}
      <SpendingHeatmap/>

      {/* 2x2 grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <SavingsWaterfall/>
        <IncomeBreakdown/>
        <SpendingDNA/>
        <CategoryScores/>
      </div>
    </motion.div>
  );
}
