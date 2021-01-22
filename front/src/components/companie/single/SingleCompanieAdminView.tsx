import React from 'react'
import Grid from '@material-ui/core/Grid'
import Icon from '@material-ui/core/Icon'
import IsValidated from '../../user/single/profile/sectionDetails/IsValidated'
import { Companie } from '../Companie.type'
import UseWindowDimensions from '../../UseWindowDimensions'
import CreateTestCompanieInStripe from './action/CreateTestCompanieInStripe'
import utils from '../../utils'

type Props = {
  companie: Companie
}

const SingleCompanieAdminView = (props: Props) => {
  const isMobile = UseWindowDimensions.isMobile()
  return (
    <div>
      <Grid container alignItems="flex-end">
        <Grid item xs={12} md={4} className="bold">
          {`name:`}
        </Grid>
        <Grid item xs={12} md={8}>
          {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}
          {props.companie.name}
        </Grid>
      </Grid>
      <Grid container alignItems="flex-end">
        <Grid item xs={12} md={4} className="bold">
          {`maxTransaction per week:`}
        </Grid>
        <Grid item xs={12} md={8}>
          {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}
          {utils.priceFormated(props.companie.maxTransactionValue, 'usd')}/week
        </Grid>
      </Grid>
      <Grid container alignItems="flex-end">
        <Grid item xs={12} md={4} className="bold">
          {`limitPerTransactionForCardSource:`}
        </Grid>
        <Grid item xs={12} md={8}>
          {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}
          {utils.priceFormated(props.companie.limitPerTransactionForCardSource, 'usd')}
        </Grid>
      </Grid>
      <Grid container alignItems="flex-end">
        <Grid item xs={12} md={4} className="bold">
          {`incomingPaymentFeeTopUp:`}
        </Grid>
        <Grid item xs={12} md={8}>
          {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}
          {props.companie.incomingPaymentFeeTopUp}%
        </Grid>
      </Grid>

      <Grid container alignItems="flex-end">
        <Grid item xs={12} md={4} className="bold">
          {`incomingPaymentFeeCardPercentage:`}
        </Grid>
        <Grid item xs={12} md={8}>
          {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}
          {props.companie.incomingPaymentFeeCardPercentage}%
        </Grid>
      </Grid>
      <Grid container alignItems="flex-end">
        <Grid item xs={12} md={4} className="bold">
          {`incomingPaymentFeeACHPercentage:`}
        </Grid>
        <Grid item xs={12} md={8}>
          {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}
          {props.companie.incomingPaymentFeeACHPercentage}%
        </Grid>
      </Grid>

      <Grid container alignItems="flex-end">
        <Grid item xs={12} md={4} className="bold">
          {`website:`}
        </Grid>
        <Grid item xs={12} md={8}>
          {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}

          {props.companie.website}
        </Grid>
      </Grid>

      <Grid container alignItems="flex-end">
        <Grid item xs={12} md={4} className="bold">
          {`typeCreation:`}
        </Grid>
        <Grid item xs={12} md={8}>
          {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}
          {props.companie.typeCreation}
        </Grid>
      </Grid>
      <Grid container alignItems="flex-end">
        <Grid item xs={12} md={4} className="bold">
          {`Company id (admin):`}
        </Grid>
        <Grid item xs={12} md={8}>
          {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}
          {props.companie.id}
        </Grid>
      </Grid>

      <Grid container alignItems="flex-end">
        <Grid item xs={12} md={4} className="bold">
          {`stripe_cus_id (admin):`}
        </Grid>
        <Grid item xs={12} md={8}>
          {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}
          {props.companie.stripe_cus_id}
        </Grid>
      </Grid>

      <Grid container alignItems="flex-end">
        <Grid item xs={12} md={4} className="bold">
          {`stripe_cus_test_id (admin):`}
        </Grid>
        <Grid item xs={12} md={8}>
          {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}
          {props.companie.stripe_cus_test_id}
          {!props.companie.stripe_cus_test_id && <CreateTestCompanieInStripe companie={props.companie} />}
        </Grid>
      </Grid>

      <Grid container alignItems="flex-end">
        <Grid item xs={12} md={4} className="bold">
          {`isTrustedPayment:`}
        </Grid>
        <Grid item xs={12} md={8}>
          {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}

          <IsValidated
            iconNotValidated={'clear'}
            icon={'done'}
            isValidated={props.companie.isTrustedPayment}
            textValidated={'True'}
            textNotValidated={'False'}
          />
        </Grid>
      </Grid>

      <Grid container alignItems="flex-end">
        <Grid item xs={12} md={4} className="bold">
          {`isVerified:`}
        </Grid>
        <Grid item xs={12} md={8}>
          {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}

          <IsValidated
            iconNotValidated={'clear'}
            icon={'done'}
            isValidated={props.companie.isVerified}
            textValidated={'True'}
            textNotValidated={'False'}
          />
        </Grid>
      </Grid>

      <Grid container alignItems="flex-end">
        <Grid item xs={12} md={4} className="bold">
          {`isPersonal:`}
        </Grid>
        <Grid item xs={12} md={8}>
          {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}

          <IsValidated
            iconNotValidated={'clear'}
            icon={'done'}
            isValidated={props.companie.isPersonal}
            textValidated={'True'}
            textNotValidated={'False'}
          />
        </Grid>
      </Grid>
      <Grid container alignItems="flex-end">
        <Grid item xs={12} md={4} className="bold">
          {`hideDebitCredit:`}
        </Grid>
        <Grid item xs={12} md={8}>
          {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}

          <IsValidated
            iconNotValidated={'clear'}
            icon={'done'}
            isValidated={props.companie.hideDebitCredit}
            textValidated={'True'}
            textNotValidated={'False'}
          />
        </Grid>
      </Grid>
      <Grid container alignItems="flex-end">
        <Grid item xs={12} md={4} className="bold">
          {`hideAddBank:`}
        </Grid>
        <Grid item xs={12} md={8}>
          {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}

          <IsValidated
            iconNotValidated={'clear'}
            icon={'done'}
            isValidated={props.companie.hideAddBank}
            textValidated={'True'}
            textNotValidated={'False'}
          />
        </Grid>
      </Grid>
      <Grid container alignItems="flex-end">
        <Grid item xs={12} md={4} className="bold">
          {`addStripeBank:`}
        </Grid>
        <Grid item xs={12} md={8}>
          {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}

          <IsValidated
            iconNotValidated={'clear'}
            icon={'done'}
            isValidated={props.companie.addStripeBank}
            textValidated={'True'}
            textNotValidated={'False'}
          />
        </Grid>
      </Grid>
      <Grid container alignItems="flex-end">
        <Grid item xs={12} md={4} className="bold">
          {`addPaypal:`}
        </Grid>
        <Grid item xs={12} md={8}>
          {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}

          <IsValidated
            iconNotValidated={'clear'}
            icon={'done'}
            isValidated={props.companie.addPaypal}
            textValidated={'True'}
            textNotValidated={'False'}
          />
        </Grid>
      </Grid>
      <Grid container alignItems="flex-end">
        <Grid item xs={12} md={4} className="bold">
          {`hideCashOut:`}
        </Grid>
        <Grid item xs={12} md={8}>
          {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}

          <IsValidated
            iconNotValidated={'clear'}
            icon={'done'}
            isValidated={props.companie.hideCashOut}
            textValidated={'True'}
            textNotValidated={'False'}
          />
        </Grid>
      </Grid>
      <Grid container alignItems="flex-end">
        <Grid item xs={12} md={4} className="bold">
          {`disableCrossBorderFee:`}
        </Grid>
        <Grid item xs={12} md={8}>
          {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}

          <IsValidated
            iconNotValidated={'clear'}
            icon={'done'}
            isValidated={props.companie.disableCrossBorderFee}
            textValidated={'True'}
            textNotValidated={'False'}
          />
        </Grid>
      </Grid>
      <Grid container alignItems="flex-end">
        <Grid item xs={12} md={4} className="bold">
          {`isOnboardingIssuedCardsDone:`}
        </Grid>
        <Grid item xs={12} md={8}>
          {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}

          <IsValidated
            iconNotValidated={'clear'}
            icon={'done'}
            isValidated={props.companie.isOnboardingIssuedCardsDone}
            textValidated={'True'}
            textNotValidated={'False'}
          />
        </Grid>
      </Grid>
      <Grid container alignItems="flex-end">
        <Grid item xs={12} md={4} className="bold">
          {`isOnboardingBalanceDone:`}
        </Grid>
        <Grid item xs={12} md={8}>
          {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}

          <IsValidated
            iconNotValidated={'clear'}
            icon={'done'}
            isValidated={props.companie.isOnboardingBalanceDone}
            textValidated={'True'}
            textNotValidated={'False'}
          />
        </Grid>
      </Grid>

      <Grid container alignItems="flex-end">
        <Grid item xs={12} md={4} className="bold">
          {`canCreatePhysicalIssuedCard:`}
        </Grid>
        <Grid item xs={12} md={8}>
          {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}

          <IsValidated
            iconNotValidated={'clear'}
            icon={'done'}
            isValidated={props.companie.canCreatePhysicalIssuedCard}
            textValidated={'True'}
            textNotValidated={'False'}
          />
        </Grid>
      </Grid>
      <Grid container alignItems="flex-end">
        <Grid item xs={12} md={4} className="bold">
          {`deletedLogically:`}
        </Grid>
        <Grid item xs={12} md={8}>
          {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}

          <IsValidated
            iconNotValidated={'clear'}
            icon={'done'}
            isValidated={props.companie.deletedLogically}
            textValidated={'True'}
            textNotValidated={'False'}
          />
        </Grid>
      </Grid>
      <Grid container alignItems="flex-end">
        <Grid item xs={12} md={4} className="bold">
          {`disableForeignExchangeFee:`}
        </Grid>
        <Grid item xs={12} md={8}>
          {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}

          <IsValidated
            iconNotValidated={'clear'}
            icon={'done'}
            isValidated={props.companie.disableForeignExchangeFee}
            textValidated={'True'}
            textNotValidated={'False'}
          />
        </Grid>
      </Grid>
      <Grid container alignItems="flex-end">
        <Grid item xs={12} md={4} className="bold">
          {`isOnboardingMembersDone:`}
        </Grid>
        <Grid item xs={12} md={8}>
          {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}

          <IsValidated
            iconNotValidated={'clear'}
            icon={'done'}
            isValidated={props.companie.isOnboardingMembersDone}
            textValidated={'True'}
            textNotValidated={'False'}
          />
        </Grid>
      </Grid>
      <Grid container alignItems="flex-end">
        <Grid item xs={12} md={4} className="bold">
          {`isOnboardingIssuedCardDone:`}
        </Grid>
        <Grid item xs={12} md={8}>
          {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}

          <IsValidated
            iconNotValidated={'clear'}
            icon={'done'}
            isValidated={props.companie.isOnboardingIssuedCardDone}
            textValidated={'True'}
            textNotValidated={'False'}
          />
        </Grid>
      </Grid>
      <Grid container alignItems="flex-end">
        <Grid item xs={12} md={4} className="bold">
          {`isOnboardingBillingAddressDone:`}
        </Grid>
        <Grid item xs={12} md={8}>
          {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}

          <IsValidated
            iconNotValidated={'clear'}
            icon={'done'}
            isValidated={props.companie.isOnboardingBillingAddressDone}
            textValidated={'True'}
            textNotValidated={'False'}
          />
        </Grid>
      </Grid>
      <Grid container alignItems="flex-end">
        <Grid item xs={12} md={4} className="bold">
          {`canManageSellerSubscriptionManagement:`}
        </Grid>
        <Grid item xs={12} md={8}>
          {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}

          <IsValidated
            iconNotValidated={'clear'}
            icon={'done'}
            isValidated={props.companie.canManageSellerSubscriptionManagement}
            textValidated={'True'}
            textNotValidated={'False'}
          />
        </Grid>
      </Grid>
      <Grid container alignItems="flex-end">
        <Grid item xs={12} md={4} className="bold">
          {`tierRecuringPlatformFees:`}
        </Grid>
        <Grid item xs={12} md={8}>
          {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}

          {props.companie.tierRecuringPlatformFees}
        </Grid>
      </Grid>

      <Grid container alignItems="flex-end">
        <Grid item xs={12} md={4} className="bold">
          {`onboardProcessDone:`}
        </Grid>
        <Grid item xs={12} md={8}>
          {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}

          <IsValidated
            iconNotValidated={'clear'}
            icon={'done'}
            isValidated={props.companie.onboardProcessDone}
            textValidated={'True'}
            textNotValidated={'False'}
          />
        </Grid>
      </Grid>

      <Grid container alignItems="flex-end">
        <Grid item xs={12} md={4} className="bold">
          {`typeCompanie:`}
        </Grid>
        <Grid item xs={12} md={8}>
          {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}

          {props.companie.typeCompanie}
        </Grid>
      </Grid>
    </div>
  )
}

export default SingleCompanieAdminView
