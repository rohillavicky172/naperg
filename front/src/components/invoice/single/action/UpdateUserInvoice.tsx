import React from 'react'
import { AppContext } from '../../../AppContext'
import { useMutation, useApolloClient } from '@apollo/react-hooks'
import { UPDATE_INVOICE } from '../../GraphQL'
import ButtonSecondValidation from '../../../nav/ButtonSecondValidation'
import { Invoice } from '../../Invoice.type'
import { Context } from '../../../Context.type'
import Paper from '@material-ui/core/Paper'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'

type Props = {
  invoice: Invoice
}

const UpdateUserInvoice = (props: Props) => {
  const client = useApolloClient()

  const [updateInvoice] = useMutation(UPDATE_INVOICE)
  const { context }: { context: Context } = React.useContext(AppContext)

  const [userId, setUserId] = React.useState(props.invoice.user && props.invoice.user.id ? props.invoice.user.id : '')

  const updateInvoiceF = async () => {
    let dataInvoice
    try {
      dataInvoice = await updateInvoice({
        variables: {
          data: {
            user: {
              connect: {
                id: userId,
              },
            },
          },
          where: {
            id: props.invoice.id,
          },
        },
      })
    } catch (e) {
      e.graphQLErrors.some((graphQLError) => context.openSnackBar(true, graphQLError.message, 'error'))
    }
    if (dataInvoice) {
      await client.resetStore()
    }
  }

  return (
    <>
      <div className="paperOut">
        <Paper className="paperIn">
          <h3>{`Edit UserId`}</h3>
          <div>
            <FormControl className={''}>
              <InputLabel htmlFor="userId">{`userId`}</InputLabel>
              <Input
                id="userId"
                type="text"
                value={userId}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserId(e.target.value)}
              />
            </FormControl>

            <ButtonSecondValidation
              buttonText={`Update`}
              color={'primary'}
              size={'medium'}
              variant={'outlined'}
              onClick={() => updateInvoiceF()}
            />
          </div>
        </Paper>
      </div>
    </>
  )
}

export default UpdateUserInvoice
