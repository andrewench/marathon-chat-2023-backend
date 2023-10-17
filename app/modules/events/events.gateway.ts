import { Logger } from '@nestjs/common'
import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'

@WebSocketGateway(3040, {
  cors: '*',
  transports: ['polling'],
})
export class EventsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private Logger = new Logger('EventsGateway')

  afterInit() {
    this.Logger.log('Events Gateway Initialized')
  }

  handleConnection(client: Socket) {
    this.Logger.log(`New client connected : ${client.id}`)
    client.emit('connected', 'Successfully connected to the server')
  }

  handleDisconnect(client: Socket) {
    this.Logger.log(`Client disconnected: ${client.id}`)
  }

  @WebSocketServer()
  server: Server

  @SubscribeMessage('message')
  handleMessage(
    @MessageBody() payload: { id: number; avatar: string; message: string },
  ) {
    this.server.emit('message', payload)
  }

  @SubscribeMessage('typing')
  handleTyping(
    @MessageBody()
    payload: {
      id: number
      firstName: string
      lastName: string
      isTyping: boolean
    },
  ) {
    this.server.emit('typing', payload)
  }
}
