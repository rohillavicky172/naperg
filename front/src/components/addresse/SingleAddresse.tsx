import React from 'react'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import DeleteAddresse from './DeleteAddresse'
import { Addresse } from './Addresse.type'
import AddresseForm from './form/AddresseForm'
import { withContext } from '../withContext'
import { Context } from '../Context.type'
import SingleAddresseView from './SingleAddresseView'
// import { Product } from '../product/Product.type'

type State = {
  isEditMode: boolean
}
type Props = {
  title: string
  isEditMode: boolean
  context: Context
  canDelete: boolean
  addresse: Addresse
  // product: Product
}

class SingleAddresse extends React.Component<Props, State> {
  state = {
    isEditMode: this.props.isEditMode
  }

  render() {
    return (
      <>
        {this.state.isEditMode ? (
          <AddresseForm
            className="width100per"
            textButtonUpdate={'Update'}
            textButtonCreate={'Save'}
            textButtonCancel={'Cancel'}
            companieId={''}
            userId={''}
            onCreate={() => {}}
            onUpdate={() => this.setState({ isEditMode: false })}
            onCancel={() => this.setState({ isEditMode: false })}
            addresse={this.props.addresse}
          />
        ) : (
          <>
            <Grid container>
              {this.props.context.userRoleCompanie.permissions.includes('canEditBillingAddress') && (
                <Grid item xs={12} className="tar">
                  <Button
                    color="primary"
                    id={`edit_address_${this.props.addresse.type}`}
                    variant="outlined"
                    onClick={() => this.setState({ isEditMode: !this.state.isEditMode })}>{`Edit`}</Button>
                </Grid>
              )}
              <Grid item xs={12} className="">
                {this.props.canDelete && <DeleteAddresse text={'X'} addresse={this.props.addresse} />}
                {this.props.context.me.role === 'ADMIN' && (
                  <DeleteAddresse text={'Delete (admin)'} addresse={this.props.addresse} />
                )}
                <SingleAddresseView addresse={this.props.addresse} title={this.props.title} />
              </Grid>
            </Grid>
          </>
        )}
      </>
    )
  }
}

export default withContext(SingleAddresse)
