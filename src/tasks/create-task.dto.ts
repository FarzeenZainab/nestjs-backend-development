import { IsDefined, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { TaskStatuses } from './task.model';

export class CreateTaskDto {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsDefined()
  @IsEnum(TaskStatuses)
  @IsNotEmpty()
  status: TaskStatuses;
}
