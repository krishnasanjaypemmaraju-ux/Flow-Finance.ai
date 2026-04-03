export const CATEGORIES = ['Housing','Food & Dining','Transport','Entertainment','Health','Shopping','Travel','Utilities','Income','Investment','Freelance'];

export const CATEGORY_META = {
  'Housing':       {color:'#7C6FF7',bg:'rgba(124,111,247,0.1)',icon:'🏠',emoji:'🏠'},
  'Food & Dining': {color:'#FBBF24',bg:'rgba(251,191,36,0.1)', icon:'🍜',emoji:'🍜'},
  'Transport':     {color:'#22D3EE',bg:'rgba(34,211,238,0.1)', icon:'🚗',emoji:'🚗'},
  'Entertainment': {color:'#F472B6',bg:'rgba(244,114,182,0.1)',icon:'🎬',emoji:'🎬'},
  'Health':        {color:'#10B981',bg:'rgba(16,185,129,0.1)', icon:'💊',emoji:'💊'},
  'Shopping':      {color:'#A78BFA',bg:'rgba(167,139,250,0.1)',icon:'🛍️',emoji:'🛍️'},
  'Travel':        {color:'#F97316',bg:'rgba(249,115,22,0.1)', icon:'✈️',emoji:'✈️'},
  'Utilities':     {color:'#64748B',bg:'rgba(100,116,139,0.1)',icon:'⚡',emoji:'⚡'},
  'Income':        {color:'#10B981',bg:'rgba(16,185,129,0.1)', icon:'💰',emoji:'💰'},
  'Investment':    {color:'#3B82F6',bg:'rgba(59,130,246,0.1)', icon:'📈',emoji:'📈'},
  'Freelance':     {color:'#A78BFA',bg:'rgba(167,139,250,0.1)',icon:'💻',emoji:'💻'},
};

export const INITIAL_TRANSACTIONS = [
  {id:'1', date:'2024-04-01',description:'Salary – Base Pay',            amount:6200,category:'Income',       type:'income'},
  {id:'2', date:'2024-04-01',description:'Freelance – Axiom Labs',       amount:4800,category:'Freelance',    type:'income'},
  {id:'3', date:'2024-04-02',description:'Apartment Rent',               amount:1500,category:'Housing',      type:'expense'},
  {id:'4', date:'2024-04-03',description:'Whole Foods',                  amount:184, category:'Food & Dining',type:'expense'},
  {id:'5', date:'2024-04-04',description:'Uber Rides',                   amount:56,  category:'Transport',    type:'expense'},
  {id:'6', date:'2024-04-05',description:'Netflix + Spotify',            amount:29,  category:'Entertainment',type:'expense'},
  {id:'7', date:'2024-04-07',description:'Health Insurance',             amount:220, category:'Health',       type:'expense'},
  {id:'8', date:'2024-04-09',description:'Amazon – Tech Gear',           amount:342, category:'Shopping',     type:'expense'},
  {id:'9', date:'2024-04-10',description:'Weekend Trip – Goa',           amount:890, category:'Travel',       type:'expense'},
  {id:'10',date:'2024-04-11',description:'Electric & Internet',          amount:148, category:'Utilities',    type:'expense'},
  {id:'11',date:'2024-04-12',description:'Nifty 50 SIP',                 amount:1200,category:'Investment',   type:'expense'},
  {id:'12',date:'2024-04-14',description:'Restaurant – The Fatty Bao',  amount:230, category:'Food & Dining',type:'expense'},
  {id:'13',date:'2024-04-15',description:'Consulting Invoice #04',       amount:2500,category:'Freelance',    type:'income'},
  {id:'14',date:'2024-04-16',description:'Gym Membership',               amount:75,  category:'Health',       type:'expense'},
  {id:'15',date:'2024-04-18',description:'BigBasket Groceries',          amount:126, category:'Food & Dining',type:'expense'},
  {id:'16',date:'2024-04-19',description:'Mumbai→Delhi Flight',          amount:520, category:'Travel',       type:'expense'},
  {id:'17',date:'2024-04-21',description:'Dividend – HDFC Bank',         amount:310, category:'Investment',   type:'income'},
  {id:'18',date:'2024-04-22',description:'Phone Plan',                   amount:65,  category:'Utilities',    type:'expense'},
  {id:'19',date:'2024-04-24',description:'Cafe + Coworking',             amount:88,  category:'Food & Dining',type:'expense'},
  {id:'20',date:'2024-04-25',description:'UI Kit Sales – Gumroad',       amount:960, category:'Freelance',    type:'income'},
  {id:'21',date:'2024-04-26',description:'Home Repair',                  amount:280, category:'Housing',      type:'expense'},
  {id:'22',date:'2024-04-28',description:'Zara Clothing',                amount:415, category:'Shopping',     type:'expense'},
  {id:'23',date:'2024-04-29',description:'Swiggy Monthly',               amount:140, category:'Food & Dining',type:'expense'},
  {id:'24',date:'2024-04-30',description:'Adobe Creative Cloud',         amount:55,  category:'Shopping',     type:'expense'},
];

