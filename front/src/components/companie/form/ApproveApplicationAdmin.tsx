import React from 'react'
import { useMutation } from '@apollo/react-hooks'

import { Companie } from '../Companie.type'
import gql from 'graphql-tag'
import ButtonSecondValidation from '../../nav/ButtonSecondValidation'

export const MUTATION = gql`
  mutation ApproveApplicationAdmin($companieId: ID!) {
    approveApplicationAdmin(companieId: $companieId) {
      id
      statusApplication
      isTrustedPayment
    }
  }
`

type Props = {
  companie: Companie
}

const ApproveApplicationAdmin = (props: Props) => {
  const [errorMessage, setErrorMessage] = React.useState('')
  const [approveApplicationAdmin] = useMutation(MUTATION)

  const approveApplicationAdminF = async () => {
    try {
      await approveApplicationAdmin({
        variables: {
          companieId: props.companie.id,
        },
      })
    } catch (e) {
      e.graphQLErrors.some((graphQLError) => setErrorMessage(graphQLError.message))
    }
  }

  return (
    <>
      <ButtonSecondValidation
        id={'ApproveApplicationAdminId'}
        color={'primary'}
        variant={'outlined'}
        size={'medium'}
        buttonText={'Approve'}
        onClick={approveApplicationAdminF}
      />

      <p className="secodary">{errorMessage}</p>
    </>
  )
}

export default ApproveApplicationAdmin
