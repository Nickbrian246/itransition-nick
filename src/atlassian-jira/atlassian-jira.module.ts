import { Module } from '@nestjs/common';
import { AtlassianJiraService } from './atlassian-jira.service';
import { AtlassianJiraController } from './atlassian-jira.controller';

@Module({
  controllers: [AtlassianJiraController],
  providers: [AtlassianJiraService],
})
export class AtlassianJiraModule {}
