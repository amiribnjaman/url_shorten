import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import router from './router/url.router';
import rateLimit from 'express-rate-limit';
const app = express();

/*
**
** DEFIE RATE LIMIT PACKAGE
**
*/
const limiter = rateLimit({
    windowMs: 60 * 1000,
    max: 100,  // set 100 request per minutes as testing purpose
    message: {
        message: 'Too many requests, please try again later.'
    }
})


// MIDDLEWARES
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(limiter);


// URL ROUTES 
app.use('/url', router)

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