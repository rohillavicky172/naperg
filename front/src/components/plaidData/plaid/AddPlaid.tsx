import React from 'react'
import { useMutation, useApolloClient } from '@apollo/react-hooks'
import { useHistory } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import Icon from '@material-ui/core/Icon'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import DialogContent from '@material-ui/core/DialogContent'
import Dialog from '@material-ui/core/Dialog'
import ButtonLoadingAfterClick from '../../nav/ButtonLoadingAfterClick'

import { usePlaidLink } from 'react-plaid-link'
import { AppContext } from '../../AppContext'
import { Context } from '../../Context.type'
// import { CREATE_LOG_MUTATION } from '../../log/GraphQL'
import { PLAID } from '../../../config/config'
import { Metadata, metadataClass, PlaidAccount } from '../PlaidData.type'
import './Style.css'
import gql from 'graphql-tag'

export const CREATE_PLAID_BANK = gql`
  mutation CreatePlaidBank(
    $companieId: ID!
    $publicToken: ID!
    $accountId: ID!
    $metaDataString: String
    $name: String
    $mask: String
    $type: String
    $subtype: String
    $verificationStatus: String
    $institution: String
  ) {
    createPlaidBank(
      companieId: $companieId
      publicToken: $publicToken
      accountId: $accountId
      metaDataString: $metaDataString
      subtype: $subtype
      type: $type
      mask: $mask
      name: $name
      verificationStatus: $verificationStatus
      institution: $institution
    ) {
      id
      verificationStatus
    }
  }
`

type Props = {
  companieId: string
}

