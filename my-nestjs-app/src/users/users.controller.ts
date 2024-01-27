import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '@prisma/client';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('login')
  async login(@Body() userData: { email: string; password: string }) {
    return this.usersService.login(userData);
  }

  @Get()
  async getAll(): Promise<User[]> {
    return this.usersService.getAll();
  }

  @Get(':id')
  async get(@Param('id') id: number): Promise<User> {
    return this.usersService.get(id);
  }

  @Post('create')
  async registUser(
    @Body() userData: { username: string; email: string; password: string },
  ): Promise<User> {
    return this.usersService.registUser(userData);
  }
}
