import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma.service';
import { CollectionModule } from './collection/collection.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/guard-for-jwt';
import { TagModule } from './tag/tag.module';
import { CategoryModule } from './category/category.module';
import { ItemModule } from './item/item.module';
import { CustomFieldModule } from './custom-field/custom-field.module';

@Module({
  imports: [AuthModule, CollectionModule, TagModule, CategoryModule, ItemModule, CustomFieldModule],
  controllers: [AppController],
  providers: [
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    AppService,
    PrismaService,
  ],
})
export class AppModule {}
