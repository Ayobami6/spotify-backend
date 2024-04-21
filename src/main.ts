import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import * as process from 'process';
import { TransformInterceptor } from './serializers/transformer-interceptors';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

declare const module: any;

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor());
  const config = new DocumentBuilder() //1
    .setTitle('Spotify Clone')
    .setDescription('The Spotify Clone Api documentation')
    .setVersion('1.0')
    .addBearerAuth(
      // Enable Bearer Auth here
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config); //2
  SwaggerModule.setup('api', app, document); //3
  const PORT = process.env.PORT || 3000;
  await app.listen(PORT);
  logger.log(`Application is running on:  ${await app.getUrl()}`);
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
