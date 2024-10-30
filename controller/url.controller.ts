import { Request, Response } from "express";
import { addUrl, findUrl, urlStats } from '../model/url.model';

/*
**
** CREATE SHORT URL CONTROLLER
**
*/ 
const createShortUrl = async (req: Request, res: Response): Promise<any> => {
    const { originalUrl, customAlias } = req.body;
    console.log(customAlias);
    

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

    const shortUrl = customAlias || await generateUniqueShortText();


    // CHECKING THE URL
    if (!originalUrl) {
        return res.status(400).json({ message: 'please provide a valid url'});
    }

    // VALIDATION FOR URL
    // try {
    //     new URL(originalUrl);
    // } catch (error) {
    //     return res.status(400).json({ message: 'please provide a valid url',  error});
    // }


    /*
    ** CHECK URL VALIDATION USING REGEX
    */ 
    const urlPattern = /^(https?:\/\/)?(www\.)?([a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+)(:[0-9]{1,5})?(\/.*)?$/;

    const checkUrl = urlPattern.test(originalUrl);
    console.log(checkUrl); 
    

    if (checkUrl) {
        // TRY TO OPERATE MAIN WORK AND SEND RESPONSE
        try {
            const result = await addUrl({ originalUrl, shortUrl });
            console.log('r')
            if (result) {
                res.status(201).json({ result });
            }
        } catch (err) {
            console.error('Database error:', err);
            res.status(500).json({ message: ' Something went wrong', err });
        }
    } else {
        res.status(500).json({ message: 'Invalid Url' });
    }
           
}


/*
**
** REDIRET TO THE MAIN URL CONTROLLER
**
*/ 
const redirectToMainUrl = async (req: Request, res: Response) => {
  const { shortUrl } = req.params;
        const urlData = await findUrl(shortUrl);

        if (urlData) {
        console.log('redirectd to', urlData.originalUrl)
        return res.redirect(urlData.originalUrl);
  }
  res.status(404).json({ error: 'URL not found or has expired' });
};


/*
**
** SHORT URL STAST CONTROLLER
**
*/ 
const shortUrlStats = async (req: Request, res: Response) => {
    const { shortUrl } = req.params;
    const result = await urlStats(shortUrl);
    console.log(`This page has accessed ${result?.statsCount} times`);
    res.status(200).json({ stast: `This page has accessed ${result?.statsCount} times` });
    
}

export {createShortUrl, redirectToMainUrl, shortUrlStats}