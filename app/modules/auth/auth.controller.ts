import { Body, Controller, Post, Put } from '@nestjs/common'

import { AuthUserDto } from './dto/auth-user.dto'
import { CreateUserDto } from './dto/create-user.dto'

import { AuthService } from './auth.service'

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/refresh')
  async refresh(@Body() body: { refreshToken: string }) {
    return this.authService.refresh(body)
  }

  @Post('/login')
  async login(@Body() credentials: AuthUserDto) {
    return this.authService.login(credentials)
  }

  @Put('/signup')
  async signUp(@Body() credentials: CreateUserDto) {
    return this.authService.signUp(credentials)
  }
}
