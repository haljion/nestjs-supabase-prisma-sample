# nestjs-supabase-prisma-sample

NestJS+Supabase+Prisma による API サーバーのサンプルアプリケーション

# プロジェクト作成

```zsh
npx @nestjs/cli new my-nestjs-app
curl https://raw.githubusercontent.com/github/gitignore/master/Node.gitignore > .gitignore
```

# 起動

```zsh
cd my-nestjs-app
# コードの変更をウォッチ
npm run start:dev
```

```zsh
# .env に記述された環境変数を使用するためには、ConfigModule が必要
npm i --save-dev @nestjs/config
```

# prisma 環境構築

```zsh
npm i prisma @prisma/client
npx prisma init
```

## prisma migrate

```zsh
npx prisma migrate dev --name init
```

- migrations.sql が作成されたら成功
- supabase 側にテーブルが作成される

# サービスクラス等生成

```zsh
npm nest g service users
```

# 暗号化ライブラリ

```zsh
npm i bcrypt
```

# JWTライブラリ

```zsh
npm i jsonwebtoken
```
