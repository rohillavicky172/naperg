import React, { useContext } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { Link } from 'react-router-dom'
import Error from '../../nav/error/Error'
import Loading from '../../nav/error/Loading'
import { USER_ROLE_COMPANIES_QUERY } from '../GraphQL'
import MenuItem from '@material-ui/core/MenuItem'
import Icon from '@material-ui/core/Icon'
import Grid from '@material-ui/core/Grid'
import { AppContext } from '../../AppContext'
import { Context } from '../../Context.type'

type Props = {
  variables: any
  onClose: () => void
}

const UserRoleCompanieMenuList = (props: Props) => {
  const { context }: { context: Context } = useContext(AppContext)
  const { loading, error, data } = useQuery(USER_ROLE_COMPANIES_QUERY, {
    variables: props.variables,
  })

  if (error) return <Error message={error.graphQLErrors.length && error.graphQLErrors[0].message} />
  if (loading) return <Loading />
  if (!data.userRoleCompanies) return null

  return (
    <>
      {data.userRoleCompanies.map((userRoleCompanie) => (
        <div key={userRoleCompanie.id}>
          <Link to={`/?companyContext=${userRoleCompanie.companie.id}`}>
            <MenuItem className="menuItemUserRoleCompanie" onClick={() => props.onClose()}>
              <Grid container>
                <Grid item xs={2} className="">
                  {context.userRoleCompanie.companie.id === userRoleCompanie.companie.id && (
                    <Icon className="iconAlignTextBottom textSize11">done</Icon>
                  )}
                </Grid>
                <Grid item xs={10} className="">
                  {userRoleCompanie.companie.name}
                  {userRoleCompanie.companie.typeCompanie === 'SELLER' && (
                    <div className="secondary textSize6">(Seller Station)</div>
                  )}
                  {userRoleCompanie.companie.typeCompanie === 'NN_ANALYST' && (
                    <div className="secondary textSize6">(NN Analyst)</div>
                  )}
                </Grid>
              </Grid>
            </MenuItem>
          </Link>
        </div>
      ))}
    </>
  )
}

export default UserRoleCompanieMenuList
