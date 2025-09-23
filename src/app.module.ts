import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TagController } from './tag/tag.controller';
import { TagService } from './tag/tag.service';

@Module({
  imports: [TagController, TagService],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
