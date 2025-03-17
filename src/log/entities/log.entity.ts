import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('logs')
export class Log {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  action: string;

  @Column('text')
  details: string;

  @Column()
  userId: string;

  @CreateDateColumn()
  createdAt: Date;
}