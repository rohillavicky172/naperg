import React from 'react'
import Paper from '@material-ui/core/Paper'
import PaymentMethodFormatIssuedCard from '../../card/single/PaymentMethodFormatIssuedCard'
import Grid from '@material-ui/core/Grid'
import { IssuedCard } from '../IssuedCard.type'
import { Link } from 'react-router-dom'
import SpoofUser from '../../user/single/action/spoofUser/SpoofUser'
import utils from '../../utils'
import { Button } from '@material-ui/core'
// import LogsQueryLight from '../../log/list/LogsQueryLight'
// import { flowRight as compose } from 'lodash'
// import { withContext } from '../../withContext'
// import { Context } from '../../Context.type'
// import { withRouter } from 'react-router'

type State = {}

type Props = {
  // context: Context,
  issuedCard: IssuedCard
}

class IssuedCardDetailsAdmin extends React.Component<Props, State> {
  render() {
    return (
      <>
        <div className="paperOut">
          <Paper className="paperIn">
            <h3>Details (admin)</h3>
            <Grid container>
              <Grid item xs={12} md={8} className="">
                <Grid container>
                  <Grid item xs={6} md={6} className="marginAuto">
                    {`id:`}
                  </Grid>
                  <Grid item xs={6} md={6} className="marginAuto">
                    {this.props.issuedCard.stripe_issuedCard_id}
                  </Grid>
                </Grid>

                <Grid container>
                  <Grid item xs={6} md={6} className="marginAuto">
                    {`status Card:`}
                  </Grid>
                  <Grid item xs={6} md={6} className="marginAuto">
                    {this.props.issuedCard.status}
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={6} md={6} className="marginAuto">
                    {`Product:`}
                  </Grid>
                  <Grid item xs={6} md={6} className="marginAuto">
                    {this.props.issuedCard.initProduct && (
                      <Link className="link" to={'/product/' + this.props.issuedCard.initProduct.id}>
                        {this.props.issuedCard.initProduct.name}
                      </Link>
                    )}
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={6} md={6} className="marginAuto">
                    {`testMode:`}
                  </Grid>
                  <Grid item xs={6} md={6} className="marginAuto">
                    {this.props.issuedCard.testMode ? 'true' : 'false'}
                  </Grid>
                </Grid>

                <Grid container>
                  <Grid item xs={6} md={6} className="marginAuto">
                    {`type card:`}
                  </Grid>

                  <Grid item xs={6} md={6} className="marginAuto">
                    {this.props.issuedCard.type}
                  </Grid>
                </Grid>

                <Grid container>
                  <Grid item xs={6} md={6} className="marginAuto">
                    {`Company:`}
                  </Grid>

                  <Grid item xs={6} md={6} className="marginAuto">
                    <Link className="link" to={'/company/' + this.props.issuedCard.companie.id}>
                      {this.props.issuedCard.companie.id}
                    </Link>
                  </Grid>
                </Grid>

                {this.props.issuedCard.invoice && (
                  <Grid container>
                    <Grid item xs={6} md={6} className="marginAuto">
                      {`Invoice:`}
                    </Grid>

                    <Grid item xs={6} md={6} className="marginAuto">
                      <Link className="link" to={'/invoice/' + this.props.issuedCard.invoice.id}>
                        {utils.smallIdFormat(this.props.issuedCard.invoice.smallId)}
                      </Link>
                    </Grid>
                  </Grid>
                )}

                <Grid container>
                  <Grid item xs={6} md={6} className="marginAuto">
                    {`Card:`}
                  </Grid>
                  <Grid item xs={6} md={6} className="marginAuto">
                    <PaymentMethodFormatIssuedCard showIcon={false} source={this.props.issuedCard.issuedCardStripe} />
                  </Grid>
                </Grid>

                <Grid container>
                  <Grid item xs={6} md={6} className="">
                    {`User:`}
                  </Grid>
                  <Grid item xs={6} md={6} className="">
                    <Link className="link" to={'/user/' + this.props.issuedCard.user.id}>
                      {this.props.issuedCard.user.firstName} {this.props.issuedCard.user.lastName}{' '}
                      <SpoofUser user={this.props.issuedCard.user} />
                    </Link>
                  </Grid>
                </Grid>

                <Grid container>
                  <Grid item xs={6} md={6} className="">
                    {`CreatedBy:`}
                  </Grid>
                  <Grid item xs={6} md={6} className="">
                    {this.props.issuedCard.createdBy && (
                      <Link className="link" to={'/user/' + this.props.issuedCard.createdBy.id}>
                        {this.props.issuedCard.createdBy.firstName} {this.props.issuedCard.createdBy.lastName}{' '}
                        <SpoofUser user={this.props.issuedCard.createdBy} />
                      </Link>
                    )}
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={6} md={6} className="">
                    {`approvedBy:`}
                  </Grid>
                  <Grid item xs={6} md={6} className="">
                    {this.props.issuedCard.approvedBy && (
                      <Link className="link" to={'/user/' + this.props.issuedCard.approvedBy.id}>
                        {this.props.issuedCard.approvedBy.firstName} {this.props.issuedCard.approvedBy.lastName}{' '}
                        <SpoofUser user={this.props.issuedCard.approvedBy} />
                      </Link>
                    )}
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={6} md={6} className="">
                    {`statusRequested:`}
                  </Grid>
                  <Grid item xs={6} md={6} className="">
                    {this.props.issuedCard.statusRequested}
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={6} md={6} className="">
                    {`isRequested:`}
                  </Grid>
                  <Grid item xs={6} md={6} className="">
                    {this.props.issuedCard.isRequested ? 'true' : 'false'}
                  </Grid>
                </Grid>

                {this.props.issuedCard.cardholder && (
                  <Grid container>
                    <Grid item xs={6} md={6} className="marginAuto">
                      {`Cardholder:`}
                    </Grid>
                    <Grid item xs={6} md={6} className="marginAuto">
                      <Link className="link" to={`/cardholders/?cardholderId=${this.props.issuedCard.cardholder.id}`}>
                        {this.props.issuedCard.cardholder.id}
                      </Link>
                    </Grid>
                  </Grid>
                )}
              </Grid>
            </Grid>

            <Grid container>
              <Grid item xs={6} md={6} className="">
                {`issuedCardStripeCardholder:`}
              </Grid>
              <Grid item xs={6} md={6} className="">
                <pre>{JSON.stringify(this.props.issuedCard.issuedCardStripe.cardholder, null, 2)}</pre>
              </Grid>
            </Grid>
          </Paper>
        </div>

        <div className="paperOut">
          <Paper className="paperIn">
            <Link to={'/logs?issuedCardId=' + this.props.issuedCard.id}>
              <Button color="primary" variant="outlined">
                Logs
              </Button>
            </Link>
            {/* <LogsQueryLight
              title={'Logs (admin)'}
              variables={{
                orderBy: 'date_DESC',
                first: 10,
                where: {
                  issuedCard: {
                    id: this.props.issuedCard.id,
                  },
                },
              }}
            /> */}
          </Paper>
        </div>
      </>
    )
  }
}

export default IssuedCardDetailsAdmin
