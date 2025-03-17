import { IsNotEmpty, IsString, IsEmail, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCustomerDto {
  @ApiProperty({ description: 'Customer first name' })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({ description: 'Customer last name' })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty({ description: 'Customer email address' })
  @IsNotEmpty()
  @IsEmail()
  emailId: string;

  @ApiProperty({ description: 'Customer mobile number' })
  @IsNotEmpty()
  @IsString()
  mobileNumber: string;

  @ApiProperty({ description: 'Customer street address' })
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty({ description: 'Customer apartment/suite number', required: false })
  @IsOptional()
  @IsString()
  aptSuite?: string;

  @ApiProperty({ description: 'Customer city' })
  @IsNotEmpty()
  @IsString()
  city: string;

  @ApiProperty({ description: 'Customer state' })
  @IsNotEmpty()
  @IsString()
  state: string;

  @ApiProperty({ description: 'Customer zip code' })
  @IsNotEmpty()
  @IsString()
  zipCode: string;
}