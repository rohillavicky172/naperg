import React, { useContext } from 'react'
import { AppContext } from '../../../AppContext'
import { Context } from '../../../Context.type'
import { useQuery } from '@apollo/react-hooks'
import ImageTemplate from '../../../nav/ImageTemplate'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import { COMPANIE_QUERY } from '../../../companie/GraphQL'
import NotFound from '../../../nav/error/NotFound'
import Loading from '../../../nav/error/Loading'
import Error from '../../../nav/error/Error'
import Icon from '@material-ui/core/Icon'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import { Product } from '../../Product.type'
import '../Style.css'
// import TrackingLink from '../../../trackingLink/TrackingLink'
import LinkCreateAnalytic from '../../../analytic/LinkCreateAnalytic'
// import { useHistory } from 'react-router-dom'
// import Badge from '@material-ui/core/Badge'
// import { Promotion } from '../../../promotion/Promotion.type'

type Props = {
  product: Product
}

const ProductPageHeader = (props: Props) => {
  // const history = useHistory()

  const { context }: { context: Context } = useContext(AppContext)
  const companieId = context.userRoleCompanie.companie.id
  const { loading, error, data } = useQuery(COMPANIE_QUERY, {
    variables: {
      where: {
        id: companieId,
      },
    },
  })

  if (error) return <Error message={error.graphQLErrors.length && error.graphQLErrors[0].message} />
  if (loading) return <Loading />
  if (!data) return <NotFound />

  const isUserOwner = Boolean(data.companie.ownedProducts.filter((product) => product.id === props.product.id).length)

  return (
    <>
      <div className="paperOut">
        <Paper className="paperIn">
          <Grid container>
            <Grid item xs={12} className="tac">
              {context.me.role === 'ADMIN' && <>id: {props.product.id}</>}
              <ImageTemplate format={'medium'} nameFile={props.product.nameFile} />
              <h1>
                {props.product.name}{' '}
                {/* {isUserOwner && (
                  <Link to={`/productEdit/${props.product.id}`}>
                    <Button>
                      <Icon id={'editProductButton'}>border_color</Icon>
                    </Button>
                  </Link>
                )} */}
              </h1>
              {(isUserOwner || context.me.role === 'ADMIN') && (
                <a target="_blank" rel="noopener noreferrer" href={`https://nachonacho.com/product/${props.product.urlName}`}>
                  <Button variant="outlined" color={'primary'}>
                    <Icon>open_in_new</Icon>
                    <span className="white">__</span> View in Marketplace
                  </Button>
                </a>
              )}
            </Grid>
            <Grid item xs={12} className="tac">
              <div className="marginAuto">
                {props.product.sellerLink && (
                  <LinkCreateAnalytic productId={props.product.id} urlTo={props.product.sellerLink}>
                    <Button color="secondary">
                      <span className="textSize12">{`Website`}</span> <Icon className="textSize11">launch</Icon>
                    </Button>
                  </LinkCreateAnalytic>
                )}
              </div>
            </Grid>
            <br />
            <br />
          </Grid>
        </Paper>
      </div>
      {context.me.role === 'ADMIN' && (
        <div className="paperOut">
          <Paper className="paperIn">
            <h3>Admin Links</h3>
            <Link to={`/admin/productEdit/${props.product.id}`}>
              <Button variant="outlined" color={'primary'}>
                Admin Edit
              </Button>
            </Link>{' '}
            <Link to={`/ruleMerchantDatas?productId=${props.product.id}`}>
              <Button variant="outlined" color={'primary'}>
                ruleMerchantDatas
              </Button>
            </Link>{' '}
            <Link to={`/admin/product/${props.product.id}`}>
              <Button variant="outlined" color={'primary'}>
                Admin View
              </Button>
            </Link>{' '}
            <Link to={`/product/${props.product.id}`}>
              <Button variant="outlined" color={'primary'}>
                User VIEW
              </Button>
            </Link>{' '}
            <Link to={`/admin/analytics/?productId=${props.product.id}`}>
              <Button variant="outlined" color={'primary'}>
                analytic
              </Button>
            </Link>{' '}
            <Link to={`/trackingLinks/?productId=${props.product.id}`}>
              <Button variant="outlined" color={'primary'}>
                trackingLinks (deprecated)
              </Button>
            </Link>{' '}
            <Link to={'/createReview/' + props.product.id}>
              <Button color={'primary'} variant="outlined">
                + Review
              </Button>
            </Link>{' '}
            <Link className="link" to={'/logs?productId=' + props.product.id}>
              <Button variant="outlined" color={'primary'}>
                Logs{' '}
              </Button>
            </Link>{' '}
            <Link to={`/admin/merchantDatas/?productId=${props.product.id}`}>
              <Button variant="outlined" color={'primary'}>
                merchantDatas
              </Button>
            </Link>{' '}
            <Link to={`/seller/reviewRequest/${props.product.id}`}>
              <Button variant="outlined" color={'primary'}>
                reviewRequest
              </Button>
            </Link>
          </Paper>
        </div>
      )}
    </>
  )
}

export default ProductPageHeader
