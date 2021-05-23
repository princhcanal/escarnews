import { Category } from 'src/categories/category.entity';
import { User } from 'src/users/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public title: string;

  @Column()
  public content: string;

  @ManyToMany(() => Category, (category: Category) => category.posts)
  @JoinTable()
  public categories: Category[];

  @ManyToOne(() => User, (author: User) => author.posts, {
    eager: true,
  })
  public author: User;
}
