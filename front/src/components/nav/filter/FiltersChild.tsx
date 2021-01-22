import React from 'react'
import { History } from '../../History.type'
import { Location } from '../../Location.type'
import { withRouter } from 'react-router'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import CurrencyFilter from './CurrencyFilter'
import Last4Filter from './input/Last4Filter'
import AuthorizationIdFilter from './input/AuthorizationIdFilter'
import PromotionIdFilter from './input/PromotionIdFilter'
import SignupTypeFilter from './SignupTypeFilter'
import StatusInvoiceFilter from './multiSelect/StatusInvoiceFilter'
import StatusIssuingFilter from './multiSelect/StatusIssuingFilter'
import VerificationStatusFilter from './multiSelect/VerificationStatusFilter'
import UserVerificationStatusFilter from './multiSelect/UserVerificationStatusFilter'
// import EventsFilter from './multiSelect/EventsFilter'
// import TypeProductFilter from './multiSelect/TypeProductFilter'
import TypePaymentsFilter from './TypePaymentsFilter'
import PeriodFilter from './PeriodFilter'
import IssuedCardTypeFilter from './multiSelect/IssuedCardTypeFilter'
import UserNameFilter from './UserNameFilter'
import ProductNameFilter from './input/ProductNameFilter'
import BuyerFinalPriceFilter from './input/BuyerFinalPriceFilter'
import Type from './input/Type'
import CompanieNameFilter from './CompanieNameFilter'
import ProductFrequencyFilter from './multiSelect/ProductFrequencyFilter'
import StatusIssuedCardFilter from './multiSelect/StatusIssuedCardFilter'
import IsSignedVendorFilter from './select/IsSignedVendorFilter'
import IsBotFilter from './select/IsBotFilter'
import UnsubscribeFilter from './select/UnsubscribeFilter'
import IsSignedFilter from './select/IsSignedFilter'
import TypeCompanieFilter from './multiSelect/TypeCompanieFilter'
import TypeCreationFilter from './multiSelect/TypeCreationFilter'
import CompanieRoleFilter from './multiSelect/CompanieRoleFilter'
import CreationTypeFilter from './multiSelect/CreationTypeFilter'
import VisibilityFilter from './multiSelect/VisibilityFilter'
import HideAddBankFilter from './select/HideAddBankFilter'
import AddStripeBankFilter from './select/AddStripeBankFilter'
import AddPaypalFilter from './select/AddPaypalFilter'
import HasCashbackFilter from './select/HasCashbackFilter'
import HasRevshareFilter from './select/HasRevshareFilter'
import CanBeSignedVendorFilter from './select/CanBeSignedVendorFilter'
import CanBeSignedFilter from './select/CanBeSignedFilter'

