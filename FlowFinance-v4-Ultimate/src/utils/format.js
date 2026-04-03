export const fmt=(n,compact=false)=>compact&&Math.abs(n)>=1000
  ?new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',notation:'compact',maximumFractionDigits:1}).format(n)
  :new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',minimumFractionDigits:0,maximumFractionDigits:0}).format(n);
export const fmtDate=(d)=>new Date(d).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'});
export const fmtShort=(d)=>new Date(d).toLocaleDateString('en-IN',{day:'numeric',month:'short'});
export const fmtNum=(n)=>new Intl.NumberFormat('en-IN').format(Math.round(n));
