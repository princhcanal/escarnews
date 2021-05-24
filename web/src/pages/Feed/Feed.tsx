import { useEffect, useState } from 'react';
import styles from './Feed.module.css';

import { axiosInstance as axios } from '../../axios';
import { Post } from '../../components/Post/Post';
import { Modal } from '../../components/Modal/Modal';
import { CreatePostForm } from './CreatePostForm/CreatePostForm';
import { Post as PostType } from '../../types/post';

export const Feed = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [fetchedPosts, setFetchedPosts] = useState<boolean>(false);
  const [showCreatePost, setShowCreatePost] = useState<boolean>(false);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const posts = (await axios.get<PostType[]>('/posts')).data;
        setPosts(posts);
      } catch (e) {
        console.log(e);
      } finally {
        setFetchedPosts(true);
      }
    };
    getPosts();
  }, []);

  const feedPosts = posts.map((post) => {
    return <Post key={post.id} {...post} />;
  });

  const handleCreatePost = () => {
    setShowCreatePost(true);
  };

  const handleSetShow = (showCreatePost: boolean) => {
    setShowCreatePost(showCreatePost);
  };

  return (
    <div className={styles.Feed}>
      <div className={styles.container}>
        {posts.length > 0
          ? feedPosts
          : fetchedPosts
          ? 'No posts found'
          : 'Loading...'}
      </div>
      <button className={styles.createPost} onClick={handleCreatePost}>
        Create Post
      </button>
      <Modal show={showCreatePost} handleSetShow={handleSetShow}>
        <CreatePostForm />
      </Modal>
    </div>
  );
};
