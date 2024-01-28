import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { UsersModule } from './users/users.module';

// 各機能を1つのモジュールにまとめる
@Module({
  imports: [ConfigModule.forRoot(), UsersModule],
})
export class AppModule {}
