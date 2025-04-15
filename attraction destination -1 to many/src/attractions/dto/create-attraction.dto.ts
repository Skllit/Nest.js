import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateAttractionDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsOptional()
  @IsNumber()
  price?: number;

  @IsOptional()
  @IsString()
  openingHours?: string;

  @IsNotEmpty()
  @IsNumber()
  destinationId: number;
}
