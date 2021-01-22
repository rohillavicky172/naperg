import React from 'react'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import { useHistory } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import { User } from '../../User.type'
import gql from 'graphql-tag'

export const UPDATE_USER_MUTATION = gql`
  mutation UpdateUserMutation($data: UserUpdateInput!, $where: UserWhereUniqueInput!) {
    updateUser(data: $data, where: $where) {
      id
      lastName
      firstName
    }
  }
`

type Props = {
  user: User
}

const UserNameForm = (props: Props) => {
  const history = useHistory()
  const [updateUser] = useMutation(UPDATE_USER_MUTATION)
  const [user, setUser] = React.useState(props.user)
  const [errorMessage, setErrorMessage] = React.useState('')

  const updateUserF = async () => {
    let id = user.id

    try {
      await updateUser({
        variables: {
          where: { id: id },
          data: {
            firstName: user.firstName,
            lastName: user.lastName,
          },
        },
      })
    } catch (e) {
      e.graphQLErrors.some((graphQLError) => setErrorMessage(graphQLError.message))
    }
  }

  return (
    <>
      <Grid item xs={12} sm={6}>
        <FormControl>
          <InputLabel htmlFor="firstName">{`First name`}</InputLabel>
          <Input
            id="firstName"
            className="inputResponsive"
            onChange={(e) =>
              setUser({
                ...user,
                firstName: e.target.value,
              })
            }
            type="text"
            value={user.firstName}
          />
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControl>
          <InputLabel htmlFor="lastName">{`Last name`}</InputLabel>
          <Input
            id="lastName"
            className="inputResponsive"
            onChange={(e) =>
              setUser({
                ...user,
                lastName: e.target.value,
              })
            }
            type="text"
            value={user.lastName}
          />
        </FormControl>
      </Grid>

      <Grid item xs={12} sm={12}>
        <br />
      </Grid>
      <Grid item xs={12} sm={12}>
        <div className="">
          <Button variant="outlined" color={'secondary'} onClick={() => updateUserF()}>
            {`Next`}
          </Button>{' '}
          <Button onClick={() => history.goBack()}>{`Cancel`}</Button>
        </div>
      </Grid>
      <div className="secondary">{errorMessage}</div>
    </>
  )
}

export default UserNameForm
