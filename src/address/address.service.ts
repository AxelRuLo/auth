import { Injectable } from '@nestjs/common';
import { CreateAddressDto } from '@address/dto/create-address.dto';
import { UpdateAddressDto } from '@address/dto/update-address.dto';

@Injectable()
export class AddressService {
  create(createAddressDto: CreateAddressDto) {
    return `This action adds a new address ${createAddressDto}`;
  }

  findAll() {
    return `This action returns all address`;
  }

  findOne(id: number) {
    return `This action returns a #${id} address`;
  }

  update(id: number, updateAddressDto: UpdateAddressDto) {
    return `This action updates a #${updateAddressDto} address`;
  }

  remove(id: number) {
    return `This action removes a #${id} address`;
  }
}
