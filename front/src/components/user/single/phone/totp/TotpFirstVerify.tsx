import React from 'react'
import { useMutation, useApolloClient } from '@apollo/react-hooks'
import { TOTP_FIRST_VERIFY_MUTATION } from './GraphQL'
import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import ButtonLoadingAfterClick from '../../../../nav/ButtonLoadingAfterClick'
import { useHistory } from 'react-router-dom'

type Props = {
  userId: string
}

const TotpFirstVerify = (props: Props) => {
  const history = useHistory()
  const client = useApolloClient()
  const [verify] = useMutation(TOTP_FIRST_VERIFY_MUTATION)
  const [token, setToken] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState('')

  const firstVerify = async () => {
    setLoading(true)
    setErrorMessage('')

    let dataUser
    try {
      dataUser = await verify({ variables: { token } })
    } catch (e) {
      setLoading(false)
      e.graphQLErrors.some((graphQLError) => setErrorMessage(graphQLError.message))
    }
    if (dataUser) {
      setLoading(false)
      history.push(`/settings/${props.userId}?mode=security`)
      await client.resetStore()
      // props.onUpdate()
    }
  }

  return (
    <>
      <FormControl className="width100per">
        <InputLabel htmlFor="token">{`Token`}</InputLabel>
        <Input id="token" onChange={(e) => setToken(e.target.value)} type="text" value={token} />
      </FormControl>
      <div style={{ height: '10px' }} />
      <div>
        <ButtonLoadingAfterClick
          id={'idButton'}
          icon={''}
          color={'secondary'}
          disabled={false}
          variant={'outlined'}
          size={'medium'}
          buttonText={'Verify'}
          buttonLoadingText={`Loading...`}
          onClick={() => firstVerify()}
          loading={loading}
        />{' '}
        <Button onClick={() => history.push(`/settings/${props.userId}?mode=security`)}>Cancel</Button>
        <p className="secondary">{errorMessage}</p>
      </div>
    </>
  )
}

export default TotpFirstVerify
