import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { PlacesModule } from './places/places.module';
import { User } from './users/user.entity';
import { Place } from './places/place.entity';
import { ContentModule } from './content/content.module';
import { Content } from './content/content.entity';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), TypeOrmModule.forRoot({ type: 'mariadb', url: process.env.DATABASE_URL, entities: [User, Place, Content], synchronize: true }), AuthModule, PlacesModule, ContentModule],
}) export class AppModule {}
