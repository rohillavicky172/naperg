import React from 'react'
import Paper from '@material-ui/core/Paper'
import { withContext } from '../../withContext'
import SourcesAdminQuery from './SourcesAdminQuery'
import Filters from '../../nav/filter/Filters'
import queryString from 'query-string'
import { useLocation } from 'react-router-dom'
import { AppContext } from '../../AppContext'
import { Context } from '../../Context.type'

const SourcesAdminPage = () => {
  const { context }: { context: Context } = React.useContext(AppContext)
  const first = 10
  const location = useLocation()
  const parsed = queryString.parse(location.search)
  const page = Number(parsed.page ? parsed.page : 1)
  const sourceId = parsed.sourceId
  const last4 = parsed.last4
  const issuedCardName = parsed.issuedCardName
  const companieName = parsed.companieName ? parsed.companieName : undefined

  const isDefaultSource = parsed.isDefaultSource === 'TRUE' ? true : parsed.isDefaultSource === 'FALSE' ? false : undefined

  const companieId = parsed.companieId ? parsed.companieId : undefined

  const orderBy = parsed.orderBy ? parsed.orderBy : 'createdAt_DESC'

  return (
    <>
      <div className="paperOut">
        <Paper className="paperIn">
          <h3>{`Sources (admin)`}</h3>
          <Filters
            showCompanieId={true}
            showOrderByCreated={true}
            showLast4={true}
            showIssuedCardName={true}
            showCompanieName={true}
            showIsDefaultSource={true}
          />

          <SourcesAdminQuery
            page={page}
            variables={{
              first: first,
              skip: (page - 1) * first,
              orderBy,
              where: {
                id: sourceId,
                isDefaultSource,
                companie: (companieName || companieId) && {
                  name: { contains: companieName },
                  id: companieId,
                },
                last4,
                testMode: context.testMode,
                OR: issuedCardName
                  ? [
                      { funding: { contains: issuedCardName } },
                      { brand: { contains: issuedCardName } },
                      { bank_name: { contains: issuedCardName } },
                      { name: { contains: issuedCardName } },
                    ]
                  : undefined,
              },
            }}
          />
        </Paper>
      </div>
    </>
  )
}

export default withContext(SourcesAdminPage)
