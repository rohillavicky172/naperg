import React from 'react'

import { useHistory } from 'react-router-dom'
import { USER_QUERY } from '../user/GraphQL'
import { useQuery } from '@apollo/react-hooks'
import { Link } from 'react-router-dom'
import { Icon, IconButton, Grid, Paper } from '@material-ui/core/'
import NotFound from '../nav/error/NotFound'
import Error from '../nav/error/Error'
import Loading from '../nav/error/Loading'
import PhoneLogic from '../user/single/phone/PhoneLogic'
import { AppContext } from '../AppContext'
import { Context } from '../Context.type'

type Props = {
  userId: string
}

const OnboardingValidaterPhoneUserQuery = (props: Props) => {
  const history = useHistory()
  const { context }: { context: Context } = React.useContext(AppContext)
  const { loading, error, data } = useQuery(USER_QUERY, {
    variables: {
      where: {
        id: props.userId,
      },
    },
  })

  if (error) return <Error message={error.graphQLErrors.length && error.graphQLErrors[0].message} />
  if (loading) return <Loading />
  if (!data.user) return <NotFound />

  return (
    <div className="responsiveMargin2">
      <div className="paperOut">
        <Paper className="paperIn">
          <>
            <Grid container>
              <Grid item xs={6} className="tal"></Grid>
              <Grid item xs={6} className="tar">
                <IconButton
                  onClick={() => {
                    context.logout()
                    history.push('/?mode=LOGOUT')
                  }}>
                  <Icon>clear</Icon>
                </IconButton>
              </Grid>
            </Grid>

            <div className="tac margin6">
              <Link to={'/'}>
                <img alt="logo" className="logoNachoNacho" src="/logo/NachoNachoLogo.png" />
              </Link>
            </div>
            <div className="tac responsiveMargin2">
              <PhoneLogic
                showCancelButton={false}
                user={data.user}
                onCancel={() => {}}
                onUpdate={() => {
                  console.log('onUpdate')
                }}
              />
            </div>
          </>
        </Paper>
      </div>
    </div>
  )
}

export default OnboardingValidaterPhoneUserQuery
