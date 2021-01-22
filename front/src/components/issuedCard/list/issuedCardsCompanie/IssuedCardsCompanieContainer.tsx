import React from 'react'
import { Context } from '../../../Context.type'
import TitlePage from '../../../nav/layout/titlePage/TitlePage'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import { Link, useLocation } from 'react-router-dom'
import { useParams } from 'react-router'
import { ParamTypes } from '../../../ParamTypes.type'
import UseWindowDimensions from '../../../UseWindowDimensions'
import IssuingCardsQuery from '../IssuingCardsQuery'
import Filters from '../../../nav/filter/Filters'
import CustomTooltip from '../../../nav/customTooltip/CustomTooltip'
import { AppContext } from '../../../AppContext'
const queryString = require('query-string')

const IssuedCardsCompanieContainer = () => {
  const location = useLocation()
  const { context }: { context: Context } = React.useContext(AppContext)
  const params: ParamTypes = useParams<ParamTypes>()

  const first = 10

  const parsed = queryString.parse(location.search)
  const page = parsed.page ? parsed.page : 1
  const userName = parsed.userName ? parsed.userName.trim() : undefined
  const companieId = params.companieId

  const search = parsed.search ? parsed.search : undefined
  const issuedCardCode = parsed.issuedCardCode ? parsed.issuedCardCode : undefined
  const last4 = parsed.last4 ? parsed.last4 : undefined
  const statusIssuedCard = typeof parsed.statusIssuedCard === 'string' ? [parsed.statusIssuedCard] : parsed.statusIssuedCard
  const orderBy = parsed.orderBy ? parsed.orderBy : 'createdAt_DESC'
  const userId = context.me.id
  const issuedCardType = typeof parsed.issuedCardType === 'string' ? [parsed.issuedCardType] : parsed.issuedCardType
  const isMobile = UseWindowDimensions.isMobile()
  return (
    <>
      <div className="paperOut">
        <Grid container>
          <Grid item xs={6} className="">
            <TitlePage userId={''} type="companie" companieId={companieId} objectName="NachoCards" />
          </Grid>
          <Grid item xs={6} className="tar marginAuto">
            {context.userRoleCompanie.permissions.includes('canCreateIssuedCardsInCompanie') && (
              <>
                {context.userRoleCompanie.companie.isPersonal ? (
                  <CustomTooltip
                    placementDesktop={'left-start'}
                    type={'createIssuedCardsTooltip'}
                    userId={context.me.id}
                    text={`
                      Create your NachoCards here.  You can create as many cards as you like - e.g., one card per subscription vendor. 
                      You'll also be able to set budgets per card.`}>
                    <Link to={'/createIssuedCard/' + userId}>
                      <Button variant="contained" color={'primary'}>{`+ NachoCard`}</Button>
                    </Link>
                  </CustomTooltip>
                ) : (
                  <CustomTooltip
                    placementDesktop={'left-start'}
                    type={'createIssuedCardsTooltip'}
                    userId={context.me.id}
                    text={`
                        Create your NachoCards here.  You can create as many cards as you like - e.g., one card per subscription vendor. 
                        You'll also be able to set budgets per card.`}>
                    <Link to={'/usersAddIssuedCard/' + companieId}>
                      <Button variant="contained" color={'primary'}>{`+ NachoCard`}</Button>
                    </Link>
                  </CustomTooltip>
                )}
              </>
            )}
          </Grid>
        </Grid>

        <Filters
          showOrderByCreated={true}
          showStatusIssuedCard={true}
          showIssuedCardType={true}
          // showIssuedCardName={true}
          // showIssuedCardCode={true}
          // showUserName={true}
          // showEmptyColumn={true}
          // showEmptyColumn2={true}
          // showEmptyColumn3={true}
          // showEmptyColumn4={true}
          // showLast4={true}
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
                  {
                    name: {
                      contains: search,
                    },
                  },
                  { description: { contains: search } },
                  { user: { name: { contains: search } } },
                ],
                issuedCardType_in: issuedCardType,
                status_in: statusIssuedCard,
                last4_contains: last4,
                issuedCardCode_contains: issuedCardCode,
                user: userName && {
                  OR: [
                    {
                      firstName: userName && { contains: userName },
                    },
                    {
                      lastName: userName && { contains: userName },
                    },
                  ],
                },

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

export default IssuedCardsCompanieContainer
