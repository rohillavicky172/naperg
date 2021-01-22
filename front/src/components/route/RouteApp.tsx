import retry from './retryHelper'
import React, { lazy, Suspense } from 'react'

import { Route, Switch } from 'react-router-dom'
import HomePage from '../nav/home/btob/HomePage'
import LoginPage from '../user/auth/login/LoginPage'
import UnsubscribePage from '../user/UnsubscribePage'

import Loading from '../nav/error/Loading'
import PrivateRoute from './PrivateRoute'
// import MarketplaceRoute from './MarketplaceRoute'
import AdminRoute from './AdminRoute'
import CreatePromoCodePage from '../promoCode/CreatePromoCodePage'
import ReactGATracking from '../ReactGATracking'

//
const SignupSellerPage = lazy(() => retry(() => import('../user/auth/signup/SignupSellerPage')) as any)
const SignupPage = lazy(() => retry(() => import('../user/auth/signup/SignupPage')) as any)
const NotFound = lazy(() => retry(() => import('../nav/error/NotFound')) as any)
const DashboardAdminPage = lazy(() => retry(() => import('../nav/home/btob/DashboardAdminPage')) as any)
const DashboardAdminLightPage = lazy(() => retry(() => import('../nav/home/btob/DashboardAdminLightPage')) as any)
const DashboardAdminDailyPage = lazy(() => retry(() => import('../nav/home/btob/DashboardAdminDailyPage')) as any)
const DashboardAdminMonthlyPage = lazy(() => retry(() => import('../nav/home/btob/DashboardAdminMonthlyPage')) as any)
const DashboardAdminYearlyPage = lazy(() => retry(() => import('../nav/home/btob/DashboardAdminYearlyPage')) as any)
const DashboardPage = lazy(() => retry(() => import('../nav/home/btob/DashboardPage')) as any)
const MarketplaceBtoBPage = lazy(() => retry(() => import('../categorieProduct/single/page/MarketplaceBtoBPage')) as any)
const ChangePhonePage = lazy(() => retry(() => import('../user/single/phone/ChangePhonePage')) as any)
const OnboardingPage = lazy(() => retry(() => import('../onboarding/OnboardingPage')) as any)
const ProductPage = lazy(() => retry(() => import('../product/single/page/ProductPage')) as any)
const AddProductToSeller = lazy(() => retry(() => import('../product/single/AddProductToSeller')) as any)
const SubscribeToProduct = lazy(() => retry(() => import('../product/single/page/SubscribeToProduct')) as any)
const ProductActivityPage = lazy(() => retry(() => import('../product/single/page/ProductActivityPage')) as any)
const CreateSubscriptionPage = lazy(() => retry(() => import('../subscription/single/action/CreateSubscriptionPage')) as any)
const ProductAdminPage = lazy(() => retry(() => import('../product/single/page/ProductAdminPage')) as any)
const BalanceAdmin = lazy(() => retry(() => import('../invoice/list/BalanceAdmin')) as any)
const CustomLinksPageAdmin = lazy(() => retry(() => import('../customLink/list/CustomLinksPageAdmin')) as any)
const SellerBalancesPageAdmin = lazy(() => retry(() => import('../sellerBalance/list/SellerBalancesPageAdmin')) as any)
const UpdateProductPage = lazy(() => retry(() => import('../product/single/page/UpdateProductPage')) as any)
const UpdateProductAdminPage = lazy(() => retry(() => import('../product/single/page/UpdateProductAdminPage')) as any)
const SubscriptionPage = lazy(() => retry(() => import('../subscription/single/page/SubscriptionPage')) as any)
const InvoicePage = lazy(() => retry(() => import('../invoice/single/invoicePage/InvoicePage')) as any)
const EditInvoicePage = lazy(() => retry(() => import('../invoice/single/invoicePage/EditInvoicePage')) as any)
const PaymentSourcePage = lazy(() => retry(() => import('../card/list/PaymentSourcePage')) as any)
const AddBankPage = lazy(() => retry(() => import('../card/single/action/AddBankPage')) as any)
const AddPlaidPage = lazy(() => retry(() => import('../card/single/action/AddPlaidPage')) as any)
const CompanieAffiliatePage = lazy(() => retry(() => import('../companie/single/affiliate/CompanieAffiliatePage')) as any)
const BalancesPageAdmin = lazy(() => retry(() => import('../balance/list/BalancesPageAdmin')) as any)
// const SetupGuidePage = lazy(() => retry(() => import('../userRoleCompanie/setupGuide/SetupGuidePage')) as any)
const SettingsPage = lazy(() => retry(() => import('../nav/page/settings/SettingsPage')) as any)
const RewardsPage = lazy(() => retry(() => import('../balance/RewardsPage')) as any)
const AddSourcePage = lazy(() => retry(() => import('../card/single/AddSourcePage')) as any)
const InvoicesAdminPage = lazy(() => retry(() => import('../invoice/list/admin/InvoicesAdminPage')) as any)
const RuleMerchantDatas = lazy(() => retry(() => import('../ruleMerchantData/list/RuleMerchantDatas')) as any)
const InvoicesErrorPage = lazy(() => retry(() => import('../invoice/list/InvoicesErrorPage')) as any)
// const InvoicesSumPerMonthPerCompaniesPage = lazy(
//   () => retry(() => import('../invoice/list/InvoicesSumPerMonthPerCompaniesPage')) as any
// )
// const InvoicesSumPerMonthPerProductsPage = lazy(
//   () => retry(() => import('../invoice/list/InvoicesSumPerMonthPerProductsPage')) as any
// )
const InvoicesUserPage = lazy(() => retry(() => import('../invoice/list/InvoicesUserPage')) as any)
const CreateInvoicePage = lazy(() => retry(() => import('../invoice/single/action/CreateInvoicePage')) as any)
const InvoicesCompaniePage = lazy(() => retry(() => import('../invoice/list/InvoicesCompaniePage')) as any)
const InvoicesSellerPage = lazy(() => retry(() => import('../invoice/list/seller/InvoicesSellerPage')) as any)
// const InvoicesSellerPayment = lazy(() => retry(() => import('../invoice/list/sellerPayment/InvoicesSellerPayment')) as any)
const SubscriptionsCompanyPage = lazy(() => retry(() => import('../subscription/list/SubscriptionsCompanyPage')) as any)
const ComputeInvoicesPromotion = lazy(() => retry(() => import('../invoice/list/admin/ComputeInvoicesPromotion')) as any)
const SubscriptionsListCompanyPage = lazy(() => retry(() => import('../subscription/list/SubscriptionsListCompanyPage')) as any)
const ProductsAdminPage = lazy(() => retry(() => import('../product/list/ProductsAdminPage')) as any)
const SourcesAdminPage = lazy(() => retry(() => import('../source/list/SourcesAdminPage')) as any)
const AppSettings = lazy(() => retry(() => import('../appSetting/AppSettings')) as any)
const PlaidDatasAdminPage = lazy(() => retry(() => import('../plaidData/list/PlaidDatasAdminPage')) as any)
const PlaidBalanceHistoricalPage = lazy(
  () => retry(() => import('../plaidBalanceHistorical/list/PlaidBalanceHistoricalPage')) as any
)
const ResetPassword = lazy(() => retry(() => import('../user/auth/ResetPassword')) as any)
const ContractsAdmin = lazy(() => retry(() => import('../contract/list/ContractsAdmin')) as any)
const CreateContract = lazy(() => retry(() => import('../contract/CreateContract')) as any)
const CreateInvoiceBuyerMonthlyFeePage = lazy(
  () => retry(() => import('../invoice/single/action/CreateInvoiceBuyerMonthlyFeePage')) as any
)
const UpdateContractContainer = lazy(() => retry(() => import('../contract/UpdateContractContainer')) as any)
const ProductPageCreate = lazy(() => retry(() => import('../product/single/page/ProductPageCreate')) as any)
const UserProfileContainer = lazy(() => retry(() => import('../user/single/profile/UserProfileContainer')) as any)
const UserVerificationPage = lazy(() => retry(() => import('../user/single/userVerification/UserVerificationPage')) as any)

