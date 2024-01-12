import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { CommentsModule } from './comments/comments.module';
import { ProductsModule } from './products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchasesModule } from './purchases/purchases.module';
import { PurchaseDetailsModule } from './purchase_details/purchase_details.module';
import { ProductCategoriesModule } from './product_categories/product_categories.module';
@Module({
  imports: [
    UsersModule,
    CommentsModule,
    ProductsModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    PurchasesModule,
    PurchaseDetailsModule,
    ProductCategoriesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
