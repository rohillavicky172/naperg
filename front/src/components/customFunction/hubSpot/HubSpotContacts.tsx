import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import Paper from '@material-ui/core/Paper'
import ButtonLoadingAfterClick from '../../nav/ButtonLoadingAfterClick'
import { FormControl } from '@material-ui/core'
import { InputLabel } from '@material-ui/core'
import { Input } from '@material-ui/core'

export const REFRESH_CONTACTS_HUBSPOT = gql`
  mutation refreshContactsHubspot($where: UserWhereInput!, $orderBy: UserOrderByInput, $skip: Int, $first: Int) {
    refreshContactsHubspot(where: $where, orderBy: $orderBy, skip: $skip, first: $first)
  }
`

const HubSpotContacts = () => {
  const [loading, setLoading] = React.useState(false)
  const [response, setResponse] = React.useState('')
  const [message, setMessage] = React.useState('')
  // const [page, setPage] = React.useState('1')
  const page = 1
  const [first, setFirst] = React.useState('20')
  const [email, setEmail] = React.useState('')

  const [refreshContactsHubspot] = useMutation(REFRESH_CONTACTS_HUBSPOT)

  const refreshContactsHubspotF = async () => {
    setMessage('')
    setResponse('')
    let response
    setLoading(true)
    try {
      response = await refreshContactsHubspot({
        variables: {
          first: Number(first),
          skip: (Number(page) - 1) * Number(first),
          where: {
            email: { contains: email },
          },
          orderBy: 'updatedAtHubspot_ASC',
        },
      })
    } catch (e) {
      e.graphQLErrors.some((graphQLError) => setMessage(graphQLError.message))
    }
    if (response && response.data) {
      setResponse(response.data.refreshContactsHubspot)
      setMessage('Ok!')
    }
    setLoading(false)
  }
  return (
    <div className="paperOut">
      <Paper className="paperIn">
        <h3>Contacts</h3>
        <div>
          <FormControl>
            <InputLabel htmlFor="page">{`first`}</InputLabel>
            <Input
              id="first"
              type="number"
              value={first}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFirst(e.target.value)}
            />
          </FormControl>
        </div>
        {/* <div>
          <FormControl>
            <InputLabel htmlFor="page">{`page`}</InputLabel>
            <Input
              id="page"
              type="number"
              value={page}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPage(e.target.value)}
            />
          </FormControl>
        </div> */}
        <div>
          <FormControl>
            <InputLabel htmlFor="email">{`email`}</InputLabel>
            <Input
              id="email"
              type="text"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            />
          </FormControl>
        </div>
        <br />
        <div>
          <ButtonLoadingAfterClick
            id={'idButton'}
            disabled={false}
            icon={''}
            size={'medium'}
            buttonText={`Refresh`}
            buttonLoadingText={`Setting up...`}
            variant="outlined"
            loading={loading}
            color={'secondary'}
            onClick={() => refreshContactsHubspotF()}
          />{' '}
        </div>
        <div>{response && <pre>{JSON.stringify(JSON.parse(response), null, 2)}</pre>}</div>
        <div className="secondary">{message}</div>
      </Paper>
    </div>
  )
}

export default HubSpotContacts
