import React from 'react'
import Filters from '../../nav/filter/Filters'
import { useParams } from 'react-router'
import { AppContext } from '../../AppContext'
import { Context } from '../../Context.type'
import { useLocation } from 'react-router-dom'
import SubscriptionCardsQuery from './el/SubscriptionCardsQuery'
import TitlePage from '../../nav/layout/titlePage/TitlePage'
import TitleUserName from '../../nav/layout/titlePage/TitleUserName'
import UseWindowDimensions from '../../UseWindowDimensions'
// import { Link } from 'react-router-dom'
import { ParamTypes } from '../../ParamTypes.type'

const queryString = require('query-string')

const SubscriptionsCompanyContainer = () => {
  const { context }: { context: Context } = React.useContext(AppContext)
  const params: ParamTypes = useParams<ParamTypes>()
  const location = useLocation()

  const first = 48
  const parsed = queryString.parse(location.search)
  const page = parsed.page ? parsed.page : 1
  const orderBy = parsed.orderBy ? parsed.orderBy : 'lastInvoiceDate_DESC'
  const last4 = parsed.last4 ? parsed.last4 : undefined
  const productId = parsed.productId
  const productFrequency = typeof parsed.productFrequency === 'string' ? [parsed.productFrequency] : parsed.productFrequency
  const userName = parsed.userName ? parsed.userName : undefined
  const userId = parsed.userId ? parsed.userId : undefined
  const productName = parsed.productName ? parsed.productName : undefined
  const search = parsed.search ? parsed.search : undefined
  const issuedCardId = parsed.issuedCardId
  const statusIssuedCard = typeof parsed.statusIssuedCard === 'string' ? [parsed.statusIssuedCard] : parsed.statusIssuedCard
  const companieId = params.companieId
  const isMobile = UseWindowDimensions.isMobile()
  return (
    <>
      <div className="paperOut">
        {userId ? (
          <h3>
            <TitleUserName showCompanie={true} userId={userId} companieId={companieId} objectName="Subscriptions" />
          </h3>
        ) : (
          <TitlePage userId={''} type="companie" companieId={companieId} objectName="Subscriptions" />
        )}

        {/* {this.props.context.me && this.props.context.me.role === 'ADMIN' && (
            <Link className="link" to={'/subscriptionsListCompany/' + companieId}>
              List (admin)
            </Link>
          )} */}

        <Filters
          // showOrderByCreated={true}
          // showLast4={true}
          // showUserName={this.props.context.userRoleCompanie.companie.isPersonal ? false : true}
          // showOrderByLastInvoiceDate={true}
          showOrderByLastInvoiceDate={true}
          showStatusIssuedCard={true}
          showProductId={true}
          showProductFrequency={true}
          // showProductName={true}

          searchPlaceholder={
            isMobile
              ? context.userRoleCompanie.companie.isPersonal
                ? 'Vendor or last 4 digits'
                : 'Vendor, Member or last 4 digits'
              : context.userRoleCompanie.companie.isPersonal
              ? 'Search by Vendor or last 4 digits of NachoCard'
              : 'Search by Vendor, Member or last 4 digits of NachoCard'
          }
        />

        <SubscriptionCardsQuery
          page={page}
          variables={{
            first: first,
            skip: (page - 1) * first,
            orderBy,
            where: {
              OR: search && [
                { product: { name: { contains: search } } },
                { user: { name: { contains: search } } },
                { issuedCard: { last4: { equals: search } } },
              ],

              issuedCard: (last4 || issuedCardId || statusIssuedCard) && {
                id: issuedCardId,
                status_in: statusIssuedCard,
                last4,
              },
              companie: {
                id: companieId,
              },

              product: (productId || productName || productFrequency) && {
                id: { equals: productId },
                productFrequency_in: productFrequency,
                name: { contains: productName },
              },
              user: (userName || userId) && {
                id: userId ? userId : undefined,
                OR: userName && [{ firstName: { contains: userName } }, { lastName: { contains: userName } }],
              },
            },
          }}
        />
      </div>
    </>
  )
}

export default SubscriptionsCompanyContainer
