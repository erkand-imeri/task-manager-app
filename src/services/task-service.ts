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
}
