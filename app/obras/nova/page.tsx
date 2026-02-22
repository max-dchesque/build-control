// app/obras/nova/page.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'

export default function NovaObraPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    // Step 1: Informações Básicas
    name: '',
    address: '',
    total_m2: '',
    start_date: '',
    expected_end_date: '',
    // Step 2: Orçamento
    total_budget: '',
    // Step 3: Upload Planta
    plant_image: null as File | null,
  })

  const steps = [
    { title: 'Informações Básicas', description: 'Nome e localização' },
    { title: 'Orçamento', description: 'Defina o budget' },
    { title: 'Planta', description: 'Upload (opcional)' },
    { title: 'Confirmação', description: 'Revise e crie' },
  ]

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const nextStep = () => {
    if (step < 4) setStep(step + 1)
  }

  const prevStep = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/obras', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          total_budget: parseFloat(formData.total_budget),
          total_m2: parseFloat(formData.total_m2) || undefined,
          user_id: 'user-1', // Mock user
        }),
      })

      if (response.ok) {
        router.push('/')
      }
    } catch (error) {
      console.error('Erro ao criar obra:', error)
    }
  }

  const progress = (step / 4) * 100

  return (
    <div className="min-h-screen bg-[#F8FAFB] py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#1E3A5F] mb-2">
            ➕ Criar Nova Obra
          </h1>
          <p className="text-gray-600">
            Preencha os dados para iniciar o controle orçamentário
          </p>
        </div>

        {/* Progress Bar */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-[#1E3A5F]">
                Passo {step} de 4
              </span>
              <span className="text-sm text-gray-500">
                {steps[step - 1].title}
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </CardContent>
        </Card>

        {/* Step Content */}
        <Card>
          <CardHeader>
            <CardTitle className="text-[#1E3A5F]">
              {steps[step - 1].title}
            </CardTitle>
            <p className="text-sm text-gray-500">
              {steps[step - 1].description}
            </p>
          </CardHeader>
          <CardContent>
            {step === 1 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome da Obra *</Label>
                  <Input
                    id="name"
                    placeholder="Ex: Minha Casa - Praia"
                    value={formData.name}
                    onChange={(e) => updateFormData('name', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Localização</Label>
                  <Input
                    id="address"
                    placeholder="Endereço completo"
                    value={formData.address}
                    onChange={(e) => updateFormData('address', e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="total_m2">Metragem (m²)</Label>
                    <Input
                      id="total_m2"
                      type="number"
                      placeholder="150"
                      value={formData.total_m2}
                      onChange={(e) => updateFormData('total_m2', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="start_date">Data de Início</Label>
                    <Input
                      id="start_date"
                      type="date"
                      value={formData.start_date}
                      onChange={(e) => updateFormData('start_date', e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="expected_end_date">Data Prevista de Término</Label>
                  <Input
                    id="expected_end_date"
                    type="date"
                    value={formData.expected_end_date}
                    onChange={(e) => updateFormData('expected_end_date', e.target.value)}
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="total_budget">Orçamento Total (R$) *</Label>
                  <Input
                    id="total_budget"
                    type="number"
                    step="0.01"
                    placeholder="500000"
                    value={formData.total_budget}
                    onChange={(e) => updateFormData('total_budget', e.target.value)}
                  />
                  <p className="text-sm text-gray-500">
                    Este valor será distribuído automaticamente nas 6 fases da obra
                  </p>
                </div>

                <div className="bg-[#F8FAFB] border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-[#1E3A5F] mb-3">
                    Distribuição Automática
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Fundação (12%)</span>
                      <span className="font-semibold">
                        R$ {(formData.total_budget ? parseFloat(formData.total_budget) * 0.12 : 0).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Estrutura (15%)</span>
                      <span className="font-semibold">
                        R$ {(formData.total_budget ? parseFloat(formData.total_budget) * 0.15 : 0).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Alvenaria (25%)</span>
                      <span className="font-semibold">
                        R$ {(formData.total_budget ? parseFloat(formData.total_budget) * 0.25 : 0).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Cobertura (12%)</span>
                      <span className="font-semibold">
                        R$ {(formData.total_budget ? parseFloat(formData.total_budget) * 0.12 : 0).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Instalações (18%)</span>
                      <span className="font-semibold">
                        R$ {(formData.total_budget ? parseFloat(formData.total_budget) * 0.18 : 0).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Acabamento (15%)</span>
                      <span className="font-semibold">
                        R$ {(formData.total_budget ? parseFloat(formData.total_budget) * 0.15 : 0).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <div className="text-4xl mb-4">📄</div>
                  <h4 className="font-semibold text-[#1E3A5F] mb-2">
                    Upload da Planta
                  </h4>
                  <p className="text-sm text-gray-500 mb-4">
                    Arraste o arquivo ou clique para selecionar
                  </p>
                  <Input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={(e) => updateFormData('plant_image', e.target.files?.[0] || null)}
                    className="cursor-pointer"
                  />
                  {formData.plant_image && (
                    <p className="text-sm text-green-600 mt-2">
                      ✓ {formData.plant_image.name}
                    </p>
                  )}
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-700">
                    💡 <strong>Opcional:</strong> Você pode fazer upload da planta ou esboço da obra agora ou depois.
                  </p>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-4">
                <h4 className="font-semibold text-[#1E3A5F] mb-4">
                  📋 Resumo da Obra
                </h4>

                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-600">Nome:</span>
                    <span className="font-semibold">{formData.name}</span>
                  </div>

                  {formData.address && (
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-600">Endereço:</span>
                      <span className="font-semibold">{formData.address}</span>
                    </div>
                  )}

                  {formData.total_m2 && (
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-600">Metragem:</span>
                      <span className="font-semibold">{formData.total_m2} m²</span>
                    </div>
                  )}

                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-600">Orçamento:</span>
                    <span className="font-semibold text-[#22C55E]">
                      R$ {parseFloat(formData.total_budget).toLocaleString()}
                    </span>
                  </div>

                  {formData.start_date && (
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-600">Início:</span>
                      <span className="font-semibold">
                        {new Date(formData.start_date).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                  )}

                  {formData.expected_end_date && (
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-600">Término Previsto:</span>
                      <span className="font-semibold">
                        {new Date(formData.expected_end_date).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-600">Fases:</span>
                    <span className="font-semibold">6 fases automáticas</span>
                  </div>
                </div>

                <div className="bg-[#F8FAFB] border border-gray-200 rounded-lg p-4">
                  <p className="text-sm text-gray-600">
                    Ao clicar em "Criar Obra", o sistema irá:
                  </p>
                  <ul className="text-sm text-gray-600 mt-2 space-y-1">
                    <li>✓ Criar a obra com os dados informados</li>
                    <li>✓ Criar automaticamente 6 fases padrão</li>
                    <li>✓ Distribuir o orçamento entre as fases</li>
                    <li>✓ Iniciar o controle orçamentário</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Buttons */}
            <div className="flex gap-4 mt-8">
              {step > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  className="flex-1"
                >
                  ← Anterior
                </Button>
              )}

              {step < 4 ? (
                <Button
                  type="button"
                  onClick={nextStep}
                  className="flex-1 bg-[#1E3A5F] hover:bg-[#2D5A8C]"
                  disabled={step === 1 && !formData.name}
                >
                  Próximo →
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={handleSubmit}
                  className="flex-1 bg-[#22C55E] hover:bg-[#16a34a]"
                >
                  ✅ Criar Obra
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
