import { useEffect, useState } from 'react';
import styles from './Profile.module.css';

import { axiosInstance as axios } from '../../axios';
import { Post as PostType } from '../../types/post';
import { Post } from '../../components/Post/Post';
import { useParams } from 'react-router';

export const Profile = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [fetchedPosts, setFetchedPosts] = useState<boolean>(false);
  const [refreshPosts, setRefreshPosts] = useState<boolean>(false);

  const { username } = useParams<{ username: string }>();

  useEffect(() => {
    const getUserPosts = async () => {
      setFetchedPosts(false);
      setPosts([]);

      const posts = (await axios.get<PostType[]>(`/posts/username/${username}`))
        .data;
      setPosts(posts);
      setFetchedPosts(true);
    };
    getUserPosts();
  }, [username, refreshPosts]);

  const handleRefreshPosts = () => {
    setRefreshPosts((prev) => !prev);
  };

  const userPosts = posts.map((post) => (
    <Post key={post.id} post={post} refresh={handleRefreshPosts} />
  ));

  return (
    <div className={styles.Profile}>
      <div className={styles.container}>
        <h1 className={styles.username}>@{username}</h1>
        {posts.length > 0
          ? userPosts
          : fetchedPosts
          ? 'No posts found'
          : 'Loading...'}
      </div>
    </div>
  );
};
