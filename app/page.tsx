// app/page.tsx
import { DashboardOverview } from '@/components/dashboard/DashboardOverview'
import { GastoForm } from '@/components/forms/GastoForm'
import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react'
import Link from 'next/link'

async function getObras() {
  // Mock data para desenvolvimento
  // Em produção, buscar do Supabase
  const mockObras = [
    {
      id: '1',
      user_id: 'user-1',
      name: 'Minha Casa - Praia',
      address: 'Rua das Flores, 123 - São Paulo, SP',
      total_m2: 150,
      total_budget: 500000,
      spent: 285000,
      status: 'in_progress' as const,
      start_date: '2025-09-15',
      expected_end_date: '2026-09-15',
      created_at: '2025-09-15T10:30:00Z',
    },
    {
      id: '2',
      user_id: 'user-1',
      name: 'Casa de Campo',
      address: 'Sítio Verde - Campinas, SP',
      total_m2: 200,
      total_budget: 750000,
      spent: 125000,
      status: 'in_progress' as const,
      start_date: '2025-11-01',
      expected_end_date: '2026-11-01',
      created_at: '2025-11-01T08:00:00Z',
    },
  ]

  return mockObras
}

async function getFases(obraId: string) {
  // Mock fases
  return [
    { id: 'f1', name: 'Fundação' },
    { id: 'f2', name: 'Estrutura' },
    { id: 'f3', name: 'Alvenaria' },
    { id: 'f4', name: 'Cobertura' },
    { id: 'f5', name: 'Instalações' },
    { id: 'f6', name: 'Acabamento' },
  ]
}

export default async function DashboardPage() {
  const obras = await getObras()
  const fases = await getFases('1') // Primeira obra

  const handleAddGasto = async (data: any) => {
    'use server'
    // Chamada para API
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/gastos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...data,
        obra_id: '1',
        user_id: 'user-1',
      }),
    })
    return response.json()
  }

  return (
    <div className="min-h-screen bg-[#F8FAFB]">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#1E3A5F] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">🏗️</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-[#1E3A5F]">BuildControl</h1>
              <p className="text-xs text-gray-500">Controle orçamentário de obras</p>
            </div>
          </div>
          
          <nav className="flex items-center gap-4">
            <Link href="/obras">
              <Button variant="ghost" className="text-[#1E3A5F]">
                Obras
              </Button>
            </Link>
            <Link href="/gastos">
              <Button variant="ghost" className="text-[#1E3A5F]">
                Gastos
              </Button>
            </Link>
            <Link href="/analises">
              <Button variant="ghost" className="text-[#1E3A5F]">
                Análises
              </Button>
            </Link>
            <Button className="bg-[#FF8C42] hover:bg-[#e57a2f]">
              ➕ Nova Obra
            </Button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <DashboardOverview obras={obras} />

        {/* Quick Add Gasto */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-[#1E3A5F] mb-4">
            Adicionar Gasto Rápido
          </h2>
          <GastoForm 
            obraId="1"
            fases={fases}
            onSubmit={handleAddGasto}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="container mx-auto px-4 py-6 text-center text-gray-500 text-sm">
          <p>© 2026 BuildControl. Todos os direitos reservados.</p>
          <p className="mt-1">Feito com Next.js + Supabase + Tailwind</p>
        </div>
      </footer>
    </div>
  )
}
