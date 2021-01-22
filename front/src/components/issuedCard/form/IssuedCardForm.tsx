import React from 'react'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Grid from '@material-ui/core/Grid'
import Input from '@material-ui/core/Input'
import FormHelperText from '@material-ui/core/FormHelperText'
import DateComponent from '../../nav/DateComponent'

import { IssuedCard } from '../IssuedCard.type'
import UpdateIssuedCardInitProduct from '../action/UpdateIssuedCardInitProduct'
import AutocompleteProductsIssuedCard from '../../product/list/autocomplete/AutocompleteProductsIssuedCard'

type Props = {
  onCancel: () => void
  onUpdated: () => void

  issuedCard: IssuedCard
}

const IssuedCardForm = (props: Props) => {
  const [issuedCard, setIssuedCard] = React.useState(props.issuedCard)
  const [product, setProduct] = React.useState(props.issuedCard.initProduct ? props.issuedCard.initProduct : null)

  const onChangeReferenceCode = (e) => {
    let issuedCardCode = e.target.value

    issuedCardCode = issuedCardCode.replace(/[^a-zA-Z0-9 ]/g, '')

    if (issuedCardCode.length <= 4) {
      setIssuedCard({
        ...issuedCard,
        issuedCardCode,
      })
    }
  }
  const onChange = (issuedCard: IssuedCard, product) => {
    setIssuedCard(issuedCard)
    setProduct(product)
  }

  return (
    <Grid container>
      <Grid item xs={12}>
        {issuedCard.createdAt ? (
          <>
            {'Created: '} <DateComponent date={issuedCard.createdAt} />
          </>
        ) : (
          <>
            {'Created: '} <DateComponent date={new Date()} />
          </>
        )}
        <div style={{ height: '10px' }} />
      </Grid>
      <Grid item xs={12} sm={8} className="">
        <AutocompleteProductsIssuedCard issuedCard={props.issuedCard} onChange={onChange} />

        <div>
          <FormControl className="width100per">
            <InputLabel htmlFor="description">{`Note (optional)`}</InputLabel>
            <Input
              id="description"
              multiline
              onChange={(e) => setIssuedCard({ ...issuedCard, description: e.target.value })}
              type="text"
              value={issuedCard.description}
            />
          </FormControl>
        </div>

        {issuedCard.companie.isTrustedPayment && (
          <div>
            <FormControl className="width100per">
              <InputLabel htmlFor="issuedCardCode">{`Reference code (optional)`}</InputLabel>
              <Input
                id="issuedCardCode"
                multiline
                onChange={onChangeReferenceCode}
                type="text"
                value={issuedCard.issuedCardCode}
              />
              <FormHelperText className="secondary">Max. 4 characters; only 0-9, a-z, A-Z.</FormHelperText>
            </FormControl>
          </div>
        )}

        {/* <div>
            <FormControlLabel
              control={
                <Switch
                  checked={issuedCard.notification}
                  onChange={e =>
                    this.setState({
                      issuedCard: {
                        ...issuedCard,
                        notification: e.target.checked
                      }
                    })
                  }
                  value={true}
                />
              }
              label="Notifications"
            />
          </div> */}

        {/* {this.props.context.me.role === 'ADMIN' && (
          <>
            <div className="paperOut">
              <Paper className="paperIn">
                <h3>Admin</h3>
                <div>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={issuedCard.isRequested}
                        onChange={(e) => setIssuedCard({ ...issuedCard, isRequested: e.target.checked })}
                        value={true}
                      />
                    }
                    label="isRequested (admin)"
                  />
                </div>

                <div>
                  <FormControl className="width100per">
                    <InputLabel htmlFor="type">{`Type (Admin)`}</InputLabel>
                    <Select
                      id="type"
                      value={issuedCard.type}
                      onChange={(e: any) =>
                        setIssuedCard({
                          ...issuedCard,
                          type: e.target.value,
                        })
                      }>
                      <MenuItem value={'physical'}>{`Physical`}</MenuItem>
                      <MenuItem value={'virtual'}>{`Virtual`}</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </Paper>
            </div>
          </>
        )} */}

        <br />

        {issuedCard.id && (
          <UpdateIssuedCardInitProduct
            onUpdated={props.onUpdated}
            disabled={issuedCard.name.length < 3}
            titleButton={'Save'}
            onCancel={props.onCancel}
            issuedCard={issuedCard}
            product={product}
          />
        )}
      </Grid>
    </Grid>
  )
}

export default IssuedCardForm
