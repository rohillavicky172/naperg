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
// import Badge from '@material-ui/core/Badge'
// import { Promotion } from '../../../promotion/Promotion.type'
// import { useHistory } from 'react-router-dom'

type Props = {
  product: Product
}

const ProductPageHeaderAdmin = (props: Props) => {
  // const history = useHistory()

  const { context }: { context: Context } = useContext(AppContext)
  const companieId = context.userRoleCompanie.companie.id
  const { loading, error, data } = useQuery(COMPANIE_QUERY, {
    variables: {
      where: {
        id: companieId
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

  // const isUserOwner = Boolean(data.companie.ownedProducts.filter(product => product.id === props.product.id).length)

  return (
    <>
      <div className="paperOut">
        <Paper className="paperIn">
          <Grid container>
            <Grid item xs={12} className="tac">
              <h1>
                {props.product.name}{' '}
                <Link to={`/admin/productEdit/${props.product.id}`}>
                  <Button>
                    <Icon id={'editProductButton'}>border_color</Icon>
                  </Button>
                </Link>
              </h1>

              <div>
                {`id product (admin): ${props.product.id}`}
                <div style={{ height: '30px' }} />
              </div>
            </Grid>

            <br />
            <br />

            <div className="marginAuto">
              <Grid item xs={1} />
              <Grid item xs={12} sm={3}>
                <div className="imageProduct">
                  <ImageTemplate format={'medium'} nameFile={props.product.nameFile} />
                </div>
                {/* {props.product.promotions.length === 0 ? (
                  <div className="imageProduct">
                    <ImageTemplate format={'medium'} nameFile={props.product.nameFile} />
                  </div>
                ) : (
                  <>
                    {props.product.promotions.map((promotion: Promotion) => (
                      <Badge
                        key={promotion.id}
                        color="secondary"
                        badgeContent={`-${promotion.discount ? promotion.discount : 0}%`}>
                        <div className="imageProduct">
                          <ImageTemplate format={'medium'} nameFile={props.product.nameFile} />
                        </div>
                      </Badge>
                    ))}
                  </>
                )} */}
              </Grid>
              <Grid item xs={1} />
              <Grid item xs={12} sm={7}>
                {/* {context.userRoleCompanie.permissions.includes('canCreateMyIssuedCards') && (
                  <div>
                    <Button
                      variant="outlined"
                      disabled={!isBuyer}
                      color={'secondary'}
                      onClick={() => history.push('/usersAddIssuedCard/' + companieId + '?productId=' + props.product.id)}>
                      Subscribe
                    </Button>
                  </div>
                )} */}
              </Grid>
            </div>

            {/* <Grid item xs={12} className="tac">
              <div className="marginAuto">
                {props.product.sellerLink && (
                  <a className="black" target="_blank" rel="noopener noreferrer" href={props.product.sellerLink}>
                    <Button color="secondary">
                      <span className="textSize12">{`Website`}</span> <Icon className="textSize11">launch</Icon>
                    </Button>
                  </a>
                )}
              </div>
            </Grid> */}
          </Grid>
        </Paper>
      </div>
    </>
  )
}

export default ProductPageHeaderAdmin
