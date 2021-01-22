import React from 'react'
import { withContext } from '../../withContext'
import { Context } from '../../Context.type'
import Divider from '@material-ui/core/Divider'

import AuthDevicesQuery from './AuthDevicesQuery'

type State = {}

type Props = {
  context: Context
  userId: String
}

class AuthDevicesSection extends React.Component<Props, State> {
  render() {
    return (
      <>
        <h3>{`Device History`}</h3>
        <AuthDevicesQuery
          variables={{
            orderBy: 'lastLogin_DESC',
            where: {
              isDeleted: false,
              user: {
                id: this.props.userId,
              },
            },
          }}
        />
        {this.props.context.me.role === 'ADMIN' && (
          <>
            <Divider />
            ADMIN: Deleted
            <AuthDevicesQuery
              variables={{
                orderBy: 'lastLogin_DESC',
                where: {
                  isDeleted: true,
                  user: {
                    id: this.props.userId,
                  },
                },
              }}
            />
          </>
        )}
      </>
    )
  }
}

export default withContext(AuthDevicesSection)
