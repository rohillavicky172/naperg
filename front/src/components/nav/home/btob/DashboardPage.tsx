import React from 'react'
import DashboardCompanieQuery from '../../../companie/single/DashboardCompanieQuery'
import { useParams } from 'react-router'
import { ParamTypes } from '../../../ParamTypes.type'

const DashboardPage = () => {
  const params: ParamTypes = useParams<ParamTypes>()
  let companieId = params.companieId

  return <DashboardCompanieQuery companieId={companieId} />
}

export default DashboardPage
