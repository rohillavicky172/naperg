import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import Button from '@material-ui/core/Button'
import { UserRoleCompanie } from '../../userRoleCompanie/UserRoleCompanie.type'
import { UPDATE_USER_ROLE_COMPANIE_MUTATION } from '../GraphQL'

type Props = {
  userRoleCompanie: UserRoleCompanie
  onCancel: () => void
  onUpdated: (userRoleCompanie: UserRoleCompanie) => void
}

const UserRoleCompanieUpdate = (props: Props) => {
  const [updateUserRoleCompanie] = useMutation(UPDATE_USER_ROLE_COMPANIE_MUTATION)
  const [message, setMessage] = React.useState('')
  const updateUserRoleCompanieF = async () => {
    let newData
    try {
      newData = await updateUserRoleCompanie({
        variables: {
          where: {
            id: props.userRoleCompanie.id,
          },
          data: {
            isInvitationApproved: props.userRoleCompanie.isInvitationApproved,
            sendEmailInvoiceSuccessful: props.userRoleCompanie.sendEmailInvoiceSuccessful,
            sendEmailMyInvoiceSuccessful: props.userRoleCompanie.sendEmailMyInvoiceSuccessful,

            sendSlackInvoiceSuccessful: props.userRoleCompanie.sendSlackInvoiceSuccessful,
            sendSlackMyInvoiceSuccessful: props.userRoleCompanie.sendSlackMyInvoiceSuccessful,
          },
        },
      })
    } catch (e) {
      e.graphQLErrors.some((graphQLError) => setMessage(graphQLError.message))
    }
    if (newData) {
      props.onUpdated(newData)
      // this.props.context.openSnackBar(true, 'Saved!', 'message')
    }
  }
  return (
    <>
      <Button color="secondary" variant="outlined" onClick={() => updateUserRoleCompanieF()}>
        {`Update`}
      </Button>{' '}
      <Button onClick={() => props.onCancel()}>{`Cancel`}</Button>
      <div className="secondary"> {message}</div>
    </>
  )
}

export default UserRoleCompanieUpdate
