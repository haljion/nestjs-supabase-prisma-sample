import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  // NestFactoryでインスタンスを生成
  const app = await NestFactory.create(AppModule);
  // ポート番号指定
  // TODO:envとかで設定したほうが良さそう
  await app.listen(process.env.PORT_NUMBER);
}
bootstrap();
