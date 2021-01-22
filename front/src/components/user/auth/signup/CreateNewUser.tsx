import React from 'react'
import { AppContext } from '../../../AppContext'
import { useLocation } from 'react-router-dom'
import { Context } from '../../../Context.type'
import { CREATE_USER_MUTATION } from '../GraphQL'
import EmailElement from '../EmailElement'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import utils from '../../../utils'
import { useMutation } from '@apollo/react-hooks'
import ButtonLoadingAfterClick from '../../../nav/ButtonLoadingAfterClick'
import { companieClass } from '../../../companie/Companie.type'

const queryString = require('query-string')
// import { graphql, withApollo } from 'react-apollo'
// import { flowRight as compose } from 'lodash'
// import { Context } from '../Context.type'
// import ToggleTestMode from '../../../nav/header/ToggleTestMode'
// import { withRouter } from 'react-router'
// import { Client } from '../../../Client.type'
// import { withContext } from '../../../withContext'
// import { Location } from '../../../Location.type'

// type State = {
//   email: string
//   lastNameValidation: boolean
//   firstNameValidation: boolean

//   showCreateCompanie: boolean
//   emailValide: boolean
//   loading: boolean
//   firstName: string
//   lastName: string
//   idUser: string
//   privateMessageInviter: string
//   companieName: string
// }

type Props = {
  showPrivateMessageInviter: boolean
  subTitle: string
  // client: Client
  // createUser: any
  // context: Context
  // history: any
  signupType: string
  // companieName: string
  title: string
  // location: Location
}

const CreateNewUser = (props: Props) => {
  const location = useLocation()
  const { context }: { context: Context } = React.useContext(AppContext)
  const [createUser] = useMutation(CREATE_USER_MUTATION)
  const [loading, setLoading] = React.useState(false)
  // const [showCreateCompanie, setShowCreateCompanie] = React.useState(false)
  const parsed = queryString.parse(location.search)
  const [email, setEmail] = React.useState(parsed.email ? parsed.email : '')
  const [lastNameValidation, setLastNameValidation] = React.useState(true)
  const [firstNameValidation, setFirstNameValidation] = React.useState(true)
  const [emailValide, setEmailValide] = React.useState(true)
  const [firstName, setFirstName] = React.useState('')
  const [lastName, setLastName] = React.useState('')
  const [privateMessageInviter, setPrivateMessageInviter] = React.useState('')
  // const [idUser, setIdUser] = React.useState('')
  const [companieName, setCompanieName] = React.useState('')
  const [message, setMessage] = React.useState('')
  // state = {
  //   loading: false,
  //   showCreateCompanie: false,
  //   email: queryString.parse(props.location.search).email ? queryString.parse(props.location.search).email : '',
  //   lastNameValidation: true,
  //   firstNameValidation: true,

  //   emailValide: true,
  //   firstName: '',
  //   lastName: '',
  //   privateMessageInviter: '',
  //   idUser: '',
  //   companieName: '',
  // }

  const resetFields = () => {
    // setShowCreateCompanie(false)
    setFirstName('')
    setLastName('')
    setPrivateMessageInviter('')
    setEmail('')
    setCompanieName('')
    // this.setState({
    //   ...this.state,
    //   showCreateCompanie: false,
    //   firstName: '',
    //   lastName: '',
    //   privateMessageInviter: '',
    //   email: '',
    //   companieName: '',
    // })
  }

  const onChangeEmail = (stateEmail) => {
    setEmail(stateEmail.email)
    setEmailValide(stateEmail.inputValidation2)
    // this.setState({
    //   email: stateEmail.email,
    //   emailValide: stateEmail.inputValidation2,
    // })
  }
  const onChangeLastName = (lastName: string) => {
    setLastName(lastName)
    setLastNameValidation(lastName.length > 0)
    // this.setState({
    //   lastName,
    //   lastNameValidation: lastName.length > 0,
    // })
  }
  const onChangeFirstName = (firstName: string) => {
    setFirstName(firstName)
    setFirstNameValidation(firstName.length > 0)
    // this.setState({
    //   firstName,
    //   firstNameValidation: firstName.length > 0,
    // })
  }

  const handleKey = (data) => {
    if (data.charCode === 13) {
      _confirm()
    }
  }

  const isFormValidation = () => {
    return lastNameValidation && firstNameValidation && email.length > 1 && emailValide
  }

  const _confirm = async () => {
    if (!isFormValidation()) {
      // props.context.openSnackBar(true, 'Error', 'message')
      setMessage('Error')
      return
    }

    // this.setState({ loading: true })
    setLoading(true)

    const companieCreateInput = {
      ...companieClass,
      id: undefined,
      name: companieName,
      userStripe: undefined,
      createdAt: undefined,
    }

    let result
    try {
      result = await createUser({
        variables: {
          signupType: props.signupType,
          firstName: firstName,
          privateMessageInviter: privateMessageInviter,
          lastName: lastName,
          email: email,
          authDevice: utils.getAuthDevice(email),
          invitedByCompanieId: context.userRoleCompanie.companie.id,
          companie: companieCreateInput,
        },
      })
    } catch (e) {
      setLoading(false)
      // this.setState({ loading: false })
      if (e.graphQLErrors.length) {
        // props.context.openSnackBar(true, e.graphQLErrors[0].message, 'message')
      } else {
        // props.context.openSnackBar(true, `An unexpected error has occurred. Please try again or contact us.`, 'error')
      }

      throw e
    }

    const user = result?.data?.createUser
    // this.setState({ idUser: user.id, loading: false })
    // setIdUser(user.id)
    setLoading(false)
    if (user) {
      resetFields()
      // props.context.openSnackBar(true, `Invitation sent`, 'message')
      setMessage(`Invitation sent`)
    }
  }

  // render() {
  return (
    <>
      <div className="tac">
        {queryString.parse(location.search).invitationToken && <h4>{`Approve Invitation`}</h4>}
        <h3>{props.title}</h3>
        <h4>{props.subTitle}</h4>

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
            <EmailElement
              className="inputResponsive"
              handleNext={() => {}}
              email={email}
              onChange2={(stateEmail) => onChangeEmail(stateEmail)}
            />
          </div>

          <div>
            <FormControl>
              <InputLabel htmlFor="name">{`Company/Group name`}</InputLabel>
              <Input
                className="inputResponsive"
                value={companieName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCompanieName(e.target.value)}
                type="text"
                onKeyPress={handleKey}
              />
            </FormControl>
          </div>
          {props.showPrivateMessageInviter && (
            <div>
              <FormControl>
                <InputLabel htmlFor="privateMessageInviter">{`Private Message`}</InputLabel>
                <Input
                  className="inputResponsive"
                  multiline
                  value={privateMessageInviter}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPrivateMessageInviter(e.target.value)}
                  type="text"
                />
              </FormControl>
            </div>
          )}

          {/* {process.env.REACT_APP_ENV !== 'production' && <ToggleTestMode onClick={() => {}} />} */}
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
        </div>
        <div className="secondary">{message}</div>
      </div>
    </>
  )
}

export default CreateNewUser
