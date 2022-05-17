import React, { useCallback, useEffect, useMemo, useState } from 'react'
import styles from './ScssDropZone.module.scss'
import { FileWithPath, useDropzone } from 'react-dropzone'
import FileList from './FileList/FileList'
import { PostFormDataInterface } from '../Form/Form'

type DropZoneType = {
  onChange: (files: string, postData: PostFormDataInterface) => void
  postData: PostFormDataInterface
  fileField: boolean
  resetFileField: (value: boolean) => void
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

const DropZone: React.FC<DropZoneType> = ({ onChange, postData, fileField, resetFileField }) => {
  const [myFiles, setMyFiles] = useState<FileWithPath[]>([])
  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject
  } = useDropzone({ onDrop: files => onUploadFile(files, postData) })


  useEffect(() => {
    if (fileField) {
      removeAll()
      resetFileField(false)
    }

  }, [fileField])

  const onUploadFile = useCallback((acceptedFiles: FileWithPath[], postData: PostFormDataInterface) => {
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
  }

  const removeAll = () => {
    setMyFiles([])
  }

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isFocused ? focusedStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isFocused,
    isDragAccept,
    isDragReject
  ])

  return (
    <section className={styles.section}>
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <p>Drag files here or click</p>
      </div>
      <FileList acceptedFiles={myFiles} removeFile={removeFile}/>
    </section>
  )
}

export default DropZone