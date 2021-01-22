import React from 'react'
import Paper from '@material-ui/core/Paper'
import Error from '../nav/error/Error'
import NotFound from '../nav/error/NotFound'
import Loading from '../nav/error/Loading'
import AddMerchantDataContainer from './AddMerchantDataContainer'
import { Product } from '../product/Product.type'
import SingleMerchantData from './SingleMerchantData'
import { MERCHANT_DATAS_QUERY } from './GraphQL'
import { useQuery } from '@apollo/react-hooks'

type Props = {
  variables: any
  product: Product
}

const MerchantDatas = (props: Props) => {
  const { loading, error, data } = useQuery(MERCHANT_DATAS_QUERY, {
    variables: props.variables,
  })

  if (error) return <Error message={error.graphQLErrors.length && error.graphQLErrors[0].message} />
  if (loading) return <Loading />

  if (!data.merchantDatas) return <NotFound />

  return (
    <div className="paperOut">
      <Paper className="paperIn">
        <h3>{`Merchant Data (admin)`}</h3>
        {data.merchantDatas.map((merchantData) => (
          <div key={merchantData.id}>
            <SingleMerchantData product={props.product} merchantData={merchantData} />
          </div>
        ))}
        <br />
        <AddMerchantDataContainer product={props.product} />
      </Paper>
    </div>
  )
}

export default MerchantDatas
