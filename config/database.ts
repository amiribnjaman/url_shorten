import sqlite3 from 'sqlite3';
import path from 'path';

const Database = sqlite3.verbose();
const dbPath = path.resolve(__dirname, 'database.db'); // You can change 'database.db' to your preferred name

// Create a new database object
const db = new Database.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database ' + err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

// Function to close the database connection
const closeDatabase = (): void => {
    db.close((err) => {
        if (err) {
            console.error('Error closing database ' + err.message);
        } else {
            console.log('Closed the database connection.');
        }
    });
};

export { db, closeDatabase };
