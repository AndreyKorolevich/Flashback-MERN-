import React, { useContext } from 'react'
import styles from './ScssRecommendationPosts.module.scss'
import { VisibilityContext } from 'react-horizontal-scrolling-menu'
import { Button } from '@material-ui/core'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import classname from 'classnames'


const RightArrow = () => {
  const { isLastItemVisible, getNextItem, scrollToItem } = useContext(VisibilityContext)

  const clickHandler = () => {
    const nextItem = getNextItem()
    scrollToItem(nextItem?.entry?.target, 'smooth', 'end')
  }

  return (
    <div className={classname(styles.buttonWrap, styles.arrowRight)}>
      <Button className={styles.arrow} disabled={isLastItemVisible} size={'small'}
              onClick={clickHandler}>
        <ArrowForwardIosIcon fontSize={'small'}/>
      </Button>
    </div>
  )
}

export default RightArrow