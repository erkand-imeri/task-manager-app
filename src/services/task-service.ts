import { EntityManager, EntityRepository } from "@mikro-orm/core";
import { Task } from "../database/entities/Task";

export class TaskService {
  private readonly taskRepository: EntityRepository<Task>;

  constructor(private readonly em: EntityManager) {
    this.em = em;
    this.taskRepository = this.em.getRepository(Task);
  }

  async getAllTasks(): Promise<Task[]> {
    return this.taskRepository.findAll();
  }

  async createTask(title: string, description: string): Promise<Task> {
    const task = new Task();
    task.title = title;
    task.description = description;

    await this.em.persistAndFlush(task);

    return task;
  }

  async updateTask(
    id: number,
    title?: string,
    description?: string,
    completed?: boolean
  ): Promise<Task> {
    const task = await this.taskRepository.findOne({ id });

    if (!task) throw new Error("Task was not found!");

    if (title !== undefined) task.title = title;

    if (description !== undefined) task.description = description;

    if (completed !== undefined) task.completed = completed;

    await this.em.persistAndFlush(task);

    return task;
  }

  async deleteTask(id: number): Promise<null | void> {
    const task = await this.taskRepository.findOne({ id });

    if (!task) throw new Error("Task was not found!");

    await this.em.removeAndFlush(task);
  }
}
