import styles from './Post.module.css';

import { axiosInstance as axios } from '../../axios';
import { useState } from 'react';
import { Modal } from '../Modal/Modal';
import { EditPostForm } from './EditPostForm/EditPostForm';
import { Post as PostType } from '../../types/post';

interface PostProps {
  // id: string;
  // title: string;
  // content: string;
  // author: {
  //   id: string;
  //   email: string;
  //   username: string;
  // };
  post: PostType;
  refresh: () => void;
}

export const Post = (props: PostProps) => {
  const [deleteDisabled, setDeleteDisabled] = useState<boolean>(false);
  const [showEditPost, setShowEditPost] = useState<boolean>(false);

  const handleDelete = async () => {
    setDeleteDisabled(true);
    console.log('deleting...');
    await axios.delete(`/posts/${props.post.id}`);
    console.log('deleted');
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

  return (
    <div className={styles.Post}>
      <p>{props.post.title}</p>
      <p>{props.post.content}</p>
      <p>{props.post.author.username}</p>
      <button onClick={handleDelete} disabled={deleteDisabled}>
        Delete
      </button>
      <button onClick={handleEdit}>Edit</button>
      <Modal show={showEditPost} handleSetShow={handleSetShow}>
        <EditPostForm refresh={handleRefreshPosts} post={props.post} />
      </Modal>
    </div>
  );
};
