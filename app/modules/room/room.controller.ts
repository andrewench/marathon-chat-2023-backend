import { Body, Controller, Post, Put, UseGuards } from '@nestjs/common'

import { AuthGuard } from '@/guards'

import { RoomService } from './room.service'

@Controller()
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post('room/id')
  @UseGuards(AuthGuard)
  async getUserInRoom(@Body() payload: { roomId: string; userId: number }) {
    return this.roomService.getUserInRoom(payload)
  }

  @Put('room/add')
  @UseGuards(AuthGuard)
  async joinUser(
    @Body() payload: { room: { id: number; hash: string }; userId: number },
  ) {
    return this.roomService.joinUser(payload)
  }
}
