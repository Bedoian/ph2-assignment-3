/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import router from './app/routes'
import globalErrorHandler from './app/middlewares/global.error.handler'
import notFound from './app/middlewares/notFound'
const app: Application = express()

// parser
app.use(express.json())
app.use(cors({ origin: ['http://localhost:5173'] }))

// application routes
app.use('/api/v1', router)

const test = async (req: Request, res: Response) => {
  res.send('Ki Bara valoto?')
}
app.get('/', test)
// global error handle
app.use(globalErrorHandler as any)
// not found
app.use(notFound as any)
export default app
