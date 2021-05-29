import styles from './Post.module.css';

import { axiosInstance as axios } from '../../axios';
import { useState } from 'react';
import { Modal } from '../Modal/Modal';
import { EditPostForm } from './EditPostForm/EditPostForm';
import { Post as PostType } from '../../types/post';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Link } from 'react-router-dom';

interface PostProps {
  post: PostType;
  refresh: () => void;
}

export const Post = (props: PostProps) => {
  const [deleteDisabled, setDeleteDisabled] = useState<boolean>(false);
  const [showEditPost, setShowEditPost] = useState<boolean>(false);

  const userId = useSelector<RootState, string>((state) => state.auth.userId);

  const handleDelete = async () => {
    setDeleteDisabled(true);
    await axios.delete(`/posts/${props.post.id}`);
    setDeleteDisabled(false);
    props.refresh();
  };

  const handleEdit = async () => {
    setShowEditPost(true);
  };

  const handleSetShow = (showEditPost: boolean) => {
    setShowEditPost(showEditPost);
  };

  const handleRefreshPosts = () => {
    props.refresh();
    setShowEditPost(false);
  };

  const updateActions = (
    <>
      <button onClick={handleEdit}>Edit</button>
      <button onClick={handleDelete} disabled={deleteDisabled}>
        Delete
      </button>
      <Modal show={showEditPost} handleSetShow={handleSetShow}>
        <EditPostForm refresh={handleRefreshPosts} post={props.post} />
      </Modal>
    </>
  );

  return (
    <div className={styles.Post}>
      <p>{props.post.title}</p>
      <p>{props.post.content}</p>
      {props.post.imageUrl && (
        <img src={props.post.imageUrl} className={styles.image} alt='Post' />
      )}
      {props.post.author.id === userId && updateActions}
      <Link to={`/profile/${props.post.author.username}`}>
        @{props.post.author.username}
      </Link>
    </div>
  );
};
