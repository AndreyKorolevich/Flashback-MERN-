import React from 'react'
import { Pagination, PaginationItem } from '@material-ui/lab'
import styles from './ScssPaginate.module.scss'
import { Link, useLocation } from 'react-router-dom'
import { useAppSelector } from '../../hooks/hooks'
import { getNumberOfPagesSelector } from '../../selectors/postsSelectors'

const useQuery = () => {
  return new URLSearchParams(useLocation().search)
}

const Paginate: React.FC<unknown> = () => {
  const numberOfPages = useAppSelector(getNumberOfPagesSelector)
  const query = useQuery()
  const page = Number(query.get('page')) || 1
  return (
    <Pagination count={numberOfPages}
                className={styles.pagination}
                page={page}
                variant={'outlined'}
                color={'primary'}
                renderItem={(item) => (<PaginationItem
                  {...item}
                  component={Link}
                  to={`/posts?page=${item.page}`}/>)}
    />
  )
}

export default Paginate