import React from 'react'
import gql from 'graphql-tag'
import CompanieName from '../companie/single/CompanieName'
import { Companie } from '../companie/Companie.type'
import Contracts from './list/Contracts'

export const COMPANIE_QUERY = gql`
  query Companie($where: CompanieWhereUniqueInput!) {
    companie(where: $where) {
      id
      name
    }
  }
`

type Props = {
  companie: Companie
}

const MarketplaceAgreement = (props: Props) => {
  return (
    <>
      <div className="paperOut">
        <h3>
          Marketplace Agreement for <CompanieName companieId={props.companie.id} />
        </h3>
      </div>
      <Contracts companieId={props.companie.id} />
    </>
  )
}

export default MarketplaceAgreement
