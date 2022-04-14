import { Controller, Get, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';

import { GetUser } from 'src/auth/decorators';
import { JwtGuard } from 'src/auth/guards';
import { PrismaService } from 'src/prisma/prisma.service';

@UseGuards(JwtGuard)
@Controller('users')
export class UserConstoller {
  constructor(private prisma: PrismaService) {}

  @Get('me')
  public async userMe(@GetUser() user: User) {
    return user;
  }
}
