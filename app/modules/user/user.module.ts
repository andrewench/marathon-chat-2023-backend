import { Module } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { PrismaService } from '@/services'

import { UserController } from './user.controller'

import { UserService } from './user.service'

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, PrismaService, JwtService],
})
export class UserModule {}
