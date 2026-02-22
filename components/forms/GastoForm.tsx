// components/forms/GastoForm.tsx
'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const gastoSchema = z.object({
  fase_id: z.string().min(1, 'Selecione a fase'),
  description: z.string().min(3, 'Descrição obrigatória'),
  amount: z.number().min(0.01, 'Valor deve ser maior que zero'),
  quantity: z.number().optional(),
  expense_date: z.string().min(1, 'Data obrigatória'),
})

type GastoFormData = z.infer<typeof gastoSchema>

interface Fase {
  id: string
  name: string
}

interface GastoFormProps {
  obraId: string
  fases: Fase[]
  onSubmit: (data: GastoFormData) => Promise<void>
}

export function GastoForm({ obraId, fases, onSubmit }: GastoFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [notaFile, setNotaFile] = useState<File | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<GastoFormData>({
    resolver: zodResolver(gastoSchema),
    defaultValues: {
      expense_date: new Date().toISOString().split('T')[0],
    },
  })

  const onFormSubmit = async (data: GastoFormData) => {
    setIsSubmitting(true)
    try {
      // Enviar dados sem notaFile por enquanto (upload requer FormData)
      await onSubmit(data)
      // Reset form on success
      setNotaFile(null)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="text-[#1E3A5F]">➕ Adicionar Gasto</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
          {/* Fase */}
          <div className="space-y-2">
            <Label htmlFor="fase_id">Fase da Obra *</Label>
            <Select onValueChange={(value) => setValue('fase_id', value)}>
              <SelectTrigger id="fase_id" className={errors.fase_id ? 'border-red-500' : ''}>
                <SelectValue placeholder="Selecione a fase" />
              </SelectTrigger>
              <SelectContent>
                {fases.map((fase) => (
                  <SelectItem key={fase.id} value={fase.id}>
                    {fase.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.fase_id && (
              <p className="text-sm text-red-500">{errors.fase_id.message}</p>
            )}
          </div>

          {/* Descrição */}
          <div className="space-y-2">
            <Label htmlFor="description">Descrição do Material/Serviço *</Label>
            <Input
              id="description"
              placeholder="Ex: Blocos 6 furos - Fortaleza"
              {...register('description')}
              className={errors.description ? 'border-red-500' : ''}
            />
            {errors.description && (
              <p className="text-sm text-red-500">{errors.description.message}</p>
            )}
          </div>

          {/* Valor e Quantidade */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Valor (R$) *</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                placeholder="0.00"
                {...register('amount', { valueAsNumber: true })}
                className={errors.amount ? 'border-red-500' : ''}
              />
              {errors.amount && (
                <p className="text-sm text-red-500">{errors.amount.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="quantity">Quantidade</Label>
              <Input
                id="quantity"
                type="number"
                placeholder="Unidade"
                {...register('quantity', { valueAsNumber: true })}
              />
            </div>
          </div>

          {/* Data */}
          <div className="space-y-2">
            <Label htmlFor="expense_date">Data do Gasto *</Label>
            <Input
              id="expense_date"
              type="date"
              {...register('expense_date')}
              className={errors.expense_date ? 'border-red-500' : ''}
            />
            {errors.expense_date && (
              <p className="text-sm text-red-500">{errors.expense_date.message}</p>
            )}
          </div>

          {/* Upload Nota Fiscal */}
          <div className="space-y-2">
            <Label htmlFor="nota">Nota Fiscal/Recibo</Label>
            <Input
              id="nota"
              type="file"
              accept="image/*,.pdf"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) {
                  setNotaFile(file)
                }
              }}
              className="cursor-pointer"
            />
            {notaFile && (
              <p className="text-sm text-gray-600">
                ✓ {notaFile.name} ({(notaFile.size / 1024).toFixed(0)} KB)
              </p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setNotaFile(null)}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-[#1E3A5F] hover:bg-[#2D5A8C]"
            >
              {isSubmitting ? 'Salvando...' : '💾 Salvar'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
