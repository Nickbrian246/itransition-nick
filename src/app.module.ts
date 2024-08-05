import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma.service';

import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/guard-for-jwt';

import { CategoriesModule } from './categories/categories.module';
import { CollectionsModule } from './collections/collections.module';
import { CustomFieldsController } from './custom-fields/custom-fields.controller';
import { CustomFieldsModule } from './custom-fields/custom-fields.module';
import { CustomFieldsService } from './custom-fields/custom-fields.service';
import { ItemsModule } from './items/items.module';
import { TagsModule } from './tags/tags.module';
import { CommentsModule } from './comments/comments.module';
import { LikesModule } from './likes/likes.module';

@Module({
  imports: [
    AuthModule,
    CategoriesModule,
    CollectionsModule,
    CustomFieldsModule,
    ItemsModule,
    TagsModule,
    CommentsModule,
    LikesModule,
  ],
  controllers: [AppController, CustomFieldsController],
  providers: [
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    AppService,
    PrismaService,
    CustomFieldsService,
  ],
})
export class AppModule {}
