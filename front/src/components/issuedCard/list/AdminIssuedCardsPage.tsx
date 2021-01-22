import React from 'react'
import { useLocation } from 'react-router-dom'
import IssuingCardsQuery from './IssuingCardsQuery'
import Filters from '../../nav/filter/Filters'
import UseWindowDimensions from '../../UseWindowDimensions'
const queryString = require('query-string')

const AdminIssuedCardsPage = () => {
  const first = 10
  const location = useLocation()
  // let companieId = this.props.match.params.companieId
  const parsed = queryString.parse(location.search)
  const companieName = parsed.companieName
  const page = parsed.page ? parsed.page : 1
  // const issuedCardName = parsed.issuedCardName ? parsed.issuedCardName : undefined
  const issuedCardCode = parsed.issuedCardCode ? parsed.issuedCardCode : undefined
  const userName = parsed.userName ? parsed.userName.trim() : undefined
  const last4 = parsed.last4 ? parsed.last4 : undefined
  const search = parsed.search ? parsed.search : undefined
  const userId = parsed.userId ? parsed.userId : undefined
  const cardholderId = parsed.cardholderId ? parsed.cardholderId : undefined
  const orderBy = parsed.orderBy ? parsed.orderBy : 'createdAt_DESC'
  // const statusIssuedCard = parsed.statusIssuedCard
  // const issuedCardType = parsed.issuedCardType ? parsed.issuedCardType : undefined
  // const userId = this.props.context.me.id
  const typeIssuedCards = typeof parsed.typeIssuedCards === 'string' ? [parsed.typeIssuedCards] : parsed.typeIssuedCards
  const statusIssuedCard = typeof parsed.statusIssuedCard === 'string' ? [parsed.statusIssuedCard] : parsed.statusIssuedCard
  const issuedCardType = typeof parsed.issuedCardType === 'string' ? [parsed.issuedCardType] : parsed.issuedCardType
  const isMobile = UseWindowDimensions.isMobile()
  return (
    <>
      <div className="paperOut">
        <h3>{`Issued cards (Admin)`}</h3>
      </div>

      <div className="paperOut">
        <Filters
          showOrderByCreated
          // showIssuedCardName
          showUserId
          showCardholderId
          showEmptyColumn
          showTypeIssuedCards
          showUserName
          showIssuedCardCode
          showCompanieName
          showStatusIssuedCard
          showLast4
          showIssuedCardType
          searchPlaceholder={
            isMobile ? 'Member, NachoCard or last 4 digits' : 'Search by Member, NachoCard name or last 4 digits of NachoCard'
          }
        />

        <div>
          <IssuingCardsQuery
            page={page}
            variables={{
              first,
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
                companie: companieName && {
                  name_contains: companieName,
                },
                cardholder: cardholderId && {
                  id: cardholderId,
                },
                status_in: statusIssuedCard,
                last4_contains: last4,
                type_in: typeIssuedCards,
                issuedCardCode_contains: issuedCardCode,

                user: (userName || userId) && {
                  AND: [
                    { id: userId },
                    {
                      OR: userName && [
                        { firstName: { contains: userName } },
                        { lastName: { contains: userName } },
                        { name: { contains: userName } },
                        { email: { contains: userName } },
                      ],
                    },
                  ],
                },
              },
            }}
          />
        </div>
      </div>
    </>
  )
}

export default AdminIssuedCardsPage
