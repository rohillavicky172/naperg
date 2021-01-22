import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import Button from '@material-ui/core/Button'
import { Companie } from '../Companie.type'
import gql from 'graphql-tag'
import ButtonLoadingAfterClick from '../../nav/ButtonLoadingAfterClick'

export const MUTATION = gql`
  mutation UpdateCompanieMutation($data: CompanieUpdateInput!, $where: CompanieWhereUniqueInput!) {
    updateCompanie(data: $data, where: $where) {
      id
      name
      registeredBusinessName
      website
      # privateData
      nameFile
      valueSpent
      # canCreatePhysicalIssuedCard
      # typeCreation
      # incomingPaymentFeeTopUp

      leadershipTitle
      leadershipFirstName
      leadershipLastName
      # isBuyer
      typeCompanie
      leadershipPhone
      leadershipPhoneCode
      leadershipEmail
      isOnboardingMembersDone
      hideDebitCredit
      typeBusinessStructure
      registrationNumber
      hideAddBank
      # addStripeBank
      # addPaypal
      # deletedLogically
      # hideCashOut
      # disableCrossBorderFee
      # disableForeignExchangeFee
      # isOnboardingIssuedCardsDone
      # maxTransactionValue

      isOnboardingIssuedCardDone
      isOnboardingBalanceDone
      isOnboardingBillingAddressDone
      canManageSellerSubscriptionManagement

      # isVerified
      # isPersonal

      # isTrustedPayment
      onboardProcessDone
      stripe_cus_id
      stripe_cus_test_id
    }
  }
`

type Props = {
  textButton: string
  textCancelButton: string
  showCancelButton: boolean
  disabled: boolean
  companie: Companie
  onCancel: () => void
  onUpdate: (companie: Companie) => void
}

const UpdateCompanie = (props: Props) => {
  const [loading, setLoading] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState('')
  const [updateCompanie] = useMutation(MUTATION)

  const updateCompanieF = async () => {
    setLoading(true)
    let newCompanie
    try {
      newCompanie = await updateCompanie({
        variables: {
          where: {
            id: props.companie.id,
          },
          data: {
            name: props.companie.name,
            website: props.companie.website,
            // privateData: props.companie.privateData,
            // isPersonal: props.companie.isPersonal,
            nameFile: props.companie.nameFile,
            typeUploadNameFile: props.companie.typeUploadNameFile,

            // isTrusted: props.companie.isTrusted,
            // isTrustedPayment: props.companie.isTrustedPayment,
            typeCompanie: props.companie.typeCompanie,

            typeBusinessStructure: props.companie.typeBusinessStructure,
            isOnboardingMembersDone: props.companie.isOnboardingMembersDone,
            hideDebitCredit: props.companie.hideDebitCredit,
            hideAddBank: props.companie.hideAddBank,
            // addStripeBank: props.companie.addStripeBank,
            // addPaypal: props.companie.addPaypal,
            // deletedLogically: props.companie.deletedLogically,
            // hideCashOut: props.companie.hideCashOut,
            registrationNumber: props.companie.registrationNumber,
            registeredBusinessName: props.companie.registeredBusinessName,
            // canCreatePhysicalIssuedCard: props.companie.canCreatePhysicalIssuedCard,
            // typeCreation: props.companie.typeCreation,

            // disableCrossBorderFee: props.companie.disableCrossBorderFee,
            // disableForeignExchangeFee: props.companie.disableForeignExchangeFee,

            isOnboardingIssuedCardsDone: props.companie.isOnboardingIssuedCardsDone,
            isOnboardingIssuedCardDone: props.companie.isOnboardingIssuedCardDone,
            isOnboardingBalanceDone: props.companie.isOnboardingBalanceDone,
            isOnboardingBillingAddressDone: props.companie.isOnboardingBillingAddressDone,
            canManageSellerSubscriptionManagement: props.companie.canManageSellerSubscriptionManagement,
            // isVerified: props.companie.isVerified,
            onboardProcessDone: props.companie.onboardProcessDone,
            // maxTransactionValue: props.companie.maxTransactionValue ? Number(props.companie.maxTransactionValue) : undefined,
            // incomingPaymentFeeTopUp: props.companie.incomingPaymentFeeTopUp
            //   ? Number(props.companie.incomingPaymentFeeTopUp)
            //   : undefined,

            leadershipPhone: props.companie.leadershipPhone,
            leadershipPhoneCode: props.companie.leadershipPhoneCode,
            leadershipEmail: props.companie.leadershipEmail,
            leadershipTitle: props.companie.leadershipTitle,
            leadershipFirstName: props.companie.leadershipFirstName,
            leadershipLastName: props.companie.leadershipLastName,
          },
        },
      })
    } catch (e) {
      setLoading(false)
      e.graphQLErrors.some((graphQLError) => setErrorMessage(graphQLError.message))
    }
    if (newCompanie) {
      setLoading(false)
      props.onUpdate(newCompanie)
    }
  }

  return (
    <>
      {props.showCancelButton && <Button onClick={() => props.onCancel()}>{props.textCancelButton}</Button>}{' '}
      <ButtonLoadingAfterClick
        id={'idButtonUpdateCompanie'}
        icon={''}
        color={'primary'}
        disabled={props.disabled}
        variant={'outlined'}
        size={'medium'}
        buttonText={props.textButton}
        buttonLoadingText={`Loading...`}
        onClick={() => updateCompanieF()}
        loading={loading}
      />
      {/* <Button color="primary" disabled={props.disabled} variant="outlined" onClick={() => updateCompanieF()}>
        {props.textButton}
      </Button> */}
      <p className="secodary">{errorMessage}</p>
    </>
  )
}

export default UpdateCompanie
