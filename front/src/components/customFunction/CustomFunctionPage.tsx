import React from 'react'

import Grid from '@material-ui/core/Grid'
import { useMutation } from '@apollo/react-hooks'
import { CUSTOM_FUNCTION_MUTATION } from './GraphQL'
import Paper from '@material-ui/core/Paper'
import ButtonLoadingAfterClick from '../nav/ButtonLoadingAfterClick'

const CustomFunctionPage = () => {
  const [loading, setLoading] = React.useState(false)
  // const [response, setResponse] = React.useState('')

  const [customFunction] = useMutation(CUSTOM_FUNCTION_MUTATION)

  const customFunctionF = async (customFunctionId: number) => {
    setLoading(true)

    let response
    try {
      response = await customFunction({ variables: { customFunctionId } })
    } catch (e) {
      if (e.graphQLErrors.length) {
        // this.props.context.openSnackBar(true, e.graphQLErrors[0].message, 'error')
        // setResponse(e.graphQLErrors[0].message)
      }
      // this.setState
    }
    console.log(response)
    // setResponse(response.data.customFunction)
    setLoading(false)
  }
  return (
    <div className="paperOut">
      <Paper className="paperIn">
        <h2>Custom Function</h2>

        <br />
        <Grid container>
          <Grid item xs={12} sm={12} className="marginAuto">
            <ButtonLoadingAfterClick
              id={'idButton'}
              disabled={false}
              icon={''}
              size={'medium'}
              buttonText={`Custom Function`}
              buttonLoadingText={`Setting up...`}
              variant="outlined"
              loading={loading}
              color={'secondary'}
              onClick={() => customFunctionF(1)}
            />{' '}
          </Grid>
          <Grid item xs={12} sm={12} className="marginAuto">
            {/* {response && <pre>{JSON.stringify(JSON.parse(response), null, 2)}</pre>} */}
          </Grid>
        </Grid>
      </Paper>
    </div>
  )
}

export default CustomFunctionPage
