import React from 'react'
import { Link } from 'react-router-dom'
import { Companie } from '../../companie/Companie.type'
import Icon from '@material-ui/core/Icon'
import Button from '@material-ui/core/Button'
import WireFunds from './WireFunds'
import AddPlaid from '../../plaidData/plaid/AddPlaid'
import Paypal from './Paypal'
import Error from '../../nav/error/Error'
import Loading from '../../nav/error/Loading'
import NotFound from '../../nav/error/NotFound'
import { useQuery } from '@apollo/react-hooks'
// import DateComponent from '../../nav/DateComponent'
import gql from 'graphql-tag'
import { User } from '../../user/User.type'

export const QUERY = gql`
  query Me {
    me {
      id
      verificationStatus
    }
  }
`

type Props = {
  companie: Companie
}

const AddPaymentSourceLogic = (props: Props) => {
  const { loading, error, data } = useQuery(QUERY)

  if (error) return <Error message={error.graphQLErrors.length && error.graphQLErrors[0].message} />
  if (loading) return <Loading />
  if (!data.me) return <NotFound />
  const user: User = data.me
  return (
    <>
      {(user.verificationStatus === 'REQUIRED' ||
        user.verificationStatus === 'SUBMITED' ||
        user.verificationStatus === 'NOT_APPROVED') && (
        <>
          <Link to={`/userVerification`}>
            <Button color="primary" variant="outlined">
              {`+ Payment Source`}
              <div style={{ width: '10px' }} />
              <Icon>account_balance</Icon>
            </Button>
          </Link>
        </>
      )}

      {(user.verificationStatus === 'NOT_REQUIRED' || user.verificationStatus === 'APPROVED') && (
        <>
          {!props.companie.hideAddBank && (
            <>
              <AddPlaid companieId={props.companie.id} />
            </>
          )}{' '}
          {props.companie.addStripeBank && (
            <Link to={`/addSource/${props.companie.id}?paymentMethod=bank`}>
              <Button color="primary" variant="outlined">
                {`+ Bank account via microdeposits`}
                <div style={{ width: '10px' }} />
                <Icon>account_balance</Icon>
              </Button>
            </Link>
          )}{' '}
          {!props.companie.hideDebitCredit && (
            <Link to={`/addSource/${props.companie.id}?paymentMethod=card`}>
              <Button color="primary" variant="outlined">
                {`+ Debit card`}
                <div style={{ width: '10px' }} />
                <Icon>credit_card</Icon>
              </Button>
            </Link>
          )}{' '}
          {!props.companie.isTrustedPayment && <WireFunds />} {props.companie.addPaypal && <Paypal />}
        </>
      )}
    </>
  )
}

export default AddPaymentSourceLogic
