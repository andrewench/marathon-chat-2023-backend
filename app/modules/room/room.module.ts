import { Module } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { PrismaService } from '@/services'

import { RoomController } from './room.controller'

import { RoomService } from './room.service'

@Module({
  providers: [RoomService, PrismaService, JwtService],
  controllers: [RoomController],
})
export class RoomModule {}
