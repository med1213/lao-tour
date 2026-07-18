import { Module, OnModuleInit } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { User } from '../users/user.entity';
@Module({ imports: [TypeOrmModule.forFeature([User]), JwtModule.register({ secret: process.env.JWT_SECRET || 'change-me', signOptions: { expiresIn: '1d' } })], controllers: [AuthController], providers: [AuthService, JwtAuthGuard] }) export class AuthModule implements OnModuleInit { constructor(private auth: AuthService) {} async onModuleInit() { await this.auth.seedAdmin(); } }
