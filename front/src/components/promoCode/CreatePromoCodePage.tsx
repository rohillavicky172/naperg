import React from 'react'
import { ParamTypes } from '../ParamTypes.type'
import { useParams } from 'react-router'
// import PromoCodeForm from './form/PromoCodeForm'
// import { promoCodeClass } from './PromoCode.type'
// import CreatePromoCode from './form/CreatePromoCode'
// import CompanieName from '../companie/single/CompanieName'
import { Paper } from '@material-ui/core'
import gql from 'graphql-tag'

import Error from '../nav/error/Error'
import NotFound from '../nav/error/NotFound'
// import CompanieSettings from './CompanieSettings'
import Loading from '../nav/error/Loading'
// import { useParams } from 'react-router'

// import CompanieName from '../single/CompanieName'
// import Paper from '@material-ui/core/Paper'
import { useQuery } from '@apollo/react-hooks'
import CreatePromoCodeParent from './CreatePromoCodeParent'
// import { ParamTypes } from '../../ParamTypes.type'

export const QUERY = gql`
  query Companie($where: CompanieWhereUniqueInput!) {
    companie(where: $where) {
      id
      name
    }
  }
`

const CreatePromoCodePage = () => {
  const { companieId }: ParamTypes = useParams<ParamTypes>()
  // const [promoCode, setPromoCode] = React.useState({ ...promoCodeClass, promoCode: data.companie.name })
  const { loading, error, data } = useQuery(QUERY, {
    variables: {
      where: {
        id: companieId,
      },
    },
  })

  if (error) return <Error message={error.graphQLErrors.length && error.graphQLErrors[0].message} />
  if (loading) return <Loading />
  if (!data.companie) return <NotFound />

  return (
    <div className="paperOut">
      <Paper className="paperIn">
        <CreatePromoCodeParent companie={data.companie} />
      </Paper>
    </div>
  )
}

export default CreatePromoCodePage
