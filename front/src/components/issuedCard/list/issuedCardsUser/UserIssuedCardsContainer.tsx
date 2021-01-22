import React from 'react'
import TitlePage from '../../../nav/layout/titlePage/TitlePage'
import Button from '@material-ui/core/Button'
import { Context } from '../../../Context.type'
import { Link, useLocation } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import IssuingCardsQuery from '../IssuingCardsQuery'
import Filters from '../../../nav/filter/Filters'
import CustomTooltip from '../../../nav/customTooltip/CustomTooltip'
import UseWindowDimensions from '../../../UseWindowDimensions'
import { AppContext } from '../../../AppContext'
import { useParams } from 'react-router'
import { ParamTypes } from '../../../ParamTypes.type'

const queryString = require('query-string')
// // import { Match } from '../../../Match.type'
// // import { Location } from '../../../Location.type'
// import { Paper } from '@material-ui/core'
// import { flowRight as compose } from 'lodash'
// import { withRouter, Link } from 'react-router-dom'
// import { withContext } from '../../../withContext'
// import { useQuery } from '@apollo/react-hooks'
// import IssuedCardsCompanieContainer from './IssuedCardsCompanieContainer'
// import { Context } from '../../../Context.type'

const UserIssuedCardsPage = () => {
  const location = useLocation()
  const { context }: { context: Context } = React.useContext(AppContext)
  const params: ParamTypes = useParams<ParamTypes>()

  const first = 10

  const parsed = queryString.parse(location.search)

  let page = parsed.page ? parsed.page : 1
  let companieId = context.userRoleCompanie.companie.id

  const orderBy = parsed.orderBy ? parsed.orderBy : 'createdAt_DESC'
  const statusIssuedCard = typeof parsed.statusIssuedCard === 'string' ? [parsed.statusIssuedCard] : parsed.statusIssuedCard
  const issuedCardCode = parsed.issuedCardCode ? parsed.issuedCardCode : undefined
  const search = parsed.search ? parsed.search : undefined
  const last4 = parsed.last4 ? parsed.last4 : undefined
  const userId = params.userId
  const isMyCard = context.me.id === userId
  const issuedCardType = typeof parsed.issuedCardType === 'string' ? [parsed.issuedCardType] : parsed.issuedCardType

  const canCreateIssuedCard =
    (context.userRoleCompanie.permissions.includes('canCreateMyIssuedCards') && isMyCard) ||
    (context.userRoleCompanie.permissions.includes('canCreateIssuedCardsInCompanie') && !isMyCard)
      ? true
      : false
  const isMobile = UseWindowDimensions.isMobile()
  return (
    <>
      <div className="paperOut">
        <Grid container>
          <Grid item xs={6} className="">
            <TitlePage companieId={''} type="user" objectName="NachoCards" userId={userId} />
          </Grid>
          <Grid item xs={6} className="tar marginAuto">
            {context.userRoleCompanie.permissions.includes('canRequestCard') && (
              <Link to={'/createIssuedCard/' + userId}>
                <Button variant="contained" color={'primary'}>{`+ Request NachoCard`}</Button>
              </Link>
            )}

            {canCreateIssuedCard && (
              <CustomTooltip
                placementDesktop={'left-start'}
                type={'createIssuedCardsTooltip'}
                userId={context.me.id}
                text={`
                     Create your NachoCards here.  You can create as many cards as you like - e.g., one card per subscription vendor. 
                     You'll also be able to set budgets per card.`}>
                <Link to={'/createIssuedCard/' + (userId ? userId : context.me.id)}>
                  <Button variant="contained" color={'primary'}>{`+ NachoCard`}</Button>
                </Link>
              </CustomTooltip>
            )}
          </Grid>
        </Grid>

        <Filters
          showOrderByCreated={true}
          showStatusIssuedCard={true}
          showIssuedCardType={true}
          searchPlaceholder={
            isMobile
              ? context.userRoleCompanie.companie.isPersonal
                ? 'NachoCard or last 4 digits'
                : 'Member, NachoCard or last 4 digits'
              : context.userRoleCompanie.companie.isPersonal
              ? 'Search by NachoCard name or last 4 digits of NachoCard'
              : 'Search by Member, NachoCard name or last 4 digits of NachoCard'
          }
        />
        <div>
          <IssuingCardsQuery
            page={page}
            variables={{
              first: first,
              orderBy,
              skip: (page - 1) * first,
              where: {
                OR: search && [
                  { last4: { contains: search } },
                  { issuedCardCode: { contains: search } },
                  { name: { contains: search } },
                  { description: { contains: search } },
                  { user: { name: { contains: search } } },
                ],
                issuedCardType_in: issuedCardType,
                status_in: statusIssuedCard,
                last4_contains: last4,
                issuedCardCode_contains: issuedCardCode,

                user: { id: userId },
                companie: { id: companieId },
                testMode: context.testMode,
              },
            }}
          />
        </div>
      </div>
    </>
  )
}

export default UserIssuedCardsPage
