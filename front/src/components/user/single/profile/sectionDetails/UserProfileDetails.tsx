import React from 'react'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import UserProfileView from './UserProfileView'
import { useHistory } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { USER_QUERY } from '../../../GraphQL'
import UserProfileForm from './UserProfileForm'
import NotFound from '../../../../nav/error/NotFound'
import Loading from '../../../../nav/error/Loading'
import Error from '../../../../nav/error/Error'
import { useQuery } from '@apollo/react-hooks'
const queryString = require('query-string')

type Props = {
  userId: string
}

const UserProfileDetails = (props: Props) => {
  const location = useLocation()
  const history = useHistory()

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

  const parsed = queryString.parse(location.search)
  const isEditModeProfile = parsed.isEditModeProfile === 'true' ? true : false
  return (
    <div className="paperOut">
      <Paper className="paperIn">
        <h4>Personal Details</h4>

        {isEditModeProfile ? (
          <UserProfileForm
            showCancelButton={true}
            updateTextButton={'Save'}
            cancelTextButton={'Cancel'}
            user={data.user}
            onUpdate={() => {
              const parsed = queryString.parse(location.search)
              parsed.isEditModeProfile = false
              history.push('?' + queryString.stringify(parsed))
            }}
            onCancel={() => {
              const parsed = queryString.parse(location.search)
              parsed.isEditModeProfile = false
              history.push('?' + queryString.stringify(parsed))
            }}
          />
        ) : (
          <>
            <div className="tar">
              <Button
                color={'primary'}
                variant="outlined"
                size="small"
                onClick={() => {
                  const parsed = queryString.parse(location.search)
                  parsed.isEditModeProfile = true
                  history.push('?' + queryString.stringify(parsed))
                }}>
                {`Edit`}
              </Button>
            </div>
            <UserProfileView user={data.user} />
          </>
        )}
      </Paper>
    </div>
  )
}

export default UserProfileDetails
