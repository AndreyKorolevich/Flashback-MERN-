import React, { useCallback, useEffect, useMemo, useState } from 'react'
import styles from './ScssDropZone.module.scss'
import { FileWithPath, useDropzone } from 'react-dropzone'
import FileList from './FileList/FileList'
import { PostFormDataInterface, SelectedFileType } from '../Form/Form'
import { MAX_PHOTOS } from '../../constants'

type DropZoneType = {
  onChange: (files: string, postData: PostFormDataInterface) => void
  postData: PostFormDataInterface
  fileField: boolean
  resetFileField: (value: boolean) => void
  removeFileFromForm: (postData: PostFormDataInterface, selectedFiles: SelectedFileType) => void
}

const baseStyle = {
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  padding: '5px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out'
}

const focusedStyle = {
  borderColor: '#2196f3'
}

const acceptStyle = {
  borderColor: '#00e676'
}

const rejectStyle = {
  borderColor: '#ff1744'
}

const DropZone: React.FC<DropZoneType> = ({ onChange, postData, fileField, resetFileField, removeFileFromForm }) => {
  const [myFiles, setMyFiles] = useState<FileWithPath[]>([])
  const [isDragReject, setIsDragReject] = useState<boolean>(false)
  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
  } = useDropzone({
    onDrop: files => onUploadFile(files, postData),
    multiple: false
  })


  useEffect(() => {
    if (fileField) {
      removeAll()
      resetFileField(false)
    }
  }, [fileField])

  const onUploadFile = useCallback((acceptedFiles: FileWithPath[], postData: PostFormDataInterface) => {
    if(myFiles.length === MAX_PHOTOS) {
      setIsDragReject(true)
      return
    }

    setMyFiles([...myFiles, ...acceptedFiles])

    acceptedFiles.forEach((file: FileWithPath) => {
      const reader = new FileReader()

      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.error('file reading has failed')
      reader.onload = () => {

        const binaryStr = reader.result
        // @ts-ignore
        onChange(binaryStr, postData)
      }
      reader.readAsDataURL(file)
    })

  }, [myFiles])

  const removeFile = (file: FileWithPath) => {
    const newFiles = [...myFiles]
    newFiles.splice(newFiles.indexOf(file), 1)
    setMyFiles(newFiles)
    removeFileFromForm(postData, newFiles)
  }

  const removeAll = () => {
    setMyFiles([])
  }

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isFocused ? focusedStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject && isFocused ? rejectStyle : {}),
  }), [
    isFocused,
    isDragAccept,
    isDragReject
  ])

  return (
    <section className={styles.section}>
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <div className={styles.message}>
          <span>Drag photos here or click</span>
          <em>(3 photos are the maximum)</em>
        </div>
      </div>
      <FileList acceptedFiles={myFiles} removeFile={removeFile}/>
    </section>
  )
}

export default DropZone