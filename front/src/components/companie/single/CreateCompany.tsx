import React from 'react'
import Paper from '@material-ui/core/Paper'
import CompanieForm from '../form/CompanieForm'
import { companieClass } from '../Companie.type'
import { useHistory } from 'react-router-dom'
import { AppContext } from '../../AppContext'
import { Context } from '../../Context.type'

const CreateCompany = () => {
  const history = useHistory()
  const { context }: { context: Context } = React.useContext(AppContext)
  return (
    <>
      <div className="paperOut">
        <Paper className="paperIn">
          <h3>{`Set up your Company/Group`}</h3>
          <p>
            {`You'll be able to set up Company or Group members and manage all your Company or Group's subscriptions from your dashboard.`}
          </p>
          <div className="responsiveMargin2">
            <CompanieForm
              onCancel={() => history.push('/')}
              onUpdate={() => {}}
              showCancelButton={true}
              redirectAfter={true}
              userId={context.me.id}
              companie={{ ...companieClass, maxTransactionValue: 1000 }}
            />
          </div>
        </Paper>
      </div>
    </>
  )
}

export default CreateCompany
