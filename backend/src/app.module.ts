import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MapGateway } from './map.gateway';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, MapGateway],
})
export class AppModule {}
