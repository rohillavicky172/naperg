
import React from 'react'
import { Link } from 'react-router-dom'
import CardContent from '@material-ui/core/CardContent'
import { CategorieProduct } from '../../CategorieProduct.type'
import ImageTemplate from '../../../nav/ImageTemplate'
import CategorieProductEdit from '../CategorieProductEdit'

type State = {}

type Props = {
  visibility: string,
  categorie: CategorieProduct,
  isEditMode: boolean
}

class CategorieProductIcon extends React.Component<Props, State> {
  render() {
    const baseUrl = this.props.visibility === 'BTOBE' ? 'marketplaceBtoB' : 'marketplaceConsumer'
    return (
      <>
        {this.props.isEditMode && <CategorieProductEdit categorieSingleProducts={this.props.categorie} />}
        <Link to={`/${baseUrl}/${this.props.categorie.urlName}`}>
          <div className="tac card" style={{ height: '160px' }}>
            <CardContent className="cardContentClass">
              <div style={{ height: '100px' }}>
                <ImageTemplate format={'medium'} nameFile={this.props.categorie.nameFileIcon} />
              </div>
              <span className="black textSize11">{this.props.categorie.name}</span>
            </CardContent>
          </div>
        </Link>
      </>
    )
  }
}

export default CategorieProductIcon
