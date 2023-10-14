import { AuthModule, EventsModule, UserModule } from './modules'
import { Module } from '@nestjs/common'

import { PrismaService } from '@/services'

import { AppService } from './app.service'

@Module({
  imports: [AuthModule, UserModule, EventsModule],
  controllers: [],
  providers: [AppService, PrismaService],
})
export class AppModule {}
