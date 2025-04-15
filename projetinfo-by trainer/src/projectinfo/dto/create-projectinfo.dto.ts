import { IsEmail, IsFQDN, IsNotEmpty, IsString, Length } from "class-validator";

export class CreateProjectinfoDto {
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsString()
  projectname: string;
  @IsString()
  @Length(20, 100)
  projectdescription: string;
  @IsString()
  projectmanager: string;

}
