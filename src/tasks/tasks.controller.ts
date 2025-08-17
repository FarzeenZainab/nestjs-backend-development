import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { ITask } from './task.model';
import { CreateTaskDto } from './create-task.dto';
import { CreateFindOneDto } from './create-find-one.dto';
import { UpdateStatusDto } from './update-status.dto';
import { deleteTaskDto } from './delete-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  private findOneOrFail(id: string): ITask {
    const task = this.taskService.findOne(id);

    if (!task) {
      throw new NotFoundException();
    }

    return task;
  }

  @Get()
  public findAll(): ITask[] {
    return this.taskService.findAll();
  }

  @Get('/:id')
  public findOne(@Param() params: CreateFindOneDto): ITask {
    const task = this.findOneOrFail(params.id);
    return task;
  }

  @Post() // this and @Get may not have a unique URL but methods are different making both different
  public create(@Body() taskData: CreateTaskDto): ITask {
    return this.taskService.create(taskData);
  }

  @Patch('/:id/status')
  public updateStatus(@Param() params: CreateFindOneDto, @Body() body: UpdateStatusDto): ITask {
    const task = this.findOneOrFail(params.id);
    task.status = body.status;
    return task;
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT) // typical response returned when you delete something
  public deleteTask(@Param() params: deleteTaskDto): void {
    // using this method to make sure an exception is thrown when a task is not found.
    const task = this.findOneOrFail(params.id);
    this.taskService.delete(task.id);
  }
}
