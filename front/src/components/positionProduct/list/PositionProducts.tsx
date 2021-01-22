import React from 'react'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { useQuery } from '@apollo/react-hooks'
import Error from '../../nav/error/Error'
import NotFound from '../../nav/error/NotFound'
import Loading from '../../nav/error/Loading'
import { POSITION_PRODUCTS_QUERY } from '../GraphQL'
import DeletePositionProduct from '../DeletePositionProduct'

type Props = {
  variables: any
}

const PositionProducts = (props: Props) => {
  const { loading, error, data } = useQuery(POSITION_PRODUCTS_QUERY, {
    variables: props.variables,
  })

  if (error) return <Error message={error.graphQLErrors.length && error.graphQLErrors[0].message} />
  if (loading) return <Loading />
  if (!data.positionProductsConnection) return <NotFound />

  return (
    <div>
      {data.positionProductsConnection.edges.map((positionProductNode) => (
        <Grid container key={positionProductNode.node.id}>
          <Grid item xs={12} sm={12} className="">
            <div className="paperOut">
              <Paper className="paperIn">
                <DeletePositionProduct positionProduct={positionProductNode.node} />{' '}
                {positionProductNode.node.categorieProduct.name}
              </Paper>
            </div>
          </Grid>
        </Grid>
      ))}
      <br />
    </div>
  )
}

export default PositionProducts
