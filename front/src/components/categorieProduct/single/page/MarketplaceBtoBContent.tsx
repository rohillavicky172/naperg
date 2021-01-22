import React from 'react'
import CategorieProductDetails from './CategorieProductDetails'

type Props = {
  urlName: string
}

const MarketplaceBtoBContent = (props: Props) => {
  return <CategorieProductDetails urlName={props.urlName} />
}

export default MarketplaceBtoBContent
