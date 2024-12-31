/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Application, Request, Response } from 'express'
import cors from 'cors'
const app: Application = express()

// parser
app.use(express.json())
app.use(cors({ origin: ['http://localhost:5173'] }))

// application routes
// app.use('/api/v1', router)

const test = async (req: Request, res: Response) => {
  res.send('Ki Bara valoto?')
}
app.get('/', test)
// not found

export default app