import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import Error from '../../../nav/error/Error'
import NotFound from '../../../nav/error/NotFound'
import Loading from '../../../nav/error/Loading'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import { AppContext } from '../../../AppContext'
import { Context } from '../../../Context.type'
import CompanieImageForm from './CompanieImageForm'
import Icon from '@material-ui/core/Icon'
import Grid from '@material-ui/core/Grid'
import UseWindowDimensions from '../../../UseWindowDimensions'
import ImageTemplate from '../../../nav/ImageTemplate'

type Props = {
  companieId: string
}

export const COMPANIE_QUERY = gql`
  query Companie($where: CompanieWhereUniqueInput!) {
    companie(where: $where) {
      id
      nameFile
    }
  }
`

const CompanieImage = (props: Props) => {
  const { context }: { context: Context } = React.useContext(AppContext)
  const isMobile = UseWindowDimensions.isMobile()
  const [editMode, setEditMode] = React.useState(false)

  const { loading, error, data } = useQuery(COMPANIE_QUERY, {
    variables: {
      where: {
        id: props.companieId,
      },
    },
  })

  if (error) return <Error message={error.graphQLErrors.length && error.graphQLErrors[0].message} />
  if (loading) return <Loading />

  if (!data.companie) return <NotFound />

  if (data.companie.isPersonal) {
    return (
      <>
        <Paper className="paperIn">
          <Grid container alignItems="flex-end">
            <Grid item xs={12} md={4} className="bold">
              {`Account Type:`}
            </Grid>

            <Grid item xs={12} md={8}>
              {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}
              {'Personal Account'}
            </Grid>
          </Grid>
        </Paper>
      </>
    )
  }

  return (
    <>
      <div className="paperOut">
        <Paper className="paperIn">
          {editMode ? (
            <CompanieImageForm onUpdate={() => setEditMode(false)} onCancel={() => setEditMode(false)} companie={data.companie} />
          ) : (
            <div>
              <div className="tar">
                {context.userRoleCompanie.permissions && context.userRoleCompanie.permissions.includes('canEditCompanie') && (
                  <Button variant="outlined" color={'primary'} onClick={() => setEditMode(true)}>
                    {`Edit`}
                  </Button>
                )}
              </div>
              {data.companie.nameFile ? (
                <ImageTemplate format={'medium'} nameFile={data.companie.nameFile} />
              ) : (
                <Icon>business</Icon>
              )}
            </div>
          )}
        </Paper>
      </div>
    </>
  )
}

export default CompanieImage
