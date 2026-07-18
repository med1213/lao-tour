import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
@Entity('places') export class Place {
  @PrimaryGeneratedColumn() id: number;
  @Column() title: string;
  @Column({ unique: true }) slug: string;
  @Column('text') excerpt: string;
  @Column('text') description: string;
  @Column() province: string;
  @Column() category: string;
  @Column() image: string;
  @Column({ default: 'published' }) status: 'draft' | 'published';
  @Column({ type: 'decimal', precision: 10, scale: 7, nullable: true }) latitude?: number;
  @Column({ type: 'decimal', precision: 10, scale: 7, nullable: true }) longitude?: number;
  @CreateDateColumn() createdAt: Date;
  @UpdateDateColumn() updatedAt: Date;
}

