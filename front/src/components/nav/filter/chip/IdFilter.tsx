import React from 'react'
import { useHistory } from 'react-router-dom'
import Chip from '@material-ui/core/Chip'
import { useLocation } from 'react-router-dom'
import queryString from 'query-string'

const IdFilter = () => {
  const history = useHistory()
  const location = useLocation()
  const id = queryString.parse(location.search).id
  const onDelete = () => {
    let parsed = queryString.parse(location.search)
    delete parsed.id
    delete parsed.page

    history.push('?' + queryString.stringify(parsed))
  }

  return (
    <>
      <div className="margin2">
        <Chip label={'id: ' + id} onDelete={onDelete} variant="outlined" />
      </div>
    </>
  )
}

export default IdFilter
