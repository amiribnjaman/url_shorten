import { Request, Response } from "express";
import { addUrl, findUrl, urlStats } from '../model/url.model';
import {generateUniqueShortText} from '../utils/generateUniqueShortText'
import { urlValidateRegex } from "../utils/urlValidateRegex";

/*
**
** CREATE SHORT URL CONTROLLER
**
*/ 
const createShortUrl = async (req: Request, res: Response): Promise<any> => {
    const { originalUrl, customAlias } = req.body;
    console.log(customAlias);
    const checkUrl = urlValidateRegex(originalUrl)
    const shortUrl = customAlias || await generateUniqueShortText();


    // CHECKING THE URL IF IT HAS OR NOT
    if (!originalUrl) {
        return res.status(400).json({ message: 'please provide a valid url'});
    }

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
    res.status(200).json({ stats: `This page has accessed ${result?.statsCount} times`, result  });
    
}

export {createShortUrl, redirectToMainUrl, shortUrlStats}