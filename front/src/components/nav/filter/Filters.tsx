import React from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { Button, Grid, Paper, Popover } from '@material-ui/core'
import FiltersChild from './FiltersChild'
import SearchFilter from './input/SearchFilter'
import OrderByCreated from './orderBy/OrderByCreated'
import OrderByDateInvoice from './orderBy/OrderByDateInvoice'
import UserIdFilter from './chip/UserIdFilter'
import InviterIdFilter from './chip/InviterIdFilter'
import SubscriptionIdFilter from './chip/SubscriptionIdFilter'
import ProductIdFilter from './chip/ProductIdFilter'
import CardholderIdFilter from './chip/CardholderIdFilter'
import OrderByLastInvoiceDate from './orderBy/OrderByLastInvoiceDate'
import { useLocation } from 'react-router-dom'
import IssuedCardIdFilter from './chip/IssuedCardIdFilter'
import ClearFilter from './ClearFilter'
import UseWindowDimensions from '../../UseWindowDimensions'
import RuleMerchantDataFilter from './chip/RuleMerchantDataFilter'
import ContractIdFilter from './chip/ContractIdFilter'
import CampaignIdFilter from './chip/CampaignIdFilter'
import CompanieIdFilter from './chip/CompanieIdFilter'
import InvoiceIdFilter from './chip/InvoiceIdFilter'
import IdFilter from './chip/IdFilter'
import PlaidDataIdFilter from './chip/PlaidDataIdFilter'

const queryString = require('query-string')

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    typography: {
      padding: theme.spacing(2),
    },
  })
)

