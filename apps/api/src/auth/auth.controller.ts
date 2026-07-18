import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LoginDto } from './dto/login.dto';
@ApiTags('Authentication')
@Controller('auth') export class AuthController { constructor(private auth: AuthService) {} @Post('login') @ApiOperation({ summary: 'Sign in and receive a JWT access token' }) @ApiOkResponse({ description: 'Authenticated successfully.' }) @ApiUnauthorizedResponse({ description: 'Invalid email or password.' }) login(@Body() dto: LoginDto) { return this.auth.login(dto.email, dto.password); } @UseGuards(JwtAuthGuard) @ApiBearerAuth() @Get('users') @ApiOperation({ summary: 'List admin users' }) users() { return this.auth.listUsers(); } }
