import React from 'react'
import { useLocation } from 'react-router-dom'
import gql from 'graphql-tag'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import { useMutation, useApolloClient } from '@apollo/react-hooks'
import ButtonLoadingAfterClick from '../nav/ButtonLoadingAfterClick'
import ProductTitle from '../product/single/page/ProductTitle'
const queryString = require('query-string')
const validator = require('email-validator')

export const MUTATION = gql`
  mutation RequestUserReview(
    $email: String!
    $firstName: String!
    $lastName: String!
    $productId: String!
    $privateMessageInviter: String!
    $invitedByCompanieId: String!
    $companieName: String!
  ) {
    requestUserReview(
      email: $email
      firstName: $firstName
      productId: $productId
      lastName: $lastName
      privateMessageInviter: $privateMessageInviter

      invitedByCompanieId: $invitedByCompanieId
      companieName: $companieName
    ) {
      id
    }
  }
`
type Props = {
  companieId: string
  productId: string
}

const ReviewRequest = (props: Props) => {
  const client = useApolloClient()

  const location = useLocation()

  const [requestUserReview] = useMutation(MUTATION)
  const [loading, setLoading] = React.useState(false)
  const parsed = queryString.parse(location.search)
  const [email, setEmail] = React.useState(parsed.email ? parsed.email : '')
  const [emailValidation, setEmailValidation] = React.useState(true)
  const [lastNameValidation, setLastNameValidation] = React.useState(true)
  const [firstNameValidation, setFirstNameValidation] = React.useState(true)
  const [firstName, setFirstName] = React.useState('')
  const [lastName, setLastName] = React.useState('')
  const [privateMessageInviter, setPrivateMessageInviter] = React.useState('')
  const [companieName, setCompanieName] = React.useState('')
  const [message, setMessage] = React.useState('')

  const resetFields = () => {
    setFirstName('')
    setLastName('')
    setPrivateMessageInviter('')
    setEmail('')
    setCompanieName('')
  }

  const onChangeEmail = (email: string) => {
    setEmail(email)
    setEmailValidation(validator.validate(email))
  }
  const onChangeLastName = (lastName: string) => {
    setLastName(lastName)
    setLastNameValidation(lastName.length > 0)
  }
  const onChangeFirstName = (firstName: string) => {
    setFirstName(firstName)
    setFirstNameValidation(firstName.length > 0)
  }

  const handleKey = (data) => {
    if (data.charCode === 13) {
      _confirm()
    }
  }

  const isFormValidation = () => {
    return lastNameValidation && firstNameValidation && email.length > 1 && emailValidation
  }

  const _confirm = async () => {
    if (!isFormValidation()) {
      // setMessage('Error')
      return
    }

    // this.setState({ loading: true })
    setLoading(true)

    let result
    try {
      result = await requestUserReview({
        variables: {
          firstName,
          lastName,
          privateMessageInviter,
          email,
          companieName,
          productId: props.productId,
          invitedByCompanieId: props.companieId,
        },
      })
    } catch (e) {
      setLoading(false)

      setMessage(`Error.`)
      throw e
    }

    const user = result?.data?.requestUserReview
    console.log(result)
    setLoading(false)
    if (user) {
      resetFields()
      setMessage(`Invitation sent`)
      client.resetStore()
    }
  }

  return (
    <>
      <div className="tac">
        {/* {queryString.parse(location.search).invitationToken && <h4>{`Approve Invitation`}</h4>} */}
        {/* <h3></h3> */}
        <ProductTitle title={'Invite your users to write reviews for '} productId={props.productId} />
        <div className="">
          <br />
          <div>
            <FormControl>
              <InputLabel htmlFor="firstName">{`First Name`}</InputLabel>
              <Input
                id="firstName"
                className="inputResponsive"
                error={!firstNameValidation}
                value={firstName}
                onChange={(e) => onChangeFirstName(e.target.value)}
                type="text"
              />
              {!firstNameValidation && <FormHelperText error>{`Cannot be empty`}</FormHelperText>}
            </FormControl>
          </div>
          <div>
            <FormControl>
              <InputLabel htmlFor="lastName">{`Last name`}</InputLabel>
              <Input
                id="lastName"
                className="inputResponsive"
                value={lastName}
                error={!lastNameValidation}
                onChange={(e) => onChangeLastName(e.target.value)}
                type="text"
              />
              {!lastNameValidation && <FormHelperText error>{`Cannot be empty`}</FormHelperText>}
            </FormControl>
          </div>
          <div>
            <FormControl>
              <InputLabel htmlFor="email">{`Email`}</InputLabel>
              <Input
                id="email"
                className="inputResponsive"
                value={email}
                error={!emailValidation}
                onChange={(e) => onChangeEmail(e.target.value)}
                type="text"
              />
            </FormControl>
          </div>

          <div>
            <FormControl>
              <InputLabel htmlFor="name">{`Company/Group name`}</InputLabel>
              <Input
                className="inputResponsive"
                value={companieName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCompanieName(e.target.value)}
                type="text"
              />
            </FormControl>
          </div>
          <div>
            <FormControl>
              <InputLabel htmlFor="privateMessageInviter">{`Private Message`}</InputLabel>
              <Input
                className="inputResponsive"
                multiline
                value={privateMessageInviter}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPrivateMessageInviter(e.target.value)}
                type="text"
                onKeyPress={handleKey}
              />
            </FormControl>
          </div>

          <br />

          <div>
            <ButtonLoadingAfterClick
              id={'idButton'}
              icon={''}
              color={'secondary'}
              disabled={!isFormValidation()}
              variant={'outlined'}
              size={'medium'}
              buttonText={`Submit`}
              buttonLoadingText={`Setting up...`}
              onClick={_confirm}
              loading={loading}
            />
          </div>
          <div className="secondary">{message}</div>
        </div>
      </div>
    </>
  )
}

export default ReviewRequest
