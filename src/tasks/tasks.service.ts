import { Injectable } from '@nestjs/common';
import { ITask, TaskStatuses } from './task.model';
import { CreateTaskDto } from './create-task.dto';
import { randomUUID } from 'crypto';
import { WrongTaskStatusException } from './exceptions/wrong-task-status.exception';

@Injectable()
export class TasksService {
  private tasks: ITask[] = [];

  private isValidStatusTransition(currentStatus: TaskStatuses, newStatus: TaskStatuses): boolean {
    const statusOrder = [TaskStatuses.OPEN, TaskStatuses.IN_PROGRESS, TaskStatuses.DONE];

    return statusOrder.indexOf(currentStatus) <= statusOrder.indexOf(newStatus);
  }

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

  update(taskData: ITask) {
    const updatedTasks = this.tasks.map((task) => {
      if (task.id === taskData.id) {
        if (taskData.status && this.isValidStatusTransition(task.status, taskData.status)) {
          return taskData;
        } else {
          // busniess logic exception
          throw new WrongTaskStatusException();
        }
      }
      return task;
    });

    this.tasks = updatedTasks;
    return updatedTasks;
  }

  delete(id: string): void {
    const updatedTasks = this.tasks.filter((task: ITask) => task.id !== id);
    this.tasks = updatedTasks;
  }
}
