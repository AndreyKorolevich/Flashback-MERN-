import React from 'react'
import { CardMedia } from '@material-ui/core'
import styles from './ScssPostPhotos.module.scss'
import Carousel from 'react-material-ui-carousel'
import { SelectedFileType } from '../../../Form/Form'

type PostPhotosType = {
  selectedFile: SelectedFileType
}

const PostPhotos: React.FC<PostPhotosType> = ({ selectedFile }) => {
  return (
    <Carousel
      indicators={false}
      animation={'slide'}
      autoPlay={false}
      cycleNavigation={true}
      navButtonsProps={{
        style: {
          padding: '0.2rem'
        }
      }}>
      {
        selectedFile.map((item, i) => <CardMedia key={i} className={styles.media} image={item as string}/>)
      }
    </Carousel>
  )
}

export default PostPhotos