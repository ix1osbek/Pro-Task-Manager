import sqlite3 from "sqlite3";
import path from "path";
import { app } from "electron";

const dbPath = path.join(app.getPath("userData"), "pro_tasks.db");
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("bazaga ulanishda xato:", err.message);
  } else {
    console.log("SQLite bazasiga ulanish muvofaqiyatli boldi");
  }
});
