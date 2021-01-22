import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { Link } from 'react-router-dom'
import UseWindowDimensions from '../../UseWindowDimensions'
import Error from '../../nav/error/Error'
import NotFound from '../../nav/error/NotFound'
import Loading from '../../nav/error/Loading'
import { Paper, Grid, Button, Icon } from '@material-ui/core'
import CompanieFormAdmin from '../form/CompanieFormAdmin'
import DeleteCompanie from '../DeleteCompanie'
import SingleCompanieAdminView from './SingleCompanieAdminView'
import CreateBalance from '../../balance/CreateBalance'
import { Companie } from '../Companie.type'
import EmailAfterCompanieIsVerified from '../form/EmailAfterCompanieIsVerified'
import ApproveApplicationAdmin from '../form/ApproveApplicationAdmin'
import DateComponent from '../../nav/DateComponent'
// import OwnerOfCompanieVerificationStatusCompanieView from '../../user/single/userVerification/OwnerOfCompanieVerificationStatusCompanieView'

export const COMPANIE_QUERY = gql`
  query Companie($where: CompanieWhereUniqueInput!) {
    companie(where: $where) {
      id
      createdAt
      name
      registeredBusinessName
      website
      leadershipPhone
      privateData
      leadershipPhoneCode
      limitPerTransactionForCardSource
      typeCompanie
      typeBusinessStructure
      canCreatePhysicalIssuedCard
      typeCreation
      leadershipEmail
      dateSubmissionOwnerOfCompanieVerification
      leadershipTitle
      leadershipFirstName
      incomingPaymentFeeTopUp
      incomingPaymentFeeCardPercentage
      incomingPaymentFeeACHPercentage
      leadershipLastName
      registrationNumber
      dayCreatedAt
      statusApplication
      dateStatusApplication

      isOnboardingMembersDone
      hideDebitCredit
      hideAddBank
      addStripeBank
      addPaypal
      deletedLogically
      hideCashOut
      disableCrossBorderFee
      disableForeignExchangeFee
      isOnboardingIssuedCardsDone
      maxTransactionValue
      isOnboardingIssuedCardDone
      isOnboardingBalanceDone
      isOnboardingBillingAddressDone
      canManageSellerSubscriptionManagement
      tierRecuringPlatformFees

      isVerified
      isPersonal

      isTrustedPayment
      onboardProcessDone
      stripe_cus_id
      stripe_cus_test_id

      ownedProducts {
        id
        name
      }
      balances {
        id
        testMode
      }
    }
  }
`

type Props = {
  companieId: string
}

