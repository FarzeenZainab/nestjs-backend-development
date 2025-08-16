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

  create(createTaskDto: CreateTaskDto): ITask {
    const task: ITask = {
      id: randomUUID(),
      title: createTaskDto.title,
      description: createTaskDto.description,
      status: createTaskDto.status,
    };

    this.tasks.push(task);
    return task;
  }
}
