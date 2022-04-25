import React, { useMemo } from 'react'
import styles from './ScssDropZone.scss'
import { FileWithPath, useDropzone } from 'react-dropzone'

type DropZoneType = {
  onChange: (files: string) => void
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

  const onUploadFile = (files: any) => {
    const base64 = window.btoa(files.path)
    console.log(base64)
    onChange('')
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

  const files = acceptedFiles.map((file: FileWithPath) => (
    <li key={file.path}>{file.path}</li>
  ))

  return (
    <section className={styles.section}>
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <p>Drag files here or click</p>
      </div>
      <aside>
        <ul>{files}</ul>
      </aside>
    </section>
  )
}

export default DropZone