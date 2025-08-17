import { useState } from 'react'

export interface BudgetItem {
  id: string
  category: string
  budgeted: number
  spent: number
  remaining: number
  icon: string
}

export interface Transaction {
  id: string
  amount: number
  category: string
  description: string
  date: string
  type: 'income' | 'expense'
}

const initialBudget: BudgetItem[] = [
  {
    id: '1',
    category: 'Food & Dining',
    budgeted: 15000,
    spent: 12500,
    remaining: 2500,
    icon: '🍽️'
  },
  {
    id: '2',
    category: 'Transportation',
    budgeted: 8000,
    spent: 6200,
    remaining: 1800,
    icon: '🚗'
  },
  {
    id: '3',
    category: 'Entertainment',
    budgeted: 5000,
    spent: 3500,
    remaining: 1500,
    icon: '🎬'
  },
  {
    id: '4',
    category: 'Shopping',
    budgeted: 10000,
    spent: 8500,
    remaining: 1500,
    icon: '🛍️'
  }
]

const initialTransactions: Transaction[] = [
  {
    id: '1',
    amount: 2500,
    category: 'Food & Dining',
    description: 'Grocery shopping',
    date: '2024-01-15',
    type: 'expense'
  },
  {
    id: '2',
    amount: 1200,
    category: 'Transportation',
    description: 'Uber rides',
    date: '2024-01-14',
    type: 'expense'
  }
]

export function useBudget() {
  const [budget, setBudget] = useState<BudgetItem[]>(initialBudget)
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions)

  const addBudgetItem = (item: Omit<BudgetItem, 'id'>) => {
    const newItem: BudgetItem = {
      ...item,
      id: Date.now().toString(),
      remaining: item.budgeted - item.spent
    }
    setBudget(prev => [...prev, newItem])
  }

  const updateBudgetItem = (id: string, updates: Partial<BudgetItem>) => {
    setBudget(prev => prev.map(item =>
      item.id === id 
        ? { ...item, ...updates, remaining: (updates.budgeted ?? item.budgeted) - (updates.spent ?? item.spent) }
        : item
    ))
  }

  const deleteBudgetItem = (id: string) => {
    setBudget(prev => prev.filter(item => item.id !== id))
  }

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now().toString()
    }
    setTransactions(prev => [newTransaction, ...prev])

    // Update budget if it's an expense
    if (transaction.type === 'expense') {
      setBudget(prev => prev.map(item =>
        item.category === transaction.category
          ? { ...item, spent: item.spent + transaction.amount, remaining: item.remaining - transaction.amount }
          : item
      ))
    }
  }

  return {
    budget,
    transactions,
    addBudgetItem,
    updateBudgetItem,
    deleteBudgetItem,
    addTransaction
  }
}