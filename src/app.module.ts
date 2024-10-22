import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SongsModule } from './songs/songs.module';
import { LoggerMiddleware } from './common/middleware/logger/logger.middleware';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from './datastore/typeorm.module';
import { DatasourceModule } from './datasource/datasource.module';
import { UserModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';
import { LoggerService } from './logger.service';
import { WinstonModule } from 'nest-winston';
import { ArtistModule } from './artists/artist.module';
import * as winston from 'winston';
@Module({
  controllers: [AppController],
  imports: [
    SongsModule,
    TypeOrmModule,
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.MACHINE}`],
      isGlobal: true,
    }),
    DatasourceModule,
    UserModule,
    AuthModule,
    ArtistModule,
    WinstonModule.forRoot({
      transports: [
        new winston.transports.File({
          filename: 'error.log',
          level: 'error',
        }),
        new winston.transports.Console(),
      ],
    }),
    ArtistModule,
  ],
  providers: [AppService, LoggerService],
  exports: [LoggerService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('songs');
  }
}
