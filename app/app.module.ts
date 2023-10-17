import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'

import { AuthModule, EventsModule, UserModule } from '@/modules'

import { PrismaService } from '@/services'

import { AppConstant } from '@/shared/constants'

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    UserModule,
    EventsModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..'),
      renderPath: AppConstant.STATIC_PATH,
    }),
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
