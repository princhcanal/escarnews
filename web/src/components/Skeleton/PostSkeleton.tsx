import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import postStyles from '../Post/Post.module.css';

export const PostSkeleton = () => {
  return (
    <SkeletonTheme color='#bbb' highlightColor='#ccc'>
      <div className={postStyles.Post} style={{ paddingBottom: '1rem' }}>
        <div className={postStyles.main}>
          <div className={postStyles.post}>
            <h1 className={postStyles.postTitle}>
              <Skeleton width={200} height={30} />
            </h1>
            <p className={postStyles.postContent}>
              <Skeleton width={450} height={15} />
            </p>
            <div className={postStyles.postImage}>
              <Skeleton height={500} width={450} />
            </div>
          </div>
          <div className={postStyles.actions}>
            <button className={postStyles.icon} style={{ cursor: 'default' }}>
              <Skeleton height={30} width={30} />
            </button>
            <button className={postStyles.icon} style={{ cursor: 'default' }}>
              <Skeleton height={30} width={30} />
            </button>
          </div>
        </div>
        <div className={postStyles.footer}>
          <div className={postStyles.profileLink}>
            <p
              className={postStyles.profileLinkText}
              style={{ paddingTop: '1rem' }}
            >
              <Skeleton height={15} width={100} />
            </p>
            <div className={postStyles.profilePicture}>
              <Skeleton height={40} width={40} circle />
            </div>
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
};
