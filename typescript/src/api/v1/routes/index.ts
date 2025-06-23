import { Router } from 'express'
import timeDepositsRoutes from './TimeDeposits.routes'

const router = Router()

router.use('/time-deposits', timeDepositsRoutes)

export default router
