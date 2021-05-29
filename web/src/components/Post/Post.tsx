import styles from './Post.module.css';

import { axiosInstance as axios } from '../../axios';
import { useState } from 'react';
import { Modal } from '../Modal/Modal';
import { EditPostForm } from './EditPostForm/EditPostForm';
import { Post as PostType } from '../../types/post';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

interface PostProps {
  post: PostType;
  refresh: () => void;
}

export const Post = (props: PostProps) => {
  const [deleteDisabled, setDeleteDisabled] = useState<boolean>(false);
  const [showEditPost, setShowEditPost] = useState<boolean>(false);
  const iconSize = '2x';

  const userId = useSelector<RootState, string>((state) => state.auth.userId);
  const isOwner = props.post.author.id === userId;

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
    <div className={styles.actions}>
      <button onClick={handleEdit} className={styles.icon}>
        <FontAwesomeIcon icon={faEdit} size={iconSize} />
      </button>
      <button
        onClick={handleDelete}
        disabled={deleteDisabled}
        className={styles.icon}
      >
        <FontAwesomeIcon icon={faTrash} size={iconSize} />
      </button>
      <Modal show={showEditPost} handleSetShow={handleSetShow}>
        <EditPostForm refresh={handleRefreshPosts} post={props.post} />
      </Modal>
    </div>
  );

  return (
    <div
      className={styles.Post}
      style={{ paddingRight: !isOwner ? '1rem' : '' }}
    >
      <div className={styles.main}>
        <div className={styles.post}>
          <h1 className={styles.postTitle}>{props.post.title}</h1>
          <p className={styles.postContent}>{props.post.content}</p>
          {props.post.imageUrl && (
            <img
              src={props.post.imageUrl}
              className={styles.postImage}
              alt='Post'
            />
          )}
        </div>
        {isOwner && updateActions}
      </div>
      <div className={styles.footer}>
        <Link
          to={`/profile/${props.post.author.username}`}
          className={styles.profileLink}
        >
          <p className={styles.profileLinkText}>
            @{props.post.author.username}
          </p>
          <img
            src={props.post.author.profilePictureUrl || '/profile_picture.png'}
            alt=''
            className={styles.profilePicture}
          />
        </Link>
      </div>
    </div>
  );
};
