import React from 'react'
import { Companie } from '../../companie/Companie.type'
import Paper from '@material-ui/core/Paper'
import SourcesQuery from '../../source/list/SourcesQuery'
import PlaidDatasUserAccountQuery from '../../plaidData/list/PlaidDatasUserAccountQuery'
import { AppContext } from '../../AppContext'
import { Context } from '../../Context.type'
import AddPaymentSourceLogic from './AddPaymentSourceLogic'

type Props = {
  companie: Companie
}

const PaymentSources = (props: Props) => {
  const { context }: { context: Context } = React.useContext(AppContext)
  return (
    <>
      <div className="paperOut">
        <Paper className="paperIn">
          <h3>{`Payment Source`}</h3>

          <SourcesQuery
            variables={{
              orderBy: 'isDefaultSource_DESC',
              where: {
                isDeleted: false,
                testMode: context.testMode,
                companie: { id: props.companie.id },
              },
            }}
          />

          <div style={{ height: '40px' }} />

          <PlaidDatasUserAccountQuery
            variables={{
              orderBy: 'createdAt_DESC',
              where: {
                testMode: context.testMode,
                OR: [
                  { verificationStatus: 'pending_manual_verification' },
                  { verificationStatus: 'pending_automatic_verification' },
                ],
                companie: {
                  id: props.companie.id,
                },
              },
            }}
          />

          {context.me.role === 'ADMIN' && (
            <div className="paperOut">
              <Paper className="paperIn">
                <h3>{`Payment Source Deleted (admin)`}</h3>
                <SourcesQuery
                  variables={{
                    orderBy: 'isDefaultSource_DESC',
                    where: {
                      isDeleted: true,
                      testMode: context.testMode,
                      companie: { id: props.companie.id },
                    },
                  }}
                />
              </Paper>
            </div>
          )}
          {context.userRoleCompanie.permissions.includes('canCreateSource') && (
            <AddPaymentSourceLogic companie={props.companie} />
          )}
        </Paper>
      </div>
    </>
  )
}

export default PaymentSources
