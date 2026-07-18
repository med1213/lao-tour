import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
@Injectable() export class AuthService {
  constructor(@InjectRepository(User) private users: Repository<User>, private jwt: JwtService) {}
  async seedAdmin() { if (!(await this.users.count())) await this.users.save({ name: 'Lao Tour Admin', email: 'admin@laotour.la', password: await bcrypt.hash('laotour2026', 10), role: 'admin' }); }
  async login(email: string, password: string) { const user = await this.users.findOneBy({ email }); if (!user || !(await bcrypt.compare(password, user.password))) throw new UnauthorizedException('Invalid email or password'); return { accessToken: this.jwt.sign({ sub: user.id, role: user.role }), user: { id: user.id, name: user.name, email: user.email, role: user.role } }; }
  async listUsers() { return (await this.users.find({ order: { createdAt: 'DESC' } })).map(({ password, ...user }) => user); }
}
