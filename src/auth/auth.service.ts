import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import * as argon from 'argon2';

import { PrismaService } from 'src/prisma/prisma.service';
import { SignUpDto, SignInDto } from './dto';

export interface IJwtData {
  userId: number;
  email: string;
}

export interface IJwtObj {
  accessToken: string;
}

@Injectable({})
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  public async signup(dto: SignUpDto) {
    try {
      const hash: string = await argon.hash(dto.password);

      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
        },
      });

      delete user.hash;

      return this.signToken(user.id, user.email);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Email already taken !');
        }
      }

      throw error;
    }
  }

  public async signin(dto: SignInDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user) {
      throw new ForbiddenException('Email or password is incorrect !');
    }

    const doesPasswordMatches = await argon.verify(user.hash, dto.password);

    if (!doesPasswordMatches) {
      throw new ForbiddenException('Email or password is incorrect !');
    }

    return this.signToken(user.id, user.email);
  }

  private async signToken(userId: number, email: string): Promise<IJwtObj> {
    const payload: IJwtData = {
      userId,
      email,
    };

    const jwtAccessSecret: string = this.config.get('JWT_ACCESS_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: jwtAccessSecret,
    });

    return {
      accessToken: token,
    };
  }
}
