import { PartialType } from '@nestjs/mapped-types';
import { CreateItemDto } from './create-item.dto';
import { IsBoolean, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateItemDto extends PartialType(CreateItemDto) {
  @ApiProperty({
    description: 'Flag to indicate if the image should be removed',
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  removeImage?: boolean;
}
