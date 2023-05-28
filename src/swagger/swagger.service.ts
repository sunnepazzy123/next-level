import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export const swaggerDoc = (app: INestApplication) => {
  const userConfig = new DocumentBuilder()
    .setTitle('NextLevel.Studio')
    .setDescription('The Application API description')
    .setVersion('2.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, userConfig);
  SwaggerModule.setup('api/docs', app, document);
};
