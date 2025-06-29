import { Controller, Get } from '@nestjs/common';

@Controller('tasks') // Each controller should have a route prefix
export class TasksController {
  @Get() // This decorator defines a GET endpoint
  public findAll(): string[] {
    // this method returns an array of strings
    return ['A', 'B', 'C', 'D', 'E'];
  }
}
