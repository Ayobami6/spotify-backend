import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'Username132',
    description: 'Please Provide your username',
  })
  @Column({ unique: true })
  username: string;

  @ApiProperty({
    example: 'Password134',
    description: 'Please Provide your password',
  })
  @Column()
  @Exclude({ toPlainOnly: true })
  password: string;

  @Column({ nullable: true, type: 'text' })
  twoFASecret: string;

  @Column({ default: false, type: 'boolean' })
  enable2FA: boolean;

  @Column({ nullable: true })
  apiKey: string;

  @Column({ nullable: true })
  apiSecret: string;
}
