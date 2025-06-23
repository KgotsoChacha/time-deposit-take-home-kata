import app from './index'
import config from './config'
import { PrismaClient } from './db/prisma'

const prisma = new PrismaClient()

async function connectToDB() {
  try {
    await prisma.$connect()
    console.log('✅ Database connected successfully')
    return true
  } catch (error) {
    console.error('❌ Database connection failed:', error)
    return false
  }
}

async function startServer() {
  const isDBConnected = await connectToDB()

  if (!isDBConnected) {
    console.error('Server startup aborted due to database connection failure')
    process.exit(1)
  }

  const port = config.port

  app.listen(port, () => {
    console.log(`🚀 Server running in ${config.nodeEnv} mode on port ${port}`)
  })
}

process.on('SIGINT', async () => {
  console.log('Gracefully shutting down...')
  await prisma.$disconnect()
  console.log('Database disconnected')
  process.exit(0)
})

process.on('SIGTERM', async () => {
  console.log('Gracefully shutting down...')
  await prisma.$disconnect()
  console.log('Database disconnected')
  process.exit(0)
})

startServer().catch((error) => {
  console.error('Server startup failed:', error)
  process.exit(1)
})
