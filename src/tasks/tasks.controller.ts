import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { ITask } from './task.model';

@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  @Get()
  public findAll(): ITask[] {
    return this.taskService.findAll();
  }

  @Get('/:id')
  public findOne(@Param() params: { id: string }): ITask {
    const task = this.taskService.findOne(params.id);

    if (task) {
      return task;
    }

    throw new NotFoundException();
  }
}
