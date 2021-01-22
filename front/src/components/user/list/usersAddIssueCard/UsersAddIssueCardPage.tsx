import React, { useContext } from 'react'
import UsersAddIssueCardQuery from './UsersAddIssueCardQuery'
import { useLocation } from 'react-router-dom'
import { AppContext } from '../../../AppContext'
import { Context } from '../../../Context.type'
import TitleSubscribeToProduct from '../../../product/single/page/TitleSubscribeToProduct'
import CompanieName from '../../../companie/single/CompanieName'

const UsersAddIssueCardPage = () => {
  const location = useLocation()

  const queryString = require('query-string')
  const parsed = queryString.parse(location.search)

  const productId = parsed.productId
  const { context }: { context: Context } = useContext(AppContext)
  const companieId = context.userRoleCompanie.companie.id
  return (
    <>
      <div className="paperOut">
        {productId && <TitleSubscribeToProduct productId={productId} />}
        <h3>
          Select member to assign a NachoCard (<CompanieName companieId={companieId} />)
        </h3>

        <UsersAddIssueCardQuery
          // companieId={companieId}
          variables={{
            orderBy: 'firstName_ASC',
            companieId: companieId,
            where: {
              userRoleCompanies_some: {
                companie: {
                  id: companieId,
                },
              },
            },
          }}
        />
      </div>
    </>
  )
}

export default UsersAddIssueCardPage
