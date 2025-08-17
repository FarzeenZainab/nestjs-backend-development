import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateFindOneDto {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
