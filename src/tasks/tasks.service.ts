import { Injectable } from '@nestjs/common';
import { ITask } from './task.model';
import { CreateTaskDto } from './create-task.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class TasksService {
  private tasks: ITask[] = [];

  findAll(): ITask[] {
    return this.tasks;
  }

  findOne(id: string): ITask | undefined {
    return this.tasks.find((task: ITask) => task.id === id);
  }

  create(taskData: CreateTaskDto): ITask {
    const task: ITask = {
      id: randomUUID(),
      title: taskData.title,
      description: taskData.description,
      status: taskData.status,
    };

    this.tasks.push(task);
    return task;
  }

  delete(id: string): void {
    const updatedTasks = this.tasks.filter((task: ITask) => task.id !== id);
    this.tasks = updatedTasks;
  }
}
