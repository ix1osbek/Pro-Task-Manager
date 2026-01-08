import db from "../database/database";
import { TaskEntity } from "../database/entity/Task";
import { TaskDto } from "../dto/TaskDto";

export class TaskService {
  static getAllTasks(): Promise<TaskDto[]> {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM tasks ORDER BY created_at DESC";

      db.all(query, [], (err, rows: TaskEntity[]) => {
        if (err) {
          reject(err);
        } else {
          const dtos: TaskDto[] = rows.map((task) => ({
            id: task.id!,
            title: task.title,
            description: task.description,
            completed: task.is_completed === 1,
            createdAt: task.created_at,
          }));
          resolve(dtos);
        }
      });
    });
  }

  static createTask(title: string, description: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const query = "INSERT INTO tasks (title , description) VALUES (? , ?)";

      db.run(query, [title, description], (err) => {
        if (err) reject(err);
        else resolve();
      });
    })
  }

  static deleteTask(id: number): Promise<void> {
    return new Promise((resolve, reject) => {
      db.run("DELETE FROM tasks WHERE id = ?", [id], (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }
}
