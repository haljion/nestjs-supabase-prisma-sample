# nestjs-supabase-prisma-sample

NestJS+Supabase+Prisma による API サーバーのサンプルアプリケーション

npx @nestjs/cli new my-nestjs-app
$ cd my-nestjs-app
$ yarn run start

# コードの変更をウォッチ

yarn run start:dev

# .env に記述された環境変数を使用するためには、ConfigModule が必要

npm install --save-dev @nestjs/config

yarn add prisma
npx prisma init

## migrate

- migrations.sql が作成されたら成功
- supabase 側にテーブルが作成される

```
npx prisma migrate dev --name init
```

yarn nest g service users
yarn add bcrypts

curl https://raw.githubusercontent.com/github/gitignore/master/Node.gitignore > .gitignore
