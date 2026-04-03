import { useState, useEffect } from 'react';
import SummaryCards from './SummaryCards';
import BalanceChart from './BalanceChart';
import SpendingChart from './SpendingChart';
import RecentTx from './RecentTx';

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  useEffect(() => { const t = setTimeout(() => setLoading(false), 1000); return () => clearTimeout(t); }, []);
  return (
    <div className="space-y-5">
      <SummaryCards loading={loading}/>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <div className="lg:col-span-3"><BalanceChart/></div>
        <div className="lg:col-span-2"><SpendingChart/></div>
      </div>
      <RecentTx/>
    </div>
  );
}
