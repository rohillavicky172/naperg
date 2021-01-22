import React from 'react'
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'
import { useMutation, useApolloClient } from '@apollo/react-hooks'
import { UserRoleCompanie } from '../userRoleCompanie/UserRoleCompanie.type'
import gql from 'graphql-tag'

export const MUTATION = gql`
  mutation RemoveUserFromCompanie($where: UserRoleCompanieWhereUniqueInput!) {
    removeUserFromCompanie(where: $where) {
      id
    }
  }
`

type Props = {
  onCancel: () => void
  text: string
  userRoleCompanie: UserRoleCompanie
}

const RemoveUserFromCompanie = (props: Props) => {
  const client = useApolloClient()
  const [message, setMessage] = React.useState('')
  const [deleteUserRoleCompanie] = useMutation(MUTATION)

  const removeUserFromCompanieF = async () => {
    let newCompanie
    try {
      newCompanie = await deleteUserRoleCompanie({
        variables: {
          where: {
            id: props.userRoleCompanie.id,
          },
        },
      })
    } catch (e) {
      e.graphQLErrors.some((graphQLError) => setMessage(graphQLError.message))
    }
    if (newCompanie) {
      setMessage(`User successfully removed!`)
      client.resetStore()
    }
  }

  return (
    <div className="tac">
      <div className="responsiveMargin2 margin5">
        <Icon className="textSize15" color="secondary">
          warning
        </Icon>
        <h3 className="secondary">{props.text}</h3>
      </div>

      <Button color="secondary" variant="outlined" onClick={() => removeUserFromCompanieF()}>{`Yes, remove`}</Button>
      <Button onClick={props.onCancel}>{`Cancel`}</Button>
      <div className="secondary">{message}</div>
    </div>
  )
}

export default RemoveUserFromCompanie
