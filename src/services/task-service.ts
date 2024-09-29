import { EntityManager, EntityRepository } from "@mikro-orm/core";
import { Task } from "../database/entities/Task";
import { User } from "../database/entities/User";

export class TaskService {
  private readonly taskRepository: EntityRepository<Task>;

  constructor(private readonly em: EntityManager) {
    this.taskRepository = this.em.getRepository(Task);
  }

  async getAllTasks(): Promise<Task[]> {
    return this.taskRepository.findAll();
  }

  // Modify to include the user when creating a task
  async createTask(title: string, description: string, user: User): Promise<Task> {
    const task = new Task();
    task.title = title;
    task.description = description;
    task.user = user;  // Associate the task with the user

    await this.em.persistAndFlush(task);
    return task;
  }

  // Modify the update logic to handle task assignment to a user if necessary
  async updateTask(id: string, title?: string, description?: string, completed?: boolean, user?: User): Promise<Task | null> {
    const task = await this.taskRepository.findOne({ id });

    if (!task) {
      return null;
    }

    if (title !== undefined) {
      task.title = title;
    }
    if (description !== undefined) {
      task.description = description;
    }
    if (completed !== undefined) {
      task.completed = completed;
    }
    if (user !== undefined) {
      task.user = user;
    }

    await this.em.persistAndFlush(task);
    return task;
  }

  async deleteTask(id: string): Promise<void> {
    const task = await this.taskRepository.findOne({ id });
    if (task) {
      await this.em.removeAndFlush(task);
    }
  }
}
