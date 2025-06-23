import { Plan } from "./types/Plan"
import { TimeDeposit } from "./types/TimeDeposit"

export class StudentPlan implements Plan {
  calculate(td: TimeDeposit): number {
    if (td.days > 30 && td.days < 366) {
      return (td.balance * 0.03) / 12
    }
    return 0
  }
}

export class PremiumPlan implements Plan {
  calculate(td: TimeDeposit): number {
    if (td.days > 45) {
      return (td.balance * 0.05) / 12
    }
    return 0
  }
}

export class BasicPlan implements Plan {
  calculate(td: TimeDeposit): number {
    if (td.days > 30) {
      return (td.balance * 0.01) / 12
    }
    return 0
  }
}
