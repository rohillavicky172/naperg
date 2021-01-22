import React from 'react'
import { useHistory } from 'react-router-dom'
import { useParams } from 'react-router'
import { ParamTypes } from '../../../ParamTypes.type'
import { useMutation } from '@apollo/react-hooks'
import ButtonLoadingAfterClick from '../../../nav/ButtonLoadingAfterClick'
import gql from 'graphql-tag'
import CompanieName from '../../../companie/single/CompanieName'
import { Input, Paper, InputLabel, FormControl } from '@material-ui/core'

export const MUTATION = gql`
  mutation CreateInvoiceBuyerMonthlyFee($companieId: String!, $period: String!) {
    createInvoiceBuyerMonthlyFee(companieId: $companieId, period: $period) {
      id
    }
  }
`

const CreateInvoiceBuyerMonthlyFeePage = () => {
  const params: ParamTypes = useParams<ParamTypes>()

  const history = useHistory()
  const [period, setPeriod] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [message, setMessage] = React.useState('')
  const [createInvoiceBuyerMonthlyFee] = useMutation(MUTATION)

  const createInvoiceF = async () => {
    setLoading(true)
    setMessage('')
    let invoiceData
    try {
      invoiceData = await createInvoiceBuyerMonthlyFee({
        variables: {
          companieId: params.companieId,
          period: period,
        },
      })
    } catch (e) {
      setLoading(false)

      e.graphQLErrors.some((graphQLError) => setMessage(graphQLError.message))
    }
    setLoading(false)
    if (invoiceData) {
      console.log(invoiceData)
      history.push('/invoice/' + invoiceData.data.createInvoiceBuyerMonthlyFee.id)
    }
  }

  return (
    <>
      <div className="paperOut">
        <Paper className="paperIn">
          <h3>
            Create Invoice Buyer Monthly Fee for <CompanieName companieId={params.companieId} />
          </h3>

          <div>
            <FormControl className={''}>
              <InputLabel htmlFor="period">{`period`}</InputLabel>
              <Input
                id="period"
                type="text"
                value={period}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPeriod(e.target.value)}
              />
            </FormControl>
          </div>

          <ButtonLoadingAfterClick
            id={'createInvoice'}
            disabled={false}
            icon={''}
            size={'medium'}
            color={'primary'}
            variant={'outlined'}
            buttonText={'Create'}
            buttonLoadingText={`Setting up...`}
            onClick={() => createInvoiceF()}
            loading={loading}
          />
          <div className="secondary">{message}</div>
        </Paper>
      </div>
    </>
  )
}

export default CreateInvoiceBuyerMonthlyFeePage
