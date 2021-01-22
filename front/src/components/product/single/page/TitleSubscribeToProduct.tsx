import React, { useContext } from 'react'
import { AppContext } from '../../../AppContext'
import { Context } from '../../../Context.type'
import { useQuery } from '@apollo/react-hooks'
import { PRODUCT_QUERY } from '../../GraphQL'
import NotFound from '../../../nav/error/NotFound'
import Error from '../../../nav/error/Error'
import Loading from '../../../nav/error/Loading'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import ImageTemplate from '../../../nav/ImageTemplate'

interface Props {
  productId: string
}

const TitleSubscribeToProduct = (props: Props) => {
  const { context }: { context: Context } = useContext(AppContext)

  const { loading, error, data } = useQuery(PRODUCT_QUERY, {
    variables: {
      where: {
        id: props.productId
      }
    }
  })

  if (error) {
    return <Error message={error.graphQLErrors.length && error.graphQLErrors[0].message} />
  }
  if (loading) {
    return <Loading />
  }
  if (!data) {
    return <NotFound />
  }

  return (
    <>
      <div className="paperOut">
        <Paper className="paperIn">
          <Grid container>
            <Grid item xs={12} sm={2} md={1} className="marginAuto tac">
              <ImageTemplate format="verySmall" nameFile={data.product.nameFile} />
            </Grid>
            <Grid item xs={12} sm={10} md={11} className="marginAuto">
              <h3>
                You are now subscribing to {data.product.name} for {context.userRoleCompanie.companie.name}
              </h3>
            </Grid>
          </Grid>
        </Paper>
      </div>
    </>
  )
}

export default TitleSubscribeToProduct
