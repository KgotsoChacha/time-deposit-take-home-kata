import { TimeDeposit } from './types/TimeDeposit'
import { StudentPlan, PremiumPlan, BasicPlan } from './PlanStrategy'
import type { PlanType } from './types/Plan'

export class TimeDepositCalculator {
  private planStrategyMap: Record<PlanType, { calculate: (td: TimeDeposit) => number }> = {
    student: new StudentPlan(),
    premium: new PremiumPlan(),
    basic: new BasicPlan(),
  }

  public updateBalance(xs: TimeDeposit[]) {
    for (let deposit of xs) {
      const strategy = this.planStrategyMap[deposit.planType]
      let a = strategy ? strategy.calculate(deposit) : 0
      const a2d = Math.round((a + Number.EPSILON) * 100) / 100
      deposit.balance += a2d
    }
  }
}
