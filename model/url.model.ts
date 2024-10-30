import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// URL INTERFACE
interface Url{
    id?: number;
    originalUrl: string;
    shortUrl: string;
    statsCount?: number; 
}

//DATABASE CONNECTION
const dbCon = open({
  filename: './database.sqlite',
  driver: sqlite3.Database
});

// URL ADDING MODEL
const addUrl = async (url: Url) => {
  const { originalUrl, shortUrl, statsCount = 0 } = url;

  const db = await dbCon;
  const urlIfExit: Url | undefined = await db.get('SELECT * FROM urls WHERE originalUrl = ?', originalUrl);
  console.log('url',urlIfExit);
  
  let res;
  if (!urlIfExit) {
    console.log('iside');
    db.run('INSERT INTO urls (originalUrl, shortUrl, statsCount) VALUES (?, ?, ?)', [originalUrl, shortUrl, statsCount]);
    return res = {
      msg: 'url created successfully',
      originalUrl,
      shortUrl
    }
  }
  return res = {
    status: 400,
    msg: 'url already in use'
  };
};

// URL FINDING MODEL
const findUrl = async (shortUrl: string) => {
  const db = await dbCon;
  const url: Url | undefined = await db.get('SELECT * FROM urls WHERE shortUrl = ?', shortUrl);
    
    if (!url) {
        console.log(`No URL found for shortUrl: ${shortUrl}`);
        return null; // or handle it as you prefer
    }

    // Ensure statsCount is defined before incrementing
    const newStatsCount = (url.statsCount || 0)+1;
    await db.run('UPDATE urls SET statsCount = ? WHERE shortUrl = ?', [newStatsCount, shortUrl]);

    console.log(url);
    return url;
  // const url  = await db.get('SELECT * FROM urls WHERE shortUrl = ?', shortUrl);
  // // UPDATE STATS COUNT WHEN SHORT LINK VISIT
  //  const newStatsCount = (url.statsCount | 0) +1
  // await db.run('UPDATE urls  SET statsCount = ? WHERE shortUrl = ?', [newStatsCount, shortUrl])

  // console.log(url)
  // return url;
};

export {addUrl, findUrl}