import React from 'react'
import { Route } from 'react-router-dom'
import LoginPage from '../user/auth/login/LoginPage'
import Error from '../nav/error/Error'
import { Context } from '../Context.type'
import { AppContext } from '../AppContext'
// import Loading from '../nav/error/Loading'

type Props = {
  component: any
  path: string
}

const AdminRoute = (props: Props) => {
  const { context }: { context: Context } = React.useContext(AppContext)
  const { component: Component, ...rest } = props

  return (
    <Route
      {...rest}
      render={(props: Props) =>
        context.authState === 'loggedin' ? (
          <>{context.me && context.me.role === 'ADMIN' ? <Component {...props} /> : <Error />}</>
        ) : (
          <>
            {/* <Loading /> */}
            <LoginPage />
          </>
        )
      }
    />
  )
}
export default AdminRoute