type Props = {
  companieId?: string
  showCurrency?: boolean
  showCampaignId?: boolean
  showIsComplete?: boolean
  showRuleMerchantDataId?: boolean
  showVerificationStatus?: boolean
  showUserVerificationStatus?: boolean
  showCanBeSignedVendor?: boolean
  showCanBeSigned?: boolean
  showIsDefaultSource?: boolean
  showResetLogin?: boolean
  showIsSigned?: boolean
  showEmailValidated?: boolean
  showPrivateData?: boolean
  showIsSignedVendor?: boolean
  showTypeIssuedCards?: boolean
  showUnsubscribe?: boolean
  showIsSuspended?: boolean
  showCompanieRole?: boolean
  showContractId?: boolean
  showBuyerFinalPrice?: boolean
  showIsBot?: boolean
  showIsEnabled?: boolean
  showSubscriptionId?: boolean
  showSignupType?: boolean
  showIsTrustedPayment?: boolean
  showCanCreatePhysicalIssuedCard?: boolean

  showDisableCrossBorderFee?: boolean
  showDisableForeignExchangeFee?: boolean
  showPeriod?: boolean
  showAuthorizationId?: boolean
  showPromotionId?: boolean
  showTypeInvoices?: boolean
  showAdminTypeInvoices?: boolean
  showIsPersonal?: boolean
  showTypeCreation?: boolean
  showHideDebitCredit?: boolean
  showHideAddBank?: boolean
  showIsSourceCreated?: boolean
  showVisibility?: boolean
  showIssuedCardType?: boolean
  showOrderByCreated?: boolean
  showStatusApplication?: boolean
  showOrderByDateInvoice?: boolean
  showHasIssuedCard?: boolean
  showUserId?: boolean
  showCardholderId?: boolean

  showCompanieId?: boolean
  showInvoiceId?: boolean
  showId?: boolean
  showPlaidDataId?: boolean
  // showEnabled2FA?: boolean

  showEnabled2FATotp?: boolean
  showEnabled2FAPhone?: boolean
  showEnabled2FAEmail?: boolean
  showShowInviteBuyer?: boolean
  showShowInviteSeller?: boolean

  showHasCashback?: boolean
  showHasRevshare?: boolean

  showIsAutoTopUpEnabled?: boolean
  showStatusInvoices?: boolean
  showStatusIssuedCard?: boolean
  showLast4?: boolean
  showFirst?: boolean
  showAddStripeBank?: boolean
  showAddPaypal?: boolean
  showHasInvoice?: boolean
  searchPlaceholder?: string
  showTypeCompanie?: boolean

  showMessage?: boolean
  showIsVerified?: boolean
  showType?: boolean
  showSide?: boolean

  showProductFrequency?: boolean
  // showTypeProduct?: boolean
  showCreationType?: boolean

  showEvents?: boolean
  showEmptyColumn?: boolean
  showEmptyColumn2?: boolean
  showDeletedLogically?: boolean
  showProductId?: boolean
  showTypePayments?: boolean
  showStatusIssuing?: boolean
  showEmptyColumn3?: boolean
  showEmptyColumn4?: boolean
  showOrderByLastLogin?: boolean
  showOrderByBuyerFinalPrice?: boolean
  showOrderByLastInvoiceDate?: boolean
  showUserName?: boolean
  showIssuedCardName?: boolean
  showIssuedCardId?: boolean

  showIssuedCardCode?: boolean
  showCompanieName?: boolean
  showProductName?: boolean
  show?: boolean

  showOrderByCountInvoices?: boolean
  showOrderByAmountInvoices?: boolean
  showOrderByCountSubscriptions?: boolean
  showOrderByCountCompanies?: boolean
}
export default function SimplePopover(props: Props) {
  const classes = useStyles()

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const isFilterSelected = () => {
    if (props.showStatusIssuedCard && parsed.statusIssuedCard) return true
    if (props.showIsPersonal && parsed.isPersonal) return true
    if (props.showHasIssuedCard && parsed.hasIssuedCard) return true
    if (props.showProductFrequency && parsed.productFrequency) return true
    if (props.showPeriod && parsed.period) return true
    if (props.showIsSuspended && parsed.isSuspended) return true
    if (props.showPromotionId && parsed.promotionId) return true
    if (props.showStatusInvoices && parsed.statusInvoices) return true
    if (props.showPrivateData && parsed.privateData) return true
    if (props.showEnabled2FATotp && parsed.enabled2FATotp) return true
    if (props.showEnabled2FAEmail && parsed.enabled2FAEmail) return true
    if (props.showEnabled2FAPhone && parsed.enabled2FAPhone) return true
    if (props.showShowInviteBuyer && parsed.showInviteBuyer) return true
    if (props.showShowInviteSeller && parsed.showInviteSeller) return true
    if (props.showHasCashback && parsed.hasCashback) return true
    if (props.showHasRevshare && parsed.hasRevshare) return true
    if (props.showIsBot && parsed.isBot) return true

    if (props.showTypeInvoices && parsed.typeInvoices) return true
    if (props.showAdminTypeInvoices && parsed.typeInvoices) return true
    if (props.showCurrency && parsed.currencies) return true
    if (props.showVisibility && parsed.visibility) return true
    if (props.showCreationType && parsed.creationType) return true
    if (props.showProductName && parsed.productName) return true
    if (props.showCompanieId && parsed.companieId) return true
    if (props.showIsComplete && parsed.isComplete) return true
    if (props.showStatusApplication && parsed.statusApplication) return true
    if (props.showUserVerificationStatus && parsed.userVerificationStatus) return true
    return false
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined
  const location = useLocation()
  const parsed = queryString.parse(location.search)
  const isMobile = UseWindowDimensions.isMobile()
  return (
    <div className="paperOut">
      <Paper className="paperIn">
        <Grid container>
          <Grid item xs={12} sm={8} className="">
            {props.searchPlaceholder && <SearchFilter searchPlaceholder={props.searchPlaceholder} />}
          </Grid>
          <Grid item xs={12} sm={4} className="">
            <div style={{ marginTop: isMobile ? '5px' : '' }} className={isMobile ? 'tal' : 'tar'}>
              {props.showOrderByCreated && <OrderByCreated />} {props.showOrderByDateInvoice && <OrderByDateInvoice />}{' '}
              {props.showOrderByLastInvoiceDate && <OrderByLastInvoiceDate />}{' '}
              <Button
                aria-describedby={id}
                style={{ color: isFilterSelected() ? 'white' : '' }}
                variant={isFilterSelected() ? 'contained' : 'outlined'}
                color="secondary"
                onClick={handleClick}>
                Filters
              </Button>
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}>
                <div className={classes.typography}>
                  <FiltersChild {...props} />
                  <div style={{ marginTop: '10px' }}>
                    <ClearFilter isFilterSelected={isFilterSelected()} onClear={handleClose} />
                  </div>
                </div>
              </Popover>
            </div>
          </Grid>
        </Grid>
      </Paper>
      <Grid container>
        {props.showUserId && parsed.userId && (
          <Grid item xs={12} sm={4} className="">
            <UserIdFilter />
          </Grid>
        )}

        {props.showCompanieId && parsed.companieId && (
          <Grid item xs={12} sm={4} className="">
            <CompanieIdFilter />
          </Grid>
        )}

        {props.showInvoiceId && parsed.invoiceId && (
          <Grid item xs={12} sm={4} className="">
            <InvoiceIdFilter />
          </Grid>
        )}
        {props.showId && parsed.id && (
          <Grid item xs={12} sm={4} className="">
            <IdFilter />
          </Grid>
        )}
        {props.showPlaidDataId && parsed.plaidDataId && (
          <Grid item xs={12} sm={4} className="">
            <PlaidDataIdFilter />
          </Grid>
        )}

        {props.showCardholderId && parsed.cardholderId && (
          <Grid item xs={12} sm={4} className="">
            <CardholderIdFilter />
          </Grid>
        )}
        {props.showRuleMerchantDataId && parsed.ruleMerchantDataId && (
          <Grid item xs={12} sm={4} className="">
            <RuleMerchantDataFilter />
          </Grid>
        )}
        {props.showContractId && parsed.contractId && (
          <Grid item xs={12} sm={4} className="">
            <ContractIdFilter />
          </Grid>
        )}
        {props.showCampaignId && parsed.campaignId && (
          <Grid item xs={12} sm={4} className="">
            <CampaignIdFilter />
          </Grid>
        )}

        {parsed.inviterId && (
          <Grid item xs={12} sm={4} className="">
            <InviterIdFilter />
          </Grid>
        )}
        {props.showSubscriptionId && parsed.subscriptionId && (
          <Grid item xs={12} sm={4} className="">
            <SubscriptionIdFilter />
          </Grid>
        )}
        {props.showProductId && parsed.productId && (
          <Grid item xs={12} sm={4} className="">
            <ProductIdFilter />
          </Grid>
        )}
        {parsed.issuedCardId && (
          <Grid item xs={12} sm={4} className="">
            <IssuedCardIdFilter />
          </Grid>
        )}
      </Grid>
    </div>
  )
}
