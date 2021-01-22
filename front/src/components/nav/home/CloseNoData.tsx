import React from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import { Button } from '@material-ui/core'

export const UPDATE_USER_ROLE_COMPANIE_MUTATION = gql`
  mutation UpdateUserRoleCompanie($data: UserRoleCompanieUpdateInput!, $where: UserRoleCompanieWhereUniqueInput!) {
    updateUserRoleCompanie(data: $data, where: $where) {
      id
      showNoDataPageHome
      showNoDataPagePaymentSource
      showNoDataPageTeam
      showNoDataPageTeam
      showNoDataPageIssuedCard
      showNoDataPageSubscription
      showNoDataPageInvoice
    }
  }
`

type Props = {
  onClose: () => void
  cta: string
  color: 'inherit' | 'primary' | 'secondary' | 'default' | undefined
  variant: 'text' | 'outlined' | 'contained' | undefined
  userRoleCompanieId: string
  type: string
}
const CloseNoData = (props: Props) => {
  const [updateUserRoleCompanie] = useMutation(UPDATE_USER_ROLE_COMPANIE_MUTATION)

  const handleClose = async () => {
    await updateUserRoleCompanie({
      variables: {
        where: { id: props.userRoleCompanieId },
        data: {
          showNoDataPageHome: props.type === 'showNoDataPageHome' ? false : undefined,
          showNoDataPagePaymentSource: props.type === 'showNoDataPagePaymentSource' ? false : undefined,
          showNoDataPageTeam: props.type === 'showNoDataPageTeam' ? false : undefined,
          showNoDataPageIssuedCard: props.type === 'showNoDataPageIssuedCard' ? false : undefined,
          showNoDataPageSubscription: props.type === 'showNoDataPageSubscription' ? false : undefined,
          showNoDataPageInvoice: props.type === 'showNoDataPageInvoice' ? false : undefined,
        },
      },
    })
    props.onClose()
  }

  return (
    <>
      <Button color={props.color} variant={props.variant} onClick={handleClose}>
        {props.cta}
      </Button>
      {/* <IconButton onClick={handleClose} color="primary">
        <Icon>clear</Icon>
      </IconButton> */}
    </>
  )
}

export default CloseNoData
