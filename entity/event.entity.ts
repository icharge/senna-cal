import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'event' })
export class EventEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  allDay!: boolean;

  @Column()
  title!: string;

  @Column({ nullable: true })
  memo!: string;

  @Column({ type: 'datetime' })
  start!: Date;

  @Column({ type: 'datetime' })
  end!: Date;
}
