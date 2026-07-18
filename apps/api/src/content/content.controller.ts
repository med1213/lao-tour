import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ContentService } from './content.service';
import { UpdateHomeContentDto } from './dto/update-home-content.dto';

@ApiTags('Website content')
@Controller('content')
export class ContentController {
  constructor(private content: ContentService) {}
  @Get('home') @ApiOperation({ summary: 'Get public homepage copy and media settings' }) home() { return this.content.home(); }
  @UseGuards(JwtAuthGuard) @ApiBearerAuth() @Put('home') @ApiOperation({ summary: 'Update all homepage copy and media settings' }) update(@Body() dto: UpdateHomeContentDto) { return this.content.updateHome(dto.data); }
}

