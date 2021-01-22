import React from 'react'

// import TabCategories from './___TabCategories'
import MarketplaceBtoBContent from './MarketplaceBtoBContent'
import { useParams } from 'react-router'
import { ParamTypes } from '../../../ParamTypes.type'

const MarketplaceBtoBPage = () => {
  // const match = useRouteMatch()

  const params = useParams<ParamTypes>()

  return (
    <>
      {/* <TabCategories /> */}
      <MarketplaceBtoBContent urlName={params.urlName} />
    </>
  )
}

export default MarketplaceBtoBPage
