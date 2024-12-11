import { Address } from '@auth/address/entities/address.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserRoles } from '@auth/auth/types';
// import { Product } from '@src/product/entities/product.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { unique: true })
  email: string;

  @Column('text', {
    select: false,
  })
  password: string;

  @Column('bool', {
    default: false,
  })
  emailConfirmed: boolean;

  @Column('text')
  fullName: string;

  @Column('bool', { default: true })
  isActive: boolean;

  @Column('enum', {
    enum: UserRoles,
    array: true,
    default: [UserRoles.USER],
  })
  roles: string[];

  @Column('varchar', { nullable: true })
  phone: string;

  @OneToOne(() => Address, (address) => address.user, { eager: true })
  @JoinColumn()
  address: Address;

  // @OneToMany(() => Product, (product) => product.user, { nullable: true })
  // products: Product[];

  @BeforeInsert()
  emailToLowerCase() {
    this.email = this.email.toLowerCase().trim();
  }

  @BeforeUpdate()
  emailToLowerCaseOnUpdate() {
    this.emailToLowerCase();
  }
}
