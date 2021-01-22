import React from 'react'
import FormControl from '@material-ui/core/FormControl'
import Icon from '@material-ui/core/Icon'
import Input from '@material-ui/core/Input'
import InputAdornment from '@material-ui/core/InputAdornment'
import { useHistory, useLocation } from 'react-router-dom'

type Props = {
  searchPlaceholder: string
}

const SearchFilter = (props: Props) => {
  const history = useHistory()
  const location = useLocation()
  const queryString = require('query-string')
  const parsed = queryString.parse(location.search)
  const [search, setSearch] = React.useState(parsed.search ? parsed.search : '')

  // useEffect(() => {
  //   const parsedSearch = parsed.search ? parsed.search : ''
  //   if (parsedSearch !== search) setSearch(parsedSearch)
  // }, [parsed, search])

  return (
    <>
      <FormControl className="width100per">
        <Input
          placeholder={props.searchPlaceholder}
          startAdornment={
            <InputAdornment position="start">
              <Icon>search</Icon>
            </InputAdornment>
          }
          endAdornment={
            <InputAdornment position="end">
              {parsed.search ? (
                <Icon
                  className="cursor"
                  onClick={() => {
                    setSearch('')
                    delete parsed.search
                    delete parsed.page
                    history.push('?' + queryString.stringify(parsed))
                  }}>
                  clear
                </Icon>
              ) : (
                <></>
              )}
            </InputAdornment>
          }
          id="searchNachoNacho"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
          type="text"
          onKeyPress={(data) => {
            if (data.charCode === 13) {
              parsed.search = search
              delete parsed.page
              history.push('?' + queryString.stringify(parsed))
            }
          }}
          value={search}
        />
      </FormControl>
    </>
  )
}

export default SearchFilter
