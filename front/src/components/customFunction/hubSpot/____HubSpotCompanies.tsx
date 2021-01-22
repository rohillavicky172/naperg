import React from 'react'

import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import Paper from '@material-ui/core/Paper'
import ButtonLoadingAfterClick from '../../nav/ButtonLoadingAfterClick'

import { FormControl } from '@material-ui/core'
import { FormControlLabel } from '@material-ui/core'
import { Checkbox } from '@material-ui/core'
import { InputLabel } from '@material-ui/core'
import { Input } from '@material-ui/core'

export const REFRESH_COMPANIES_HUBSPOT = gql`
  mutation refreshCompaniesHubspot($where: CompanieWhereInput!, $orderBy: CompanieOrderByInput, $skip: Int, $first: Int) {
    refreshCompaniesHubspot(where: $where, orderBy: $orderBy, skip: $skip, first: $first)
  }
`

const HubSpotCompanies = () => {
  const [loading, setLoading] = React.useState(false)
  const [response, setResponse] = React.useState('')
  const [page, setPage] = React.useState('1')
  const [first, setFirst] = React.useState('100')
  const [name, setName] = React.useState('')
  const [isPersonal, setIsPersonal] = React.useState(false)

  const [refreshCompaniesHubspot] = useMutation(REFRESH_COMPANIES_HUBSPOT)

  const refreshCompaniesHubspotF = async () => {
    let response
    setLoading(true)
    try {
      response = await refreshCompaniesHubspot({
        variables: {
          first: Number(first),
          skip: (Number(page) - 1) * Number(first),
          where: {
            name: { contains: name },
            isPersonal,
          },
          orderBy: 'updatedAtHubspot_ASC',
        },
      })
    } catch (e) {
      console.log(e)
    }
    if (response && response.data) {
      setResponse(response.data.refreshCompaniesHubspot)
    }
    setLoading(false)
  }
  return (
    <div className="paperOut">
      <Paper className="paperIn">
        <h3>Companies</h3>

        <div>
          <FormControl>
            <InputLabel htmlFor="page">{`first`}</InputLabel>
            <Input
              id="first"
              type="number"
              value={first}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFirst(e.target.value)}
            />
          </FormControl>
        </div>
        <div>
          <FormControl>
            <InputLabel htmlFor="page">{`page`}</InputLabel>
            <Input
              id="page"
              type="number"
              value={page}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPage(e.target.value)}
            />
          </FormControl>
        </div>
        <div>
          <FormControl>
            <InputLabel htmlFor="name">{`name`}</InputLabel>
            <Input
              id="email"
              type="text"
              value={name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
            />
          </FormControl>
        </div>

        <div>
          <FormControlLabel
            control={<Checkbox checked={isPersonal} onChange={(e) => setIsPersonal(e.target.checked)} value={true} />}
            label={`isPersonal`}
          />
        </div>

        <br />
        <div>
          <ButtonLoadingAfterClick
            id={'idButton'}
            disabled={false}
            icon={''}
            size={'medium'}
            buttonText={`Refresh`}
            buttonLoadingText={`Setting up...`}
            variant="outlined"
            loading={loading}
            color={'secondary'}
            onClick={() => refreshCompaniesHubspotF()}
          />{' '}
        </div>
        <div>{response && <pre>{JSON.stringify(JSON.parse(response), null, 2)}</pre>}</div>
      </Paper>
    </div>
  )
}

export default HubSpotCompanies