import HasInvoiceFilter from './select/HasInvoiceFilter'
import DisableForeignExchangeFee from './select/DisableForeignExchangeFee'
import DeletedLogicallyFilter from './select/DeletedLogicallyFilter'
import MessageFilter from './MessageFilter'
import PrivateDataFilter from './PrivateDataFilter'
import OrderByCountInvoices from './orderBy/OrderByCountInvoices'
import OrderByLastLogin from './orderBy/OrderByLastLogin'
import OrderByAmountInvoices from './orderBy/OrderByAmountInvoices'
import OrderByCountSubscriptions from './orderBy/OrderByCountSubscriptions'
import OrderByCountCompanies from './orderBy/OrderByCountCompanies'
import IsVerifiedFilter from './select/IsVerifiedFilter'
// import Enabled2FAFilter from './____Enabled2FAFilter'
import CanCreatePhysicalIssuedCardFilter from './select/CanCreatePhysicalIssuedCardFilter'
import EmailValidated from './select/EmailValidated'
import TypeInvoiceFilter from './multiSelect/TypeInvoiceFilter'
import AdminTypeInvoiceFilter from './multiSelect/AdminTypeInvoiceFilter'
import TypeIssuedCardsFilter from './multiSelect/TypeIssuedCardsFilter'
import OrderByBuyerFinalPrice from './orderBy/OrderByBuyerFinalPrice'
import DisableCrossBorderFeeFilter from './select/DisableCrossBorderFeeFilter'
import HasIssuedCard from './select/HasIssuedCard'
import IsSourceCreated from './select/IsSourceCreated'
import HideDebitCredit from './select/HideDebitCredit'
import IsAutoTopUpEnabled from './select/IsAutoTopUpEnabled'
import IsTrustedPayment from './select/IsTrustedPayment'
import IsEnabled from './select/IsEnabled'
import IsPersonal from './select/IsPersonal'
import IssuedCardCode from './input/IssuedCardCode'
import IssuedCardName from './input/IssuedCardName'
import Enabled2FATotpFilter from './select/Enabled2FATotpFilter'
import Enabled2FAPhoneFilter from './select/Enabled2FAPhoneFilter'
import Enabled2FAEmailFilter from './select/Enabled2FAEmailFilter'
import ShowInviteSellerFilter from './select/ShowInviteSellerFilter'
import IsDefaultSourceFilter from './select/IsDefaultSourceFilter'
import ResetLoginFilter from './select/ResetLoginFilter'
import ShowInviteBuyerFilter from './select/ShowInviteBuyerFilter'
import IsSuspendedFilter from './select/IsSuspendedFilter'
import IsCompleteFilter from './select/IsCompleteFilter'
import StatusApplicationFilter from './multiSelect/StatusApplicationFilter'

const queryString = require('query-string')

type State = {
  side: string
  type: string
  issuedCardName: string
}

type Props = {
  showAuthorizationId: boolean
  showIsSignedVendor: boolean
  showUnsubscribe: boolean
  showIsSigned: boolean
  showCanBeSigned: boolean
  showCanBeSignedVendor: boolean
  showTypeCreation: boolean
  showPromotionId: boolean
  companieId: string
  showCanCreatePhysicalIssuedCard: string
  showCurrency: boolean

  showEnabled2FATotp: boolean
  showVerificationStatus: boolean
  showUserVerificationStatus: boolean
  showEnabled2FAPhone: boolean
  showEnabled2FAEmail: boolean
  showShowInviteBuyer: boolean
  showShowInviteSeller: boolean
  showStatusApplication: boolean
  showIsDefaultSource: boolean
  showResetLogin: boolean

  showIsVerified: boolean
  showAddStripeBank: boolean
  showAddPaypal: boolean
  showVisibility: boolean
  showStatusIssuing: boolean
  showIssuedCardType: boolean
  // showEvents: boolean
  // showIsBuyer: boolean
  showTypePayments: boolean
  showProductFrequency: boolean
  // showTypeProduct: boolean
  showTypeCompanie: boolean
  showCreationType: boolean
  showHasCashback: boolean
  showIsBot: boolean
  showHasRevshare: boolean

  showIsTrustedPayment: boolean
  showIsEnabled: boolean
  showPeriod: boolean
  showTypeInvoices: boolean
  showAdminTypeInvoices: boolean
  showIsPersonal: boolean
  showOrderByCountInvoices: boolean
  showOrderByAmountInvoices: boolean
  showOrderByCountCompanies: boolean
  showHideDebitCredit: boolean
  showDeletedLogically: boolean
  showHideAddBank: boolean
  showOrderByCountSubscriptions: boolean
  showIsSourceCreated: boolean
  showTypeIssuedCards: boolean
  showSignupType: boolean
  showHasIssuedCard: boolean
  showIsAutoTopUpEnabled: boolean

  showDisableCrossBorderFee: boolean
  showDisableForeignExchangeFee: boolean

  showStatusInvoice: boolean
  showStatusInvoices: boolean
  showType: boolean
  showStatusIssuedCard: boolean
  showMessage: boolean
  showIsSuspended: boolean
  showIsComplete: boolean
  showPrivateData: boolean
  showCompanieRole: boolean

  showLast4: boolean
  showEmailValidated: boolean
  showSide: boolean
  showHasInvoice: boolean

  showOrderByLastLogin: boolean
  showOrderByBuyerFinalPrice: boolean
  showOrderByLastInvoiceDate: boolean
  showUserName: boolean
  showIssuedCardName: boolean
  showIssuedCardCode: boolean

  showCompanieName: boolean
  showProductName: boolean
  showBuyerFinalPrice: boolean
  show: boolean
  baseURL: string
  page: number
  history: History
  location: Location
}

