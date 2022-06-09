import React, { useContext, useState } from 'react'
import styles from './ScssRecommendationPosts.module.scss'
import { VisibilityContext } from 'react-horizontal-scrolling-menu'
import { Button } from '@material-ui/core'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import classname from 'classnames'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'

type RightArrowType = {
  isLeft: boolean
}


const Arrow: React.FC<RightArrowType> = ({ isLeft }) => {
  const { isLastItemVisible, isFirstItemVisible, getPrevItem, getNextItem, scrollToItem } = useContext(VisibilityContext)
  const [isShowButton, setIsShowButton] = useState<boolean>(false)

  const clickHandler = () => {
    const item = isLeft ? getPrevItem() : getNextItem()
    scrollToItem(item?.entry?.target, 'smooth', 'end')
  }

  const onMouseEnterHandler = () => {
    setIsShowButton(true)
  }

  const onMouseLeaveHandler = () => {
    setIsShowButton(false)
  }


  return (
    <div className={classname(styles.buttonWrap, { [styles.arrowRight]: !isLeft, [styles.arrowLeft]: isLeft })}
         onMouseEnter={onMouseEnterHandler} onMouseLeave={onMouseLeaveHandler}>
      <Button className={classname(styles.arrow, { [styles.buttonIsVisible]: isShowButton })}
              disabled={isLeft ? isFirstItemVisible : isLastItemVisible} size={'small'}
              onClick={clickHandler}>
        {isLeft ? <ArrowBackIosIcon fontSize={'small'}/> : <ArrowForwardIosIcon fontSize={'small'}/>}
      </Button>
    </div>
  )
}

export default Arrow