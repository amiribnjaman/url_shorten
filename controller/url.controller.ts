import { Request, Response } from "express";
import { addUrl, findUrl, urlStats } from '../model/url.model';


// CREATE SHORT URL CONTROLLER
const createShortUrl = async (req: Request, res: Response): Promise<any> => {
    // RANDOM UNIQUE SHORT TEXT GENERATOR FUNCTION
    const generateUniqueShortText = async (length: number = 8): Promise<string> => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            result += characters[randomIndex];
        }

        return result;
    }

    const {originalUrl}  = req.body;
    const shortUrl = await generateUniqueShortText(); 
    const statsCount = 0;
    console.log(originalUrl)


    // CHECKING THE URL
    if (!originalUrl) {
        return res.status(400).json({ message: 'please provide a valid url'});
    }
    
    // VALIDATION FOR URL
    try {
        new URL(originalUrl);
    } catch (error) {
        return res.status(400).json({ message: 'please provide a valid url',  error});
    }

    try {
        const result = await addUrl({ originalUrl, shortUrl });
        console.log('r')
        if (result) {
            res.status(201).json({ result });
        }
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).json({ message: ' Error adding URL', err });
    }
            
}

// REDIRET TO THE MAIN URL CONTROLLER
const redirectToMainUrl = async (req: Request, res: Response) => {
  const { shortUrl } = req.params;
        const urlData = await findUrl(shortUrl);

        if (urlData) {
        console.log('redirectd to', urlData.originalUrl)
        return res.redirect(urlData.originalUrl);
  }
  res.status(404).json({ error: 'URL not found' });
};

// SHORT URL STAST CONTROLLER
const shortUrlStats = async (req: Request, res: Response) => {
    const { shortUrl } = req.params;
    const result = await urlStats(shortUrl);
    console.log(`page visit ${result?.statsCount} times`);
    
}

export {createShortUrl, redirectToMainUrl, shortUrlStats}