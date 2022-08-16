import { Injectable } from '@nestjs/common';
import {
  ClientProxyFactory,
  Transport,
  ClientProxy,
} from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        port: 3000,
      },
    });
  }

  async getHello(): Promise<string> {
    const method = this.client.send('getHello', 'lschulzes');

    return await firstValueFrom(method);
  }
}
