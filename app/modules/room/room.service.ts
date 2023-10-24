import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'

import { PrismaService } from '@/services'

@Injectable()
export class RoomService {
  constructor(private readonly prisma: PrismaService) {}

  async getRoomById(id: string) {
    const room = await this.prisma.room.findFirst({
      where: {
        roomId: id,
      },
    })

    if (!room)
      throw new NotFoundException(`Room doesn't exists`, {
        description: 'NO_ROOM',
      })

    return room
  }

  async getUserInRoom(payload: { roomId: string; userId: number }) {
    const room = await this.getRoomById(payload.roomId)

    const isUserJoined = await this.prisma.room.findFirst({
      where: {
        roomId: room.roomId,
        users: {
          some: {
            id: payload.userId,
          },
        },
      },
    })

    if (!isUserJoined)
      throw new ForbiddenException(`User doesn't join`, {
        description: `CHAT_LOGOUT`,
      })

    return {
      isJoined: true,
    }
  }

  async joinUser(payload: {
    room: { id: number; hash: string }
    userId: number
  }) {
    const response = await this.getUserInRoom({
      roomId: payload.room.hash,
      userId: payload.userId,
    })

    if (response.isJoined)
      throw new ConflictException(`User already joined`, {
        description: 'ALREADY_JOINED',
      })

    const user = await this.prisma.user.update({
      where: {
        id: payload.userId,
      },
      data: {
        rooms: {
          connect: {
            id: payload.room.id,
            roomId: payload.room.hash,
          },
        },
      },
    })

    if (user) {
      return {
        isJoined: true,
      }
    }

    throw new Error('Unknown error')
  }
}