const UserIssuedCardsPage = lazy(() => retry(() => import('../issuedCard/list/issuedCardsUser/UserIssuedCardsPage')) as any)

// import UserIssuedCardsPage from '../issuedCard/list/issuedCardsUser/UserIssuedCardsPage.tsx'

const AdminIssuedCardsPage = lazy(() => retry(() => import('../issuedCard/list/AdminIssuedCardsPage')) as any)
const PromotionsAdminPage = lazy(() => retry(() => import('../promotion/list/PromotionsAdminPage')) as any)
const PromoCodesAdminPage = lazy(() => retry(() => import('../promoCode/list/PromoCodesAdminPage')) as any)
const IssuedCardPage = lazy(() => retry(() => import('../issuedCard/single/IssuedCardPage')) as any)
const CancelIssuedCardPage = lazy(() => retry(() => import('../issuedCard/single/CancelIssuedCardPage')) as any)
const IssuedCardsCompaniePage = lazy(
  () => retry(() => import('../issuedCard/list/issuedCardsCompanie/IssuedCardsCompaniePage')) as any
)
const CreateIssuedCardPage = lazy(() => retry(() => import('../issuedCard/single/createIssuedCard/CreateIssuedCardPage')) as any)
const DataProductAdminPage = lazy(() => retry(() => import('../dataProduct/list/page/DataProductAdminPage')) as any)
const FileAdminPage = lazy(() => retry(() => import('../file/list/page/FileAdminPage')) as any)
const CreateCompany = lazy(() => retry(() => import('../companie/single/CreateCompany')) as any)
// const marketplaceAgreement = lazy(() => retry(() => import('../companie/seller/marketplaceAgreement')) as any)
const BalancePage = lazy(() => retry(() => import('../balance/BalancePage')) as any)
const LogsPageAdmin = lazy(() => retry(() => import('../log/list/LogsPageAdmin')) as any)
const SlacksAdminPage = lazy(() => retry(() => import('../slack/list/SlacksAdminPage')) as any)
const PageTrackingLinks = lazy(() => retry(() => import('../trackingLink/list/PageTrackingLinks')) as any)
const PageAnalytics = lazy(() => retry(() => import('../analytic/list/PageAnalytics')) as any)
const PageCampaigns = lazy(() => retry(() => import('../campaign/list/PageCampaigns')) as any)
const ReviewsPageAdmin = lazy(() => retry(() => import('../review/list/ReviewsPageAdmin')) as any)
// const CreateReview = lazy(() => retry(() => import('../review/single/CreateReview')) as any)
const CreateCampaign = lazy(() => retry(() => import('../campaign/single/CreateCampaign')) as any)
const CampaignPage = lazy(() => retry(() => import('../campaign/single/CampaignPage')) as any)
const CardholdersPageAdmin = lazy(() => retry(() => import('../cardholder/list/CardholdersPageAdmin')) as any)
const CardholderPage = lazy(() => retry(() => import('../cardholder/single/CardholderPage')) as any)
const AuthDevicesPageAdmin = lazy(() => retry(() => import('../authDevice/list/AuthDevicesPageAdmin')) as any)
const GetStartedPage = lazy(() => retry(() => import('../wizard/GetStartedPage')) as any)
const SignupAdminPage = lazy(() => retry(() => import('../user/auth/signup/SignupAdminPage')) as any)
const SignupSellerAdmin = lazy(() => retry(() => import('../user/auth/signup/SignupSellerAdmin')) as any)
const SignupInviteSeller = lazy(() => retry(() => import('../user/auth/signup/SignupInviteSeller')) as any)
const SignupUserPage = lazy(() => retry(() => import('../user/auth/signup/SignupUserPage')) as any)
const SignupAffiliatePage = lazy(() => retry(() => import('../user/auth/signup/SignupAffiliatePage')) as any)
const ReviewRequestPage = lazy(() => retry(() => import('../reviewRequest/ReviewRequestPage')) as any)
const ReviewRequetsPageAdmin = lazy(() => retry(() => import('../reviewRequest/list/admin/ReviewRequetsPageAdmin')) as any)
const RequestPasswordReset = lazy(() => retry(() => import('../user/auth/RequestPasswordReset')) as any)
const UsersPageAdmin = lazy(() => retry(() => import('../user/list/admin/UsersPageAdmin')) as any)
const MerchantDatasAdminPage = lazy(() => retry(() => import('../merchantData/list/MerchantDatasAdminPage')) as any)
const CampaignHistoricsPageAdmin = lazy(() => retry(() => import('../campaignHistoric/list/CampaignHistoricsPageAdmin')) as any)
const UsersPageAffiliate = lazy(() => retry(() => import('../user/list/affiliate/UsersPageAffiliate')) as any)
const UsersAddIssueCardPage = lazy(() => retry(() => import('../user/list/usersAddIssueCard/UsersAddIssueCardPage')) as any)
const CompaniesAdminPage = lazy(() => retry(() => import('../companie/list/CompaniesAdminPage')) as any)
const CompaniePage = lazy(() => retry(() => import('../companie/single/CompaniePage')) as any)
const CompanieTeamPage = lazy(() => retry(() => import('../user/list/team/CompanieTeamPage')) as any)
const CompanieSellerTeamPage = lazy(() => retry(() => import('../user/list/team/CompanieSellerTeamPage')) as any)
const UserPageMyAccount = lazy(() => retry(() => import('../user/single/UserPageMyAccount')) as any)
const SubscriptionsUserPage = lazy(() => retry(() => import('../subscription/list/SubscriptionsUserPage')) as any)
const SubscriptionsProductPage = lazy(() => retry(() => import('../subscription/list/SubscriptionsProductPage')) as any)
const AdminSubscriptionManagements = lazy(
  () => retry(() => import('../subscriptionManagement/list/AdminSubscriptionManagements')) as any
)
const SubscriptionsPageAdmin = lazy(() => retry(() => import('../subscription/list/SubscriptionsPageAdmin')) as any)
const HomeCategoriesAll = lazy(() => retry(() => import('../nav/home/HomeCategoriesAll')) as any)
const StripeBalancePage = lazy(() => retry(() => import('../nav/home/StripeBalancePage')) as any)
const CustomFunctionPage = lazy(() => retry(() => import('../customFunction/CustomFunctionPage')) as any)
const HubSpot = lazy(() => retry(() => import('../customFunction/hubSpot/HubSpot')) as any)
// const BulkInvitationAppPage = lazy(() => retry(() => import('../customFunction/BulkInvitationAppPage')) as any)
const UserRoleCompanieAdminPage = lazy(() => retry(() => import('../userRoleCompanie/list/UserRoleCompanieAdminPage')) as any)
const CompanieSellerDashboardPage = lazy(() => retry(() => import('../sellerBalance/CompanieSellerDashboardPage')) as any)

