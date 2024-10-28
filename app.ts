import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import router from './router/url.router';
const app = express();

// Middlewares
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


// Routes 
app.use('/api/', router)

// Testing route
app.get('/', (req: Request, res: Response) => {
    res.status(200).send('hello ')
})

// Handling url error
app.use((req: Request, res: Response, next: NextFunction)=> {
    res.status(404).json({
        message: 'Bad request'
    })
})

// Handling server error
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({
        message: "Internal problem"
    })
})


export default app;