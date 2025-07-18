import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { SanitizePipe } from './common/pipes/sanitize.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Get configuration values
  const port = configService.get<number>('app.port') || 3000;
  const environment =
    configService.get<string>('app.environment') || 'development';
  const mongoUri = configService.get<string>('database.uri');
  const minioEndpoint = configService.get<string>('minio.endpoint');
  const minioBucket = configService.get<string>('minio.bucket');

  // Startup banner
  console.log('\n========================================');
  console.log('🚀 ShelfSpace Server Starting...');
  console.log('========================================');
  console.log(`📍 Environment: ${environment}`);
  console.log(`🔌 Port: ${port}`);
  console.log(
    `📁 Database: ${mongoUri ? 'MongoDB configured' : '❌ MongoDB URI not set'}`,
  );
  console.log(`💾 Storage: MinIO at ${minioEndpoint || 'Not configured'}`);
  console.log(`📦 Bucket: ${minioBucket || 'Not configured'}`);
  console.log(
    `🔐 JWT: ${configService.get<string>('jwt.secret') ? 'Secret configured' : '❌ JWT secret not set'}`,
  );
  console.log(
    `⏰ Access Token TTL: ${configService.get<string>('jwt.accessExpiresIn')}`,
  );
  console.log(
    `⏰ Refresh Token TTL: ${configService.get<string>('jwt.refreshExpiresIn')}`,
  );
  console.log('========================================\n');

  // Security middleware
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          scriptSrc: ["'self'"],
          imgSrc: [
            "'self'",
            'data:',
            'http://localhost:9000', // MinIO local
            'https://f52970ecf92014e62775bc23469119c9.r2.cloudflarestorage.com', // R2 S3 endpoint
            'https://*.r2.dev', // R2 public URLs
          ],
        },
      },
      crossOriginEmbedderPolicy: false,
    }),
  );

  // CORS configuration
  app.enableCors({
    origin:
      process.env.NODE_ENV === 'production'
        ? 'https://shelfspace-omega.vercel.app'
        : 'http://localhost:5173',
    credentials: true,
  });

  // Global validation and security pipes
  app.useGlobalPipes(
    new SanitizePipe(),
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.setGlobalPrefix('api');

  // Swagger API documentation setup
  const config = new DocumentBuilder()
    .setTitle('ShelfSpace API')
    .setDescription(
      'A comprehensive REST API for managing personal collections. Features include user authentication, item management with image uploads, category organization, and advanced filtering capabilities.',
    )
    .setVersion('1.0')
    .setLicense('MIT', 'https://opensource.org/licenses/MIT')
    .addServer('http://localhost:3000', 'Development server')
    .addServer(
      'https://shelfspace-production.up.railway.app',
      'Production server',
    )
    .addBearerAuth(
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
    .addTag('Authentication', 'User registration, login, and token management')
    .addTag('Items', 'Manage personal collection items with images')
    .addTag('Categories', 'Organize items into colored categories')
    .addTag('Upload', 'File upload and image management')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(port);

  // Dynamic base URL for logs
  const baseUrl =
    process.env.NODE_ENV === 'production'
      ? 'https://shelfspace-production.up.railway.app'
      : `http://localhost:${port}`;

  console.log(`\n✅ ShelfSpace Server is running!`);
  console.log(`📚 API Documentation: ${baseUrl}/api/docs`);
  console.log(`🏥 Health Check: ${baseUrl}/api/health`);
  console.log('========================================\n');
}
void bootstrap();
