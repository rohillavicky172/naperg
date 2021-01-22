import React from 'react'
import Error from '../../nav/error/Error'
import NotFound from '../../nav/error/NotFound'
import CompanieSettings from './CompanieSettings'
import Loading from '../../nav/error/Loading'
import { useParams } from 'react-router'
import { COMPANIE_QUERY_TEAM } from '../GraphQL'
import CompanieName from '../single/CompanieName'
import Paper from '@material-ui/core/Paper'
import { useQuery } from '@apollo/react-hooks'
import { ParamTypes } from '../../ParamTypes.type'

const CompaniePage = () => {
  const { companieId }: ParamTypes = useParams<ParamTypes>()

  const { loading, error, data } = useQuery(COMPANIE_QUERY_TEAM, {
    variables: {
      where: {
        id: companieId,
      },
    },
  })

  if (error) return <Error message={error.graphQLErrors.length && error.graphQLErrors[0].message} />
  if (loading) return <Loading />
  if (!data.companie) return <NotFound />

  let user
  const userRoleCompanies = data.companie.userRoleCompanies.filter(
    (userRoleCompanie) => userRoleCompanie.companieRole === 'OWNER'
  )

  if (userRoleCompanies.length) {
    user = userRoleCompanies[0].user
  }

  return (
    <>
      <div className="paperOut">
        <h3>
          Settings for <CompanieName companieId={data.companie.id} />{' '}
          {data.companie.isPersonal && (
            <>
              {user && (
                <>
                  of {user.firstName} {user.lastName}
                </>
              )}
            </>
          )}
        </h3>

        <Paper className="paperIn">
          <CompanieSettings companie={data.companie} />
        </Paper>
      </div>
    </>
  )
}

export default CompaniePage
