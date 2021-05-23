import styles from './Post.module.css';

interface PostProps {
  id: string;
  title: string;
  content: string;
  author: {
    id: string;
    email: string;
    username: string;
  };
}

export const Post = (props: PostProps) => {
  return (
    <div className={styles.Post}>
      <p>{props.title}</p>
      <p>{props.content}</p>
      <p>{props.author.username}</p>
    </div>
  );
};
