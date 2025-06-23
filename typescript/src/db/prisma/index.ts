import { PrismaClient } from '@prisma/client';

// Create a singleton instance of the Prisma client
// This prevents multiple connections to the database
let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  // In development, we can reuse the same client across hot reloads
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export { prisma, PrismaClient };
