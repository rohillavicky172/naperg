
import React from 'react'
import { Source } from '../../source/Source.type'
import { Companie } from '../../companie/Companie.type'
import { UserStripe } from '../../userStripe/UserStripe.type'
import PaymentMethodFormatSource from '../single/PaymentMethodFormatSource'
import { withContext } from '../../withContext'
import { Context } from '../../Context.type'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

type State = {
  mode: string
}

type Props = {
  context: Context
  companie: Companie
  userStripe: UserStripe
  userId: string
  card: Source
  // showDefaultCard: boolean,
  hideTitle: boolean
  lightDesign: boolean
}

class SinglePaymentSourceList extends React.Component<Props, State> {
  state = {
    mode: ''
  }

  render() {
    return (
      <>
        <div key={this.props.card.id} className="paperOut">
          <Paper className="paperIn">
            <Grid container>
              <Grid item xs={6} className="marginAuto">
                <div className="textSize9">
                  <PaymentMethodFormatSource showIcon={true} source={this.props.card} />

                  {this.props.card.object === 'bank_account' && (
                    <>
                      {'; Status: '}
                      {this.props.card.status === 'new' ? (
                        <>
                          <span className="red">Pending verification</span>
                          <br />
                          <br />
                          <span className="textSize7 secondary">{`We made two small deposits in your bank account. After receiving these deposits, please verify your account.`}</span>
                        </>
                      ) : (
                        'Verified'
                      )}
                      <br />
                      {this.props.card.status === 'new' && (
                        <>
                          <br />

                          <Button variant="outlined" color="secondary" onClick={() => this.setState({ mode: 'verifyBank' })}>
                            {`Verify account`}
                          </Button>
                        </>
                      )}
                    </>
                  )}
                </div>
              </Grid>
              <Grid item xs={6} className="tar"></Grid>

              {this.props.context.me && this.props.context.me.role === 'ADMIN' && (
                <Grid item xs={12} className="">
                  <div className="paperOut">
                    <Paper className="paperIn">
                      <h3>{`(admin)`}</h3>
                      <div>
                        {`id card:`} {this.props.card.id}
                      </div>
                      <div>
                        {`status:`} {this.props.card.status}
                      </div>
                      {/* <DeleteSource sourceId={this.props.card.id} companieId={this.props.companie.id} /> */}
                    </Paper>
                  </div>
                </Grid>
              )}
            </Grid>
          </Paper>
        </div>
      </>
    )
  }
}

export default withContext(SinglePaymentSourceList)
