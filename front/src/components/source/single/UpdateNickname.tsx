
import React from 'react'
import UpdateSource from './UpdateSource'
// import { Context } from '../../Context.type'
import { Source } from '../Source.type'
import Grid from '@material-ui/core/Grid'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
// import { graphql, withApollo } from 'react-apollo'
// import { Client } from '../../Client.type'
// import { flowRight as compose } from 'lodash'
// import { UPDATE_SOURCE_MUTATION } from '../GraphQL'
// import { withContext } from '../../withContext'

type State = {
  source: Source,
  maxLengthNickName: number,
  nickNameValide: boolean
}

type Props = {
  onCancel: () => void,
  onUpdate: () => void,
  source: Source
  // context: Context,
  // client: Client,
  // companieId: string,
  // updateSource: any,
  // openSnackBar: (message: string) => void
  // card: Card
}

class UpdateNickname extends React.Component<Props, State> {
  state = {
    source: this.props.source,
    nickNameValide: true,
    maxLengthNickName: 20
  }

  render() {
    console.log(this.state.source)
    return (
      <Grid container>
        <Grid item xs={12} sm={12}>
          <FormControl className="">
            <InputLabel htmlFor="nickname">{`Nickname (${this.state.source.nickname ? this.state.source.nickname.length : 0}/${
              this.state.maxLengthNickName
            })`}</InputLabel>
            <Input
              id="nickname"
              error={!this.state.nickNameValide}
              onChange={e => {
                if (e.target.value.length <= this.state.maxLengthNickName) {
                  this.setState({
                    nickNameValide: e.target.value.length > 0 && e.target.value.length <= this.state.maxLengthNickName,
                    source: {
                      ...this.state.source,
                      nickname: e.target.value
                    }
                  })
                }
              }}
              type="text"
              value={this.state.source.nickname}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={12}>
          <div style={{ height: '20px' }} />

          <UpdateSource
            onCancel={this.props.onCancel}
            onUpdate={this.props.onUpdate}
            disabled={!(this.state.nickNameValide && this.state.source.nickname && this.state.source.nickname.length > 0)}
            source={this.state.source}
          />
        </Grid>
      </Grid>
    )
  }
}

export default UpdateNickname
