import React from 'react'
import { Route } from 'react-router-dom'
import LoginPage from '../user/auth/login/LoginPage'
import { Context } from '../Context.type'
import { AppContext } from '../AppContext'
// import Loading from '../nav/error/Loading'
// import CreateCompany from '../companie/single/CreateCompany'

type Props = {
  component: any
  path: string
}

const PrivateRoute = (props: Props) => {
  const { context }: { context: Context } = React.useContext(AppContext)
  const { component: Component, ...rest } = props
  return (
    <Route
      {...rest}
      render={(props: Props) => (
        <>
          {context.authState === 'loggedin' && <Component {...props} />}
          {context.authState === '' && <LoginPage />}
          {context.authState === 'error' && <LoginPage />}
        </>
      )}
    />
  )
}
export default PrivateRoute

// const isLoggin = (this.props.context.authState ==='loggedin' && this.props.context.userRoleCompanie && this.props.context.userRoleCompanie.permissions && this.props.context.me)

// context.me && (
//   <>{context.userRoleCompanie && context.userRoleCompanie.permissions ? <Component {...props} /> : <CreateCompany />}</>
// ) : (
//   <>
//     {/* <Loading /> */}
//     <LoginPage />
//   </>
// )