class FiltersChild extends React.Component<Props, State> {
  state = {
    issuedCardName: queryString.parse(this.props.location.search).issuedCardName
      ? queryString.parse(this.props.location.search).issuedCardName
      : '',

    type: queryString.parse(this.props.location.search).type ? queryString.parse(this.props.location.search).type : '',

    side: queryString.parse(this.props.location.search).side,
  }

  componentDidUpdate(prevProps: Props) {
    // const parsed = queryString.parse(this.props.location.search)
    this.redirectWithParams()
    if (this.props.location.search !== prevProps.location.search) {
      this.setState({
        issuedCardName: queryString.parse(this.props.location.search).issuedCardName
          ? queryString.parse(this.props.location.search).issuedCardName
          : '',

        type: queryString.parse(this.props.location.search).type ? queryString.parse(this.props.location.search).type : '',

        side: queryString.parse(this.props.location.search).side,
      })
    }
  }

  componentDidMount = () => {
    this.redirectWithParams()
  }

  redirectWithParams = () => {
    const parsed = queryString.parse(this.props.location.search)

    if (this.props.showSide && !this.state.side) {
      parsed.side = 'PAYMENT'
      this.props.history.replace(this.props.location.pathname + '?' + queryString.stringify(parsed))
      return null
    }
  }

