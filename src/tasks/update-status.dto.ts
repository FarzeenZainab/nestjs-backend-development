import { IsDefined, IsEnum } from 'class-validator';
import { TaskStatuses } from './task.model';

export class UpdateStatusDto {
  @IsDefined()
  @IsEnum(TaskStatuses)
  status: TaskStatuses;
}