export const MONTHLY_DATA = [
  {month:'Nov',balance:18400,income:9200, expenses:5100,savings:4100},
  {month:'Dec',balance:21800,income:11500,expenses:4800,savings:6700},
  {month:'Jan',balance:19600,income:8800, expenses:6200,savings:2600},
  {month:'Feb',balance:23100,income:12400,expenses:5800,savings:6600},
  {month:'Mar',balance:26500,income:13200,expenses:4900,savings:8300},
  {month:'Apr',balance:29770,income:14770,expenses:6562,savings:8208},
];

export const SPENDING_BY_CAT = [
  {name:'Housing',      value:1780,color:'#7C6FF7'},
  {name:'Food & Dining',value:768, color:'#FBBF24'},
  {name:'Travel',       value:1410,color:'#F97316'},
  {name:'Shopping',     value:812, color:'#A78BFA'},
  {name:'Investment',   value:1200,color:'#3B82F6'},
  {name:'Health',       value:295, color:'#10B981'},
  {name:'Transport',    value:56,  color:'#22D3EE'},
  {name:'Utilities',    value:213, color:'#64748B'},
  {name:'Entertainment',value:29,  color:'#F472B6'},
];

export const GOALS = [
  {id:'g1',name:'Emergency Fund',   target:150000,current:89000, color:'#10B981',icon:'🛡️',deadline:'Dec 2024'},
  {id:'g2',name:'MacBook Pro',      target:250000,current:142000,color:'#7C6FF7',icon:'💻',deadline:'Aug 2024'},
  {id:'g3',name:'Europe Trip',      target:180000,current:54000, color:'#F97316',icon:'✈️',deadline:'Mar 2025'},
  {id:'g4',name:'Home Down Payment',target:1000000,current:320000,color:'#FBBF24',icon:'🏠',deadline:'Dec 2026'},
];

export const HEATMAP_DATA = (() => {
  const d = [];
  const base = new Date('2024-01-01');
  for(let i=0;i<16*7;i++){
    const date = new Date(base);
    date.setDate(base.getDate()+i);
    d.push({date:date.toISOString().split('T')[0],value:Math.floor(Math.random()*5)});
  }
  return d;
})();

export const CRYPTO_TICKERS = [
  {sym:'BTC',name:'Bitcoin',  price:'₹58,24,150',change:'+2.4%',up:true},
  {sym:'ETH',name:'Ethereum', price:'₹3,12,450', change:'+1.8%',up:true},
  {sym:'NIFTY',name:'Nifty 50',price:'₹22,147', change:'-0.3%',up:false},
  {sym:'GOLD',name:'Gold/10g',price:'₹73,540',  change:'+0.6%',up:true},
  {sym:'USD',name:'USD/INR',  price:'₹83.42',   change:'-0.1%',up:false},
  {sym:'AAPL',name:'Apple',   price:'₹15,640',  change:'+1.2%',up:true},
];
