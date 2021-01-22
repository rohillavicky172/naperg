import React from 'react'
import { withApollo } from 'react-apollo'
import { flowRight as compose } from 'lodash'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import Grid from '@material-ui/core/Grid'
import { withContext } from '../../withContext'
import { Context } from '../../Context.type'
import SelectCountryForm from '../../addresse/form/SelectCountryForm'
import SelectStateForm from '../../addresse/form/SelectStateForm'
import { IssuedCard } from '../IssuedCard.type'
import UpdateCardHolder from '../action/UpdateCardHolder'
import SelectPhoneCardholder from './SelectPhoneCardholder'
import DobCardholder from './DobCardholder'

type State = {
  issuedCard: IssuedCard
}

type Props = {
  context: Context
  isStripeDisabled: boolean
  userId: string
  onCancel: () => void
  onUpdate: () => void
  issuedCard: IssuedCard
}

class CardholderForm extends React.Component<Props, State> {
  state = {
    issuedCard: this.props.issuedCard,
  }

  render() {
    return (
      <Grid container>
        <Grid item xs={12} sm={8} className="">
          <FormControl className="width100per">
            <InputLabel htmlFor="name">{`Cardholder's Name`}</InputLabel>
            <Input id="name" disabled type="text" value={this.state.issuedCard.issuedCardStripe.cardholder.name} />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={8} className="">
          <FormControl className="width100per">
            <InputLabel htmlFor="City">{`City`}</InputLabel>
            <Input
              id="City"
              multiline
              onChange={(e) =>
                this.setState({
                  issuedCard: {
                    ...this.state.issuedCard,
                    issuedCardStripe: {
                      ...this.state.issuedCard.issuedCardStripe,
                      cardholder: {
                        ...this.state.issuedCard.issuedCardStripe.cardholder,
                        billing: {
                          ...this.state.issuedCard.issuedCardStripe.cardholder.billing,
                          address: {
                            ...this.state.issuedCard.issuedCardStripe.cardholder.billing.address,
                            city: e.target.value,
                          },
                        },
                      },
                    },
                  },
                })
              }
              type="text"
              value={this.state.issuedCard.issuedCardStripe.cardholder.billing.address.city}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={8} className="">
          <FormControl className="width100per">
            <InputLabel htmlFor="line1">{`Address line 1`}</InputLabel>
            <Input
              id="line1"
              multiline
              onChange={(e) =>
                this.setState({
                  issuedCard: {
                    ...this.state.issuedCard,
                    issuedCardStripe: {
                      ...this.state.issuedCard.issuedCardStripe,
                      cardholder: {
                        ...this.state.issuedCard.issuedCardStripe.cardholder,
                        billing: {
                          ...this.state.issuedCard.issuedCardStripe.cardholder.billing,
                          address: {
                            ...this.state.issuedCard.issuedCardStripe.cardholder.billing.address,
                            line1: e.target.value,
                          },
                        },
                      },
                    },
                  },
                })
              }
              type="text"
              value={this.state.issuedCard.issuedCardStripe.cardholder.billing.address.line1}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={8} className="">
          <FormControl className="width100per">
            <InputLabel htmlFor="line2">{`Address line 2`}</InputLabel>
            <Input
              id="line2"
              multiline
              onChange={(e) =>
                this.setState({
                  issuedCard: {
                    ...this.state.issuedCard,
                    issuedCardStripe: {
                      ...this.state.issuedCard.issuedCardStripe,
                      cardholder: {
                        ...this.state.issuedCard.issuedCardStripe.cardholder,
                        billing: {
                          ...this.state.issuedCard.issuedCardStripe.cardholder.billing,
                          address: {
                            ...this.state.issuedCard.issuedCardStripe.cardholder.billing.address,
                            line2: e.target.value,
                          },
                        },
                      },
                    },
                  },
                })
              }
              type="text"
              value={this.state.issuedCard.issuedCardStripe.cardholder.billing.address.line2}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={8} className="">
          <FormControl className="width100per">
            <InputLabel htmlFor="postal_code">{`Zip/Postal code`}</InputLabel>
            <Input
              id="postal_code"
              multiline
              onChange={(e) =>
                this.setState({
                  issuedCard: {
                    ...this.state.issuedCard,
                    issuedCardStripe: {
                      ...this.state.issuedCard.issuedCardStripe,
                      cardholder: {
                        ...this.state.issuedCard.issuedCardStripe.cardholder,
                        billing: {
                          ...this.state.issuedCard.issuedCardStripe.cardholder.billing,
                          address: {
                            ...this.state.issuedCard.issuedCardStripe.cardholder.billing.address,
                            postal_code: e.target.value,
                          },
                        },
                      },
                    },
                  },
                })
              }
              type="text"
              value={this.state.issuedCard.issuedCardStripe.cardholder.billing.address.postal_code}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={8} className="">
          <SelectStateForm
            error={false}
            className={'width100per'}
            state={this.state.issuedCard.issuedCardStripe.cardholder.billing.address.state}
            country={this.state.issuedCard.issuedCardStripe.cardholder.billing.address.country}
            onUpdate={(state) =>
              this.setState({
                issuedCard: {
                  ...this.state.issuedCard,
                  issuedCardStripe: {
                    ...this.state.issuedCard.issuedCardStripe,
                    cardholder: {
                      ...this.state.issuedCard.issuedCardStripe.cardholder,
                      billing: {
                        ...this.state.issuedCard.issuedCardStripe.cardholder.billing,
                        address: {
                          ...this.state.issuedCard.issuedCardStripe.cardholder.billing.address,
                          state,
                        },
                      },
                    },
                  },
                },
              })
            }
          />
        </Grid>
        <Grid item xs={12} sm={8} className="">
          <SelectCountryForm
            className={'width100per'}
            country={this.state.issuedCard.issuedCardStripe.cardholder.billing.address.country}
            onUpdate={(country) =>
              this.setState({
                issuedCard: {
                  ...this.state.issuedCard,
                  issuedCardStripe: {
                    ...this.state.issuedCard.issuedCardStripe,
                    cardholder: {
                      ...this.state.issuedCard.issuedCardStripe.cardholder,
                      billing: {
                        ...this.state.issuedCard.issuedCardStripe.cardholder.billing,
                        address: {
                          ...this.state.issuedCard.issuedCardStripe.cardholder.billing.address,
                          country,
                        },
                      },
                    },
                  },
                },
              })
            }
          />
        </Grid>

        <Grid item xs={12} sm={8} className="">
          <FormControl className="width100per">
            <InputLabel htmlFor="phone_number">{`Phone Number`}</InputLabel>
            <Input
              id="name"
              multiline
              onChange={(e) =>
                this.setState({
                  issuedCard: {
                    ...this.state.issuedCard,
                    issuedCardStripe: {
                      ...this.state.issuedCard.issuedCardStripe,
                      cardholder: {
                        ...this.state.issuedCard.issuedCardStripe.cardholder,
                        phone_number: e.target.value,
                      },
                    },
                  },
                })
              }
              type="text"
              value={this.state.issuedCard.issuedCardStripe.cardholder.phone_number}
            />
          </FormControl>
          <SelectPhoneCardholder
            issuedCard={this.state.issuedCard}
            // phone_number={this.state.issuedCard.issuedCardStripe.cardholder.phone_number}
            onSelect={(phone_code) =>
              this.setState({
                issuedCard: {
                  ...this.state.issuedCard,
                  issuedCardStripe: {
                    ...this.state.issuedCard.issuedCardStripe,
                    cardholder: {
                      ...this.state.issuedCard.issuedCardStripe.cardholder,
                      phone_number: phone_code,
                    },
                  },
                },
              })
            }
          />
        </Grid>

        <Grid item xs={12} sm={8} className="">
          <FormControl className="width100per">
            <InputLabel htmlFor="email">{`Email`}</InputLabel>
            <Input
              id="email"
              multiline
              onChange={(e) =>
                this.setState({
                  issuedCard: {
                    ...this.state.issuedCard,
                    issuedCardStripe: {
                      ...this.state.issuedCard.issuedCardStripe,
                      cardholder: {
                        ...this.state.issuedCard.issuedCardStripe.cardholder,
                        email: e.target.value,
                      },
                    },
                  },
                })
              }
              type="text"
              value={this.state.issuedCard.issuedCardStripe.cardholder.email}
            />
          </FormControl>
        </Grid>
        {(this.props.context.me.role === 'ADMIN' || this.props.isStripeDisabled) && (
          <Grid item xs={12} sm={8} className="">
            <FormControl className="width100per">
              <InputLabel htmlFor="first_name">{`Legal First Name`}</InputLabel>
              <Input
                id="first_name"
                multiline
                onChange={(e: any) =>
                  this.setState({
                    issuedCard: {
                      ...this.state.issuedCard,
                      issuedCardStripe: {
                        ...this.state.issuedCard.issuedCardStripe,
                        cardholder: {
                          ...this.state.issuedCard.issuedCardStripe.cardholder,
                          individual: {
                            ...this.state.issuedCard.issuedCardStripe.cardholder.individual,
                            //   // ...(this.state.issuedCard.issuedCardStripe.cardholder
                            //   //   ? this.state.issuedCard.issuedCardStripe.cardholder.individual
                            //   //   : undefined),
                            first_name: e.target.value,
                          },
                        },
                      },
                    },
                  })
                }
                type="text"
                value={
                  this.state.issuedCard.issuedCardStripe.cardholder.individual
                    ? this.state.issuedCard.issuedCardStripe.cardholder.individual.first_name
                    : ''
                }
              />
            </FormControl>
          </Grid>
        )}
        {(this.props.context.me.role === 'ADMIN' || this.props.isStripeDisabled) && (
          <Grid item xs={12} sm={8} className="">
            <FormControl className="width100per">
              <InputLabel htmlFor="last_name">{`Legal Last Name`}</InputLabel>
              <Input
                id="last_name"
                multiline
                onChange={(e) =>
                  this.setState({
                    issuedCard: {
                      ...this.state.issuedCard,
                      issuedCardStripe: {
                        ...this.state.issuedCard.issuedCardStripe,
                        cardholder: {
                          ...this.state.issuedCard.issuedCardStripe.cardholder,
                          individual: {
                            ...this.state.issuedCard.issuedCardStripe.cardholder.individual,
                            // ...(this.state.issuedCard.issuedCardStripe.cardholder
                            //   ? this.state.issuedCard.issuedCardStripe.cardholder.individual
                            //   : undefined),
                            last_name: e.target.value,
                          },
                        },
                      },
                    },
                  })
                }
                type="text"
                value={
                  this.state.issuedCard.issuedCardStripe.cardholder.individual
                    ? this.state.issuedCard.issuedCardStripe.cardholder.individual.last_name
                    : ''
                }
              />
            </FormControl>
          </Grid>
        )}
        {(this.props.context.me.role === 'ADMIN' || this.props.isStripeDisabled) && (
          <Grid item xs={12} sm={8} className="">
            <DobCardholder
              onUpdate={(dob) =>
                this.setState({
                  issuedCard: {
                    ...this.state.issuedCard,
                    issuedCardStripe: {
                      ...this.state.issuedCard.issuedCardStripe,
                      cardholder: {
                        ...this.state.issuedCard.issuedCardStripe.cardholder,
                        individual: {
                          ...this.state.issuedCard.issuedCardStripe.cardholder.individual,
                          // ...(this.state.issuedCard.issuedCardStripe.cardholder
                          //   ? this.state.issuedCard.issuedCardStripe.cardholder.individual
                          //   : undefined),
                          dob,
                        },
                      },
                    },
                  },
                })
              }
              dob={
                this.state.issuedCard.issuedCardStripe.cardholder && this.state.issuedCard.issuedCardStripe.cardholder.individual
                  ? this.state.issuedCard.issuedCardStripe.cardholder.individual.dob
                  : null
              }
            />
          </Grid>
        )}

        <Grid item xs={12} sm={8} className="">
          <div style={{ height: '10px' }} />
        </Grid>
        <Grid item xs={12} sm={8} className="">
          <UpdateCardHolder issuedCard={this.state.issuedCard} onUpdate={this.props.onUpdate} onCancel={this.props.onCancel} />
        </Grid>
      </Grid>
    )
  }
}

export default compose(withContext, withApollo)(CardholderForm)
