import React from 'react'
import UploadFile from '../../../../nav/file/UploadFile'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import { User } from '../../../User.type'
import UpdateUser from '../../action/UpdateUser'

type State = {
  user: User
  errorMessage: string
  birthdayErrorMessage: string
}

type Props = {
  user: User
  updateUser: any
  changeEditMode: () => void
}

class UserPhotoForm extends React.Component<Props, State> {
  state = {
    user: this.props.user,
    errorMessage: '',
    birthdayErrorMessage: '',
  }

  render() {
    return (
      <>
        <Grid container>
          <Grid item xs={12} sm={12}>
            <UploadFile
              format="FREE"
              deleteImageText={`Delete profile photo`}
              nameFile={this.state.user.nameFile}
              onSelectFile={(nameFile) =>
                this.setState({
                  user: {
                    ...this.state.user,
                    nameFile: nameFile,
                  },
                })
              }
            />
            <br />
          </Grid>
          <Grid item xs={12} sm={12}>
            <div className="">
              <UpdateUser
                updateTextButton={'Save'}
                disabled={this.state.birthdayErrorMessage.length !== 0}
                user={{ ...this.state.user, typeAvatar: 'UPLOAD' }}
                onUpdate={() => this.props.changeEditMode()}
              />{' '}
              <Button onClick={() => this.props.changeEditMode()}>{`Cancel`}</Button>
            </div>
          </Grid>
        </Grid>
      </>
    )
  }
}

export default UserPhotoForm
