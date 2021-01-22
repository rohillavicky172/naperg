import React from 'react'
import { useMutation, useApolloClient } from '@apollo/react-hooks'
import { VERIFY_SOURCE_MUTATION } from '../GraphQL'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import InputAdornment from '@material-ui/core/InputAdornment'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import { AppContext } from '../../AppContext'
import { Context } from '../../Context.type'

type Props = {
  sourceId: string
  onVerified: () => void
  onCancel: () => void
}

const VerifySource = (props: Props) => {
  const client = useApolloClient()
  const { context }: { context: Context } = React.useContext(AppContext)
  const [verifySource] = useMutation(VERIFY_SOURCE_MUTATION)
  const [number1, setNumber1] = React.useState('')
  const [number2, setNumber2] = React.useState('')
  const [message, setMessage] = React.useState('')

  const verifySourceF = async () => {
    let card

    try {
      card = await verifySource({
        variables: {
          number1: Number(number1),
          number2: Number(number2),
          sourceId: props.sourceId,
        },
      })
    } catch (e) {
      // console.log(e)
      e.graphQLErrors.some((graphQLError) => setMessage(graphQLError.message))
    }
    if (card) {
      context.openSnackBar(true, `Account successfully verified`, 'message')
      props.onVerified()
      client.resetStore()
    }
  }

  return (
    <Grid container>
      <Grid item xs={12} sm={12}>
        {context.testMode && (
          <>
            <div>Test data</div>
            <div>0.32 - 0.45</div>
          </>
        )}
      </Grid>
      <Grid item xs={12} sm={4} md={3}>
        <FormControl className="">
          <InputLabel htmlFor="number1">{`Deposit 1`}</InputLabel>
          <Input
            id="number1"
            placeholder="- -"
            startAdornment={<InputAdornment position="start">$ 0.</InputAdornment>}
            onChange={(e) => {
              if (Number(e.target.value) < 100) {
                setNumber1(e.target.value)
              }
            }}
            type="text"
            value={number1}
          />
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={4} md={3}>
        <FormControl className="">
          <InputLabel htmlFor="number1">{`Deposit 2`}</InputLabel>
          <Input
            id="number2"
            placeholder="- -"
            startAdornment={<InputAdornment position="start">$ 0.</InputAdornment>}
            onChange={(e) => {
              if (Number(e.target.value) < 100) {
                setNumber2(e.target.value)
              }
            }}
            type="text"
            value={number2}
          />
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={12}>
        <div style={{ height: '20px' }} />
        <div>
          <Button variant="outlined" color="primary" id="verifyMicroDepositsStripe" onClick={() => verifySourceF()}>
            {`Verify`}
          </Button>{' '}
          <Button onClick={props.onCancel}>{`Cancel`}</Button>
        </div>
        <div className="secondary">{message}</div>
      </Grid>
    </Grid>
  )
}

export default VerifySource
