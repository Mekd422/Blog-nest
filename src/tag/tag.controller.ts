import { Controller, Get } from '@nestjs/common';
import { TagService } from './tag.service';

@Controller('tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get()
  async getTags(): Promise<any> {
    const allTags = await this.tagService.getTags();
    const tags: string[] = allTags.map((tag) => tag.name);

    return { tags };
  }
}
