import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import useStore from '../../store/useStore';

export default function FAB() {
  const { role, openAddModal } = useStore();
  if (role !== 'admin') return null;
  return (
    <motion.button
      initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}}
      whileHover={{scale:1.1}} whileTap={{scale:0.92}}
      onClick={openAddModal}
      className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-2xl flex items-center justify-center"
      style={{background:'linear-gradient(135deg,#6366F1,#8B5CF6)',boxShadow:'0 0 40px rgba(99,102,241,0.6),0 8px 32px rgba(0,0,0,0.4)'}}>
      <motion.div whileHover={{rotate:90}} transition={{duration:0.22}}>
        <Plus size={22} className="text-white" strokeWidth={2.5}/>
      </motion.div>
    </motion.button>
  );
}
