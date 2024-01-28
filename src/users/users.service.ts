import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { User, Prisma } from '@prisma/client';
import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async login(data: { email: string; password: string }): Promise<User[]> {
    const user = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    // ユーザーが見つからなかった場合
    if (!user) {
      throw new NotFoundException('User Not Found');
    }

    const isValid = await compare(data.password, user.password);

    if (!isValid) {
      throw new NotFoundException('User Not Found');
    }

    // JWTトークン発行
    const token = sign(
      { id: user.id },
      'SECRET_KEY', // 秘密鍵 TODO:環境変数に設定
      { expiresIn: '1d' }, //有効期間：１日
    );

    return token;
  }

  async getAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async get(id: number): Promise<User> {
    return this.prisma.user.findUnique({ where: { id: Number(id) } });
  }

  async registUser(data: Prisma.UserCreateInput): Promise<User> {
    // パスワードのハッシュ化(ソルト値１０)
    const hashedPassword = await hash(data.password, 10);
    const reqParam = { ...data, password: hashedPassword };
    return this.prisma.user.create({
      data: reqParam,
    });
  }
}
