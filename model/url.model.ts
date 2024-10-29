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
  const db = await dbCon;
  return db.run('INSERT INTO urls (originalUrl, shortUrl, statsCount) VALUES (?, ?, ?)', [url.originalUrl, url.shortUrl, url.statsCount]);
};

// URL FINDING MODEL
const findUrl = async (shortUrl: string) => {
  const db = await dbCon;
  const url = await db.get('SELECT * FROM urls WHERE shortUrl = ?', shortUrl);
  // UPDATE STATS COUNT WHEN SHORT LINK VISIT
  await db.run('UPDATE urls  SET statsCount = ? WHERE shortUrl = ?', [++url.statsCount, shortUrl])

  console.log(url)
  return url;
};

export {addUrl, findUrl}