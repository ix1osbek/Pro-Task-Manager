import sqlite3 from "sqlite3";
import path, { resolve } from "path";
import { app } from "electron";

const dbPath = path.join(app.getPath("userData"), "pro_tasks.db");
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("bazaga ulanishda xato:", err.message);
  } else {
    console.log("SQLite bazasiga ulanish muvofaqiyatli boldi");
  }
});

export function initDatabase(): Promise<void> {
  return new Promise((resolve, reject) => {
    const sql = `
        CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        is_completed INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP       
        )
        `;

    db.run(sql, (err) => {
      if (err) {
        reject(err);
      } else {
        console.log(`Task tekshirildi/yaratildi`);
        resolve();
      }
    });
  });
}

export default db;
