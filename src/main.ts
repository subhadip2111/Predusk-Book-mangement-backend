import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  const config = new DocumentBuilder()
    .setTitle('Predusk-Books-Management-backend API')
    .setDescription('API documentation for the Books Management backend')
    .setVersion('3.0') .addBearerAuth(
    {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'Authorization',
      in: 'header',
    },
    'accessToken', 
  ) 
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document)
  console.log(`Swagger API documentation available at: http://localhost:6060/api`);
  await app.listen(6060);
}
bootstrap();
