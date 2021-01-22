import React from 'react'
import Button from '@material-ui/core/Button'
import { AppContext } from '../../AppContext'
import { useMutation } from '@apollo/react-hooks'
import { UserRoleCompanie } from '../UserRoleCompanie.type'
import gql from 'graphql-tag'

import { Context } from '../../Context.type'

export const MUTATION = gql`
  mutation UpdateUserRoleCompanie($data: UserRoleCompanieUpdateInput!, $where: UserRoleCompanieWhereUniqueInput!) {
    updateUserRoleCompanie(data: $data, where: $where) {
      id
      companieRole
      showSetupGuide
      isDeleted
      showNoDataPageHome
      isInvitationApproved
      showNoDataPagePaymentSource
      showNoDataPageTeam
      showNoDataPageIssuedCard
      showNoDataPageSubscription
      showNoDataPageInvoice

      sendEmailMyInvoiceSuccessful
      sendEmailInvoiceSuccessful

      sendSlackInvoiceSuccessful
      sendSlackMyInvoiceSuccessful
      permissions
    }
  }
`

type Props = {
  userRoleCompanie: UserRoleCompanie

  onCancel: () => void

  onUpdated: (userRoleCompanie: UserRoleCompanie) => void
}

const UpdateUserRoleCompanieAdmin = (props: Props) => {
  const { context }: { context: Context } = React.useContext(AppContext)

  const [updateUserRoleCompanie] = useMutation(MUTATION)

  const updateUserRoleCompanieF = async () => {
    let newData
    try {
      newData = await updateUserRoleCompanie({
        variables: {
          where: {
            id: props.userRoleCompanie.id,
          },
          data: {
            companieRole: props.userRoleCompanie.companieRole,
            sendEmailInvoiceSuccessful: props.userRoleCompanie.sendEmailInvoiceSuccessful,
            sendEmailMyInvoiceSuccessful: props.userRoleCompanie.sendEmailMyInvoiceSuccessful,

            isInvitationApproved: props.userRoleCompanie.isInvitationApproved,
            sendSlackInvoiceSuccessful: props.userRoleCompanie.sendSlackInvoiceSuccessful,
            sendSlackMyInvoiceSuccessful: props.userRoleCompanie.sendSlackMyInvoiceSuccessful,

            showSetupGuide: props.userRoleCompanie.showSetupGuide,
            isDeleted: props.userRoleCompanie.isDeleted,

            showNoDataPageHome: props.userRoleCompanie.showNoDataPageHome,
            showNoDataPagePaymentSource: props.userRoleCompanie.showNoDataPagePaymentSource,
            showNoDataPageTeam: props.userRoleCompanie.showNoDataPageTeam,
            showNoDataPageIssuedCard: props.userRoleCompanie.showNoDataPageIssuedCard,
            showNoDataPageSubscription: props.userRoleCompanie.showNoDataPageSubscription,
            showNoDataPageInvoice: props.userRoleCompanie.showNoDataPageInvoice,
          },
        },
      })
    } catch (e) {
      // console.log(e)
      e.graphQLErrors.some((graphQLError) => context.openSnackBar(true, graphQLError.message, 'error'))
    }
    if (newData) {
      props.onUpdated(newData)
      context.openSnackBar(true, 'Saved!', 'message')
    }
  }

  return (
    <>
      <Button color="secondary" variant="outlined" disabled={false} onClick={() => updateUserRoleCompanieF()}>
        {`Update`}
      </Button>{' '}
      <Button onClick={() => props.onCancel()}>{`Cancel`}</Button>
    </>
  )
}

export default UpdateUserRoleCompanieAdmin
