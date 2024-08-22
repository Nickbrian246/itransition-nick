import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma.service';

import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/guard-for-jwt';

import { CategoriesModule } from './categories/categories.module';
import { CollectionsModule } from './collections/collections.module';
import { CommentsModule } from './comments/comments.module';
import { CustomFieldsController } from './custom-fields/custom-fields.controller';
import { CustomFieldsModule } from './custom-fields/custom-fields.module';
import { CustomFieldsService } from './custom-fields/custom-fields.service';
import { ItemsModule } from './items/items.module';
import { LikesModule } from './likes/likes.module';
import { TagsModule } from './tags/tags.module';
import { UsersModule } from './users/users.module';
import { TextSearchModule } from './text-search/text-search.module';
import { StatusGuard } from './guards/guard-for-status/guard-for-status';

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
    UsersModule,
    TextSearchModule,
  ],
  controllers: [AppController, CustomFieldsController],
  providers: [
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: StatusGuard },
    AppService,
    PrismaService,
    CustomFieldsService,
  ],
})
export class AppModule {}
