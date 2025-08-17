import { IsNotEmpty, IsNumberString, IsUUID } from 'class-validator';

export class CreateFindOneDto {
  @IsNumberString()
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
