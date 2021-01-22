import React from 'react'
import gql from 'graphql-tag'
import { useMutation, useApolloClient } from '@apollo/react-hooks'
import Button from '@material-ui/core/Button'
import { CustomLink } from '../CustomLink.type'
import CustomLinkForm from './CustomLinkForm'
// import { Product } from '../../product/Product.type'
// import { useHistory } from 'react-router-dom'

export const MUTATION = gql`
  mutation UpdateCustomLinkMutation($data: CustomLinkUpdateInput!, $where: CustomLinkWhereUniqueInput!) {
    updateCustomLink(data: $data, where: $where) {
      id
      link
      anchor
    }
  }
`

type Props = {
  customLink: CustomLink
  // product: Product
  onUpdate: () => void
  onCancel: () => void
  // cleanFields: () => void
}

const EditCustomLink = (props: Props) => {
  // const history = useHistory()
  const [customLink, setCustomLink] = React.useState(props.customLink)
  const [message, setMessage] = React.useState('')
  const client = useApolloClient()
  const [updateCustomLink] = useMutation(MUTATION)

  const updateCustomLinkF = async () => {
    let customLinkUpdated
    try {
      customLinkUpdated = await updateCustomLink({
        variables: {
          data: {
            link: customLink.link,

            anchor: customLink.anchor,
          },
          where: {
            id: customLink.id,
          },
        },
      })
    } catch (e) {
      console.log(e)
      e.graphQLErrors.some((graphQLError) => setMessage(graphQLError.message))
      // setMessage(e.graphQLErrors[0].message)
    }
    if (customLinkUpdated) {
      client.resetStore()
      props.onUpdate()
    }
    // history.push('/admin/customLinks')
  }
  return (
    <>
      <CustomLinkForm customLink={customLink} setCustomLink={(customLink: CustomLink) => setCustomLink(customLink)} />
      <div style={{ height: '10px' }} />
      <Button color="primary" variant="outlined" onClick={() => updateCustomLinkF()}>
        {`Save`}
      </Button>{' '}
      <Button onClick={() => props.onCancel()}>Cancel</Button>
      <div className="secondary">{message}</div>
    </>
  )
}

export default EditCustomLink
