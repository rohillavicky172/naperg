import React from 'react'
import gql from 'graphql-tag'
import { useMutation, useApolloClient } from '@apollo/react-hooks'
import { CustomLink } from '../CustomLink.type'
import ButtonSecondValidation from '../../nav/ButtonSecondValidation'
// import Button from '@material-ui/core/Button'

export const MUTATION = gql`
  mutation DeleteCustomLinkMutation($customLinkId: String!) {
    deleteCustomLink(customLinkId: $customLinkId) {
      id
    }
  }
`
type Props = {
  customLink: CustomLink
}

const DeleteCustomLink = (props: Props) => {
  // const { productId }: ParamTypes = useParams<ParamTypes>()
  // const history = useHistory()
  // const [customLink, setCustomLink] = React.useState(customLinkClass)
  // const [message, setMessage] = React.useState('')
  const client = useApolloClient()
  const [deleteCustomLink] = useMutation(MUTATION)

  const deleteCustomLinkF = async () => {
    let customLinkCreated
    try {
      customLinkCreated = await deleteCustomLink({
        variables: {
          customLinkId: props.customLink.id,
        },
      })
    } catch (e) {
      //
      console.log(e)
    }
    if (customLinkCreated) {
      // console.log(customLinkCreated)
      // setMessage('Your CustomLink has been succesfully saved!')
      // setCustomLink(customLinkClass)
      client.resetStore()
      // props.onUpdate()
      // history.push('/admin/customLink/' + customLinkCreated.data.deleteCustomLink.id)
    }
  }
  return (
    <ButtonSecondValidation
      color="primary"
      variant="outlined"
      onClick={deleteCustomLinkF}
      buttonText={'Delete'}
      size={'medium'}
    />
  )
}

export default DeleteCustomLink
