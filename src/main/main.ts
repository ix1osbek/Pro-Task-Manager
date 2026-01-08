import { app, BrowserWindow, ipcMain } from "electron";
import * as path from "path"; 
import { initDatabase } from "./database/database";
import { TaskService } from "./services/task.service";
import { title } from "process";

let mainWindow: BrowserWindow | null = null;

async function createWindow() {
  await initDatabase();

  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "../preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  })

  if (process.env.NODE_ENV === "development") {
    mainWindow.loadURL("http://localhost:5173");

    mainWindow.webContents.openDevTools();
  } else {

    mainWindow.loadFile(path.join(__dirname, "../renderer/index.html"));
  }
}

function registerIpcHandlers() {
  ipcMain.handle("tasks:get-all", async () => {
    return await TaskService.getAllTasks();
  });

  ipcMain.handle("tasks:create", async (_event, title, description) => {
    await TaskService.createTask(title, description);
    return { success: true };
  });

  ipcMain.handle("tasks:delete", async (_event, id) => {
    await TaskService.deleteTask(id);
    return { success: true };
  });
}
app.whenReady().then(() => {
  registerIpcHandlers();
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
