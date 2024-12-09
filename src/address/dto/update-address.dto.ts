import { PartialType } from '@nestjs/swagger';
import { CreateAddressDto } from '@address/dto/create-address.dto';

export class UpdateAddressDto extends PartialType(CreateAddressDto) {}
