import { AuthModule } from './modules'
import { Module } from '@nestjs/common'

import { PrismaService } from '@/services'

import { AppService } from './app.service'

@Module({
  imports: [AuthModule],
  controllers: [],
  providers: [AppService, PrismaService],
})
export class AppModule {}
