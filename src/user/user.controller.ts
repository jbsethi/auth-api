import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

import { PrismaService } from 'src/prisma/prisma.service';

@Controller('users')
export class UserConstoller {
  constructor(private prisma: PrismaService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  public async userMe(@Req() request: Request) {
    return request.user;
  }
}
