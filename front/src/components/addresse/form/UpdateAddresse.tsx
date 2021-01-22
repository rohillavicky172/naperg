import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import { Addresse } from '../Addresse.type'
import { UPDATE_ADDRESSE_MUTATION } from '../GraphQL'
import ButtonLoadingAfterClick from '../../nav/ButtonLoadingAfterClick'

type Props = {
  addresse: Addresse
  disabled: boolean
  textButton: string
  onUpdate: () => void
}

const UpdateAddresse = (props: Props) => {
  const [message, setMessage] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [updateAddresse] = useMutation(UPDATE_ADDRESSE_MUTATION)
  const updateAddresseF = async () => {
    setLoading(true)
    let newAddresse
    try {
      newAddresse = await updateAddresse({
        variables: {
          where: {
            id: props.addresse.id,
          },
          data: {
            type: props.addresse.type,
            name: props.addresse.name,
            address1: props.addresse.address1,
            address2: props.addresse.address2,
            city: props.addresse.city,
            zip: props.addresse.zip,
            state: props.addresse.state,
            country: props.addresse.country,
          },
        },
      })
    } catch (e) {
      setLoading(false)
      e.graphQLErrors.some((graphQLError) => setMessage(graphQLError.message))
    }
    if (newAddresse) {
      setLoading(false)
      props.onUpdate()
    }
  }

  return (
    <>
      <ButtonLoadingAfterClick
        id={'idButtonUpdateAddress'}
        disabled={props.disabled}
        icon={''}
        size={'medium'}
        color={'primary'}
        variant={'outlined'}
        buttonText={props.textButton}
        buttonLoadingText={`Setting up...`}
        onClick={() => updateAddresseF()}
        loading={loading}
      />

      <div className="secondary">{message}</div>
    </>
  )
}

export default UpdateAddresse
