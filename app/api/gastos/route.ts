// app/api/gastos/route.ts
import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase/client'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { obra_id, fase_id, description, amount, quantity, expense_date, supplier_id } = body

    // Validar campos obrigatórios
    if (!obra_id || !fase_id || !description || !amount || !expense_date) {
      return NextResponse.json(
        { error: 'obra_id, fase_id, description, amount e expense_date são obrigatórios' },
        { status: 400 }
      )
    }

    // Iniciar transação
    const { data: gasto, error: gastoError } = await supabase
      .from('gastos')
      .insert({
        obra_id,
        fase_id,
        description,
        amount,
        quantity: quantity || 1,
        unit_price: amount / (quantity || 1),
        expense_date,
        supplier_id,
      })
      .select()
      .single()

    if (gastoError) throw gastoError

    // Atualizar valor gasto da fase
    const { data: fase, error: faseError } = await supabase
      .from('fases')
      .update({
        spent: supabase.raw(`spent + ${amount}`),
      })
      .eq('id', fase_id)
      .select()
      .single()

    if (faseError) throw faseError

    // Atualizar valor gasto da obra
    const { error: obraError } = await supabase
      .from('obras')
      .update({
        spent: supabase.raw(`spent + ${amount}`),
      })
      .eq('id', obra_id)

    if (obraError) throw obraError

    // Verificar se precisa de alerta
    const faseProgress = (fase.spent / fase.budgeted_amount) * 100
    
    if (faseProgress >= 90) {
      // Criar notificação de alerta
      await supabase
        .from('notificacoes')
        .insert({
          user_id: body.user_id,
          obra_id,
          type: 'budget_alert',
          title: `⚠️ Alerta: ${fase.name}`,
          message: `${fase.name} atingiu ${faseProgress.toFixed(0)}% do orçamento`,
          is_read: false,
        })
    }

    return NextResponse.json(
      { gasto, fase, alerta: faseProgress >= 90 },
      { status: 201 }
    )
  } catch (error) {
    console.error('Erro ao registrar gasto:', error)
    return NextResponse.json(
      { error: 'Erro ao registrar gasto' },
      { status: 500 }
    )
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const obraId = searchParams.get('obra_id')
    const faseId = searchParams.get('fase_id')

    if (!obraId) {
      return NextResponse.json({ error: 'obra_id required' }, { status: 400 })
    }

    let query = supabase
      .from('gastos')
      .select('*')
      .eq('obra_id', obraId)
      .order('expense_date', { ascending: false })

    if (faseId) {
      query = query.eq('fase_id', faseId)
    }

    const { data, error } = await query

    if (error) throw error

    return NextResponse.json({ gastos: data })
  } catch (error) {
    console.error('Erro ao buscar gastos:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar gastos' },
      { status: 500 }
    )
  }
}
