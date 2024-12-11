import { PartialType } from '@nestjs/swagger';
import { CreateAddressDto } from '@auth/address/dto/create-address.dto';

export class UpdateAddressDto extends PartialType(CreateAddressDto) {}
