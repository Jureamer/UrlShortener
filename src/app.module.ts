import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CompModule } from './comp/comp.module';

@Module({
  imports: [CompModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
