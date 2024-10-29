import { Request, Response } from "express";
import { addUrl, findUrl } from '../model/url.model';


// CREATE SHORT URL CONTROLLER
const createShortUrl = async (req: Request, res: Response): Promise<any> =>  {
    const {originalUrl}  = req.body;
    const shortUrl = 'gggmlleedwe'; 
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
        const r = await addUrl({ originalUrl, shortUrl, statsCount });
        console.log(r)
        res.status(201).json({ originalUrl, shortUrl });

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




export {createShortUrl, redirectToMainUrl}