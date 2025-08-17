import { useState } from 'react'

export interface Goal {
  id: string
  title: string
  targetAmount: number
  currentAmount: number
  targetDate: string
  category: 'Emergency Fund' | 'House' | 'Car' | 'Vacation' | 'Retirement' | 'Education' | 'Other'
  priority: 'High' | 'Medium' | 'Low'
  status: 'On Track' | 'Behind' | 'Completed'
  monthlyContribution: number
}

const initialGoals: Goal[] = [
  {
    id: '1',
    title: 'Emergency Fund',
    targetAmount: 500000,
    currentAmount: 425000,
    targetDate: '2024-12-31',
    category: 'Emergency Fund',
    priority: 'High',
    status: 'On Track',
    monthlyContribution: 15000
  },
  {
    id: '2', 
    title: 'Dream House',
    targetAmount: 5000000,
    currentAmount: 1200000,
    targetDate: '2027-06-30',
    category: 'House',
    priority: 'High',
    status: 'On Track',
    monthlyContribution: 50000
  },
  {
    id: '3',
    title: 'New Car',
    targetAmount: 800000,
    currentAmount: 200000,
    targetDate: '2025-03-31',
    category: 'Car',
    priority: 'Medium',
    status: 'Behind',
    monthlyContribution: 25000
  }
]

export function useGoals() {
  const [goals, setGoals] = useState<Goal[]>(initialGoals)

  const addGoal = (newGoal: Omit<Goal, 'id'>) => {
    const goal: Goal = {
      ...newGoal,
      id: Date.now().toString(),
    }
    setGoals(prev => [...prev, goal])
  }

  const updateGoal = (goalId: string, updates: Partial<Goal>) => {
    setGoals(prev => prev.map(goal => 
      goal.id === goalId ? { ...goal, ...updates } : goal
    ))
  }

  const deleteGoal = (goalId: string) => {
    setGoals(prev => prev.filter(goal => goal.id !== goalId))
  }

  const addContribution = (goalId: string, amount: number) => {
    setGoals(prev => prev.map(goal => 
      goal.id === goalId 
        ? { ...goal, currentAmount: goal.currentAmount + amount }
        : goal
    ))
  }

  return {
    goals,
    addGoal,
    updateGoal,
    deleteGoal,
    addContribution
  }
}