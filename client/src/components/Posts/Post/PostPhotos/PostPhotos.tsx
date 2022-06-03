import React from 'react'
import { CardMedia } from '@material-ui/core'
import styles from './ScssPostPhotos.module.scss'
import Carousel from 'react-material-ui-carousel'
import { SelectedFileType } from '../../../Form/Form'
import { DEFAULT_IMAGES } from '../../../../constants'

type PostPhotosType = {
  selectedFile: SelectedFileType | undefined
  onClick?: () => void
}


const PostPhotos: React.FC<PostPhotosType> = ({ selectedFile, onClick }) => {
  const images = selectedFile && selectedFile.length !== 0 ? selectedFile : DEFAULT_IMAGES
  return (
    <Carousel
      className={styles.carousel}
      animation={'slide'}
      autoPlay={false}
      navButtonsAlwaysInvisible={true}>
      {
        images.map((item, i) => <CardMedia onClick={onClick} key={i} className={styles.media} image={item as string}/>)
      }
    </Carousel>
  )
}

export default PostPhotos