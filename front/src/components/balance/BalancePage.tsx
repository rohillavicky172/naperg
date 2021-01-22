import React from 'react'
import SingleBalanceQuery from './SingleBalanceQuery'
import LogsQueryLight from '../log/list/LogsQueryLight'
import Paper from '@material-ui/core/Paper'
import { useParams } from 'react-router'
import { ParamTypes } from '../ParamTypes.type'

const BalancePage = () => {
  const params: ParamTypes = useParams<ParamTypes>()

  return (
    <>
      <div className="paperOut">
        <Paper className="paperIn">
          <h4>{`Balance (admin)`}</h4>
          {/* <CompanieBalance
              canAddTopUp={true}
              companieId={this.props.match.params.companieId}
            /> */}

          <SingleBalanceQuery balanceId={params.balanceId} />
          <div className="paperOut">
            <Paper className="paperIn">
              <LogsQueryLight
                title={'Logs (admin)'}
                variables={{
                  orderBy: 'date_DESC',
                  first: 50,
                  where: {
                    balance: {
                      id: params.balanceId,
                    },
                  },
                }}
              />
            </Paper>
          </div>
        </Paper>
      </div>
    </>
  )
}

export default BalancePage