  render() {
    return (
      <>
        <div>
          {this.props.showIsPersonal && <IsPersonal />}

          {this.props.showHideDebitCredit && <HideDebitCredit />}

          {this.props.showIsAutoTopUpEnabled && <IsAutoTopUpEnabled />}

          {this.props.showCurrency && (
            <CurrencyFilter
              variables={{
                where: {
                  companie: {
                    id: this.props.companieId,
                  },
                },
              }}
            />
          )}
          {this.props.showSignupType && <SignupTypeFilter />}
          {this.props.showIsSourceCreated && <IsSourceCreated />}

          {this.props.showHasIssuedCard && <HasIssuedCard />}

          {this.props.showSide && this.state.side && (
            <div className="">
              <FormControl className="inputWidth">
                <InputLabel htmlFor="side">side</InputLabel>
                <Select
                  id="side"
                  value={this.state.side}
                  onChange={(e) => {
                    const parsed = queryString.parse(this.props.location.search)
                    parsed.side = e.target.value
                    this.props.history.push('?' + queryString.stringify(parsed))
                  }}>
                  <MenuItem value={'PAYMENT'}>{`PAYMENT`}</MenuItem>
                  <MenuItem value={'ISSUING'}>{`ISSUING`}</MenuItem>
                </Select>
              </FormControl>
            </div>
          )}
          {this.props.showPeriod && <PeriodFilter />}

          {this.props.showIsTrustedPayment && <IsTrustedPayment />}
          {this.props.showIsEnabled && <IsEnabled />}

          {this.props.showTypeInvoices && <TypeInvoiceFilter />}
          {this.props.showAdminTypeInvoices && <AdminTypeInvoiceFilter />}
          {this.props.showTypeIssuedCards && <TypeIssuedCardsFilter />}
          {this.props.showStatusInvoices && <StatusInvoiceFilter />}

          {this.props.showStatusIssuing && <StatusIssuingFilter />}
          {this.props.showStatusApplication && <StatusApplicationFilter />}
          {this.props.showVerificationStatus && <VerificationStatusFilter />}
          {this.props.showUserVerificationStatus && <UserVerificationStatusFilter />}
          {this.props.showIssuedCardType && <IssuedCardTypeFilter />}
          {/* {this.props.showEvents && <EventsFilter />} */}
          {this.props.showTypePayments && <TypePaymentsFilter />}
          {this.props.showStatusIssuedCard && <StatusIssuedCardFilter />}
          {this.props.showIsVerified && <IsVerifiedFilter />}

          {this.props.showProductFrequency && <ProductFrequencyFilter />}
          {/* {this.props.showTypeProduct && <TypeProductFilter />} */}
          {this.props.showTypeCompanie && <TypeCompanieFilter />}
          {this.props.showTypeCreation && <TypeCreationFilter />}
          {this.props.showCompanieRole && <CompanieRoleFilter />}
          {this.props.showCreationType && <CreationTypeFilter />}
          {this.props.showHasCashback && <HasCashbackFilter />}
          {this.props.showIsBot && <IsBotFilter />}
          {this.props.showHasRevshare && <HasRevshareFilter />}

          {this.props.showVisibility && <VisibilityFilter />}

          {this.props.showHideAddBank && <HideAddBankFilter />}
          {this.props.showAddStripeBank && <AddStripeBankFilter />}
          {this.props.showAddPaypal && <AddPaypalFilter />}
          {this.props.showHasInvoice && <HasInvoiceFilter />}
          {this.props.showDisableForeignExchangeFee && <DisableForeignExchangeFee />}
          {this.props.showDisableCrossBorderFee && <DisableCrossBorderFeeFilter />}

          {this.props.showDeletedLogically && <DeletedLogicallyFilter />}
          {this.props.showEmailValidated && <EmailValidated />}
          {/* {this.props.showEnabled2FA && <Enabled2FAFilter />} */}

          {this.props.showEnabled2FATotp && <Enabled2FATotpFilter />}
          {this.props.showEnabled2FAPhone && <Enabled2FAPhoneFilter />}
          {this.props.showEnabled2FAEmail && <Enabled2FAEmailFilter />}
          {this.props.showShowInviteBuyer && <ShowInviteBuyerFilter />}
          {this.props.showIsSuspended && <IsSuspendedFilter />}
          {this.props.showIsComplete && <IsCompleteFilter />}
          {this.props.showShowInviteSeller && <ShowInviteSellerFilter />}
          {this.props.showIsDefaultSource && <IsDefaultSourceFilter />}
          {this.props.showResetLogin && <ResetLoginFilter />}

          {this.props.showCanCreatePhysicalIssuedCard && <CanCreatePhysicalIssuedCardFilter />}
          {this.props.showProductName && <ProductNameFilter />}
          {this.props.showBuyerFinalPrice && <BuyerFinalPriceFilter />}

          {this.props.showIssuedCardName && <IssuedCardName />}
          {this.props.showLast4 && <Last4Filter />}
          {this.props.showAuthorizationId && <AuthorizationIdFilter />}

          {this.props.showIsSignedVendor && <IsSignedVendorFilter />}
          {this.props.showUnsubscribe && <UnsubscribeFilter />}
          {this.props.showIsSigned && <IsSignedFilter />}
          {this.props.showCanBeSignedVendor && <CanBeSignedVendorFilter />}
          {this.props.showCanBeSigned && <CanBeSignedFilter />}

          {this.props.showPromotionId && <PromotionIdFilter />}
          {this.props.showIssuedCardCode && <IssuedCardCode />}
          {this.props.showUserName && <UserNameFilter />}

          {this.props.showCompanieName && <CompanieNameFilter />}

          {this.props.showType && <Type />}
          {this.props.showMessage && <MessageFilter />}
          {this.props.showPrivateData && <PrivateDataFilter />}

          {this.props.showOrderByLastLogin && <OrderByLastLogin />}
          {this.props.showOrderByCountInvoices && <OrderByCountInvoices />}
          {this.props.showOrderByCountSubscriptions && <OrderByCountSubscriptions />}
          {this.props.showOrderByCountCompanies && <OrderByCountCompanies />}
          {this.props.showOrderByAmountInvoices && <OrderByAmountInvoices />}
          {this.props.showOrderByBuyerFinalPrice && <OrderByBuyerFinalPrice />}
        </div>
      </>
    )
  }
}

export default withRouter(FiltersChild)
