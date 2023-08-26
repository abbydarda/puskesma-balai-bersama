import { ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.getOrThrow('db.url'),
        entities: [`${process.cwd()}/dist/database/typeorm/entities/*.entity{.ts,.js}`],
        autoLoadEntities: true,
        synchronize: configService.getOrThrow('db.synchronize'),
        logging: true,
      }),
    }),
  ],
})
export class TypeormModule {}
