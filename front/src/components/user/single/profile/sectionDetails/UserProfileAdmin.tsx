import React from 'react'
import { User } from '../../../User.type'
import DateComponent from '../../../../nav/DateComponent'
import IsValidated from '../../../single/profile/sectionDetails/IsValidated'
import { Icon, Grid } from '@material-ui/core'
import UseWindowDimensions from '../../../../UseWindowDimensions'

type Props = {
  user: User
}
const UserProfileAdmin = (props: Props) => {
  const isMobile = UseWindowDimensions.isMobile()
  return (
    <>
      <Grid container alignItems="flex-end">
        <Grid item xs={12} md={4} className="bold">
          {`First name:`}
        </Grid>

        <Grid item xs={12} md={8}>
          {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}
          {props.user.firstName}
        </Grid>
      </Grid>

      <Grid container alignItems="flex-end">
        <Grid item xs={12} md={4} className="bold">
          {`Last name:`}
        </Grid>

        <Grid item xs={12} md={8}>
          {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}
          {props.user.lastName}
        </Grid>
      </Grid>

      <Grid container alignItems="flex-end">
        <Grid item xs={12} md={4} className="bold">
          {`Date of birth:`}
        </Grid>

        <Grid item xs={12} md={8}>
          {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}
          {props.user.birthday && <DateComponent date={props.user.birthday} />}
        </Grid>
      </Grid>
      <Grid container alignItems="flex-end">
        <Grid item xs={12} md={4} className="bold">
          {`hubspotId:`}
        </Grid>

        <Grid item xs={12} md={8}>
          {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}
          {props.user.hubspotId}
        </Grid>
      </Grid>
      <Grid container alignItems="flex-end">
        <Grid item xs={12} md={4} className="bold">
          {`updatedAtHubspot:`}
        </Grid>

        <Grid item xs={12} md={8}>
          {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}
          {props.user.updatedAtHubspot && <DateComponent date={props.user.updatedAtHubspot} />}
        </Grid>
      </Grid>
      <Grid container alignItems="flex-end">
        <Grid item xs={12} md={4} className="bold">
          {`loginAttempts:`}
        </Grid>

        <Grid item xs={12} md={8}>
          {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}
          {props.user.loginAttempts}
        </Grid>
      </Grid>
      <Grid container alignItems="flex-end">
        <Grid item xs={12} md={4} className="bold">
          {`Last 4 digits of social security no.:`}
        </Grid>

        <Grid item xs={12} md={8}>
          {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}
          {props.user.last4Social}
        </Grid>
      </Grid>
      <Grid container alignItems="flex-end">
        <Grid item xs={12} md={4} className="bold">
          {`Role:`}
        </Grid>
        <Grid item xs={12} md={8}>
          {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}
          {props.user.role}
        </Grid>
      </Grid>

      <Grid container alignItems="flex-end">
        <Grid item xs={12} md={4} className="bold">
          {`SignupType:`}
        </Grid>
        <Grid item xs={12} md={8}>
          {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}
          {props.user.signupType}
        </Grid>
      </Grid>

      <Grid container alignItems="flex-end">
        <Grid item xs={12} md={4} className="bold">
          {`PrivateData:`}
        </Grid>
        <Grid item xs={12} md={8}>
          {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}
          {props.user.privateData}
        </Grid>
      </Grid>

      <Grid container alignItems="flex-end">
        <Grid item xs={12} md={4} className="bold">
          {`isPhoneValidated:`}
        </Grid>
        <Grid item xs={12} md={8}>
          {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}
          <IsValidated
            iconNotValidated={'phone_disabled'}
            icon={'phone'}
            isValidated={props.user.isPhoneValidated}
            textValidated={'Phone Verified'}
            textNotValidated={'Phone not Verified'}
          />
        </Grid>
      </Grid>
      <Grid container alignItems="flex-end">
        <Grid item xs={12} md={4} className="bold">
          {`isEmailValidated:`}
        </Grid>
        <Grid item xs={12} md={8}>
          {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}
          <IsValidated
            iconNotValidated={'cancel_presentation'}
            icon={'mail'}
            isValidated={props.user.isEmailValidated}
            textValidated={'Email Verified'}
            textNotValidated={'Email not Verified'}
          />
        </Grid>
      </Grid>
      <Grid container alignItems="flex-end">
        <Grid item xs={12} md={4} className="bold">
          {`enabled2FA:`}
        </Grid>
        <Grid item xs={12} md={8}>
          {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}

          <IsValidated
            icon={'done'}
            iconNotValidated={'clear'}
            isValidated={props.user.enabled2FA}
            textValidated={'enabled2FA'}
            textNotValidated={'NOT enabled2FA'}
          />
        </Grid>
      </Grid>

      <Grid container alignItems="flex-end">
        <Grid item xs={12} md={4} className="bold">
          {`showInviteBuyer:`}
        </Grid>
        <Grid item xs={12} md={8}>
          {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}

          <IsValidated
            icon={'done'}
            iconNotValidated={'clear'}
            isValidated={props.user.showInviteBuyer}
            textValidated={'showInviteBuyer'}
            textNotValidated={'NOT showInviteBuyer'}
          />
        </Grid>
      </Grid>
      <Grid container alignItems="flex-end">
        <Grid item xs={12} md={4} className="bold">
          {`showInviteSeller:`}
        </Grid>
        <Grid item xs={12} md={8}>
          {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}

          <IsValidated
            icon={'done'}
            iconNotValidated={'clear'}
            isValidated={props.user.showInviteSeller}
            textValidated={'showInviteSeller'}
            textNotValidated={'NOT showInviteSeller'}
          />
        </Grid>
      </Grid>

      <Grid container alignItems="flex-end">
        <Grid item xs={12} md={4} className="bold">
          {`inviteMembersTooltip:`}
        </Grid>
        <Grid item xs={12} md={8}>
          {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}

          <IsValidated
            icon={'done'}
            iconNotValidated={'clear'}
            isValidated={props.user.inviteMembersTooltip}
            textValidated={'inviteMembersTooltip'}
            textNotValidated={'NOT inviteMembersTooltip'}
          />
        </Grid>
      </Grid>

      <Grid container alignItems="flex-end">
        <Grid item xs={12} md={4} className="bold">
          {`createIssuedCardsTooltip:`}
        </Grid>
        <Grid item xs={12} md={8}>
          {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}

          <IsValidated
            icon={'done'}
            iconNotValidated={'clear'}
            isValidated={props.user.createIssuedCardsTooltip}
            textValidated={'createIssuedCardsTooltip'}
            textNotValidated={'NOT createIssuedCardsTooltip'}
          />
        </Grid>
      </Grid>
      <Grid container alignItems="flex-end">
        <Grid item xs={12} md={4} className="bold">
          {`switchAccountsTooltip:`}
        </Grid>
        <Grid item xs={12} md={8}>
          {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}

          <IsValidated
            icon={'done'}
            iconNotValidated={'clear'}
            isValidated={props.user.switchAccountsTooltip}
            textValidated={'switchAccountsTooltip'}
            textNotValidated={'NOT switchAccountsTooltip'}
          />
        </Grid>
      </Grid>
      <Grid container alignItems="flex-end">
        <Grid item xs={12} md={4} className="bold">
          {`createIssuedCardTooltip:`}
        </Grid>
        <Grid item xs={12} md={8}>
          {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}

          <IsValidated
            icon={'done'}
            iconNotValidated={'clear'}
            isValidated={props.user.createIssuedCardTooltip}
            textValidated={'createIssuedCardTooltip'}
            textNotValidated={'NOT createIssuedCardTooltip'}
          />
        </Grid>
      </Grid>
      <Grid container alignItems="flex-end">
        <Grid item xs={12} md={4} className="bold">
          {`actionIssuedCardTooltip:`}
        </Grid>
        <Grid item xs={12} md={8}>
          {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}

          <IsValidated
            icon={'done'}
            iconNotValidated={'clear'}
            isValidated={props.user.actionIssuedCardTooltip}
            textValidated={'actionIssuedCardTooltip'}
            textNotValidated={'NOT actionIssuedCardTooltip'}
          />
        </Grid>
      </Grid>
      <Grid container alignItems="flex-end">
        <Grid item xs={12} md={4} className="bold">
          {`spendingLimitIssuedCardTooltip:`}
        </Grid>
        <Grid item xs={12} md={8}>
          {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}

          <IsValidated
            icon={'done'}
            iconNotValidated={'clear'}
            isValidated={props.user.spendingLimitIssuedCardTooltip}
            textValidated={'spendingLimitIssuedCardTooltip'}
            textNotValidated={'NOT spendingLimitIssuedCardTooltip'}
          />
        </Grid>
      </Grid>
      <Grid container alignItems="flex-end">
        <Grid item xs={12} md={4} className="bold">
          {`expiryDateIssuedCardTooltip:`}
        </Grid>
        <Grid item xs={12} md={8}>
          {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}

          <IsValidated
            icon={'done'}
            iconNotValidated={'clear'}
            isValidated={props.user.expiryDateIssuedCardTooltip}
            textValidated={'expiryDateIssuedCardTooltip'}
            textNotValidated={'NOT expiryDateIssuedCardTooltip'}
          />
        </Grid>
      </Grid>
      <Grid container alignItems="flex-end">
        <Grid item xs={12} md={4} className="bold">
          {`copyClipboardIssuedCardTooltip:`}
        </Grid>
        <Grid item xs={12} md={8}>
          {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}

          <IsValidated
            icon={'done'}
            iconNotValidated={'clear'}
            isValidated={props.user.copyClipboardIssuedCardTooltip}
            textValidated={'copyClipboardIssuedCardTooltip'}
            textNotValidated={'NOT copyClipboardIssuedCardTooltip'}
          />
        </Grid>
      </Grid>

      <Grid container alignItems="flex-end">
        <Grid item xs={12} md={4} className="bold">
          {`isSuspended:`}
        </Grid>
        <Grid item xs={12} md={8}>
          {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}

          <IsValidated
            icon={'done'}
            iconNotValidated={'clear'}
            isValidated={props.user.isSuspended}
            textValidated={'isSuspended'}
            textNotValidated={'NOT isSuspended'}
          />
        </Grid>
      </Grid>
      <Grid container alignItems="flex-end">
        <Grid item xs={12} md={4} className="bold">
          {`unsubscribe:`}
        </Grid>
        <Grid item xs={12} md={8}>
          {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}

          <IsValidated
            icon={'done'}
            iconNotValidated={'clear'}
            isValidated={props.user.unsubscribe}
            textValidated={'unsubscribe'}
            textNotValidated={'Not unsubscribe'}
          />
        </Grid>
      </Grid>
      <Grid container alignItems="flex-end">
        <Grid item xs={12} md={4} className="bold">
          {`isPhoneValidationRequired:`}
        </Grid>
        <Grid item xs={12} md={8}>
          {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}

          <IsValidated
            icon={'done'}
            iconNotValidated={'clear'}
            isValidated={props.user.isPhoneValidationRequired}
            textValidated={'Phone required'}
            textNotValidated={'Phone NOT required'}
          />
        </Grid>
        <Grid container alignItems="flex-end">
          <Grid item xs={12} md={4} className="bold">
            {`welcomePersonalizedSent:`}
          </Grid>
          <Grid item xs={12} md={8}>
            {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}

            <IsValidated
              icon={'done'}
              iconNotValidated={'clear'}
              isValidated={props.user.welcomePersonalizedSent}
              textValidated={'Phone required'}
              textNotValidated={'Phone NOT required'}
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default UserProfileAdmin
