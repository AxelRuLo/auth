import { User } from '@auth/user/entities/user.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Address {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  street1: string;

  @Column('text', { nullable: true })
  street2: string;

  @Column('text')
  neighborhood: string;

  @Column('text')
  city: string;

  @Column('text')
  state: string;

  @Column('text')
  postalCode: string;

  @OneToOne(() => User, (user) => user.address, {
    onDelete: 'CASCADE',
  })
  user: User;
}
