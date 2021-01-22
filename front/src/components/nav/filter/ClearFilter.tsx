import React from 'react'
import Button from '@material-ui/core/Button'
import { useHistory, useLocation } from 'react-router-dom'

type Props = {
  onClear: () => void
  isFilterSelected: boolean
}

const ClearFilter = (props: Props) => {
  const queryString = require('query-string')
  const location = useLocation()
  const parsed = queryString.parse(location.search)
  const history = useHistory()
  if (!props.isFilterSelected) {
    return null
  }
  return (
    <>
      <Button
        color="default"
        variant="outlined"
        onClick={() => {
          const newParsed = {
            orderBy: parsed.orderBy,
            search: parsed.search
          }
          history.push('?' + queryString.stringify(newParsed))
          props.onClear()
        }}>
        Clear
      </Button>
    </>
  )
}

export default ClearFilter
