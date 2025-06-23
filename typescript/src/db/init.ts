import { PrismaClient } from '@prisma/client';
import { PlanType } from '../models/Plan';

/**
 * This script initializes the database with sample data
 * It's useful for setting up a development environment
 */

// Sample data for time deposits with withdrawals
interface SampleWithdrawal {
  amount: number;
  date: Date;
}

interface SampleTimeDeposit {
  planType: PlanType;
  balance: number;
  days: number;
  withdrawals?: SampleWithdrawal[];
}

const sampleTimeDeposits: SampleTimeDeposit[] = [
  {
    planType: 'basic',
    balance: 5000,
    days: 45,
    withdrawals: [
      { amount: 500, date: new Date('2025-06-01') },
      { amount: 250, date: new Date('2025-06-15') },
    ],
  },
  {
    planType: 'premium',
    balance: 10000,
    days: 60,
    withdrawals: [
      { amount: 1000, date: new Date('2025-05-10') },
      { amount: 500, date: new Date('2025-06-10') },
      { amount: 1200, date: new Date('2025-06-20') },
    ],
  },
  {
    planType: 'student',
    balance: 2000,
    days: 90,
    withdrawals: [
      { amount: 200, date: new Date('2025-04-20') },
    ],
  },
  {
    planType: 'basic',
    balance: 3000,
    days: 30,
    withdrawals: [],
  },
  {
    planType: 'premium',
    balance: 15000,
    days: 180,
    withdrawals: [
      { amount: 2000, date: new Date('2025-03-01') },
      { amount: 1500, date: new Date('2025-05-01') },
      { amount: 1000, date: new Date('2025-06-01') },
      { amount: 500, date: new Date('2025-06-15') },
    ],
  },
];


/**
 * Initialize the database with sample data
 */
export async function initializeDatabase() {
  const prisma = new PrismaClient();

  try {
    console.log('Starting database initialization...');

    // Clear existing data (optional)
    console.log('Clearing existing withdrawals...');
    await prisma.withdrawal.deleteMany({});
    console.log('Clearing existing time deposits...');
    await prisma.timeDeposit.deleteMany({});

    // Create sample time deposits with withdrawals
    console.log('Creating sample time deposits with withdrawals...');
    for (const deposit of sampleTimeDeposits) {
      await prisma.timeDeposit.create({
        data: {
          planType: deposit.planType,
          balance: deposit.balance,
          days: deposit.days,
          withdrawals: deposit.withdrawals && deposit.withdrawals.length > 0
            ? {
                create: deposit.withdrawals.map((w) => ({
                  amount: w.amount,
                  date: w.date,
                })),
              }
            : undefined,
        },
      });
    }

    console.log('Database initialization completed successfully!');
    return true;
  } catch (error) {
    console.error('Error initializing database:', error);
    return false;
  } finally {
    await prisma.$disconnect();
  }
}

// If this script is run directly (not imported), initialize the database
if (require.main === module) {
  initializeDatabase()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error('Failed to initialize database:', error);
      process.exit(1);
    });
}