const RouteApp = () => {
  if (process.env.REACT_APP_ENV === 'production') {
    ReactGATracking()
  }

  return (
    <Suspense fallback={<Loading />}>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/dashboard/:companieId" component={DashboardPage} />

        <PrivateRoute path="/productEdit/:productId/" component={UpdateProductPage} />
        <AdminRoute path="/admin/productEdit/:productId/" component={UpdateProductAdminPage} />
        <AdminRoute path="/ruleMerchantDatas" component={RuleMerchantDatas} />
        <AdminRoute path="/HubSpot/" component={HubSpot} />
        {/* <PrivateRoute  path="/seller/product/edit/:productId/" component={UpdateProductPage} /> */}
        <PrivateRoute path="/productActivity/:productId" component={ProductActivityPage} />
        {/* <PrivateRoute  path="/seller/product/:productId" component={ProductSellerPage} /> */}
        <PrivateRoute path="/seller/team/:companieId" component={CompanieSellerTeamPage} />
        <PrivateRoute path="/seller/addProduct" component={AddProductToSeller} />
        <PrivateRoute path="/subscription/:subscriptionId" component={SubscriptionPage} />
        <PrivateRoute path="/getStarted" component={GetStartedPage} />
        <PrivateRoute path="/issuedCard/:issuedCardId" component={IssuedCardPage} />
        <PrivateRoute path="/cancelIssuedCard/:issuedCardId" component={CancelIssuedCardPage} />
        <PrivateRoute path="/issuedCardsCompany/:companieId" component={IssuedCardsCompaniePage} />
        <PrivateRoute path="/createIssuedCard/:userId" component={CreateIssuedCardPage} />
        <PrivateRoute path="/company/createCompany" component={CreateCompany} />
        <PrivateRoute path="/company/:companieId" component={CompaniePage} />
        {/* <PrivateRoute
            
            path="/seller/marketplaceAgreement/:companieId"
            component={marketplaceAgreement}
          /> */}
        <PrivateRoute path="/team/:companieId" component={CompanieTeamPage} />
        <PrivateRoute path="/user/myAccount" component={UserPageMyAccount} />
        <PrivateRoute path="/user/:userId" component={UserProfileContainer} />
        <PrivateRoute path="/issuedCards/:userId" component={UserIssuedCardsPage} />
        {/* <PrivateRoute  path="/setupGuide" component={SetupGuidePage} /> */}
        {/* SHOULD BE DEPRECATED!! */}
        <PrivateRoute path="/cards/:companieId" component={PaymentSourcePage} />
        <PrivateRoute path="/paymentSource/:companieId" component={PaymentSourcePage} />
        {/* <PrivateRoute  path="/balances/:companieId" component={BalancesCompaniePage} /> */}
        <PrivateRoute path="/addBank/:companieId" component={AddBankPage} />
        <PrivateRoute path="/AddPlaid/:companieId" component={AddPlaidPage} />
        <PrivateRoute path="/invoice/:invoiceId" component={InvoicePage} />
        <PrivateRoute path="/subscriptions/:userId" component={SubscriptionsUserPage} />
        <PrivateRoute path="/cardholder/:cardholderId" component={CardholderPage} />
        <PrivateRoute path="/seller/subscriptionsProduct/:productId" component={SubscriptionsProductPage} />
        {/* <PrivateRoute path="/createReview/:productId" component={CreateReview} /> */}

        <PrivateRoute path="/invoicesCompany/:companieId" component={InvoicesCompaniePage} />
        {/* <PrivateRoute  path="/invoicesAffiliate/:userId" component={InvoicesAffiliatePage} /> */}
        {/* <PrivateRoute  path="/seller/invoicesCompany/:companieId" component={InvoicesCompanyPage} /> */}
        <PrivateRoute path="/seller/invoicesProduct/:productId" component={InvoicesSellerPage} />
        {/* <PrivateRoute
            
            path="/seller/invoicesPayment/:productId/:companieId"
            component={InvoicesSellerPayment}
          /> */}
        <PrivateRoute path="/subscriptionsCompany/:companieId" component={SubscriptionsCompanyPage} />
        <PrivateRoute path="/subscriptionsListCompany/:companieId" component={SubscriptionsListCompanyPage} />
        <PrivateRoute path="/usersAddIssuedCard" component={UsersAddIssueCardPage} />
        <PrivateRoute path="/invoices/:userId" component={InvoicesUserPage} />
        <PrivateRoute path="/changePhone/:userId" component={ChangePhonePage} />
        <PrivateRoute path="/inviteUser" component={SignupUserPage} />
        <PrivateRoute path="/affiliateInviteUser" component={SignupAffiliatePage} />
        <PrivateRoute path="/seller/reviewRequest/:productId" component={ReviewRequestPage} />
        <PrivateRoute path="/addSource/:companieId" component={AddSourcePage} />
        <PrivateRoute path="/onboarding" component={OnboardingPage} />
        <PrivateRoute path="/settings/:userId" component={SettingsPage} />
        <PrivateRoute path="/nachoRewards/:companieId" component={RewardsPage} />
        <PrivateRoute path="/affiliateCompany/:companieId" component={CompanieAffiliatePage} />
        <PrivateRoute path="/affiliateUsers/:userId" component={UsersPageAffiliate} />
        <PrivateRoute path="/inviteSeller/" component={SignupInviteSeller} />
        <PrivateRoute path="/userVerification/" component={UserVerificationPage} />

        <PrivateRoute path="/balanceAdmin" component={BalanceAdmin} />

        <PrivateRoute path="/seller/dashboard/:companieId/:productId" component={CompanieSellerDashboardPage} />

        <AdminRoute path="/category/:urlName" component={MarketplaceBtoBPage} />

        <PrivateRoute path="/product/:productId" component={ProductPage} />
        <PrivateRoute path="/subscribe/:productId" component={SubscribeToProduct} />

        <AdminRoute path="/balance/:balanceId" component={BalancePage} />
        <AdminRoute path="/balances/" component={BalancesPageAdmin} />
        <Route path="/login" component={LoginPage} />
        <Route path="/unsubscribe/:userId" component={UnsubscribePage} />
        {/* <Route path="/seller/login" component={LoginPage} /> */}
        <Route path="/signup" component={SignupPage} />
        <Route path="/signupSeller" component={SignupSellerPage} />
        <Route path="/requestPasswordReset" component={RequestPasswordReset} />
        <Route path="/resetPassword" component={ResetPassword} />
        {/* <Route path="/seller/resetPassword" component={ResetPassword} /> */}

        <AdminRoute path="/admin/product/:productId" component={ProductAdminPage} />

        <AdminRoute path="/admin/reviewRequets" component={ReviewRequetsPageAdmin} />
        <AdminRoute path="/admin/customLinks" component={CustomLinksPageAdmin} />
        <AdminRoute path="/subscriptionsAdmin/" component={SubscriptionsPageAdmin} />
        <AdminRoute path="/admin/sellerBalances" component={SellerBalancesPageAdmin} />
        <AdminRoute path="/admin/products" component={ProductsAdminPage} />
        <AdminRoute path="/signupAdmin" component={SignupAdminPage} />
        <AdminRoute path="/signupSellerAdmin" component={SignupSellerAdmin} />
        <AdminRoute path="/createProduct" component={ProductPageCreate} />
        <AdminRoute path="/admin/contracts" component={ContractsAdmin} />
        <AdminRoute path="/admin/editContract/:contractId" component={UpdateContractContainer} />
        <AdminRoute path="/admin/createContract/:companieId" component={CreateContract} />
        <AdminRoute path="/admin/createInvoiceBuyerMonthlyFeePage/:companieId" component={CreateInvoiceBuyerMonthlyFeePage} />
        <AdminRoute path="/categories" component={HomeCategoriesAll} />
        <AdminRoute path="/users" component={UsersPageAdmin} />
        <AdminRoute path="/admin/merchantDatas" component={MerchantDatasAdminPage} />
        <AdminRoute path="/admin/campaignHistorics" component={CampaignHistoricsPageAdmin} />
        <AdminRoute path="/adminInvoices" component={InvoicesAdminPage} />
        <AdminRoute path="/admin/computeInvoicesPromotion" component={ComputeInvoicesPromotion} />
        <AdminRoute path="/invoicesError" component={InvoicesErrorPage} />
        <AdminRoute path="/adminIssuedCards" component={AdminIssuedCardsPage} />
        <AdminRoute path="/promotions" component={PromotionsAdminPage} />
        <AdminRoute path="/admin/promoCodes" component={PromoCodesAdminPage} />
        <AdminRoute path="/companies/" component={CompaniesAdminPage} />
        <AdminRoute path="/logs" component={LogsPageAdmin} />
        <AdminRoute path="/admin/slacks" component={SlacksAdminPage} />
        <AdminRoute path="/trackingLinks" component={PageTrackingLinks} />
        <AdminRoute path="/admin/analytics" component={PageAnalytics} />
        <AdminRoute path="/admin/campaigns" component={PageCampaigns} />
        <AdminRoute path="/admin/reviews" component={ReviewsPageAdmin} />
        <AdminRoute path="/admin/campaign/:campaignId" component={CampaignPage} />
        <AdminRoute path="/admin/createCampaign" component={CreateCampaign} />
        <AdminRoute path="/admin/createPromoCode/:companieId" component={CreatePromoCodePage} />
        <AdminRoute path="/cardholders" component={CardholdersPageAdmin} />
        <AdminRoute path="/authDevices" component={AuthDevicesPageAdmin} />
        <AdminRoute path="/plaids" component={PlaidDatasAdminPage} />
        <AdminRoute path="/plaidBalanceHistorical" component={PlaidBalanceHistoricalPage} />
        {/* <AdminRoute  path="/mailchimp" component={MailchimpPage} /> */}
        <AdminRoute path="/customFunction" component={CustomFunctionPage} />
        {/* <AdminRoute path="/bulkInvitationApp" component={BulkInvitationAppPage} /> */}
        {/* <AdminRoute  path="/sendBulkWelcomePersonalized" component={SendBulkWelcomePersonalized} /> */}
        <AdminRoute path="/dataProducts" component={DataProductAdminPage} />
        <AdminRoute path="/files" component={FileAdminPage} />
        <AdminRoute path="/createInvoice" component={CreateInvoicePage} />
        <AdminRoute path="/editInvoice/:invoiceId" component={EditInvoicePage} />
        <AdminRoute path="/dashboardAdmin" component={DashboardAdminPage} />
        <AdminRoute path="/dashboardAdminLight" component={DashboardAdminLightPage} />
        <AdminRoute path="/dashboardAdminDaily" component={DashboardAdminDailyPage} />
        <AdminRoute path="/dashboardAdminMonthly" component={DashboardAdminMonthlyPage} />
        <AdminRoute path="/dashboardAdminYearly" component={DashboardAdminYearlyPage} />
        <AdminRoute path="/admin/stripeBalance" component={StripeBalancePage} />
        <AdminRoute path="/sources" component={SourcesAdminPage} />
        <AdminRoute path="/appSettings" component={AppSettings} />
        <AdminRoute path="/userRoleCompanie" component={UserRoleCompanieAdminPage} />
        <AdminRoute path="/subscriptionManagements" component={AdminSubscriptionManagements} />
        <AdminRoute path="/createSubscription" component={CreateSubscriptionPage} />
        {/* <AdminRoute path="/invoicesSumPerMonthPerCompanies" component={InvoicesSumPerMonthPerCompaniesPage} /> */}
        {/* <AdminRoute path="/InvoicesSumPerMonthPerProducts" component={InvoicesSumPerMonthPerProductsPage} /> */}
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  )
}

export default RouteApp
