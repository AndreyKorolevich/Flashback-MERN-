import React, { useEffect } from 'react'
import { CircularProgress, Typography } from '@material-ui/core'
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu'
import styles from './ScssRecommendationPosts.module.scss'
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks'
import { getFetchingRelatedPostsSelector, getRelatedPostsSelector } from '../../../selectors/postsSelectors'
import { getPostsByTagsThunk, PostsResponseDataInterface } from '../../../actions/postsAction'
import { useParams } from 'react-router-dom'
import Post from '../../Posts/Post/Post'
import usePreventBodyScroll from '../../../hooks/usePreventBodyScroll'
import Arrow from './Arrow'

type RecommendationPostsType = {
  post: PostsResponseDataInterface | null
}

type scrollVisibilityApiType = React.ContextType<typeof VisibilityContext>;

const RecommendationPosts: React.FC<RecommendationPostsType> = ({ post }) => {
  const { id } = useParams()
  const dispath = useAppDispatch()
  const isFetchingRelatedPosts = useAppSelector(getFetchingRelatedPostsSelector)
  const relatedPosts = useAppSelector(getRelatedPostsSelector).filter((post) => post._id !== id)
  const { disableScroll, enableScroll } = usePreventBodyScroll();

  useEffect(() => {
    const tags = post?.tags.join(',')
    if (tags) {
      dispath(getPostsByTagsThunk(tags))
    }
  }, [post?.tags.join(',')])

  const onWheel = (apiObj: scrollVisibilityApiType, ev: React.WheelEvent): void => {
    const isThouchpad = Math.abs(ev.deltaX) !== 0 || Math.abs(ev.deltaY) < 15

    if (isThouchpad) {
      ev.stopPropagation()
      return
    }

    if (ev.deltaY < 0) {
      const nextItem = apiObj.getNextItem()
      apiObj.scrollToItem(nextItem?.entry?.target, 'smooth', 'end')
    } else if (ev.deltaY > 0) {
      const prevItem = apiObj.getPrevItem()
      apiObj.scrollToItem(prevItem?.entry?.target, 'smooth', 'start')
    }
  }

  return (
    isFetchingRelatedPosts
      ? <CircularProgress className={styles.progress}/>
      : (<div className={styles.container} onMouseEnter={disableScroll} onMouseLeave={enableScroll}>
        <div className={styles.recomend}>
          <Typography className={styles.title} gutterBottom variant="h5">You might also like</Typography>
        </div>
        {relatedPosts.length > 0 &&
        <ScrollMenu LeftArrow={<Arrow isLeft={true}/>} RightArrow={<Arrow isLeft={false}/>} itemClassName={styles.separator}
                    scrollContainerClassName={styles.scroll} onWheel={onWheel}>
          {relatedPosts.map((post) => (
            <Post {...post} itemId={post._id} key={post._id} showActions={false} showDetails={false}/>
          ))}
        </ScrollMenu>}
      </div>)
  )
}

export default RecommendationPosts