import { db } from '../database';

interface url{
    id?: number;
    orgUrl: string;
    srtUrl: string;
}

const createTable = (): void => {
    db.run(`CREATE TABLE IF NOT EXISTS urls (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        originalUrl TEXT NOT NULL,
        shortUrl TEXT NOT NULL UNIQUE
    )`)
}