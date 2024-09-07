import { PartialType } from '@nestjs/mapped-types';
import { CreateAtlassianJiraDto } from './create-atlassian-jira.dto';

export class UpdateAtlassianJiraDto extends PartialType(CreateAtlassianJiraDto) {}
