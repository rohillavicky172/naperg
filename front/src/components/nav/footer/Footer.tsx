import React from 'react'
import { COMPANIE_QUERY } from '../../companie/GraphQL'
// import { User } from '../User.type'
import { useQuery } from '@apollo/react-hooks'
import NotFound from '../../nav/error/NotFound'
import Error from '../../nav/error/Error'
import Loading from '../../nav/error/Loading'
import FooterBuyer from './FooterBuyer'
import FooterSeller from './FooterSeller'

type Props = {
  companieId: string
}

const DrawerLeftContainer = (props: Props) => {
  const { loading, error, data } = useQuery(COMPANIE_QUERY, {
    variables: {
      where: { id: props.companieId },
    },
  })
  if (error) return <Error message={error.graphQLErrors.length && error.graphQLErrors[0].message} />
  if (loading) return <Loading />
  if (!data.companie) return <NotFound />

  if (data.companie.typeCompanie === 'BUYER') return <FooterBuyer />
  if (data.companie.typeCompanie === 'SELLER') return <FooterSeller />
  if (data.companie.typeCompanie === 'NN_ANALYST') return <FooterSeller />
  return null
  // return <DrawerLeft user={props.user} companie={data.companie} />
}

export default DrawerLeftContainer
