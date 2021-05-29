import { Category } from 'src/categories/category.entity';
import { User } from 'src/users/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  public id: number;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  @Column()
  public title: string;

  @Column()
  public content: string;

  @Column({ nullable: true })
  public imageUrl: string;

  @Column({ nullable: true })
  public cloudinaryPublicId: string;

  @ManyToMany(() => Category, (category: Category) => category.posts)
  @JoinTable()
  public categories: Category[];

  @ManyToOne(() => User, (author: User) => author.posts, {
    eager: true,
  })
  public author: User;
}
