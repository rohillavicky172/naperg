import React from 'react'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const CREATE_CHARGE_MUTATION = gql`
  mutation CreateCharge($data: ChargeCreateInput!) {
    createCharge(data: $data) {
      id
    }
  }
`
type Props = { invoiceId: string }

const CreateCharge = (props: Props) => {
  let messageResult = ''
  const [show, setShow] = React.useState(false)
  const [createCharge, data] = useMutation(CREATE_CHARGE_MUTATION)
  if (data.error) {
    messageResult = data.error.message
  }

  if (data.data) {
    messageResult = 'succes'
  }
  return (
    <>
      <div className="paperOut">
        <Paper className="paperIn">
          <h3>Create Charge</h3>
          {!show ? (
            <Button color="primary" variant="outlined" onClick={() => setShow(true)}>
              Go
            </Button>
          ) : (
            <>
              <div>
                <p>A new real charge will be processed and added to this invoice. It cannot be undone.</p>
                <Button
                  color="primary"
                  variant="outlined"
                  onClick={() =>
                    createCharge({
                      variables: {
                        data: {
                          stripeChargeId: '',
                          invoice: {
                            connect: {
                              id: props.invoiceId,
                            },
                          },
                        },
                      },
                    })
                  }>
                  Create
                </Button>{' '}
                <Button onClick={() => setShow(false)}>Cancel</Button>
                <div className="secondary">{messageResult}</div>
              </div>
            </>
          )}
        </Paper>
      </div>
    </>
  )
}

export default CreateCharge
