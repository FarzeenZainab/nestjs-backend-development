import { IsNotEmpty, IsUUID } from 'class-validator';

export class deleteTaskDto {
  @IsUUID()
  @IsNotEmpty()
  id: string;
}
