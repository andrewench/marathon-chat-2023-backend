import { Controller, Get, Req, UseGuards } from '@nestjs/common'
import { Request } from 'express'

import { AuthGuard } from '@/guards'

import { UserService } from './user.service'

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('user/me')
  @UseGuards(AuthGuard)
  async getMe(@Req() request: Request) {
    return this.userService.getMe(request)
  }
}
