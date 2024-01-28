import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { User, Prisma } from '@prisma/client';
import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

import { PrismaService } from '../prisma.service';
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  // ログイン tokenを発行
  async login(data: { email: string; password: string }): Promise<User[]> {
    const user = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    // ユーザーが見つからなかった場合
    if (!user) {
      throw new NotFoundException('User not found.');
    }

    const isValid = await compare(data.password, user.password);

    if (!isValid) {
      throw new UnauthorizedException('isValid password.');
    }

    const jwtPayload = { id: user.id };

    const jwtOptions = {
      // algorithm: 'HS256', // アルゴリズム指定
      expiresIn: '1d', // 有効期間：１日
    };

    // JWTトークン発行
    const token = sign(
      jwtPayload,
      process.env.SECRET_KEY, // 秘密鍵 TODO:環境変数に設定
      jwtOptions,
    );

    return token;
  }

  // 全ユーザーを取得
  async getAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  // ユーザーを取得(pid:id)
  async get(id: number): Promise<User> {
    return this.prisma.user.findUnique({ where: { id: Number(id) } });
  }

  // ユーザーを登録
  async registUser(data: Prisma.UserCreateInput): Promise<User> {
    // パスワードのハッシュ化
    const hashedPassword = await hash(
      data.password,
      Number(process.env.SALT_ROUNDS),
    );

    return this.prisma.user.create({
      data: { ...data, password: hashedPassword },
    });
  }
}
