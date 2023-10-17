import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { Request } from 'express'
import { diskStorage } from 'multer'
import { extname } from 'path'
import { v4 as uuidv4 } from 'uuid'

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

  @Post('user/avatar')
  @UseGuards(AuthGuard)
  @UseInterceptors(
    FileInterceptor('picture', {
      storage: diskStorage({
        destination: 'uploads/images',
        filename: (_, file, cb) => {
          const generatedFileName = uuidv4()

          cb(null, `${generatedFileName}${extname(file.originalname)}`)
        },
      }),
    }),
  )
  async uploadAvatar(
    @Body() body: { userId: string },
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.userService.uploadAvatar(body, file)
  }
}
