import { Body, Controller, Post, Put } from '@nestjs/common'

import { TLoginCredentials, TSignUpCredentials } from '@/shared/types'

import { AuthService } from './auth.service'

@Controller()
export class AuthController {
  constructor(private readonly appService: AuthService) {}

  @Post('/auth/login')
  async login(@Body() credentials: TLoginCredentials) {
    return this.appService.login(credentials)
  }

  @Put('/auth/signup')
  async signUp(@Body() credentials: TSignUpCredentials) {
    return this.appService.signUp(credentials)
  }
}
