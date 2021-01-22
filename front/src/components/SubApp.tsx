import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Header from './nav/header/Header'
import IntercomChat from './nav/IntercomChat'
import WarningPhoneNotVerifiedQuery from './user/single/phone/WarningPhoneNotVerifiedQuery'
import Footer from './nav/footer/Footer'
import SideBarLeft from './nav/layout/SideBarLeft'
import SideBarRight from './nav/layout/SideBarRight'
import ValidateInvitation from './user/auth/actionUrl/ValidateInvitation'
import ValidateEmail from './user/auth/actionUrl/ValidateEmail'
import EmailValidatedQuery from './nav/emailValidation/EmailValidatedQuery'
import ChangeCompanieContext from './user/auth/actionUrl/ChangeCompanieContext'
import ScrollToTop from './ScrollToTop'
import RouteApp from './route/RouteApp'
import DrawerLeftContainer from './user/single/drawer/DrawerLeftContainer'
import ListInvoicesNotPaid from './invoice/list/ListInvoicesNotPaid'
import { Context } from './Context.type'
import Loading from './nav/error/Loading'
import OnboardingValidaterEmailUserQuery from './onboarding/OnboardingValidaterEmailUserQuery'
import OnboardingValidaterPhoneUserQuery from './onboarding/OnboardingValidaterPhoneUserQuery'
import Check2FAPage from './user/auth/login/Check2FAPage'
import FullstoryComponent from './nav/FullstoryComponent'
import UserProfileNameForm from './user/single/profile/sectionDetails/UserProfileNameForm'
import RedirectPage from './nav/layout/RedirectPage'
import { AppContext } from './AppContext'
// import InstallPWA from './nav/pwa/InstallPWA'
import SpoofUserStatus from './user/single/action/spoofUser/SpoofUserStatus'
import SlackAuthCodeListener from './slack/SlackAuthCodeListener'
import UserVerificationPageOffsite from './user/single/userVerification/UserVerificationPageOffsite'

const SubApp = () => {
  const { context }: { context: Context } = React.useContext(AppContext)
  const authState = context.authState
  // console.log(authState)
  return (
    <BrowserRouter>
      <>
        {/* {context.authState} */}

        {/* {process.env.REACT_APP_ENV !== 'test' && <LogRocket />} */}
        {context.me?.id && <RedirectPage />}
        {authState === 'loading' && <Loading />}
        {authState === 'loggedin' && <IntercomChat />}
        {/* {authState === 'loggedin' && <AppIdle />} */}
        {authState === 'loggedin' && <FullstoryComponent />}
        <SlackAuthCodeListener />
        {/* {authState === 'loggedin' && <InstallPWA />} */}
        <ScrollToTop />

        {/* <ModeContextComponent /> */}
        {/* <TrackUser /> */}
        {/* <CloseSearchBarOnClick /> */}
        <ValidateInvitation />

        <SpoofUserStatus />

        <ChangeCompanieContext />
        <ValidateEmail />

        {authState === 'loggedin' && <SideBarLeft />}
        {/* {authState === 'loggedin' && <SideBarAdmin />} */}
        {authState === 'loggedin' && <SideBarRight />}
        {/* <SideBarLeftCategories /> */}

        {authState === 'loggedin' && <Header />}
        {/* {authState === 'loggedin' && context.userRoleCompanie.companie.typeCompanie === 'BUYER' && (
            <SetupGuideLogic userRoleCompanieId={context.userRoleCompanie.id} />
          )} */}
        {/* {authState === 'pending_isVerified' && <Logout text={'NachoNacho has been updated. Please refresh.'} />} */}

        <div className="components">
          <div className="root userDrawerClass">
            {authState === 'deviceNotVerified' && <Check2FAPage userId={context.me.id} />}
            {authState === 'loggedin' && (
              <DrawerLeftContainer user={context.me} companieId={context.userRoleCompanie.companie.id} />
            )}

            <main className="mainDrawer">
              {/* {authState === 'loggedin' && context.userRoleCompanie.companie.typeCompanie === 'BUYER' && (
                  <WizardBannerDob />
                )} */}
              {/* {authState === 'loggedin' && context.me.role === 'ADMIN' && <StripeBalanceRetrieve />} */}
              {authState === 'emailNotVerified' && <OnboardingValidaterEmailUserQuery userId={context.me.id} />}
              {authState === 'phoneNotVerified' && <OnboardingValidaterPhoneUserQuery userId={context.me.id} />}
              {authState === 'noName' && <UserProfileNameForm user={context.me} />}
              {authState === 'verificationStatusOffSite' && <UserVerificationPageOffsite />}
              {/* {authState === 'companieNotVerified' && <>Companie Not Verified</>} */}
              {/* {authState === 'loggedin' && <RefreshTokenJWT />} */}
              {/* {( context.authState ==='') && <LoginPage />} */}
              {/* <HeaderStepper showStepper={true}/> */}
              {/* <HeaderStepper showCopyOnboarded={true}/> */}
              {authState === 'loggedin' && context.userRoleCompanie.companie.typeCompanie === 'BUYER' && <ListInvoicesNotPaid />}

              {authState === 'loggedin' && <WarningPhoneNotVerifiedQuery userId={context.me.id} />}

              {/* {authState === 'loggedin' && <CompanyIsVerified companieId={context.userRoleCompanie.companie.id} />} */}

              {authState === 'loggedin' && <EmailValidatedQuery userId={context.me.id} />}

              {/* {authState === 'loggedin' && (
                  <AccountOnHoldBankNotVerified
                    shwowActionButton={true}
                    variables={{
                      where: {
                        companie: { id: context.userRoleCompanie.companie.id },
                        testMode: context.testMode,
                        isDeleted: false,
                        isDefaultSource: true
                      }
                    }}
                  />
                )} */}

              <RouteApp />
            </main>
          </div>
        </div>

        {authState === 'loggedin' && <Footer companieId={context.userRoleCompanie.companie.id} />}
      </>
    </BrowserRouter>
  )
}

export default SubApp
