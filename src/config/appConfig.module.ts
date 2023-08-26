import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import config from '.';

const nodeEnv = process.env.NODE_ENV;
const envPath = nodeEnv ? `.env.${nodeEnv}` : `.env`;

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/${envPath}`,
      load: [config],
      isGlobal: true,
    }),
  ],
})
export class AppConfig {}
