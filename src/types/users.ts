export interface Users {
  id: number
  first_name: string
  last_name: string
}

export type WaterConsumptionUserData = {
  name: string
  monthlyConsumption: number
  totalConsumption: number
  lastUpdated: string
  estimatedCost: number
  history: {
    consumption: number
    date: string
  }[]
}
