import { Injectable } from '@nestjs/common'
import { User } from '@prisma/client'
import { Request } from 'express'

import { PrismaService } from '@/services'

import { excludeUnsafeFields } from '@/shared/utils'

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getMe(request: Request) {
    const { id, role } = request['user']

    const user = await this.prisma.user.findFirst({
      where: {
        id,
        role,
      },
    })

    return excludeUnsafeFields<User, 'password'>(user, ['password'])
  }

  async uploadAvatar(body: { userId: string }, file: Express.Multer.File) {
    const payload = JSON.parse(JSON.stringify(body))

    await this.prisma.user.update({
      where: {
        id: Number(payload.userId),
      },
      data: {
        avatar: `${file.destination}/${file.filename}`,
      },
    })

    return {
      isUploaded: true,
    }
  }
}
