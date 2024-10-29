import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import router from './router/url.router';
import { closeDb, createTable } from './config/database';
const app = express();

// MIDDLEWARES
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json());


(() =>  async (): Promise<void> =>{
     {
    try {
        await createTable();
        console.log('URLs table created successfully!');
    } catch {
        console.error('Something went wrong');
    }
};
})();

// URL ROUTES 
app.use('/app/url', router)

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

process.on('SIGINT', () => {
    closeDb();
    process.exit();
});

export default app;