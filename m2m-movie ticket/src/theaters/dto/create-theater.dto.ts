import { IsNotEmpty, IsString, IsInt, Min } from 'class-validator';

export class CreateTheaterDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  location: string;

  @IsInt()
  @Min(1)
  capacity: number;
}
