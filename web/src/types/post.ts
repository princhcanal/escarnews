import { User } from './user';

export interface Post {
  id: string;
  title: string;
  content: string;
  author: User;
  imageUrl?: string;
}
