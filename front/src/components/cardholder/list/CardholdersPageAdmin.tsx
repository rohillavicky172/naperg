import React from 'react'
// import Paper from '@material-ui/core/Paper'
import { useLocation } from 'react-router-dom'
// import { withContext } from '../../withContext'
import { AppContext } from '../../AppContext'
import { Context } from '../../Context.type'
// import { Query } from '../../Query.type'
// import TitlePage from '../../nav/layout/titlePage/TitlePage'
import CardholdersQuery from './CardholdersQuery'
import Filters from '../../nav/filter/Filters'
import queryString from 'query-string'

// type Props = {
//   first: number
//   client: any
//   history: any
//   location: Location
// }

// class CardholdersPageAdmin extends React.Component<Props, State> {
const CardholdersPageAdmin = () => {
  const first = 20
  const location = useLocation()
  const parsed = queryString.parse(location.search)
  const page: number = parsed.page ? Number(parsed.page) : 1
  const { context }: { context: Context } = React.useContext(AppContext)
  // const cardHolderId = this.props.match.params.companieId

  // const companieId = parsed.companieId ? parsed.companieId : undefined
  // // const search = parsed.search ? parsed.search : undefined
  const cardholderId = parsed.cardholderId
  const search = parsed.search ? parsed.search : undefined
  const userId = parsed.userId
  const companieId = parsed.companieId
  // console.log(cardholderId)
  // const plaidDataId = parsed.plaidDataId
  // const invoiceId = parsed.invoiceId
  // const productId = parsed.productId
  // const userId = parsed.userId
  // const type = parsed.type
  // const message = parsed.message

  // const events = typeof parsed.events === 'string' ? [parsed.events] : parsed.events

  return (
    <>
      <div className="paperOut">
        <h3>{`Cardholders (admin)`}</h3>
        <Filters
          showCompanieId={true}
          searchPlaceholder={'User, Company'}
          // searchPlaceholder={'Cardholders'}
        />

        <CardholdersQuery
          page={page}
          variables={{
            first: first,
            skip: (page - 1) * first,
            orderBy: 'createdAt_DESC',
            where: {
              OR: search && [{ user: { name: { contains: search } } }, { companie: { name: { contains: search } } }],

              id: cardholderId,
              user: userId && {
                id: userId,
              },
              companie: companieId && {
                id: companieId,
              },
              testMode: context.testMode,
            },
          }}
        />
      </div>
    </>
  )
}

export default CardholdersPageAdmin
