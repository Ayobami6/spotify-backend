import { DataSource } from 'typeorm';
import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

@Global()
@Module({
  // import the config module
  imports: [ConfigModule],
  // inject the config service
  providers: [
    {
      provide: DataSource,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        //    create a logger instance
        const logger = new Logger();
        try {
          // create a new data source
          const newDataSource = new DataSource({
            type: 'postgres',
            host: configService.get('DB_HOST'),
            port: configService.get('DB_PORT'),
            username: configService.get('DB_USERNAME'),
            password: configService.get('DB_PASSWORD'),
            database: configService.get('DB_DATABASE'),
            synchronize: true,
            entities: [`${__dirname}/../**/**.entity{.ts,.js}`],
          });
          await newDataSource.initialize();
          console.log('Database connected successfully');
          return newDataSource;
        } catch (error) {
          logger.error(error.message, error.stack);
          console.log('Error connecting to database');
          throw error;
        }
      },
    },
  ],
  exports: [DataSource, ConfigModule],
})
export class TypeOrmModule {}
