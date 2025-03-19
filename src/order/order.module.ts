import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { Order } from './entities/order.entity';
import { OrderDetail } from './entities/order-detail.entity';
import { ProductModule } from '../product/product.module';
import { CustomerModule } from '../customer/customer.module';
import { EmailService } from '../common/email/email.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderDetail]),
    ProductModule,
    CustomerModule,
  ],
  controllers: [OrderController],
  providers: [OrderService, EmailService],
  exports: [OrderService],
})
export class OrderModule {}