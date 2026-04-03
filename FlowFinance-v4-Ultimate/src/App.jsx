import { Toaster } from 'react-hot-toast';
import { AnimatePresence, motion } from 'framer-motion';
import useStore from './store/useStore';
import Sidebar from './components/layout/Sidebar';
import Navbar  from './components/layout/Navbar';
import DashboardPage    from './components/dashboard/DashboardPage';
import TransactionsPage from './components/transactions/TransactionsPage';
import AnalyticsPage    from './components/analytics/AnalyticsPage';
import GoalsPage        from './components/goals/GoalsPage';
import SuggestionsPage  from './components/suggestions/SuggestionsPage';
import { SettingsPage } from './components/ui/PlaceholderPages';
import TransactionModal from './components/ui/TransactionModal';
import FAB              from './components/ui/FAB';

const PAGES = {
  dashboard:DashboardPage, transactions:TransactionsPage,
  analytics:AnalyticsPage, goals:GoalsPage,
  suggestions:SuggestionsPage, settings:SettingsPage,
};

export default function App() {
  const { activePage } = useStore();
  const Page = PAGES[activePage] || DashboardPage;
  return (
    <div className="flex h-screen overflow-hidden app-bg">
      <Sidebar/>
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Navbar/>
        <main className="flex-1 overflow-y-auto p-5">
          <AnimatePresence mode="wait">
            <motion.div key={activePage} initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}} transition={{duration:0.22,ease:'easeInOut'}}>
              <Page/>
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
      <TransactionModal/>
      <FAB/>
      <Toaster position="bottom-right" toastOptions={{
        duration:3000,
        style:{background:'rgba(8,10,22,0.98)',color:'#F0F4FF',border:'1px solid rgba(124,111,247,0.25)',borderRadius:'16px',fontSize:'13px',fontFamily:'Instrument Sans,sans-serif',fontWeight:600,boxShadow:'0 8px 32px rgba(0,0,0,0.5)'},
      }}/>
    </div>
  );
}
