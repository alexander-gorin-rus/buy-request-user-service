import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import configuration from './config/configuration';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';

const {
  url,
  packageNames: { USER_PACKAGE },
} = configuration();

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        package: USER_PACKAGE.package,
        protoPath: [
          join(__dirname, '../protos/user-service/user.proto'),
          join(__dirname, '../protos/user-service/error.proto'),
        ],
        url: url,
        loader: {
          enums: String,
        },
      },
    },
  );
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  app.useGlobalInterceptors(new LoggingInterceptor());
  await app.listen();
  // eslint-disable-next-line no-console
  console.log(`Application is running on: ${url}`);
}
bootstrap();
