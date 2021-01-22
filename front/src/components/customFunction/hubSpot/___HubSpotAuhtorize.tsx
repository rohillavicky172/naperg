import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { Button } from '@material-ui/core'
import { FormControl } from '@material-ui/core'
import { InputLabel } from '@material-ui/core'
import { Input } from '@material-ui/core'

export const GET_ACCESS_TOKEN_HUBSPOT = gql`
  mutation GetAccessTokenHubspot($code: String!) {
    getAccessTokenHubspot(code: $code)
  }
`
export const REFRESH_CONTACTS_HUBSPOT = gql`
  mutation refreshContactsHubspot(
    $where: UserWhereInput!
    $orderBy: UserOrderByInput
    $skip: Int
    $first: Int
    $isPersonal: Boolean!
  ) {
    refreshContactsHubspot(where: $where, orderBy: $orderBy, skip: $skip, first: $first, isPersonal: $isPersonal)
  }
`

const HubSpotAuhtorize = () => {
  const [code, setCode] = React.useState('')
  const [show, setShow] = React.useState(false)

  const [getAccessTokenHubspot] = useMutation(GET_ACCESS_TOKEN_HUBSPOT)

  const getAccessTokenHubspotF = async () => {
    try {
      await getAccessTokenHubspot({ variables: { code } })
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <>
      <Button variant="outlined" color={'primary'} onClick={() => setShow(!show)}>
        Authorize
      </Button>

      {show && (
        <div>
          <p>
            <a
              className="link"
              target="_blank"
              rel="noopener noreferrer"
              href={`https://app.hubspot.com/oauth/authorize?client_id=c4920524-f069-4670-bf5d-5839ae1e4241&redirect_uri=https://nachonacho.com&scope=contacts`}>
              Get Token
            </a>
          </p>
          <div>
            <FormControl>
              <InputLabel htmlFor="code">{`code`}</InputLabel>
              <Input id="code" type="text" value={code} onChange={(e) => setCode(e.target.value)} />
            </FormControl>
          </div>

          <Button onClick={() => getAccessTokenHubspotF()}>Authorize</Button>
        </div>
      )}
    </>
  )
}

export default HubSpotAuhtorize