const AddPlaid = (props: Props) => {
  const [createPlaidBank] = useMutation(CREATE_PLAID_BANK)
  // const [createLog] = useMutation(CREATE_LOG_MUTATION)
  const [mode, setMode] = React.useState('button')
  const [eventName, setEventName] = React.useState('')
  const [publicToken, setPublicToken] = React.useState('button')
  const [metadata, setMetadata] = React.useState(metadataClass)
  const [checkingAccounts, setCheckingAccounts] = React.useState<PlaidAccount[]>([])

  const client = useApolloClient()
  const history = useHistory()
  const { context }: { context: Context } = React.useContext(AppContext)

  React.useEffect(() => {
    if (eventName === 'HANDOFF' && checkingAccounts.length > 0 && publicToken && metadata) {
      // if (checkingAccounts.length === 1) {
      //   selectAccount(checkingAccounts[0].id, publicToken, metadata)
      // } else {
      setMode('selectAccount')
      // }
    }
  }, [eventName, checkingAccounts, publicToken, metadata])

  const onExit = async (err: any, metadata: Metadata) => {
    console.log('onExit')
    // createLog({
    //   variables: {
    //     data: {
    //       testMode: context.testMode,
    //       date: new Date(),
    //       user: { connect: { id: context.me.id } },
    //       companie: { connect: { id: props.companieId } },
    //       message: `
    //         event: onExitPlaid |
    //         frontEnd
    //         `,
    //       json: JSON.stringify(metadata),
    //       jsonError: JSON.stringify(err),
    //     },
    //   },
    // })
  }

  const onEvent = async (eventName: string, metadata: Metadata) => {
    // console.log(eventName)
    setEventName(eventName)
    // if(eventName ==='HANDOFF') {
    //   setIsPlaidClosed(true)
    // }
  }
  const onLoad = () => {}

  const onSuccess = async (publicToken: string, metadata: Metadata) => {
    // createLog({
    //   variables: {
    //     data: {
    //       event: 'plaid',
    //       testMode: context.testMode,
    //       date: new Date(),
    //       user: { connect: { id: context.me.id } },
    //       companie: { connect: { id: props.companieId } },
    //       message: `
    //         event: onSuccessPlaid |
    //         frontEnd |
    //         publicToken: ${JSON.stringify(publicToken)} |
    //       `,
    //       json: JSON.stringify(metadata),
    //     },
    //   },
    // })
    const checkingAccounts = metadata.accounts.filter(
      (account: PlaidAccount) => account.subtype === 'checking' || account.subtype === 'savings'
    )
    setMode('loading')
    setPublicToken(publicToken)
    setMetadata(metadata)
    setCheckingAccounts(checkingAccounts)
    // if (checkingAccounts.length === 1) {
    //   selectAccount(checkingAccounts[0].id, publicToken, metadata)
    // } else {
    //   setTimeout(() => setMode('selectAccount'), 1200)
    // }
  }
  const config = {
    countryCodes: ['US'],
    clientName: 'NachoNacho',
    env: context.testMode ? 'sandbox' : 'production',
    webhook: PLAID.WEBHOOK,
    product: ['auth'],
    language: 'en',
    // token: props.token,
    userLegalName: context.me.firstName + ' ' + context.me.lastName,
    userEmailAddress: context.me.email,
    publicKey: PLAID.PUBLIC_KEY_PLAID,
    onExit,
    onEvent,
    onSuccess,
    onLoad,
  }
  const { open, ready } = usePlaidLink(config)

  const selectAccount = async (id: string, publicToken: string, metadata: Metadata) => {
    const selectedAccount = metadata.accounts.find((account) => account.id === id)
    setEventName('')
    setMode('loading')
    if (!selectedAccount) {
      return
    }
    let plaidDataQuery
    try {
      plaidDataQuery = await createPlaidBank({
        variables: {
          companieId: props.companieId,
          accountId: selectedAccount.id,
          verificationStatus: selectedAccount.verification_status,
          subtype: selectedAccount.subtype,
          type: selectedAccount.type,
          mask: selectedAccount.mask,
          name: selectedAccount.name,
          institution: metadata.institution.name,
          publicToken: publicToken,
          metaDataString: JSON.stringify(metadata),
        },
      })
    } catch (e) {
      e.graphQLErrors.some((graphQLError) => context.openSnackBar(true, graphQLError.message, 'message'))

      setMode('button')
    }

    console.log('Bank added')
    setTimeout(() => setMode('button'), 600)

    if (plaidDataQuery) {
      const verificationStatus = plaidDataQuery.data.createPlaidBank.verificationStatus

      if (!verificationStatus) {
        client.resetStore()
        history.push('/paymentSource/' + props.companieId)
      }

      if (verificationStatus === 'manually_verified') {
        client.resetStore()
      }
      if (verificationStatus === 'pending_automatic_verification') {
        client.resetStore()
        history.push('/paymentSource/' + props.companieId)
      }
      if (verificationStatus === 'pending_manual_verification') {
        client.resetStore()
        history.push('/paymentSource/' + props.companieId)
      }
    }
  }
  console.log(mode)
  return (
    <>
      {mode === 'button' && (
        <>
          <Button color="primary" variant="outlined" onClick={() => open()} disabled={!ready} className="btnOpenPlaid">
            {`+ Bank account`}
            <div style={{ width: '10px' }} />
            <Icon>account_balance</Icon>
          </Button>
        </>
      )}
      {mode === 'loading' && <h3>Loading..</h3>}

      <Dialog open={mode === 'selectAccount'} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogContent>
          <>
            <h3>{`Select your account in ${metadata.institution.name}`}</h3>
            <div>
              {checkingAccounts.map((account: PlaidAccount) => (
                <div key={account.id} className="paperOut">
                  <Paper className="paperIn">
                    <Grid container>
                      <Grid item xs={12} sm={3} className="marginAuto">
                        <ButtonLoadingAfterClick
                          id={'idButton'}
                          icon={''}
                          disabled={false}
                          color={'secondary'}
                          variant={'outlined'}
                          size={'medium'}
                          buttonText={`Select`}
                          buttonLoadingText={`Setting up...`}
                          onClick={() => selectAccount(account.id, publicToken, metadata)}
                          loading={false}
                        />
                      </Grid>

                      <Grid item xs={12} sm={9} className="marginAuto">
                        {account.name}; {`Account ending in ${account.mask}`}
                      </Grid>
                    </Grid>
                  </Paper>
                </div>
              ))}
            </div>
          </>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default AddPlaid
