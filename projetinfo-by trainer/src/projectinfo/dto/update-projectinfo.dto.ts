import { PartialType } from '@nestjs/mapped-types';
import { CreateProjectinfoDto } from './create-projectinfo.dto';

export class UpdateProjectinfoDto extends PartialType(CreateProjectinfoDto) {}
