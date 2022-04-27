import * as React from 'react'
import styles from './ScssFileList.module.scss'
import { FileWithPath } from 'react-dropzone'
import ImageIcon from '@mui/icons-material/Image'
import { Avatar, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material'


type FileListType = {
  acceptedFiles: Array<FileWithPath>
}

const FileList: React.FC<FileListType> = ({ acceptedFiles }) => {
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
            <ListItemText secondary={file.path}/>
          </ListItem>
        ))}
      </List>
    </aside>
  )
}

export default FileList
