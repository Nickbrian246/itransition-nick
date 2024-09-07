import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AtlassianJiraService } from './atlassian-jira.service';
import { CreateAtlassianJiraDto } from './dto/create-atlassian-jira.dto';
import { UpdateAtlassianJiraDto } from './dto/update-atlassian-jira.dto';
import { Public } from 'src/decorators/public-route';

@Controller('atlassian-jira')
export class AtlassianJiraController {
  constructor(private readonly atlassianJiraService: AtlassianJiraService) {}
  @Post()
  @Public()
  create(@Body() createAtlassianJiraDto: CreateAtlassianJiraDto) {
    return this.atlassianJiraService.create();
  }
}
