// app/api/obras/route.ts
import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase/client'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('user_id')

    if (!userId) {
      return NextResponse.json({ error: 'user_id required' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('obras')
      .select(`
        *,
        fases (
          id,
          name,
          budgeted_amount,
          spent,
          status
        )
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) throw error

    return NextResponse.json({ obras: data })
  } catch (error) {
    console.error('Erro ao buscar obras:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar obras' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { user_id, name, total_budget, total_m2, address, start_date, expected_end_date } = body

    // Validar campos obrigatórios
    if (!user_id || !name || !total_budget) {
      return NextResponse.json(
        { error: 'user_id, name e total_budget são obrigatórios' },
        { status: 400 }
      )
    }

    // Criar obra
    const { data, error } = await supabase
      .from('obras')
      .insert({
        user_id,
        name,
        total_budget,
        total_m2,
        address,
        start_date,
        expected_end_date,
        status: 'in_progress',
      })
      .select()
      .single()

    if (error) throw error

    // Criar fases padrão (6 fases)
    const fasesPadrao = [
      { name: 'Fundação', budget_percentage: 0.12 },
      { name: 'Estrutura', budget_percentage: 0.15 },
      { name: 'Alvenaria', budget_percentage: 0.25 },
      { name: 'Cobertura', budget_percentage: 0.12 },
      { name: 'Instalações', budget_percentage: 0.18 },
      { name: 'Acabamento', budget_percentage: 0.15 },
    ]

    const { data: fases, error: fasesError } = await supabase
      .from('fases')
      .insert(
        fasesPadrao.map((fase) => ({
          obra_id: data.id,
          name: fase.name,
          budgeted_amount: total_budget * fase.budget_percentage,
          spent: 0,
          status: 'not_started',
        }))
      )
      .select()

    if (fasesError) throw fasesError

    return NextResponse.json(
      { obra: data, fases },
      { status: 201 }
    )
  } catch (error) {
    console.error('Erro ao criar obra:', error)
    return NextResponse.json(
      { error: 'Erro ao criar obra' },
      { status: 500 }
    )
  }
}
