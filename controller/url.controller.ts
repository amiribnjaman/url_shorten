import { Request, Response } from "express";
import { addUrl } from '../model/url.model';


// CREATE SHORT URL CONTROLLER
const createShortUrl = async (req: Request, res: Response): Promise<any> => {
     const originalUrl  = req.body;
    const shortUrl = 'amrd'; 
    const stastCount = 0;
    
    // VALIDATION FOR URL
    try {
        new URL(originalUrl.originalUrl);
    } catch (error) {
        return res.status(400).json({ message: 'Invalid URL format',  error});
    }

    try {
        const r = await addUrl({ originalUrl, shortUrl });
        res.status(201).json({ originalUrl, shortUrl, stastCount });
        console.log(r)

    } catch(err)  {
        res.status(500).json({ message: 'Error adding URL', err });
    }
            
}



export {createShortUrl}