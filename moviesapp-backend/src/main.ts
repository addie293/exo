import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  // swagger.
  const config = new DocumentBuilder()
    .setTitle('Movies Backend API Documentation')
    .setDescription('Documentation for MoviesApp Backend')
    .setVersion('1.0')
    .addTag('Movies')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(5000);
}
bootstrap();
