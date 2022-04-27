import React, { useCallback, useMemo } from 'react'
import styles from './ScssDropZone.module.scss'
import { FileWithPath, useDropzone } from 'react-dropzone'
import FileList from './FileList/FileList'

type DropZoneType = {
  onChange: (files: string | ArrayBuffer | null) => void
}

const DropZone: React.FC<DropZoneType> = ({ onChange }) => {
  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject
  } = useDropzone({ onDrop: files => onUploadFile(files) })

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

  const onUploadFile = useCallback((acceptedFiles: FileWithPath[]) => {
    acceptedFiles.forEach((file: FileWithPath) => {
      const reader = new FileReader()

      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.error('file reading has failed')
      reader.onload = () => {

        const binaryStr = reader.result
        onChange(binaryStr)
      }
      reader.readAsDataURL(file)
    })

  }, [])


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
      <FileList acceptedFiles={acceptedFiles}/>
    </section>
  )
}

export default DropZone