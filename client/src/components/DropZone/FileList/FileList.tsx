import * as React from 'react'
import styles from './ScssFileList.module.scss'
import { FileWithPath } from 'react-dropzone'
import ImageIcon from '@mui/icons-material/Image'
import { Avatar, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material'
import { IconButton } from '@material-ui/core'
import DeleteIcon from '@mui/icons-material/Delete'


type FileListType = {
  acceptedFiles: Array<FileWithPath>
  removeFile: (file: FileWithPath) => void
}

const FileList: React.FC<FileListType> = ({ acceptedFiles, removeFile }) => {
  const onClick = (file: FileWithPath) => {
    removeFile(file)
  }

  return (
    <aside className={styles.container}>
      <List className={styles.list}>
        {acceptedFiles.map((file: FileWithPath) => (
          <ListItem key={file.path} className={styles.item}>
            <ListItemAvatar className={styles.itemAvatar}>
              <Avatar className={styles.avatar}>
                <ImageIcon className={styles.icon}/>
              </Avatar>
            </ListItemAvatar>
            <ListItemText className={styles.itemText} secondary={file.path}/>
            <IconButton aria-label={'delete'} size={'small'} onClick={() => onClick(file)}>
              <DeleteIcon fontSize={'inherit'}/>
            </IconButton>
          </ListItem>
        ))}
      </List>
    </aside>
  )
}

export default FileList
