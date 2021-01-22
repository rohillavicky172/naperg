import React from 'react'
import gql from 'graphql-tag'
import { useMutation, useApolloClient } from '@apollo/react-hooks'
import Button from '@material-ui/core/Button'
import { CustomLink, customLinkClass } from '../CustomLink.type'
import CustomLinkForm from './CustomLinkForm'

export const MUTATION = gql`
  mutation CreateCustomLinkMutation($data: CustomLinkCreateInput!) {
    createCustomLink(data: $data) {
      id
      link
      anchor
    }
  }
`
type Props = {
  productId: string
}

const CreateCustomLink = (props: Props) => {
  const [customLink, setCustomLink] = React.useState(customLinkClass)
  const [show, setShow] = React.useState(false)

  const client = useApolloClient()
  const [createCustomLink] = useMutation(MUTATION)

  const createCustomLinkF = async () => {
    let customLinkCreated
    try {
      customLinkCreated = await createCustomLink({
        variables: {
          data: {
            link: customLink.link,
            anchor: customLink.anchor,
            productId: props.productId,
          },
        },
      })
    } catch (e) {
      console.log(e)
    }
    if (customLinkCreated) {
      console.log(customLinkCreated)
      setCustomLink(customLinkClass)
      setShow(false)
      client.resetStore()
    }
  }
  return (
    <>
      {show ? (
        <>
          <CustomLinkForm customLink={customLink} setCustomLink={(customLink: CustomLink) => setCustomLink(customLink)} />
          <div style={{ height: '30px' }} />
          <Button color="default" variant="outlined" onClick={() => setShow(false)}>
            {`Cancel`}
          </Button>{' '}
          <Button color="primary" variant="outlined" onClick={() => createCustomLinkF()}>
            {`Create`}
          </Button>
        </>
      ) : (
        <Button color="primary" variant="outlined" onClick={() => setShow(true)}>
          {`New Link`}
        </Button>
      )}
    </>
  )
}

export default CreateCustomLink
