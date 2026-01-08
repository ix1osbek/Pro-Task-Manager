export interface IElectronAPI {
    getAllTasks: () => Promise<any[]>;
    createTask: (title: string, description: string) => Promise<{ success: boolean }>;
    deleteTask: (id: number) => Promise<{ success: boolean }>;
}

declare global {
    interface Window {
        electronAPI: IElectronAPI;
    }
}