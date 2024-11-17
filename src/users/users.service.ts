import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async updateIssuesFlag(): Promise<number> {
    const usersWithIssues = await this.userRepository.count({
      where: { issues: true },
    });

    console.log(`${usersWithIssues} users had the issues flag set to true.`);

    if (usersWithIssues > 0) {
      await this.userRepository.update(
        { issues: true },
        { issues: false },
      );
    }

    return usersWithIssues;
  }
  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }
}

