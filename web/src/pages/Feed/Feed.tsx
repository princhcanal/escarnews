import { useEffect, useState } from 'react';
import styles from './Feed.module.css';

import { axiosInstance as axios } from '../../axios';
import { Post } from '../../components/Post/Post';
import { Modal } from '../../components/Modal/Modal';
import { CreatePostForm } from './CreatePostForm/CreatePostForm';
import { Post as PostType } from '../../types/post';
import { PostSkeleton } from '../../components/Skeleton/PostSkeleton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

export const Feed = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [fetchedPosts, setFetchedPosts] = useState<boolean>(false);
  const [showCreatePost, setShowCreatePost] = useState<boolean>(false);
  const [refreshPosts, setRefreshPosts] = useState<boolean>(false);

  const iconSize = '3x';

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
  }, [refreshPosts]);

  const handleCreatePost = () => {
    setShowCreatePost(true);
  };

  const handleSetShow = (showCreatePost: boolean) => {
    setShowCreatePost(showCreatePost);
  };

  const handleRefreshPosts = () => {
    setRefreshPosts((prev) => !prev);
    setShowCreatePost(false);
  };

  const feedPosts = posts.map((post) => {
    return <Post key={post.id} post={post} refresh={handleRefreshPosts} />;
  });

  return (
    <div className={styles.Feed}>
      <div className={styles.container}>
        {posts.length > 0 ? (
          feedPosts
        ) : fetchedPosts ? (
          'No posts found'
        ) : (
          <PostSkeleton />
        )}
      </div>
      <button className={styles.createPost} onClick={handleCreatePost}>
        <FontAwesomeIcon icon={faPlus} size={iconSize} />
      </button>
      <Modal show={showCreatePost} handleSetShow={handleSetShow}>
        <CreatePostForm refresh={handleRefreshPosts} />
      </Modal>
    </div>
  );
};
