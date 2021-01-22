import React, { useContext } from 'react'
import { AppContext } from '../../AppContext'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import { Link } from 'react-router-dom'
import { Context } from '../../Context.type'
// import { useLocation } from 'react-router-dom'
// const queryString = require('query-string')

type Props = {
  productId: string
}

const ToggleSellerView = (props: Props) => {
  const { context }: { context: Context } = useContext(AppContext)
  // const location = useLocation()
  // const parsed = queryString.parse(location.search)

  return (
    <>
      <Divider />
      <div style={{ height: '10px' }} />
      {context.modeContext === 'seller' ? (
        <Link to={`/?modeContext=buyer`}>
          <Button color="default" variant="outlined">
            Buyer Dashboard
          </Button>
        </Link>
      ) : (
        <Link to={`/product/${props.productId}?modeContext=seller`}>
          <Button color="default" variant="outlined">
            Seller Dashboard
          </Button>
        </Link>
      )}
    </>
  )
}

export default ToggleSellerView
