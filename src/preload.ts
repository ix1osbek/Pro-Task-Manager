import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
    getAllTasks: () => ipcRenderer.invoke('tasks:get-all'),

    createTask: (title: string, description: string) => 
        ipcRenderer.invoke('tasks:create', title, description),

    deleteTask: (id: number) => 
        ipcRenderer.invoke('tasks:delete', id)
});