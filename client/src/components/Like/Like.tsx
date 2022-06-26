import React from 'react'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt'
import { useAppSelector } from '../../hooks/hooks'
import { UserType } from '../../actions/userAction'
import { getUserDataSelector } from '../../selectors/postsSelectors'

type LikesType = {
  likes: Array<string>
}


const Likes: React.FC<LikesType> = ({ likes }) => {
  const user = useAppSelector<UserType | null>(getUserDataSelector)

  if (likes.length > 0) {
    return likes.find((like) => like === (user?.googleId || user?._id))
      ? (
        <>
          <ThumbUpAltIcon fontSize="small"/>
          &nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}`}
        </>
      ) : (
        <>
          <ThumbUpOffAltIcon
            fontSize="small"/>&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}
        </>
      )
  }

  return <><ThumbUpOffAltIcon fontSize="small"/>&nbsp;Like</>
}

export default Likes