// components/dashboard/DashboardOverview.tsx
'use client'

import { Obra } from '@/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'

interface DashboardOverviewProps {
  obras: Obra[]
}

export function DashboardOverview({ obras }: DashboardOverviewProps) {
  const totalObras = obras.length
  const totalOrcado = obras.reduce((sum, obra) => sum + obra.total_budget, 0)
  const totalGasto = obras.reduce((sum, obra) => sum + obra.spent, 0)
  const restante = totalOrcado - totalGasto
  const progress = totalOrcado > 0 ? (totalGasto / totalOrcado) * 100 : 0

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-[#1E3A5F]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Obras
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#1E3A5F]">
              {totalObras}
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-[#22C55E]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Orçado
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#22C55E]">
              R$ {(totalOrcado / 1000).toFixed(0)}k
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-[#FF8C42]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Gasto
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#FF8C42]">
              R$ {(totalGasto / 1000).toFixed(0)}k
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-[#1E3A5F]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Restante
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#1E3A5F]">
              R$ {(restante / 1000).toFixed(0)}k
            </div>
            <div className="text-sm text-gray-500">
              ({progress.toFixed(0)}% usado)
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress Bar */}
      <Card>
        <CardHeader>
          <CardTitle>Progresso Geral das Obras</CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={progress} className="h-3" />
          <div className="flex justify-between mt-2 text-sm text-gray-600">
            <span>{progress.toFixed(0)}% completo</span>
            <span>R$ {restante.toLocaleString()} restantes</span>
          </div>
        </CardContent>
      </Card>

      {/* Obras List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {obras.map((obra) => {
          const obraProgress = (obra.spent / obra.total_budget) * 100
          const statusColor =
            obra.status === 'in_progress' ? 'bg-blue-500' :
            obra.status === 'completed' ? 'bg-green-500' :
            'bg-yellow-500'

          return (
            <Card key={obra.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg font-bold text-[#1E3A5F]">
                    {obra.name}
                  </CardTitle>
                  <Badge className={statusColor}>
                    {obra.status === 'in_progress' ? 'Em andamento' :
                     obra.status === 'completed' ? 'Concluída' : 'Pausada'}
                  </Badge>
                </div>
                {obra.address && (
                  <p className="text-sm text-gray-500 mt-1">{obra.address}</p>
                )}
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Progress value={obraProgress} className="h-2" />
                  
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-gray-500">Orçado:</span>
                      <div className="font-semibold text-[#1E3A5F]">
                        R$ {obra.total_budget.toLocaleString()}
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-500">Gasto:</span>
                      <div className="font-semibold text-[#FF8C42]">
                        R$ {obra.spent.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  {obraProgress > 90 && (
                    <div className="bg-red-50 border border-red-200 rounded p-2 text-sm text-red-700">
                      ⚠️ Alerta: {obraProgress.toFixed(0)}% do orçamento usado
                    </div>
                  )}

                  {obra.start_date && (
                    <div className="text-xs text-gray-500">
                      Início: {new Date(obra.start_date).toLocaleDateString('pt-BR')}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
