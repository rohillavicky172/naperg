import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import Error from '../../nav/error/Error'
import NotFound from '../../nav/error/NotFound'
import Loading from '../../nav/error/Loading'
import { CARDHOLDER_QUERY } from '../GraphQL'
import { useParams } from 'react-router'
import Paper from '@material-ui/core/Paper'
import { issuedCardClass } from '../../issuedCard/IssuedCard.type'
import CardholderLogic from '../../issuedCard/form/CardholderLogic'
import { ParamTypes } from '../../ParamTypes.type'
// import IssuedCardDetails from './IssuedCardDetails'

const IssuedCardPage = () => {
  const { cardholderId }: ParamTypes = useParams<ParamTypes>()
  const { loading, error, data } = useQuery(CARDHOLDER_QUERY, {
    variables: {
      where: {
        id: cardholderId,
      },
    },
  })

  if (error) return <Error message={error.graphQLErrors.length && error.graphQLErrors[0].message} />
  if (loading) return <Loading />
  if (!data.cardholder) return <NotFound />
  console.log(data.cardholder.cardholderStripe)
  return (
    <div className="paperOut">
      <Paper className="paperIn">
        <h3>Cardholder</h3>

        <CardholderLogic
          canCreateCard={true}
          issuedCard={{
            ...issuedCardClass,
            issuedCardStripe: {
              ...issuedCardClass.issuedCardStripe,
              cardholder: data.cardholder.cardholderStripe,
            },
          }}
        />
      </Paper>
    </div>
  )
}

export default IssuedCardPage
