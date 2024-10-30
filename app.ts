import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import router from './router/url.router';
const app = express();

// MIDDLEWARES
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json());



// URL ROUTES 
app.use('/api/url', router)

// TESTING ROUTE
app.get('/', (req: Request, res: Response) => {
    res.status(200).send('hello ')
})

// HADLING URL ERROR
app.use((req: Request, res: Response, next: NextFunction)=> {
    res.status(404).json({
        message: 'Bad request'
    })
})


// HADLING SERVER ERROR
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({
        message: "Internal problem"
    })
})


export default app;