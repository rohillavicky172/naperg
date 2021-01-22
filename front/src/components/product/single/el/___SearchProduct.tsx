import React, { useState } from 'react'
import FormControl from '@material-ui/core/FormControl'
import Icon from '@material-ui/core/Icon'
import Input from '@material-ui/core/Input'
import InputAdornment from '@material-ui/core/InputAdornment'
import { useHistory, useLocation } from 'react-router-dom'

const SearchProduct = () => {
  const history = useHistory()
  const location = useLocation()
  const queryString = require('query-string')
  const parsed = queryString.parse(location.search)
  const [productName, setProductName] = useState(parsed.productName ? parsed.productName : '')

  return (
    <>
      <div>
        <FormControl style={{ marginTop: '10px' }} className="inputWidth">
          <Input
            startAdornment={
              <InputAdornment position="start">
                <Icon style={{ color: 'rgba(0, 0, 0, 0.54)' }}>search</Icon>
              </InputAdornment>
            }
            endAdornment={
              <InputAdornment position="end">
                {parsed.productName && (
                  <Icon
                    className="cursor"
                    onClick={() => {
                      setProductName('')
                      history.push('/marketplaceBtoB')
                    }}>
                    clear
                  </Icon>
                )}
              </InputAdornment>
            }
            id="productName"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProductName(e.target.value)}
            type="text"
            onKeyPress={data => {
              if (data.charCode === 13) {
                if (productName) {
                  parsed.productName = productName
                  delete parsed.page
                  history.push('/marketplaceBtoB/search?' + queryString.stringify(parsed))
                } else {
                  history.push('/marketplaceBtoB')
                }
              }
            }}
            value={productName}
          />
        </FormControl>
      </div>
    </>
  )
}

export default SearchProduct
