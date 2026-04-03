# Flow-Finance.ai
# ⚡ FlowFinance v4 — Ultimate Finance Dashboard

A dark-mode personal finance dashboard with AI suggestions, animated charts, goal tracking, and deep analytics — built with React 19 + Vite + Tailwind CSS.


---

## ✨ Features

| Page | What it does |
|---|---|
| **Dashboard** | Summary cards, 6-month balance trend, spending donut, recent transactions |
| **Transactions** | Full CRUD with search, category filter, and sort |
| **Analytics** | Area charts, bar charts, radar chart, and spend heatmap |
| **Goals** | Animated progress rings, add/delete goals, log contributions |
| **AI Advisor** | Priority-tagged smart suggestions based on your spending data |
| **Settings** | Placeholder — ready to extend |

**UX highlights:** collapsible sidebar, floating action button, animated page transitions, toast notifications, glassmorphism dark theme.

---

## 🚀 Getting Started

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build → /dist
npm run preview    # preview production build
```

> Requires **Node.js 18+**

---

## 🗂️ Project Structure

```
src/
├── App.jsx                        # Root layout & page routing
├── index.css                      # Global styles & design tokens
├── data/mockData.js               # Seed transactions, charts, goals data
├── store/useStore.js              # Zustand global state
├── utils/format.js                # Currency & date helpers
└── components/
    ├── layout/        Sidebar, Navbar
    ├── dashboard/     SummaryCards, BalanceChart, SpendingChart, RecentTx
    ├── transactions/  Full CRUD list with search, filter, sort
    ├── analytics/     Area, Bar, Radar charts + heatmap
    ├── goals/         Progress rings + contribution tracker
    ├── suggestions/   AI Advisor cards
    └── ui/            FAB, TransactionModal, PlaceholderPages
```

---

##  Tech Stack

- **React 19** + **Vite 8** — UI & build
- **Tailwind CSS 3** — utility styling
- **Zustand 5** — global state (persisted to localStorage)
- **Framer Motion 12** — spring animations & page transitions
- **Recharts 3** — Area, Bar, Radar, Pie charts
- **Lucide React** — icons
- **React Hot Toast** — notifications

---

## 📄 License

Private — all rights reserved.
