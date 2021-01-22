import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import './ImageTemplate.css'
import { URL_SERVER_MEDIA } from '../../config/config'
import utils from '../utils'

type State = {}

type Props = {
  format: string
  nameFile: string
}

export default class ImageTemplate extends React.Component<Props, State> {
  render() {
    var urlFile = URL_SERVER_MEDIA + '/public/no-files.png'
    if (this.props.format === 'avatar' || this.props.format === 'bigAvatar' || this.props.format === 'mediumAvatar') {
      urlFile = URL_SERVER_MEDIA + '/public/avatar.png'
    }

    if (this.props.nameFile) {
      urlFile = utils.getUrlFileMedia(this.props.nameFile)
    }
    return (
      <div>
        {this.props.format === 'bigAvatar' && (
          <div>
            <Avatar src={urlFile} className={'bigAvatar'} />
          </div>
        )}
        {this.props.format === 'mediumAvatar' && (
          <div>
            <Avatar src={urlFile} className={'mediumAvatar'} />
          </div>
        )}
        {this.props.format === 'avatar' && (
          <div>
            <Avatar src={urlFile} />
          </div>
        )}
        {this.props.format === 'verySmall' && <img itemProp="image" src={urlFile} alt="img" style={{ maxWidth: '40px' }} />}
        {this.props.format === 'small' && <img itemProp="image" src={urlFile} alt="img" style={{ maxWidth: '60px' }} />}
        {this.props.format === 'medium' && <img itemProp="image" src={urlFile} alt="img" style={{ maxWidth: '90px' }} />}
        {this.props.format === 'mediumLarge' && (
          <img itemProp="image" src={urlFile} alt="img" style={{ maxWidth: '350px', width: '100%' }} />
        )}
        {this.props.format === 'big' && <img src={urlFile} alt="img" style={{ width: '100%' }} />}
        {this.props.format === 'crop' && (
          <div className="crop">
            <img itemProp="image" src={urlFile} alt="img" />
          </div>
        )}
        {!this.props.format && <img src={urlFile} alt="img" />}
      </div>
    )
  }
}
