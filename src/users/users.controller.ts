import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('update-issues')
  async updateIssuesFlag(): Promise<string> {
    const count = await this.userService.updateIssuesFlag();
    return `${count} users had the issues flag set to true.`;
  }

  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }
}
