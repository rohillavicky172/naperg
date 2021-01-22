import React from 'react'
import { useMutation, useApolloClient } from '@apollo/react-hooks'
import { Source } from '../Source.type'
import ButtonLoadingAfterClick from '../../nav/ButtonLoadingAfterClick'

import { DELETE_SOURCE_MUTATION } from '../GraphQL'

type Props = {
  source: Source
}

const DeleteSource = (props: Props) => {
  const client = useApolloClient()
  const [loading, setLoading] = React.useState(false)
  const [messaage, setMessage] = React.useState('')

  const [deleteSource] = useMutation(DELETE_SOURCE_MUTATION)

  const deleteSourceF = async () => {
    setLoading(true)
    let balance
    try {
      balance = await deleteSource({
        variables: {
          where: {
            id: props.source.id,
          },
        },
      })
    } catch (e) {
      setLoading(false)
      e.graphQLErrors.some((graphQLError) => setMessage(graphQLError.message))
    }
    if (balance) {
      setLoading(false)
      setMessage(`Payment Source successfully deleted`)
      client.resetStore()
    }
  }

  return (
    <div>
      <ButtonLoadingAfterClick
        id={'hardDeleteSource'}
        icon={''}
        disabled={false}
        color={'secondary'}
        variant={'outlined'}
        size={'medium'}
        buttonText={`Hard Delete Source`}
        buttonLoadingText={`Loading...`}
        onClick={() => deleteSourceF()}
        loading={loading}
      />{' '}
      <div className="secondary">{messaage}</div>
    </div>
  )
}

export default DeleteSource
