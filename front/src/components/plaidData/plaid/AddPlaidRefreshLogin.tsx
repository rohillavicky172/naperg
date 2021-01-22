import React from 'react'
import { useMutation, useApolloClient } from '@apollo/react-hooks'
import { Button, Icon } from '@material-ui/core/'
import gql from 'graphql-tag'
import { usePlaidLink } from 'react-plaid-link'
import { PlaidData } from '../PlaidData.type'
import { AppContext } from '../../AppContext'
import { Context } from '../../Context.type'
import { CREATE_LOG_MUTATION } from '../../log/GraphQL'
import { PLAID } from '../../../config/config'
import { Metadata } from '../PlaidData.type'

export const MUTATION = gql`
  mutation NewLoginPlaid($plaidDataId: String!, $publicToken: String!) {
    newLoginPlaid(plaidDataId: $plaidDataId, publicToken: $publicToken) {
      id
    }
  }
`

type Props = {
  companieId: string
  plaidData: PlaidData
}

const AddPlaidRefreshLogin = (props: Props) => {
  const [newLoginPlaid] = useMutation(MUTATION)
  const [createLog] = useMutation(CREATE_LOG_MUTATION)

  const client = useApolloClient()
  const { context }: { context: Context } = React.useContext(AppContext)

  const onExit = async (err: any, metadata: Metadata) => {
    console.log('onExit')

    // if (metadata.institution && metadata.institution.name) {
    //   newLoginPlaidF()
    // }

    createLog({
      variables: {
        data: {
          testMode: context.testMode,
          date: new Date(),
          user: { connect: { id: context.me.id } },
          companie: { connect: { id: props.companieId } },
          message: `
            event: onExitPlaid |
            frontEnd
            `,
          json: JSON.stringify(metadata),
          jsonError: JSON.stringify(err),
        },
      },
    })
  }
  const onEvent = () => {}
  const onLoad = () => {}

  const newLoginPlaidF = async (publicToken: string) => {
    let plaidDataQuery
    try {
      plaidDataQuery = await newLoginPlaid({
        variables: {
          plaidDataId: props.plaidData.id,
          publicToken,
        },
      })
    } catch (e) {}
    console.log(plaidDataQuery)
    if (plaidDataQuery) {
      client.resetStore()
    }
  }
  const onSuccess = async (publicToken: string, metadata: Metadata) => {
    newLoginPlaidF(publicToken)

    createLog({
      variables: {
        data: {
          event: 'plaid',
          testMode: context.testMode,
          date: new Date(),
          user: { connect: { id: context.me.id } },
          companie: { connect: { id: props.companieId } },
          message: `
            event: onSuccessPlaid |
            frontEnd |
            publicToken: ${JSON.stringify(publicToken)} |
          `,
          json: JSON.stringify(metadata),
        },
      },
    })
  }

  const config = {
    // countryCodes: ['US'],

    env: context.testMode ? 'sandbox' : 'production',
    clientName: 'NachoNacho',
    publicKey: PLAID.PUBLIC_KEY_PLAID,
    // webhook: PLAID.WEBHOOK,
    product: ['transactions'],
    // language: 'en',
    token: props.plaidData.publicTokenFresh,
    // userLegalName: context.me.firstName + ' ' + context.me.lastName,
    // userEmailAddress: context.me.email,
    onExit,
    onEvent,
    onSuccess,
    onLoad,
  }
  const { open, ready } = usePlaidLink(config)

  return (
    <>
      <Button color="secondary" variant="outlined" onClick={() => open()} disabled={!ready} className="btnOpenPlaid">
        {`Reconnect Bank Account`}
        <div style={{ width: '10px' }} />
        <Icon>account_balance</Icon>
      </Button>
    </>
  )
}

export default AddPlaidRefreshLogin
