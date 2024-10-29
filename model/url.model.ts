import { db } from '../config/database';


// URL INTERFACE
interface Url{
    id?: number;
    originalUrl: string;
    shortUrl: string;
    stastCount?: number;
}


// CREATE A URL FUNCTION
const addUrl = (url: Url): Promise<void> => {
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO urls (originalUrl, shortUrl, stastCount) VALUES (?, ?, ?)`;
        db.run(sql, [url.originalUrl, url.shortUrl], (err) => {
            if (err) {
                reject(err);

            } else {
                resolve();
            }
        });

    });
}

export {addUrl}