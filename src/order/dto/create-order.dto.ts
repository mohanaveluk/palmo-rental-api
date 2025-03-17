import { IsNotEmpty, IsDateString, IsString, IsOptional, IsArray, ValidateNested, IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { CreateCustomerDto } from '../../customer/dto/create-customer.dto';

export class OrderDetailDto {
  @ApiProperty({ description: 'Product ID' })
  @IsNotEmpty()
  @IsString()
  productId: string;

  @ApiProperty({ description: 'Quantity of products to rent' })
  @IsNumber()
  @Min(1)
  quantity: number;
}

export class CreateOrderDto {
  @ApiProperty({ description: 'Customer details' })
  @ValidateNested()
  @Type(() => CreateCustomerDto)
  customer: CreateCustomerDto;

  @ApiProperty({ description: 'Rental start date' })
  @IsDateString()
  rentalStartDate: Date;

  @ApiProperty({ description: 'Rental end date' })
  @IsDateString()
  rentalEndDate: Date;

  @ApiProperty({ description: 'Order comments', required: false })
  @IsOptional()
  @IsString()
  comments?: string;

  @ApiProperty({ description: 'Order details', type: [OrderDetailDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderDetailDto)
  orderDetails: OrderDetailDto[];
}