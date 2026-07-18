import { Column, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';

@Entity('content')
export class Content {
  @PrimaryColumn() key: string;
  @Column('json') data: Record<string, any>;
  @UpdateDateColumn() updatedAt: Date;
}

