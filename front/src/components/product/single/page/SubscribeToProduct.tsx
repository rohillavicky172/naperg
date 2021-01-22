import React, { useContext } from 'react'
import { AppContext } from '../../../AppContext'
import { Context } from '../../../Context.type'
import { useQuery } from '@apollo/react-hooks'
import Paper from '@material-ui/core/Paper'
import { Link } from 'react-router-dom'
import NotFound from '../../../nav/error/NotFound'
import Error from '../../../nav/error/Error'
import Loading from '../../../nav/error/Loading'
import { useParams } from 'react-router'
import { PRODUCT_QUERY } from '../../GraphQL'
import TitleSubscribeToProduct from './TitleSubscribeToProduct'
import { issuedCardClass } from '../../../issuedCard/IssuedCard.type'
import { useHistory } from 'react-router-dom'
import CreateIssuedCard from '../../../issuedCard/single/createIssuedCard/CreateIssuedCard'
import IssuedCardDesign from '../../../issuedCard/single/design/IssuedCardDesign'
import Grid from '@material-ui/core/Grid'
import { ParamTypes } from '../../../ParamTypes.type'
import PromotionsSubscribeToProduct from '../../../promotion/list/PromotionsSubscribeToProduct'
// import { issuedCardClass } from '../../../issuedCard/issuedCard.type'

const ProductPage = () => {
  const history = useHistory()
  const { context }: { context: Context } = useContext(AppContext)
  const { productId }: ParamTypes = useParams<ParamTypes>()

  const { loading, error, data } = useQuery(PRODUCT_QUERY, {
    variables: {
      where: {
        id: productId,
      },
    },
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

  if (context.userRoleCompanie.companie.typeCompanie === 'SELLER') {
    return (
      <div className="paperOut">
        <Paper className="paperIn">
          <p>You need to have a Buyer Account to subscribe to products in the NachoNacho Marketplace. </p>

          <p> Please switch to your Buyer Account in the top left menu, go back to the product and click Subscribe again. </p>

          <p> If you don't have a Buyer Account yet, click '+Buyer Account' in the top left menu.</p>
        </Paper>
      </div>
    )
  }
  console.log(issuedCardClass)
  return (
    <>
      <div className="paperOut">
        <TitleSubscribeToProduct productId={productId} />
        <div className="paperOut">
          <Paper className="paperIn">
            <p>You will now create a new NachoCard and use this card to pay for your subscription.</p>

            <PromotionsSubscribeToProduct
              variables={{
                where: {
                  type: 'CASHBACK',
                  product: {
                    id: { equals: productId },
                  },
                },
              }}
            />

            <h3>NachoCard details</h3>

            <IssuedCardDesign
              showCopyToClipboard={false}
              issuedCard={{
                ...issuedCardClass,
                testMode: context.testMode,
                name: data.product.name,
                initProduct: {
                  nameFile: data.product.nameFile,
                },
                last4: '----',
                companie: {
                  isPersonal: context.userRoleCompanie.companie.isPersonal,
                  name: context.userRoleCompanie.companie.name,
                },

                number: '----------------',
                cvc: '---',

                issuedCardStripe: {
                  exp_month: '--',
                  exp_year: '--',
                  cardholder: {
                    billing: {
                      name: context.me.firstName + ' ' + context.me.lastName,
                    },
                  },
                },
              }}
            />
            {/* <div>
              Cardholder: {context.me.firstName} {context.me.lastName}
            </div>
            <div>Company: {context.userRoleCompanie.companie.name}</div>
            <div>Vendor: {data.product.name}</div> */}

            {/* <div>Spending LImit: None (you can change this later)</div> */}
            <div style={{ height: '20px' }} />
            <Grid container>
              <Grid item xs={12} sm={3} className="">
                <div className="paperOut">
                  <div className="paperOut">
                    <CreateIssuedCard
                      disabled={false}
                      productId={data.product.id}
                      buttonText={'Create NachoCard Now'}
                      type="virtual"
                      issuedCard={{ ...issuedCardClass, testMode: context.testMode, name: data.product.name }}
                      userId={context.me.id}
                      companieId={context.userRoleCompanie.companie.id}
                      onCreate={(issuedCard) => history.replace(`/issuedCard/${issuedCard.id}?isNewCard=true`)}
                    />
                  </div>
                </div>
              </Grid>
              <Grid item xs={12} sm={3} className="marginAuto tal">
                <Link className="link" to={'/usersAddIssuedCard?productId=' + data.product.id}>
                  Change NachoCard Details
                </Link>
              </Grid>
              <Grid item xs={12} sm={6} className=""></Grid>
            </Grid>

            <p>That's it! After you make your first payment, {data.product.name} will show up in your Subscriptions.</p>
            {data.product.promotions.length > 0 && <p>And your Rewards will appear automatically in your account.</p>}

            <div style={{ height: '20px' }} />
          </Paper>
        </div>
      </div>
    </>
  )
}

export default ProductPage
