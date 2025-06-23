import express from 'express'
import apiV1Routes from './api/v1/routes'
import { setupSwagger } from './docs/swagger'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

setupSwagger(app)

app.use('/api/v1', apiV1Routes)

export default app
