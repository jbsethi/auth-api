import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';

@Injectable({})
export class AuthService {
  constructor(private prisma: PrismaService) {}

  public signup() {
    return {
      msg: 'i am signed up',
    };
  }

  public signin() {
    return {
      msg: 'i am signed in',
    };
  }
}
