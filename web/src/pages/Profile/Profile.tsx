import { ChangeEvent, useEffect, useState } from 'react';
import styles from './Profile.module.css';

import { axiosInstance as axios } from '../../axios';
import { Post as PostType } from '../../types/post';
import { Post } from '../../components/Post/Post';
import { useParams } from 'react-router';
import { PostSkeleton } from '../../components/Skeleton/PostSkeleton';
import { FileInput } from '../../components/Form/Input/FileInput/FileInput';
import { User } from '../../types/user';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

export const Profile = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [fetchedPosts, setFetchedPosts] = useState<boolean>(false);
  const [refreshPosts, setRefreshPosts] = useState<boolean>(false);
  const [user, setUser] = useState<User>();
  const [profilePictureUpdating, setProfilePictureUpdating] = useState<boolean>(
    false
  );
  const [coverPhotoUpdating, setCoverPhotoUpdating] = useState<boolean>(false);

  const { username } = useParams<{ username: string }>();
  const currentUsername = useSelector<RootState, string>(
    (state) => state.auth.username
  );
  const isCurrentUser = username === currentUsername;

  useEffect(() => {
    const getUser = async () => {
      const u = (await axios.get<User>(`/users/username/${username}`)).data;
      setUser(u);
    };

    const getUserPosts = async () => {
      setFetchedPosts(false);
      setPosts([]);

      const posts = (await axios.get<PostType[]>(`/posts/username/${username}`))
        .data;
      setPosts(posts);
      setFetchedPosts(true);
    };

    getUser();
    getUserPosts();
  }, [username, refreshPosts]);

  const handleRefreshPosts = () => {
    setRefreshPosts((prev) => !prev);
  };

  const userPosts = posts.map((post) => (
    <Post key={post.id} post={post} refresh={handleRefreshPosts} />
  ));

  const handleProfilePictureOnChange = async (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files[0]) {
      const profilePicture = e.target.files[0];
      const formData = new FormData();
      formData.append('profilePicture', profilePicture);
      setProfilePictureUpdating(true);
      await axios.patch('/users/profile-picture', formData);
      setProfilePictureUpdating(false);
      handleRefreshPosts();
    }
  };

  const handleCoverPhotoOnChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const coverPhoto = e.target.files[0];
      const formData = new FormData();
      formData.append('coverPhoto', coverPhoto);
      setCoverPhotoUpdating(true);
      await axios.patch('/users/cover-photo', formData);
      setCoverPhotoUpdating(false);
      handleRefreshPosts();
    }
  };

  let profilePictureUrl = '/profile_picture.png';

  if (user && user.profilePictureUrl) {
    profilePictureUrl = user.profilePictureUrl;
  }

  let coverPhotoUrl = '';
  if (user && user.coverPhotoUrl) {
    coverPhotoUrl = user.coverPhotoUrl;
  }

  return (
    <div className={styles.Profile}>
      <div className={styles.profileHeader}>
        <div
          className={styles.coverPhoto}
          style={{ backgroundImage: `url(${coverPhotoUrl})` }}
        ></div>
        <div className={styles.profilePictureAndUsername}>
          <div className={styles.profilePictureContainer}>
            <img
              src={profilePictureUrl}
              alt=''
              className={styles.profilePicture}
            />
            {isCurrentUser && (
              <>
                <FileInput
                  name='profilePicture'
                  id='profilePicture'
                  accept='.jpg, .jpeg, .png'
                  onChange={handleProfilePictureOnChange}
                  hidden
                  className={styles.profilePictureFileInput}
                />
                {profilePictureUpdating && (
                  <p className={styles.profilePictureUpdating}>Updating...</p>
                )}
              </>
            )}
          </div>
          <h1 className={styles.username}>@{username}</h1>
        </div>
        {isCurrentUser && (
          <>
            <FileInput
              name='coverPhoto'
              id='coverPhoto'
              accept='.jpg, .jpeg, .png'
              onChange={handleCoverPhotoOnChange}
              hidden
              className={styles.coverPhotoFileInput}
            />
            {coverPhotoUpdating && (
              <p className={styles.coverPhotoUpdating}>Updating...</p>
            )}
          </>
        )}
      </div>
      <div className={styles.container}>
        {posts.length > 0 ? (
          userPosts
        ) : fetchedPosts ? (
          <div className={styles.noPosts}>
            <img src='/empty.png' alt='' className={styles.noPostsImage} />
            <p className={styles.noPostsText}>No posts found :(</p>
          </div>
        ) : (
          <PostSkeleton />
        )}
      </div>
    </div>
  );
};
