import { SubscribeMessage, WebSocketGateway ,MessageBody ,WebSocketServer,WsResponse} from '@nestjs/websockets';
import {from ,Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Server} from 'socket.io'
import { EventsService } from './events.service';

@WebSocketGateway({
  cors:{
    origin:'*'
  }
})
export class EventsGateway {
  @WebSocketServer()
  server:Server
  constructor(private chatService:EventsService){}
  findAll(@MessageBody() data: any): Observable<WsResponse<number>> {
    return from([1, 2, 3]).pipe(map(item => ({ event: 'events', data: item })));
  }

  @SubscribeMessage('identity')
  async identity(@MessageBody() data: number): Promise<number> {
    return data;
  }
  @SubscribeMessage('message')
  async handleMessage(@MessageBody() message:string) {
    
    const response = await this.chatService.HandlePrompt(message)
    
    return this.server.emit('botResponse',response);
  }
}
