import React from 'react'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import { Paper, Grid, InputAdornment, Icon } from '@material-ui/core/'
import IconAdminDashboard from './IconAdminDashboard'
import { FormControl, InputLabel, Input } from '@material-ui/core'
import { useHistory } from 'react-router-dom'

const AdminDashboard = () => {
  const history = useHistory()
  const dataStructures = [
    {
      title: `Quick links`,
      buttons: [
        { nameButton: 'Companies', link: '/companies?isPersonal=FALSE' },
        { nameButton: 'Products', link: '/admin/products?visibility=PUBLIC' },
        { nameButton: 'Transactions', link: '/adminInvoices/' },
        { nameButton: 'Users', link: '/users/' },
      ],
    },
    {
      title: `Invitation`,
      buttons: [
        { nameButton: `Invite User`, link: '/signupAdmin' },

        { nameButton: `Invite Seller`, link: '/signupSellerAdmin' },
      ],
    },
    {
      title: `Transactions`,
      buttons: [
        { link: '/adminInvoices/', nameButton: `Transactions` },
        { link: '/invoicesError', nameButton: `Transactions Error` },
      ],
    },
    {
      title: `Reviews`,
      buttons: [
        { link: '/admin/reviewRequets', nameButton: `Review Requets` },
        { link: '/admin/reviews', nameButton: `Reviews` },
      ],
    },
    {
      title: `Subscriptions`,
      buttons: [
        { link: '/subscriptionsAdmin/', nameButton: `Subscriptions` },
        { nameButton: `createSubscription`, link: '/createSubscription' },
        { link: '/subscriptionManagements/', nameButton: `subscriptionManagements` },
      ],
    },

    {
      title: `Admin Links`,
      buttons: [
        { link: '/appSettings', nameButton: `App Settings` },
        { link: '/balances', nameButton: `Balances` },
        { link: '/admin/sellerBalances', nameButton: `Seller Balances` },
        { link: '/balanceAdmin', nameButton: `Balance App Admin` },
        { link: '/cardholders', nameButton: `Cardholders` },
        { link: '/customFunction', nameButton: `customFunction` },

        {
          link:
            '/admin/contracts?canBeSigned=TRUE&canBeSignedVendor=TRUE&companyContext=cjtuflye71dws0748r7vtuqmg&isComplete=TRUE&isSigned=TRUE&isSignedVendor=TRUE',
          nameButton: `Contracts`,
        },
        { link: '/companies?isPersonal=FALSE', nameButton: `Companies` },
        { link: '/authDevices/', nameButton: `Devices` },
        { link: '/files', nameButton: `Files` },
        { link: '/hubspot', nameButton: `Hubspot` },
        { link: '/logs/', nameButton: `Logs` },
        { link: '/adminIssuedCards/', nameButton: `NachoCards` },
        { link: '/dataProducts', nameButton: `Notes` },

        { link: '/admin/promoCodes', nameButton: `promoCodes` },
        { link: '/admin/customLinks', nameButton: `customLinks` },
        { link: '/sources/', nameButton: `Sources` },

        { link: '/admin/stripeBalance/', nameButton: `Stripe Balance` },

        { link: '/userRoleCompanie/', nameButton: `User Role Companie` },
        { link: '/admin/slacks', nameButton: `slacks` },
        { link: '/users/', nameButton: `Users` },
        { link: '/trackingLinks/', nameButton: `trackingLinks (deprecated)` },
        { link: '/admin/analytics/?isBot=FALSE', nameButton: `analytics` },
      ],
    },
    {
      title: `Products`,
      buttons: [
        { link: '/createProduct', nameButton: `Create Product` },
        { link: '/admin/products?visibility=PUBLIC', nameButton: `Products` },
        { link: '/promotions', nameButton: `Promotions` },
        { link: '/categories', nameButton: `Categories` },
        { link: '/admin/merchantDatas', nameButton: `merchantDatas` },
        { link: '/ruleMerchantDatas/', nameButton: `Rule MerchantDatas` },
      ],
    },
    {
      title: `Campaigns`,
      buttons: [
        { link: '/admin/campaigns', nameButton: `Campaigns` },
        { link: '/admin/createCampaign', nameButton: `Create Campaign` },
        { link: '/admin/campaignHistorics', nameButton: `Campaigns historic` },
      ],
    },

    {
      title: `Plaid`,
      buttons: [
        { link: '/plaids', nameButton: `plaids` },
        { link: '/plaidBalanceHistorical', nameButton: `plaidBalanceHistorical` },
      ],
    },
  ]

  const [name, setName] = React.useState('')
  const onKeyPress = (data) => {
    if (data.charCode === 13) {
      let flatArray: string[] = []
      dataStructuresFilterd.map((dataStructure) => dataStructure.buttons.map((button) => flatArray.push(button.link)))
      history.push(flatArray[0])
    }
  }
  const dataStructuresFilterd = dataStructures.map((dataStructure) => {
    return {
      title: dataStructure.title,
      buttons: dataStructure.buttons.filter((button) => {
        return button.nameButton.toLowerCase().includes(name.toLowerCase())
      }),
    }
  })

  return (
    <div className="paperOut">
      <div className="tac">
        <h2>{`Dashboard Admin`}</h2>
        <IconAdminDashboard />
      </div>
      <div className="paperOut">
        <Paper className="paperIn bgGrey">
          <FormControl className="width100per">
            <InputLabel htmlFor="name">{`Search`}</InputLabel>
            <Input
              autoFocus
              id="name"
              onKeyPress={onKeyPress}
              startAdornment={
                <InputAdornment position="start">
                  <Icon>search</Icon>
                </InputAdornment>
              }
              type="text"
              value={name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
            />
          </FormControl>
        </Paper>
      </div>
      <div className="paperOut">
        <Paper className="paperIn bgGrey">
          {dataStructuresFilterd.map((dataStructure) => (
            <div key={dataStructure.title}>
              <h3>{dataStructure.title}</h3>{' '}
              <Grid container>
                {dataStructure.buttons.map((button) => (
                  <Grid key={button.nameButton} item xs={6} sm={3} className="tac paperIn">
                    <Link to={button.link}>
                      <Button color="primary" variant="outlined">
                        {button.nameButton}
                      </Button>
                    </Link>
                  </Grid>
                ))}
              </Grid>
            </div>
          ))}
        </Paper>
      </div>
    </div>
  )
}

export default AdminDashboard
