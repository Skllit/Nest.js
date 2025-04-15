import { IsNotEmpty, IsOptional, IsInt, Min, IsString, IsArray, ArrayNotEmpty, IsPositive } from 'class-validator';

export class CreateMovieDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsInt()
  @Min(1)
  duration: number; // in minutes

  // Optional array of theater IDs to associate with this movie
  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  @IsPositive({ each: true })
  theaterIds?: number[];
}
