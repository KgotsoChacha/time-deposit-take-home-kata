import { TimeDeposit } from './TimeDeposit'

export type PlanType = 'basic' | 'premium' | 'student'

export interface Plan {
  calculate(td: TimeDeposit): number
}
