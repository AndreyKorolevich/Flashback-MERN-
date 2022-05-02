import React from 'react'
import { Pagination, PaginationItem } from '@material-ui/lab'
import styles from './ScssPaginate.module.scss'
import { Link } from 'react-router-dom'

type PaginationType = {}

const Paginate: React.FC<PaginationType> = () => {
  return (
    <Pagination count={5}
                className={styles.pagination}
                page={1}
                variant={'outlined'}
                color={'primary'}
                renderItem={(item) => (<PaginationItem
                    {...item}
                    component={Link}
                    to={`/posts?page=${1}`}/>)}
    />
  )
}

export default Paginate