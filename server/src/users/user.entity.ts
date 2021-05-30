import { Exclude } from 'class-transformer';
import { Post } from 'src/posts/post.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column({ unique: true })
  public email: string;

  @Column({ unique: true })
  public username: string;

  @Column()
  @Exclude()
  public password: string;

  @Column({ nullable: true })
  public profilePictureUrl: string;

  @Column({ nullable: true })
  public profilePictureCloudinaryPublicId: string;

  @Column({ nullable: true })
  public coverPhotoUrl: string;

  @Column({ nullable: true })
  public coverPhotoCloudinaryPublicId: string;

  @OneToMany(() => Post, (post: Post) => post.author)
  public posts: Post[];
}
