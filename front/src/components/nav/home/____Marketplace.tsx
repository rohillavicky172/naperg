
import React from 'react'
// import Hero from './hero/Hero'
import CategorieProductListIcon from '../../categorieProduct/list/CategorieProductListIcon'
import CategorieProductDetailsListProducts from '../../categorieProduct/single/page/CategorieProductDetailsListProducts'
import Button from '@material-ui/core/Button'
import { withContext } from '../../withContext'
import { Context } from '../../Context.type'

type State = {
  isEditMode: boolean
}

type Props = {
  context: Context
}

class Marketplace extends React.Component<Props, State> {
  state = {
    isEditMode: false
  }

  render() {
    return (
      <>
        <div className="content">
          <div className="tac">
            <h2>{`Marketplace`}</h2>
            {this.props.context.me && this.props.context.me.role === 'ADMIN' && (
              <Button
                onClick={() =>
                  this.setState({ isEditMode: !this.state.isEditMode })
                }>{`Manage marketplace Category (admin)`}</Button>
            )}
            <div style={{ height: '50px' }} />
            <CategorieProductDetailsListProducts
              showCategories={true}
              isEditMode={this.state.isEditMode}
              urlName={'marketplace'}
            />
            <br />
            <h2>{`Browse All Categories`}</h2>
            {this.props.context.me && this.props.context.me.role === 'ADMIN' && (
              <span>{`Category visibility=SANDBOX (admin)`}</span>
            )}
            <br />
            <CategorieProductListIcon visibility={'SANDBOX'} />
          </div>
        </div>
      </>
    )
  }
}

export default withContext(Marketplace)
