import { Module } from '@nestjs/common';
import { AddressService } from '@address/address.service';
import { AddressController } from '@address/address.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from '@address/entities/address.entity';

@Module({
  controllers: [AddressController],
  providers: [AddressService],
  exports: [TypeOrmModule, AddressModule],
  imports: [TypeOrmModule.forFeature([Address])],
})
export class AddressModule {}