const SingleCompanieAdmin = (props: Props) => {
  const [editMode, setEditMode] = React.useState(false)

  const toggleEditMode = () => setEditMode(!editMode)

  const { loading, error, data } = useQuery(COMPANIE_QUERY, {
    variables: {
      where: {
        id: props.companieId,
      },
    },
  })

  if (error) return <Error message={error.graphQLErrors.length && error.graphQLErrors[0].message} />
  if (loading) return <Loading />
  if (!data.companie) return <NotFound />
  const companie: Companie = data.companie
  const isMobile = UseWindowDimensions.isMobile()
  return (
    <>
      <div className="paperOut">
        <Paper className="paperIn">
          {editMode ? (
            <CompanieFormAdmin
              showCancelButton={true}
              redirectAfter={true}
              onUpdate={toggleEditMode}
              onCancel={toggleEditMode}
              companie={companie}
            />
          ) : (
            <div>
              <div className="tar">
                <Button variant="outlined" color={'primary'} onClick={toggleEditMode}>
                  {`Edit`}
                </Button>
              </div>

              <SingleCompanieAdminView companie={companie} />
            </div>
          )}
        </Paper>
      </div>

      {/* <div className="paperOut">
        <Paper className="paperIn">
          <OwnerOfCompanieVerificationStatusCompanieView companie={companie} />{' '}
        </Paper>
      </div> */}

      <div className="paperOut">
        <Paper className="paperIn">
          <h3>PAYG Application</h3>

          <p>
            This action will sned an email to the user. The company will be PAYG. Make sure there to cashout his balance first.
          </p>
          <Grid container alignItems="flex-end">
            <Grid item xs={12} md={4} className="bold">
              statusApplication
            </Grid>

            <Grid item xs={12} md={8}>
              {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}
              {companie.statusApplication}
            </Grid>
          </Grid>
          <Grid container alignItems="flex-end">
            <Grid item xs={12} md={4} className="bold">
              isTrustedPayment
            </Grid>

            <Grid item xs={12} md={8}>
              {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}
              {companie.isTrustedPayment ? 'True' : 'False'}
            </Grid>
          </Grid>
          <Grid container alignItems="flex-end">
            <Grid item xs={12} md={4} className="bold">
              dateStatusApplication
            </Grid>

            <Grid item xs={12} md={8}>
              {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}
              {companie.dateStatusApplication && <DateComponent date={companie.dateStatusApplication} />}
            </Grid>
          </Grid>
          <div style={{ height: '10px' }} />
          <div>
            <ApproveApplicationAdmin companie={companie} />
          </div>
        </Paper>
      </div>
      <div className="paperOut">
        <Paper className="paperIn">
          <h3>{companie.name}</h3>
          <Grid container>
            <Grid item xs={12} sm={4} className="">
              <Link to={'/dashboard/' + companie.id}>
                <Button variant="outlined">Dashboard</Button>
              </Link>
            </Grid>
            <Grid item xs={12} sm={4} className="">
              <Link to={'/affiliateCompany/' + companie.id}>
                <Button variant="outlined">Affiliate Company</Button>
              </Link>
            </Grid>
          </Grid>
          <h4>Balance</h4>
          <Grid container>
            <Grid item xs={12} sm={4} className="">
              {companie.balances.map((balance) => (
                <div key={balance.id}>
                  <Link to={'/balance/' + balance.id}>
                    <Button id={'seeBalance'} variant="outlined">
                      Balance
                    </Button>
                  </Link>
                </div>
              ))}
            </Grid>
            <Grid item xs={12} sm={4} className="">
              {companie.balances.length === 0 && <CreateBalance companieId={companie.id} />}
            </Grid>
            <Grid item xs={12} sm={4} className="">
              <Link to={'/admin/sellerBalances/?companieId=' + companie.id}>
                <Button id={'seeSellerBalances'} variant="outlined">
                  Seller Balances
                </Button>
              </Link>
            </Grid>
          </Grid>

          <h4>NachoCards</h4>
          <Grid container>
            <Grid item xs={12} sm={4} className="">
              <Link to={'/nachoRewards/' + companie.id}>
                <Button variant="outlined">NachoRewards</Button>
              </Link>
            </Grid>
            <Grid item xs={12} sm={4} className="">
              <Link to={'/issuedCardsCompany/' + companie.id}>
                <Button variant="outlined">NachoCards</Button>
              </Link>
            </Grid>
            <Grid item xs={12} sm={4} className="">
              <Link to={'/cardholders/?companieId=' + companie.id}>
                <Button variant="outlined">Cardholders</Button>
              </Link>
            </Grid>
          </Grid>

          <h4>Subscriptions</h4>
          <Grid container>
            <Grid item xs={12} sm={4} className="">
              <Link to={'/subscriptionsCompany/' + companie.id}>
                <Button variant="outlined">Subscriptions</Button>
              </Link>
            </Grid>
            <Grid item xs={12} sm={4} className="">
              <Link to={'/subscriptionsListCompany/' + companie.id}>
                <Button variant="outlined">Subscriptions list</Button>
              </Link>
            </Grid>
          </Grid>
          <h4>Transactions</h4>
          <Grid container>
            <Grid item xs={12} sm={4} className="">
              <Link to={'/invoicesCompany/' + companie.id}>
                <Button variant="outlined">Transactions</Button>
              </Link>
            </Grid>
            <Grid item xs={12} sm={4} className="">
              <Link to={'/createInvoice/?companieId=' + companie.id}>
                <Button variant="outlined">Create Transaction</Button>
              </Link>
            </Grid>
            <Grid item xs={12} sm={4} className="">
              <Link to={'/admin/CreateInvoiceBuyerMonthlyFeePage/' + companie.id}>
                <Button variant="outlined">Create Invoice Buyer Monthly Fee</Button>
              </Link>
            </Grid>
          </Grid>
          <h4>Contract</h4>
          <Grid container>
            {companie.typeCompanie === 'SELLER' && (
              <Grid item xs={12} sm={4} className="">
                <Link to={'/admin/createContract/' + companie.id}>
                  <Button variant="outlined">Create contract</Button>
                </Link>
              </Grid>
            )}
            <Grid item xs={12} sm={4} className="">
              <Link to={'/admin/contracts/?companieId=' + companie.id}>
                <Button variant="outlined">Contracts</Button>
              </Link>
            </Grid>
          </Grid>

          <h4>Plaid</h4>
          <Grid container>
            <Grid item xs={12} sm={4} className="">
              <Link to={'/plaids/?companieId=' + companie.id}>
                <Button variant="outlined">Plaids Data</Button>
              </Link>
            </Grid>
            <Grid item xs={12} sm={4} className="">
              <Link to={'/plaidBalanceHistorical/?companieId=' + companie.id}>
                <Button variant="outlined">Balances Plaids</Button>
              </Link>
            </Grid>
          </Grid>
          <h4>Promocodes</h4>
          <Grid container>
            <Grid item xs={12} sm={4} className="">
              <Link to={'/admin/promocodes/?companieId=' + companie.id}>
                <Button variant="outlined">Promocodes</Button>
              </Link>
            </Grid>
            <Grid item xs={12} sm={4} className="">
              <p>
                <Link to={'/admin/createPromoCode/' + companie.id}>
                  <Button variant="outlined">Create promocode</Button>
                </Link>
              </p>
            </Grid>
          </Grid>
          <h4>Users</h4>
          <Grid item xs={12} sm={4} className="">
            <Link to={'/team/' + companie.id}>
              <Button variant="outlined">Members</Button>
            </Link>
          </Grid>
          <Grid item xs={12} sm={4} className="">
            <p>
              <Link to={'/userRoleCompanie?companieId=' + companie.id}>
                <Button variant="outlined">userRoleCompanie</Button>
              </Link>
            </p>
          </Grid>
          <h4>Others</h4>
          <Grid container>
            <Grid item xs={12} sm={4} className="">
              <p>
                <Link to={'/logs/?companieId=' + companie.id}>
                  <Button variant="outlined">Logs</Button>
                </Link>
              </p>
            </Grid>

            <Grid item xs={12} sm={4} className="">
              <Link to={'/paymentSource/' + companie.id}>
                <Button variant="outlined">Payments</Button>
              </Link>
            </Grid>
            <Grid item xs={12} sm={4} className="">
              <Link to={'/sources/?companieId=' + companie.id}>
                <Button variant="outlined">Sources</Button>
              </Link>
            </Grid>

            <Grid item xs={12} sm={4} className="">
              <EmailAfterCompanieIsVerified companie={companie} />
            </Grid>

            <Grid item xs={12} sm={4} className="">
              <Link to={`/trackingLinks/?companieId=${companie.id}`}>
                <Button variant="outlined">trackingLinks</Button>
              </Link>
            </Grid>
          </Grid>

          <h4>Dangerous</h4>
          <Grid container>
            <Grid item xs={12} sm={4} className="">
              <DeleteCompanie companie={companie} />
            </Grid>
          </Grid>
        </Paper>
      </div>
    </>
  )
}

export default SingleCompanieAdmin
