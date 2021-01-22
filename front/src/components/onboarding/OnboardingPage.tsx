import React from 'react'
import Paper from '@material-ui/core/Paper'
import { AppContext } from '../AppContext'
// import OnboardingUserQuery from './OnboardingUserQuery'
import gql from 'graphql-tag'
import { Context } from '../Context.type'
import { USER_QUERY } from '../user/GraphQL'
import { useQuery } from '@apollo/react-hooks'
import NotFound from '../nav/error/NotFound'
import Error from '../nav/error/Error'
import Loading from '../nav/error/Loading'
import OnboardingLogic from './OnboardingLogic'

export const COMPANIE_QUERY = gql`
  query Companie($where: CompanieWhereUniqueInput!) {
    companie(where: $where) {
      id
      statusApplication
      name
      registeredBusinessName
      website

      registrationNumber
      typeBusinessStructure
      leadershipEmail

      leadershipFirstName

      leadershipLastName
      leadershipPhone
      leadershipPhoneCode
      leadershipTitle
    }
  }
`

const OnboardingPage = () => {
  const { context }: { context: Context } = React.useContext(AppContext)

  const userData = useQuery(USER_QUERY, {
    variables: {
      where: {
        id: context.me.id,
      },
    },
  })
  const companieData = useQuery(COMPANIE_QUERY, {
    variables: {
      where: {
        id: context.userRoleCompanie.companie.id,
      },
    },
  })

  if (userData.error) return <Error message={userData.error.graphQLErrors.length && userData.error.graphQLErrors[0].message} />
  if (userData.loading) return <Loading />
  if (!userData.data.user) return <NotFound />
  if (companieData.error)
    return <Error message={companieData.error.graphQLErrors.length && companieData.error.graphQLErrors[0].message} />
  if (companieData.loading) return <Loading />
  if (!companieData.data.companie) return <NotFound />

  // console.log(companieData.data.companie)s
  return (
    <div className="">
      <div className="paperOut">
        <Paper className="paperIn">
          <OnboardingLogic user={userData.data.user} companie={companieData.data.companie} />
        </Paper>
      </div>
    </div>
  )
}

export default OnboardingPage
