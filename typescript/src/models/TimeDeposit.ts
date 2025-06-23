import { PlanType } from "./Plan"

export class TimeDeposit {
  public id: number
  public planType: PlanType
  public balance: number
  public days: number

  constructor(id: number, planType: PlanType, balance: number, days: number) {
    this.id = id
    this.planType = planType
    this.balance = balance
    this.days = days
  }
}
