
import React from 'react'
import Icon from '@material-ui/core/Icon'
import './Breadcrumb.css'
import { Link } from 'react-router-dom'
import { CategorieProduct } from '../../CategorieProduct.type'

type State = {}

type Props = {
  categorieSingleProducts: CategorieProduct
}

class Breadcrumb extends React.Component<Props, State> {
  render() {
    return (
      <ul className="breadcrumb">
        <li className="liClass breadcrumbLi breadcrumbCategName">
          <Link className='link' to="/category/all">
            {`Category`}
          </Link>
        </li>
        <li className="liClass breadcrumbLi arrowRightCateg">
          <Icon>keyboard_arrow_right</Icon>
        </li>
        <li className="liClass breadcrumbLi breadcrumbCategName">{this.props.categorieSingleProducts.name}</li>
      </ul>
    )
  }
}

export default Breadcrumb
