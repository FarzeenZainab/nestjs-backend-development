import { IsNotEmpty, IsUUID } from 'class-validator';
import { CreateTaskDto } from './create-task.dto';
import { PartialType } from '@nestjs/mapped-types';

export class CreateIDDTO {
  @IsUUID()
  @IsNotEmpty()
  id: string;
}

// export class UpdateTaskDTO {
//   @IsDefined()
//   @IsString()
//   @IsOptional()
//   title: string;

//   @IsDefined()
//   @IsString()
//   @IsOptional()
//   description: string;

//   @IsDefined()
//   @IsEnum(TaskStatuses)
//   @IsOptional()
//   status: TaskStatuses;
// }

export class UpdateTaskDTO extends PartialType(CreateTaskDto) {}
