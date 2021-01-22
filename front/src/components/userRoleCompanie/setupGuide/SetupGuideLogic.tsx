import React from 'react'
import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/react-hooks'
import NotFound from '../../nav/error/NotFound'
import Loading from '../../nav/error/Loading'
import Error from '../../nav/error/Error'
import { Grid, Icon, IconButton, Paper } from '@material-ui/core'
import GetStarted from '../../wizard/GetStarted'
import GetStartedTitle from '../../wizard/GetStartedTitle'
import { AppContext } from '../../AppContext'
import { Context } from '../../Context.type'
import GetStartedHeader from '../../wizard/GetStartedHeader'
import { QUERY_USER_ROLE_COMPANIE } from '../GraphQL'

export const UPDATE_USER_ROLE_COMPANIE_MUTATION = gql`
  mutation UpdateUserRoleCompanie($data: UserRoleCompanieUpdateInput!, $where: UserRoleCompanieWhereUniqueInput!) {
    updateUserRoleCompanie(data: $data, where: $where) {
      id
      showSetupGuide
    }
  }
`

const SetupGuideLogic = () => {
  const { context }: { context: Context } = React.useContext(AppContext)
  const userRoleCompanieId = context.userRoleCompanie.id
  const [updateUserRoleCompanie] = useMutation(UPDATE_USER_ROLE_COMPANIE_MUTATION)

  const handleClose = async () => {
    data.user = await updateUserRoleCompanie({
      variables: {
        where: { id: userRoleCompanieId },
        data: {
          showSetupGuide: false,
        },
      },
    })
  }
  const { loading, error, data } = useQuery(QUERY_USER_ROLE_COMPANIE, {
    variables: { where: { id: userRoleCompanieId } },
  })

  if (error) return <Error message={error.graphQLErrors.length && error.graphQLErrors[0].message} />
  if (loading) return <Loading />
  if (!data.userRoleCompanie) return <NotFound />
  if (!data.userRoleCompanie.showSetupGuide) return null
  return (
    <>
      <div className="paperOut">
        <Paper className="paperIn">
          <div className="tar ">
            <IconButton onClick={handleClose} color="primary" size="small">
              <Icon>clear</Icon>
            </IconButton>
          </div>
          <Grid container>
            <Grid item xs={12} sm={11} md={10} className="">
              <GetStartedTitle />
              <GetStartedHeader />
              <GetStarted />
            </Grid>
          </Grid>
        </Paper>
      </div>
    </>
  )
}

export default SetupGuideLogic
