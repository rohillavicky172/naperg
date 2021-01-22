import React from 'react'
import { useHistory } from 'react-router-dom'
import Loading from '../../../nav/error/Loading'
import NotFound from '../../../nav/error/NotFound'
import Error from '../../../nav/error/Error'
import { User } from '../../../user/User.type'
import { useQuery } from '@apollo/react-hooks'
import Paper from '@material-ui/core/Paper'
import { ADDRESSES_QUERY } from '../../../addresse/GraphQL'
import CompanieQueryCreateIssuedCard from './CompanieQueryCreateIssuedCard'
import AddAddresseContainer from '../../../addresse/AddAddresseContainer'

type Props = {
  variables: any
  user: User
  companieId: string
}

const AddressesQueryCreateIssuedCard = (props: Props) => {
  const history = useHistory()
  const { loading, error, data } = useQuery(ADDRESSES_QUERY, {
    variables: props.variables,
  })

  if (error) return <Error message={error.graphQLErrors.length && error.graphQLErrors[0].message} />
  if (loading) return <Loading />
  if (!data.addresses) return <NotFound />

  if (!data.addresses) {
    return <Loading />
  }

  if (!data.addresses.length) {
    return (
      <div className="paperOut">
        <Paper className="paperIn">
          <div className="responsiveMargin2">
            <h2>NachoCard setup</h2>
            <h4>
              Billing address is required before creating NachoCards. This is the address you will enter if a vendor asks you for
              a billing address when making an online payment with your Nachocard.
            </h4>
            <p>{`You only need to add your Billing address once - it will be saved for future cards.`}</p>
            <AddAddresseContainer
              companieId={props.companieId}
              type={'BILLING'}
              userId={props.user.id}
              onCancel={() => history.goBack()}
            />
          </div>
        </Paper>
      </div>
    )
  }

  return <CompanieQueryCreateIssuedCard user={props.user} addresses={data.addresses} companieId={props.companieId} />
}

export default AddressesQueryCreateIssuedCard
