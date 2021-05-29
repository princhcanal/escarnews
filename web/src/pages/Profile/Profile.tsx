import { useEffect, useState } from 'react';
import styles from './Profile.module.css';

import { useSelector } from 'react-redux';

import { axiosInstance as axios } from '../../axios';
import { RootState } from '../../store';
import { Post as PostType } from '../../types/post';
import { Post } from '../../components/Post/Post';

export const Profile = () => {
  const { username, userId } = useSelector<
    RootState,
    { username: string; userId: string }
  >((state) => ({ username: state.auth.username, userId: state.auth.userId }));

  const [posts, setPosts] = useState<PostType[]>([]);
  const [fetchedPosts, setFetchedPosts] = useState<boolean>(false);
  const [refreshPosts, setRefreshPosts] = useState<boolean>(false);

  useEffect(() => {
    const getUserPosts = async () => {
      const posts = (await axios.get<PostType[]>(`/posts/user/${userId}`)).data;
      setPosts(posts);
      setFetchedPosts(true);
    };
    getUserPosts();
  }, [userId, refreshPosts]);

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
