// types/index.ts
export interface Obra {
  id: string
  user_id: string
  name: string
  address?: string
  total_m2?: number
  total_budget: number
  spent: number
  status: 'in_progress' | 'paused' | 'completed'
  start_date?: string
  expected_end_date?: string
  created_at: string
  fases?: Fase[]
}

export interface Fase {
  id: string
  obra_id: string
  name: string
  budgeted_amount: number
  spent: number
  completion_percentage: number
  status: 'not_started' | 'in_progress' | 'completed' | 'paused'
  start_date?: string
  expected_end_date?: string
}

export interface Gasto {
  id: string
  obra_id: string
  fase_id: string
  description: string
  amount: number
  quantity?: number
  unit_price?: number
  expense_date: string
  supplier_id?: string
  created_at: string
}

export interface Fornecedor {
  id: string
  obra_id: string
  name: string
  phone?: string
  email?: string
  address?: string
  total_spent: number
}

export interface DashboardStats {
  total_obras: number
  total_orcado: number
  total_gasto: number
  obras_em_andamento: number
  obras_concluidas: number
}
