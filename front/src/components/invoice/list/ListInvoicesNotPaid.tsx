import React from 'react'
import ListInvoicesNotPaidQuery from './ListInvoicesNotPaidQuery'
import { AppContext } from '../../AppContext'
import { Context } from '../../Context.type'

const ListInvoicesNotPaid = () => {
  const { context }: { context: Context } = React.useContext(AppContext)
  if (!context.userRoleCompanie) {
    return null
  }

  if (!context.userRoleCompanie.permissions.includes('canSeeInvoicesInCompanie')) {
    return null
  }

  return (
    <>
      <ListInvoicesNotPaidQuery
        companieId={context.userRoleCompanie.companie.id}
        variables={{
          where: {
            testMode: context.testMode,
            status: 'ERROR_PAYMENT',
            type: 'VIRTUAL_CARD',
            companie: {
              id: context.userRoleCompanie.companie.id,
            },
          },
        }}
      />
    </>
  )
}

export default ListInvoicesNotPaid
