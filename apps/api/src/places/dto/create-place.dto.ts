import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsLatitude, IsLongitude, IsOptional, IsString, IsUrl, Matches, MaxLength } from 'class-validator';

export class CreatePlaceDto {
  @ApiProperty({ example: 'Kuang Si Waterfalls' })
  @IsString()
  @MaxLength(160)
  title: string;

  @ApiProperty({ example: 'kuang-si-waterfalls', description: 'Unique URL-safe identifier.' })
  @IsString()
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
  slug: string;

  @ApiProperty({ example: 'A cascade of jade pools tucked into Luang Prabang’s forest.' })
  @IsString()
  @MaxLength(500)
  excerpt: string;

  @ApiProperty({ example: 'Swim, wander and pause beside the most iconic waterfalls in northern Laos.' })
  @IsString()
  description: string;

  @ApiProperty({ example: 'Luang Prabang' })
  @IsString()
  province: string;

  @ApiProperty({ example: 'Nature', enum: ['Nature', 'Culture', 'Adventure', 'Food'] })
  @IsString()
  category: string;

  @ApiProperty({ example: 'https://images.unsplash.com/photo-1500534623283-312aade485b7' })
  @IsUrl()
  image: string;

  @ApiPropertyOptional({ enum: ['draft', 'published'], default: 'published' })
  @IsOptional()
  @IsIn(['draft', 'published'])
  status?: 'draft' | 'published';

  @ApiPropertyOptional({ example: 19.8856 })
  @IsOptional()
  @IsLatitude()
  latitude?: number;

  @ApiPropertyOptional({ example: 102.1413 })
  @IsOptional()
  @IsLongitude()
  longitude?: number;
}

