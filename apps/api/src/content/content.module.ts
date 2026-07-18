import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { ContentController } from './content.controller';
import { Content } from './content.entity';
import { ContentService } from './content.service';
@Module({ imports: [TypeOrmModule.forFeature([Content]), AuthModule], controllers: [ContentController], providers: [ContentService] }) export class ContentModule {}

