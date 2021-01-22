import React from 'react'
import Button from '@material-ui/core/Button'
import { AppContext } from '../../AppContext'
import { useMutation } from '@apollo/react-hooks'
import { UserRoleCompanie } from '../../userRoleCompanie/UserRoleCompanie.type'
import { Context } from '../../Context.type'
import gql from 'graphql-tag'

export const MUTATION = gql`
  mutation UpdateCompanieRole($data: UserRoleCompanieUpdateInput!, $where: UserRoleCompanieWhereUniqueInput!) {
    updateCompanieRole(data: $data, where: $where) {
      id
      companieRole
    }
  }
`

type Props = {
  userRoleCompanie: UserRoleCompanie
  // context: Context
  disabled: boolean
  onCancel: () => void
  // updateCompanie: any
  // product: Product
  // updateUserRoleCompanie: any
  // companie: Companie
  // typeField: string
  onUpdated: (userRoleCompanie: UserRoleCompanie) => void
}

// class UpdateCompanieRole extends React.Component<Props, State> {
const UpdateCompanieRole = (props: Props) => {
  const { context }: { context: Context } = React.useContext(AppContext)

  const [updateUserRoleCompanie] = useMutation(MUTATION)

  const updateUserRoleCompanieF = async () => {
    let newData
    // console.log(this.props.userRoleCompanie)
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

            sendSlackInvoiceSuccessful: props.userRoleCompanie.sendSlackInvoiceSuccessful,
            sendSlackMyInvoiceSuccessful: props.userRoleCompanie.sendSlackMyInvoiceSuccessful,

            showSetupGuide: props.userRoleCompanie.showSetupGuide,

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
      <Button color="secondary" variant="outlined" disabled={props.disabled} onClick={() => updateUserRoleCompanieF()}>
        {`Update`}
      </Button>{' '}
      <Button onClick={() => props.onCancel()}>{`Cancel`}</Button>
    </>
  )
}

export default UpdateCompanieRole
