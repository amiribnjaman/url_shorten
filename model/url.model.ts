import sqlite3 from 'sqlite3';
import { open } from 'sqlite';


/*
**
** URL INTERFACE
**
*/ 
interface Url{
    id?: number;
    originalUrl: string;
    shortUrl: string;
    statsCount?: number; 
    expirationDate?: string;
}

/*
**
** DATABASE CONNECTION
**
*/
const dbCon = open({
  filename: './database.sqlite',
  driver: sqlite3.Database
});

/*
**
** URL ADDING AND SHORT URL OPERATE MODEL
**
*/
const addUrl = async (url: Url) => {
  const { originalUrl, shortUrl, statsCount = 0 } = url;
  let res;
  //URL WILL BE EXPIRED AFTER 2 MUNITES
  const expirationDate = new Date(Date.now() + 2 * 60 * 1000).toISOString();
  console.log(shortUrl);
  // return

  const db = await dbCon;
  const checkUrl: Url | undefined = await db.get('SELECT * FROM urls WHERE shortUrl = ?', shortUrl);
  if (checkUrl?.shortUrl == shortUrl) {
    return res = {
    status: 400,
    msg: 'Your custom url is already in use. please choose an unique one'
  };
  }
  // CHEKING IF THIS URL ALREADY EXIST OR NOT
  const urlIfExit: Url | undefined = await db.get('SELECT * FROM urls WHERE originalUrl = ?', originalUrl);
  console.log('url',urlIfExit);
  

  if (!urlIfExit) {
    console.log('iside');
    db.run('INSERT INTO urls (originalUrl, shortUrl, statsCount, expirationDate) VALUES (?, ?, ?, ?)', [originalUrl, shortUrl, statsCount, expirationDate]);
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


/*
**
** URL FINDING MODEL
**
*/
const findUrl = async (shortUrl: string) => {
  const db = await dbCon;
  const url: Url | undefined = await db.get('SELECT * FROM urls WHERE shortUrl = ?', shortUrl);
    
  if (!url) {
      console.log(`No URL found for: ${shortUrl}`);
      return null;
  }
  
  const currentDate = new Date();
  const expireDate = new Date(url?.expirationDate!);

  // CHECK IF URL HAS EXPIRED
  if (currentDate > expireDate) {
      console.log(`URL has expired: ${shortUrl}`);
      return null;
  }

  // INCREMENTING STATS VALUE
  const newStatsCount = (url.statsCount || 0) + 1;
  console.log(newStatsCount);
  
    const result = await db.run('UPDATE urls SET statsCount = ? WHERE shortUrl = ?', [newStatsCount, shortUrl]);

    console.log(result);
    return url;
};

/*
**
** SHORT URL STAST MODEL URL FINDING MODEL
**
*/
const urlStats = async (shortUrl: string) => {
  const db = await dbCon;
  const result: Url | undefined = await db.get('SELECT * FROM urls WHERE shortUrl = ?', shortUrl);
  console.log(result);
  return result;
  
}

export {addUrl, findUrl, urlStats}