import { Module } from '@nestjs/common';
import { UserConstoller } from './user.controller';

@Module({
  imports: [],
  controllers: [UserConstoller],
  providers: [],
})
export class UserModule {}
