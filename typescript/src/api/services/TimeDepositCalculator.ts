import { TimeDeposit } from '../../models/TimeDeposit'
import { StudentPlan, PremiumPlan, BasicPlan } from './PlanStrategy'
import type { PlanType, Plan } from '../../models/Plan'

export class TimeDepositCalculator {
  private planStrategyMap: Record<PlanType, Plan> = {
    student: new StudentPlan(),
    premium: new PremiumPlan(),
    basic: new BasicPlan(),
  }

  public updateBalance(xs: TimeDeposit[]) {
    for (let deposit of xs) {
      const strategy = this.planStrategyMap[deposit.planType]
      let a = strategy?.calculate(deposit) ?? 0
      const a2d = Math.round((a + Number.EPSILON) * 100) / 100
      deposit.balance += a2d
    }
  }
}
