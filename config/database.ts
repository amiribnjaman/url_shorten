import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export const setupDb = async () => {
  const db = await open({
    filename: './database.sqlite',
    driver: sqlite3.Database
  });
    try {
      await db.exec(`
    CREATE TABLE IF NOT EXISTS urls (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    originalUrl TEXT NOT NULL,
    shortUrl TEXT UNIQUE NOT NULL,
    statsCount INTEGER DEFAULT 0,
    expirationDate DATETIME
    )`);
      console.log('database connected')
    } catch (err) {
        console.log('somethig went wrong')
    }
  await db.close();
};
