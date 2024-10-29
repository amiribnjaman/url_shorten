import sqlite3 from 'sqlite3';
import path, { resolve } from 'path';
import { rejects } from 'assert';

const Database = sqlite3.verbose();
const dbPath = path.resolve(__dirname, 'database.db'); 

// CREATE DATABASE OBJECT
const db = new Database.Database(dbPath, (err) => {
    if (err) {
        console.error('Something went wrong with db ' + err.message);
    } else {
        console.log('Connected to the database.');
    }
});

//CREATE THE TABLE FOR URLS
const createTable = (): Promise<void> => {
    return new Promise((resolve, reject) => {
        const sql = `CREATE TABLE IF NOT EXISTS urls (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            originalUrl TEXT NOT NULL,
            shortUrl TEXT NOT NULL UNIQUE,
            stastCount INTEGER
        )`;
        db.run(sql, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

// CLOSE THE DATABASE FUNCTION
const closeDb = (): Promise<void> => {
    return new Promise((resolve, reject) => {
        db.close((err) => {
        if (err) {
                reject(err);
            } else {
                resolve();
            }
    });
    })
    
};

export { db,createTable, closeDb };
