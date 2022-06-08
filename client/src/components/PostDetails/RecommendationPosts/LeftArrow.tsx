import React, { useContext } from 'react'
import { VisibilityContext } from 'react-horizontal-scrolling-menu'
import { Button } from '@material-ui/core'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import classname from 'classnames'
import styles from './ScssRecommendationPosts.module.scss'

const LeftArrow = () => {
  const { isFirstItemVisible, getPrevItem, scrollToItem } = useContext(VisibilityContext)
  const clickHandler = () => {
    const prevItem = getPrevItem()
    scrollToItem(prevItem?.entry?.target, 'smooth', 'start')
  }

  return (
    <div className={classname(styles.buttonWrap, styles.arrowLeft)}>
      <Button className={styles.arrow} disabled={isFirstItemVisible} size={'small'}
              onClick={clickHandler}>
        <ArrowBackIosIcon fontSize={'small'}/>
      </Button>
    </div>
  )
}

export default LeftArrow