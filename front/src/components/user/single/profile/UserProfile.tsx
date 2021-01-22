import React from 'react'
import { Link } from 'react-router-dom'
import { USER_QUERY } from '../../GraphQL'
import { useQuery } from '@apollo/react-hooks'
import Paper from '@material-ui/core/Paper'
import UserProfilePublic from './sectionDetails/UserProfilePublic'
import InvoicesGraph from '../../../invoice/list/graph/InvoicesGraph'
import NotFound from '../../../nav/error/NotFound'
import Error from '../../../nav/error/Error'
import Loading from '../../../nav/error/Loading'
import SubscriptionListQueryLight from '../../../subscription/list/el/SubscriptionListQueryLight'
import UseWindowDimensions from '../../../UseWindowDimensions'
import { Button } from '@material-ui/core'
import { Context } from '../../../Context.type'
import { AppContext } from '../../../AppContext'

type Props = {
  userId: string
}

const UserProfile = (props: Props) => {
  const { context }: { context: Context } = React.useContext(AppContext)

  const { loading, error, data } = useQuery(USER_QUERY, {
    variables: { where: { id: props.userId } },
  })

  if (error) return <Error message={error.graphQLErrors.length && error.graphQLErrors[0].message} />
  if (loading) return <Loading />
  if (!data.user) return <NotFound />

  const isUserMyself = context.me.id === data.user.id
  const isMobile = UseWindowDimensions.isMobile()
  return (
    <>
      <div className="paperOut">
        <Paper className="paperIn">
          <UserProfilePublic isUserMyself={isUserMyself} user={data.user} />
        </Paper>
      </div>

      {context.me.role === 'ADMIN' && (
        <div className="paperOut">
          <Paper className="paperIn">
            <Link to={`/settings/${data.user.id}?mode=profileAdmin`}>
              <Button>Admin</Button>
            </Link>
          </Paper>
        </div>
      )}

      {!context.userRoleCompanie.companie.isPersonal && (
        <>
          {(context.userRoleCompanie.permissions.includes('canSeeInvoicesInCompanie') ||
            (context.userRoleCompanie.permissions.includes('canSeeMyInvoices') && isUserMyself)) && (
            <div className="paperOut">
              <Paper className="paperIn bgGrey">
                <div style={{ height: isMobile ? '200px' : '400px' }}>
                  <InvoicesGraph
                    title={`Monthly spend by ${data.user.firstName} ${data.user.lastName} on ${context.userRoleCompanie.companie.name}`}
                    showIsCumulative={true}
                    showTotal={false}
                    variables={{
                      side: 'ISSUING',
                      includesRefund: true,
                      where: {
                        companie: {
                          id: context.userRoleCompanie.companie.id,
                        },
                        user: {
                          id: props.userId,
                        },
                      },
                    }}
                  />
                </div>
              </Paper>
            </div>
          )}
        </>
      )}

      {!context.userRoleCompanie.companie.isPersonal && (
        <>
          {context.userRoleCompanie.permissions.includes('canSeeSubscriptionsInCompanie') && (
            <div className="paperOut">
              <Paper className="paperIn">
                <h3>{`Subscriptions for ${data.user.firstName} ${data.user.lastName}`}</h3>
                <div>
                  <SubscriptionListQueryLight
                    linkSeeMore={'/subscriptionsCompany/' + context.userRoleCompanie.companie.id + '?userId=' + data.user.id}
                    textSeeMore={`See all subscriptions in ${context.userRoleCompanie.companie.name} for ${data.user.firstName} ${data.user.lastName}`}
                    variables={{
                      first: 4,
                      orderBy: 'lastInvoiceDate_DESC',
                      where: {
                        user: { id: props.userId },
                        companie: { id: context.userRoleCompanie.companie.id },
                      },
                    }}
                  />
                </div>
              </Paper>
            </div>
          )}
        </>
      )}
    </>
  )
}

export default UserProfile
