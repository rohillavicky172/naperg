import React from 'react'
import Paper from '@material-ui/core/Paper'
import LoginDetails from './LoginDetails'
import { Link } from 'react-router-dom'

type Props = {
  title: string
  goTo: (page: string) => void
}

const Login = (props: Props) => {
  return (
    <>
      <div className="paperOut">
        <div className="tac margin6">
          <Link to={'/'}>
            <img alt="logo" className="logoNachoNacho" src="/logo/NachoNachoLogo.png" />
          </Link>
        </div>

        <Paper className="paperIn">
          <LoginDetails goTo={(page) => props.goTo(page)} title={props.title} />
        </Paper>
      </div>
    </>
  )
}

export default Login
