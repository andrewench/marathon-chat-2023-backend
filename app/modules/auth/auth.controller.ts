import { Body, Controller, Post, Put } from '@nestjs/common'

import { TLoginCredentials, TSignUpCredentials } from '@/shared/types'

import { AuthService } from './auth.service'

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/refresh')
  async refresh(@Body() body: { refreshToken: string }) {
    return this.authService.refresh(body)
  }

  @Post('/login')
  async login(@Body() credentials: TLoginCredentials) {
    return this.authService.login(credentials)
  }

  @Put('/signup')
  async signUp(@Body() credentials: TSignUpCredentials) {
    return this.authService.signUp(credentials)
  }
}
