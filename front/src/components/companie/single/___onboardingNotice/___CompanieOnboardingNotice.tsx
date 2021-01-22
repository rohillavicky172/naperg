import React from 'react'
import Error from '../../../nav/error/Error'
import NotFound from '../../../nav/error/NotFound'
import Loading from '../../../nav/error/Loading'
import { useQuery } from '@apollo/react-hooks'
import { COMPANIE_QUERY } from '../../GraphQL'
// import TenplateOnboardingNotice from './___TenplateOnboardingNotice'

type Props = {
  type: string
  companieId: string
}

const CompanieOnboardingNotice = (props: Props) => {
  const { loading, error, data } = useQuery(COMPANIE_QUERY, {
    variables: { where: { id: props.companieId } },
  })

  if (error) return <Error message={error.graphQLErrors.length && error.graphQLErrors[0].message} />
  if (loading) return <Loading />
  if (!data.companie) return <NotFound />

  const companie = data.companie

  return (
    <>
      {/* {!companie.isOnboardingMembersDone && props.type === 'onboardingMembers' && (
        <TenplateOnboardingNotice companieId={companie.id} type={props.type}>
          {`Invite members of your group and allocate NachoCards to them`}
        </TenplateOnboardingNotice>
      )} */}
      {/* {!companie.isOnboardingBillingAddressDone && props.type === 'onboardingBillingAddress' && (
        <TenplateOnboardingNotice companieId={companie.id} type={props.type}>
          {`
              Billing address is required before creating NachoCards. 
              This is the address you will enter if a vendor asks you for a billing address when making an online payment with your Nachocard.`}
        </TenplateOnboardingNotice>
      )} */}
      {/* {!companie.isOnboardingIssuedCardsDone && props.type === 'onboardingIssuedCards' && (
        <TenplateOnboardingNotice companieId={companie.id} type={props.type}>
          {`
            Create your NachoCards here.  You can create as many cards as you like - e.g., one card per subscription vendor. 
            You'll also be able to set budgets per card.
            `}
        </TenplateOnboardingNotice>
      )} */}
      {/* {!companie.isOnboardingIssuedCardDone && props.type === 'onboardingIssuedCard' && (
        <TenplateOnboardingNotice companieId={companie.id} type={props.type}>
          {`
              You can now use this NachoCard to pay the vendor.  
              Log into the vendor's site and switch your payment method to this NachoCard.
              `}
          <br />
          {`You can add spending restrictions to the NachoCard on this page.`} <br />
          {`You can now create as many cards as you like.`}
        </TenplateOnboardingNotice>
      )} */}
      {/* {!companie.isOnboardingBalanceDone && props.type === 'onboardingBalance' && (
        <>
          {companie.isTrustedPayment ? (
            <TenplateOnboardingNotice companieId={companie.id} type={props.type}>
              {`Please add a Payment Source. This will be used to fund all your NachoCards. `}
              <br />
              {`Each time your NachoCard is charged, funds will be drawn directly from your Payment Source.`}
            </TenplateOnboardingNotice>
          ) : (
            <TenplateOnboardingNotice companieId={companie.id} type={props.type}>
              {`Please add a payment source.  This payment source will be used to fund all your NachoCards.`}
              <br />
              {`After your payment source is added, load funds into your NachoNacho account based on your projected subscription expenses by clicking 'Top up now'.`}
            </TenplateOnboardingNotice>
          )}
        </>
      )} */}
    </>
  )
}

export default CompanieOnboardingNotice
