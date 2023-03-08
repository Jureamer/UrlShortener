import { Module } from '@nestjs/common';
import { CompController } from './comp.controller';
import { CompService } from './comp.service';

@Module({
  controllers: [CompController],
  providers: [CompService]
})
export class CompModule {}
