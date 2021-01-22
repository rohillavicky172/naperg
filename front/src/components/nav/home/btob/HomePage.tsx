import React from 'react'
import LoginPage from '../../../user/auth/login/LoginPage'
import { AppContext } from '../../../AppContext'
import { Context } from '../../../Context.type'
import './Style.css'
import DashboardCompanieQuery from '../../../companie/single/DashboardCompanieQuery'

const HomePage = () => {
  const { context }: { context: Context } = React.useContext(AppContext)

  const authState = context.authState

  if (authState === '') return <LoginPage />
  if (authState === 'error') return <LoginPage />
  if (authState === 'loading') return null
  if (authState === 'unknown') return <LoginPage />
  if (authState === 'unknown') return <LoginPage />
  if (authState === 'loggedin') return <DashboardCompanieQuery companieId={context.userRoleCompanie.companie.id} />
  return null
}

export default HomePage
