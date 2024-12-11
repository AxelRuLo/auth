import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive, Min } from 'class-validator';

export class IdDto {
  @ApiProperty({
    example: 10,
    required: true,
  })
  @IsPositive()
  @IsNumber()
  @Min(0)
  id: number;
}
