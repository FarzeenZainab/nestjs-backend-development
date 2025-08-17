import { Body, Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { ITask } from './task.model';
import { CreateTaskDto } from './create-task.dto';
import { CreateFindOneDto } from './create-find-one.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  @Get()
  public findAll(): ITask[] {
    return this.taskService.findAll();
  }

  @Get('/:id')
  public findOne(@Param() params: CreateFindOneDto): ITask {
    const task = this.taskService.findOne(params.id);

    if (task) {
      return task;
    }

    throw new NotFoundException();
  }

  @Post() // this and @Get may not have a unique URL but methods are different making both different
  public create(@Body() taskData: CreateTaskDto): ITask {
    return this.taskService.create(taskData);
  }
}
