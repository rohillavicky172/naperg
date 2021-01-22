import React from 'react'
import { USER_QUERY } from '../../GraphQL'
// import { AppContext } from '../../../AppContext'
import Paper from '@material-ui/core/Paper'
import { Link } from 'react-router-dom'
// import User2FA from './User2FA'
// import TotpLogic from '../phone/totp/TotpLogic'
// import { Context } from '../../../Context.type'
import NotFound from '../../../nav/error/NotFound'
import Loading from '../../../nav/error/Loading'
import Error from '../../../nav/error/Error'
import { useQuery } from '@apollo/react-hooks'
// import Phone2FASection from './Phone2FASection'
// import Email2FASection from './Email2FASection'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Icon from '@material-ui/core/Icon'
import User2FAForm from './User2FAForm'
import IsValidated from '../profile/sectionDetails/IsValidated'
import UseWindowDimensions from '../../../UseWindowDimensions'
import DateComponent from '../../../nav/DateComponent'
// import { Context } from './Context.type'
// import { withRouter } from 'react-router-dom'
// import { graphql, withApollo } from 'react-apollo'
// import { flowRight as compose } from 'lodash'
// import { withContext } from '../../../withContext'
// import NotAuth from '../../../nav/error/NotAuth'
// import UserEmailQuery from '../../single/profile/sectionDetails/UserEmailQuery'

// type State = {}

type Props = {
  // userQuery: any
  // context: Context
  userId: string
}

// class AuthDevice2FAQuery extends React.Component<Props, State> {

const AuthDevice2FAQuery = (props: Props) => {
  // const { context }: { context: Context } = React.useContext(AppContext)
  const [isEditMode, setIsEditMode] = React.useState(false)

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

  let user = data.user
  const isMobile = UseWindowDimensions.isMobile()
  return (
    <>
      <div className="paperOut">
        <h3>{`2-Factor Authentication (2FA)`}</h3>
        <Paper className="paperIn">
          {!isEditMode ? (
            <>
              <div className="tar">
                <Button color={'primary'} variant="outlined" size="small" onClick={() => setIsEditMode(true)}>
                  {`Edit`}
                </Button>
              </div>
              <>
                <Grid container alignItems="flex-end">
                  <Grid item xs={12} md={5} className="bold">
                    {`Authenticator App `}(
                    {user.enabled2FATotp ? (
                      <>
                        Set up on <DateComponent date={user.dateTotpVerified} />
                      </>
                    ) : (
                      <Link className="link" to={`/settings/${user.id}?mode=totp`}>
                        {`Set Up`}
                      </Link>
                    )}
                    ):
                  </Grid>
                  <Grid item xs={12} md={7}>
                    {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}

                    <IsValidated
                      iconNotValidated={'clear'}
                      icon={'done'}
                      isValidated={user.enabled2FATotp}
                      textValidated={'App enabled'}
                      textNotValidated={'App not enabled'}
                    />
                    {/* )} */}
                  </Grid>
                </Grid>
                <Grid container alignItems="flex-end">
                  <Grid item xs={12} md={5} className="bold">
                    {`Phone `}(
                    <Link className="link" to={`/settings/${user.id}?mode=updatePhone`}>
                      {user.phone && user.isPhoneValidated ? (
                        <>
                          {user.phoneCode} {user.phone}
                        </>
                      ) : (
                        <>Set Up</>
                      )}
                    </Link>
                    ):
                  </Grid>
                  <Grid item xs={12} md={7}>
                    {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}

                    <IsValidated
                      iconNotValidated={'clear'}
                      icon={'done'}
                      isValidated={user.enabled2FAPhone}
                      textValidated={'Phone enabled'}
                      textNotValidated={'Phone not enabled'}
                    />
                  </Grid>
                </Grid>
                <Grid container alignItems="flex-end">
                  <Grid item xs={12} md={5} className="bold">
                    {`Email `}(
                    <Link className="link" to={`/settings/${user.id}?mode=updateEmail`}>
                      {user.email}
                    </Link>
                    ):
                  </Grid>
                  <Grid item xs={12} md={7}>
                    {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}

                    <IsValidated
                      iconNotValidated={'clear'}
                      icon={'done'}
                      isValidated={user.enabled2FAEmail}
                      textValidated={'Email enabled'}
                      textNotValidated={'Email not enabled'}
                    />
                  </Grid>
                </Grid>
              </>
            </>
          ) : (
            <User2FAForm user={user} onUpdate={() => setIsEditMode(false)} onCancel={() => setIsEditMode(false)} />
          )}
        </Paper>
      </div>
    </>
  )
}

export default AuthDevice2FAQuery
