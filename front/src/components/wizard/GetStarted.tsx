import React from 'react'
import { AppContext } from '../AppContext'
import { Context } from '../Context.type'
import { useQuery } from '@apollo/react-hooks'
import Error from '../nav/error/Error'
import Loading from '../nav/error/Loading'
import NotFound from '../nav/error/NotFound'
import { useHistory } from 'react-router-dom'
import { GET_STARTED_BANNER } from './GraphQL'
import BannerGetStarted from './BannerGetStarted'
import { LinearProgress } from '@material-ui/core'

const GetStarted = () => {
  const history = useHistory()
  const { context }: { context: Context } = React.useContext(AppContext)
  const companieId = context.userRoleCompanie.companie.id
  const userId = context.me.id
  const { loading, error, data } = useQuery(GET_STARTED_BANNER, {
    variables: {
      companieId,
      userId,
    },
  })

  if (error) return <Error message={error.graphQLErrors.length && error.graphQLErrors[0].message} />
  if (loading) return <Loading />
  if (!data.getStartedBanners) return <NotFound />

  const countCompleted = data.getStartedBanners.filter((getStartedBanner) => getStartedBanner.done === true).length
  return (
    <>
      <div className="textSize10">
        You completed {countCompleted} out of {data.getStartedBanners.length} steps!
      </div>
      <div className="paperOut">
        <LinearProgress variant="determinate" value={(countCompleted / data.getStartedBanners.length) * 100} />
      </div>
      <div style={{ height: '10px' }} />
      {data.getStartedBanners.map((getStartedBanner) => (
        <div key={'getStartedBanner' + getStartedBanner.position}>
          {getStartedBanner.type === 'dob' && (
            <BannerGetStarted
              done={getStartedBanner.done}
              shwowActionButton={!getStartedBanner.done}
              actionText="+ Date of Birth"
              message="Add your date of birth. This is a regulatory requirement for NachoNacho."
              onClick={() => history.push(`/settings/${userId}?isEditModeProfile=true`)}
            />
          )}
          {getStartedBanner.type === 'userVerification' && (
            <BannerGetStarted
              done={getStartedBanner.done}
              shwowActionButton={!getStartedBanner.done}
              actionText="+ User"
              message="Verify your account. This is a regulatory requirement for NachoNacho."
              onClick={() => history.push(`/userVerification`)}
            />
          )}
          {getStartedBanner.type === 'profilePicture' && (
            <BannerGetStarted
              done={getStartedBanner.done}
              shwowActionButton={!getStartedBanner.done}
              actionText="+ Profile Photo"
              message="Add your Profile Photo"
              onClick={() => history.push(`/settings/${userId}?isEditModeProfile=true`)}
            />
          )}
          {getStartedBanner.type === 'source' && (
            <BannerGetStarted
              done={getStartedBanner.done}
              shwowActionButton={!getStartedBanner.done}
              actionText={'+ Payment Source'}
              message={'Add a Payment Source to fund all your transactions.'}
              onClick={() => history.push('/paymentSource/' + companieId)}
            />
          )}
          {getStartedBanner.type === 'balanceTopUp' && (
            <BannerGetStarted
              done={getStartedBanner.done}
              shwowActionButton={!getStartedBanner.done}
              actionText={'Top Up Balance'}
              message={'Upload funds into your NachoNacho Balance. This Balance will be used to fund your NachoCard purchases.'}
              onClick={() => history.push('/paymentSource/' + companieId)}
            />
          )}
          {getStartedBanner.type === 'issuedCard' && (
            <BannerGetStarted
              done={getStartedBanner.done}
              shwowActionButton={!getStartedBanner.done}
              actionText={'+ NachoCard'}
              onClick={() => history.push(`/createIssuedCard/${userId}`)}
              message={'Create your first NachoCard!'}
            />
          )}
          {getStartedBanner.type === 'requestIssuedCard' && (
            <BannerGetStarted
              done={getStartedBanner.done}
              shwowActionButton={!getStartedBanner.done}
              actionText={'+ Request NachoCard'}
              onClick={() => history.push(`/createIssuedCard/${userId}`)}
              message={'Create a NachoCard for expenses you need to make. The request will be sent to Admin(s) for approval.'}
            />
          )}
          {getStartedBanner.type === 'team' && (
            <BannerGetStarted
              done={getStartedBanner.done}
              shwowActionButton={!getStartedBanner.done}
              actionText={'+ Member'}
              onClick={() => history.push(`/usersAddIssuedCard/`)}
              message={'Invite your first team member, so you can allocate NachoCards to them.'}
            />
          )}
          {getStartedBanner.type === 'chromeExtension' && (
            <BannerGetStarted
              done={getStartedBanner.done}
              shwowActionButton={!getStartedBanner.done}
              actionText={'+ Chrome Extension'}
              message={'If you use Chrome, install our Chrome extension and log in.'}
              onClick={() => window.open('https://buyer.nachonacho.com/chrome-extension/')}
            />
          )}
        </div>
      ))}
    </>
  )
}

export default GetStarted
