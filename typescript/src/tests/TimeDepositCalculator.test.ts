import { TimeDeposit } from '../types/TimeDeposit'
import { TimeDepositCalculator } from '../TimeDepositCalculator'
import { PlanType } from '../types/Plan'

describe('TimeDepositCalculator', () => {
  describe('Basic', () => {
    test('Should increase balance for basic plan with >30 days', () => {
      const plans: TimeDeposit[] = [new TimeDeposit(1, 'basic', 1234567.0, 45)]
      const calc = new TimeDepositCalculator()
      calc.updateBalance(plans)
      expect(plans[0].balance).toBe(1235595.81)
    })

    test('Should not increase balance for basic plan with <=30 days', () => {
      const plans: TimeDeposit[] = [new TimeDeposit(7, 'basic', 7000, 30)]
      const calc = new TimeDepositCalculator()
      calc.updateBalance(plans)
      expect(plans[0].balance).toBe(7000)
    })
  })

  describe('student', () => {
    test('Should increase balance for student plan with >30 and <366 days', () => {
      const plans: TimeDeposit[] = [new TimeDeposit(4, 'student', 3600, 100)]
      const calc = new TimeDepositCalculator()
      calc.updateBalance(plans)
      expect(plans[0].balance).toBe(3609.0)
    })

    test('Should not increase balance for student plan with <=30 days', () => {
      const plans: TimeDeposit[] = [new TimeDeposit(5, 'student', 5000, 30)]
      const calc = new TimeDepositCalculator()
      calc.updateBalance(plans)
      expect(plans[0].balance).toBe(5000)
    })

    test('Should not increase balance for student plan with >=366 days', () => {
      const plans: TimeDeposit[] = [new TimeDeposit(13, 'student', 8000, 366)]
      const calc = new TimeDepositCalculator()
      calc.updateBalance(plans)
      expect(plans[0].balance).toBe(8000)
    })
  })

  describe('premium', () => {
    test('Should increase balance for premium plan with >45 days', () => {
      const plans: TimeDeposit[] = [new TimeDeposit(3, 'premium', 2400, 46)]
      const calc = new TimeDepositCalculator()
      calc.updateBalance(plans)
      expect(plans[0].balance).toBe(2410.0)
    })

    test('Should not increase balance for premium plan with >30 and <=45 days', () => {
      const plans: TimeDeposit[] = [new TimeDeposit(12, 'premium', 3000, 40)]
      const calc = new TimeDepositCalculator()
      calc.updateBalance(plans)
      expect(plans[0].balance).toBe(3000)
    })

    test('Should not increase balance for premium plan with <=45 days', () => {
      const plans: TimeDeposit[] = [new TimeDeposit(6, 'premium', 6000, 45)]
      const calc = new TimeDepositCalculator()
      calc.updateBalance(plans)
      expect(plans[0].balance).toBe(6000)
    })
  })

  test('Should update multiple deposits independently', () => {
    const plans: TimeDeposit[] = [
      new TimeDeposit(8, 'basic', 1000, 31),
      new TimeDeposit(9, 'premium', 2000, 46),
      new TimeDeposit(10, 'student', 3000, 100),
      new TimeDeposit(11, 'student', 4000, 30),
    ]
    const calc = new TimeDepositCalculator()
    calc.updateBalance(plans)
    expect(plans[0].balance).toBe(1000.83)
    expect(plans[1].balance).toBe(2008.33)
    expect(plans[2].balance).toBe(3007.5)
    expect(plans[3].balance).toBe(4000)
  })

  test('Should not update balance for unknown plan type', () => {
    const plans: TimeDeposit[] = [new TimeDeposit(20, 'gold' as PlanType, 5000, 100)]
    const calc = new TimeDepositCalculator()
    calc.updateBalance(plans)
    expect(plans[0].balance).toBe(5000)
  })
})
