import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma.service';

import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/guard-for-jwt';
import { TagModule } from './tag/tag.module';

import { ItemModule } from './item/item.module';
import { CustomFieldModule } from './custom-field/custom-field.module';
import { CategoriesModule } from './categories/categories.module';
import { CollectionsModule } from './collections/collections.module';
import { CustomFieldsController } from './custom-fields/custom-fields.controller';
import { TagsModule } from './tags/tags.module';
import { ItemsModule } from './items/items.module';
import { CustomFieldsModule } from './custom-fields/custom-fields.module';
import { CustomFieldsService } from './custom-fields/custom-fields.service';
import { CustomFieldsController } from './custom-fields/custom-fields.controller';

@Module({
  imports: [
    AuthModule,
    TagModule,

    ItemModule,
    CustomFieldModule,
    CategoriesModule,
    CollectionsModule,
    CustomFieldsModule,
    ItemsModule,
    TagsModule,
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
