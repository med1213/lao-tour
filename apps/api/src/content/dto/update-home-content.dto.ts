import { ApiProperty } from '@nestjs/swagger';
import { IsObject } from 'class-validator';

export class UpdateHomeContentDto {
  @ApiProperty({ description: 'Complete homepage content object. Any text displayed on the public homepage is editable here.' })
  @IsObject()
  data: Record<string, any>;
}

