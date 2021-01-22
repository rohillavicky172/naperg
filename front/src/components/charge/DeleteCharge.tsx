import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { Charge } from './Charge.type'
import ButtonSecondValidation from '../nav/ButtonSecondValidation'

const MUTATION = gql`
  mutation DeleteCharge($chargeId: String!) {
    deleteCharge(chargeId: $chargeId) {
      id
    }
  }
`
type Props = { charge: Charge }

const DeleteCharge = (props: Props) => {
  let messageResult = ''

  const [deleteCharge, data] = useMutation(MUTATION)
  if (data.error) {
    messageResult = data.error.message
  }

  if (data.data) {
    messageResult = 'succes'
  }
  return (
    <div>
      <ButtonSecondValidation
        id={'deleteCHarge'}
        color={'primary'}
        variant={'outlined'}
        size={'medium'}
        buttonText={`Delete Charge`}
        onClick={() =>
          deleteCharge({
            variables: {
              chargeId: props.charge.id,
            },
          })
        }
      />

      <div className="secondary">{messageResult}</div>
    </div>
  )
}

export default DeleteCharge
