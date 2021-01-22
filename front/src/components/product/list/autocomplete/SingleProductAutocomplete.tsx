import React from 'react'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import { Product } from '../../../product/Product.type'
import ImageTemplate from '../../../nav/ImageTemplate'
// import Icon from '@material-ui/core/Icon'
// import { Invoice } from '../../../invoice/Invoice.type'
// import { Subscription } from '../../../subscription/Subscription.type'
// import { Link } from 'react-router-dom'
// import '../Style.css'

type State = {}

type Props = {
  product: Product
  onClick: (product: Product) => void
  // isActionClickIsLink: boolean
}

class SingleProductAutocomplete extends React.Component<Props, State> {
  render() {
    // let allInvoices: Invoice[] = []
    // this.props.product.subscriptions.map((subscription: Subscription) => {
    //   return subscription.subscriptionInvoices.map(subscriptionInvoice => {
    //     return allInvoices.push(subscriptionInvoice.invoice)
    //   })
    // })

    // let allUsers = allInvoices.map(invoice => invoice.user)
    // let allUsersUnique = allUsers.filter((thing, index, self) => index === self.findIndex(t => t.id === thing.id))

    return (
      <div className="paperOut">
        <div className="cursor" onClick={() => this.props.onClick(this.props.product)}>
          <Paper className="paperIn bgHover">
            <Grid container>
              <Grid item xs={12} sm={4}>
                <ImageTemplate format="small" nameFile={this.props.product.nameFile} />
              </Grid>
              <Grid item xs={12} sm={4}>
                {this.props.product.name}
              </Grid>
              {/* <Grid item xs={12} sm={2}>
              <div>{allUsersUnique.length} Users</div>
              <div>{allInvoices.length} Transactions</div>
            </Grid>
            <Grid item xs={12} sm={4}>
              {allUsersUnique.map(user => (
                <div key={user.id}>
                  {user.firstName} {user.lastName}{' '}
                  {allInvoices.filter(invoice => invoice.user.id === user.id).length > 0 && (
                    <>
                      <span>({allInvoices.filter(invoice => invoice.user.id === user.id)[0].companie.name})</span>{' '}
                      <Link
                        className="link"
                        to={`/invoicesCompany/${
                          allInvoices.filter(invoice => invoice.user.id === user.id)[0].companie.id
                        }/?productName=${this.props.product.name}&userName=${user.firstName}`}>
                        {allInvoices.filter(invoice => invoice.user.id === user.id).length}T
                      </Link>
                    </>
                  )}
                </div>
              ))}
            </Grid>*/}
            </Grid>
          </Paper>
        </div>
      </div>
    )
  }
}

export default SingleProductAutocomplete
