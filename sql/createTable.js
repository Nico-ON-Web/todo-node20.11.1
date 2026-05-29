
import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('./db.sqlite')

db.serialize(() => {

  db.run(`
    CREATE TABLE IF NOT EXISTS todos (

      id INTEGER PRIMARY KEY AUTOINCREMENT,

      nom TEXT NOT NULL,

      deadline TEXT,

      priorite INTEGER

    )
  `)

})