import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { INITIAL_TRANSACTIONS, GOALS } from '../data/mockData';

const useStore = create(
  persist(
    (set, get) => ({
      role:'admin', setRole:(r)=>set({role:r}),
      activePage:'dashboard', setActivePage:(p)=>set({activePage:p}),
      sidebarOpen:true, toggleSidebar:()=>set(s=>({sidebarOpen:!s.sidebarOpen})),
      transactions:INITIAL_TRANSACTIONS,
      addTransaction:(tx)=>set(s=>({transactions:[{...tx,id:Date.now().toString()},...s.transactions]})),
      updateTransaction:(id,data)=>set(s=>({transactions:s.transactions.map(t=>t.id===id?{...t,...data}:t)})),
      deleteTransaction:(id)=>set(s=>({transactions:s.transactions.filter(t=>t.id!==id)})),
      goals:GOALS,
      addGoal:(g)=>set(s=>({goals:[{...g,id:Date.now().toString()},...s.goals]})),
      updateGoalProgress:(id,amount)=>set(s=>({goals:s.goals.map(g=>g.id===id?{...g,current:Math.min(g.current+amount,g.target)}:g)})),
      deleteGoal:(id)=>set(s=>({goals:s.goals.filter(g=>g.id!==id)})),
      searchQuery:'', setSearchQuery:(q)=>set({searchQuery:q}),
      categoryFilter:'All', setCategoryFilter:(c)=>set({categoryFilter:c}),
      sortBy:'date', setSortBy:(s)=>set({sortBy:s}),
      sortDir:'desc', setSortDir:(d)=>set({sortDir:d}),
      modalOpen:false, modalMode:'add', editingTransaction:null,
      openAddModal:()=>set({modalOpen:true,modalMode:'add',editingTransaction:null}),
      openEditModal:(tx)=>set({modalOpen:true,modalMode:'edit',editingTransaction:tx}),
      closeModal:()=>set({modalOpen:false,editingTransaction:null}),
      getFiltered:()=>{
        const {transactions,searchQuery,categoryFilter,sortBy,sortDir}=get();
        let l=[...transactions];
        if(searchQuery){const q=searchQuery.toLowerCase();l=l.filter(t=>t.description.toLowerCase().includes(q)||t.category.toLowerCase().includes(q));}
        if(categoryFilter!=='All')l=l.filter(t=>t.category===categoryFilter);
        l.sort((a,b)=>{const c=sortBy==='date'?new Date(a.date)-new Date(b.date):a.amount-b.amount;return sortDir==='asc'?c:-c;});
        return l;
      },
      getSummary:()=>{
        const {transactions}=get();
        const income=transactions.filter(t=>t.type==='income').reduce((s,t)=>s+t.amount,0);
        const expenses=transactions.filter(t=>t.type==='expense').reduce((s,t)=>s+t.amount,0);
        return{income,expenses,balance:income-expenses,savingsRate:income>0?Math.round(((income-expenses)/income)*100):0};
      },
    }),
    {name:'ff-v4',partialize:s=>({role:s.role,transactions:s.transactions,goals:s.goals})}
  )
);
export default useStore;
