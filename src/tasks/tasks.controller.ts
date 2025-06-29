import { Controller, Get, Param } from '@nestjs/common';

@Controller('tasks') // Each controller should have a route prefix
export class TasksController {
  @Get() // This decorator defines a GET endpoint
  public findAll(): string[] {
    // this method returns an array of strings
    return ['A', 'B', 'C', 'D', 'E'];
  }

  @Get('/:id') // method decorator to handle dynamic routes
  // The ':id' part of the route is a placeholder for a dynamic parameter
  // The value of the "id" parameter will be passed to the method as part of the params object
  // We have to use the @Param() decorator to access the dynamic parameter
  public findOne(@Param() params: any): string {
    return `The number is ${params.id}`;
  }
}
