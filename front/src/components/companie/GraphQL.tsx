import gql from 'graphql-tag'

export const CREATE_COMPANIE_MUTATION = gql`
  mutation CreateCompanieMutation($data: CompanieCreateInput!) {
    createCompanie(data: $data) {
      id
      name
      website
      # isBuyer
      typeCompanie
      userRoleCompanies {
        id

        companieRole
        permissions
        companie {
          id
          name
          isPersonal
          # isBuyer
          typeCompanie
          onboardProcessDone
          isVerified
        }
        isInvitationApproved
        createdAt

        user {
          id
          firstName
          email
          lastName
        }
      }
    }
  }
`
export const CREATE_SELLER_COMPANIE_MUTATION = gql`
  mutation CreateSellerCompanie($companieName: String!, $productName: String!, $userId: String!) {
    createSellerCompanie(companieName: $companieName, productName: $productName, userId: $userId) {
      id
      name
      website
      # isBuyer
      typeCompanie
      userRoleCompanies {
        id

        companieRole
        permissions
        companie {
          id
          name
          isPersonal
          # isBuyer
          typeCompanie
          onboardProcessDone
          isVerified
        }
        isInvitationApproved
        createdAt

        user {
          id
          firstName
          email
          lastName
        }
      }
    }
  }
`

export const CREATE_AFFILIATE_COMPANIE_MUTATION = gql`
  mutation CreateAffiliateCompanie($userId: String!) {
    createAffiliateCompanie(userId: $userId) {
      id
      name
    }
  }
`

export const CREATE_INVITATION_MUTATION = gql`
  mutation CreateInvitation($data: InvitationCreateInput!) {
    createInvitation(data: $data) {
      id
    }
  }
`

export const COMPANIE_QUERY = gql`
  query Companie($where: CompanieWhereUniqueInput!) {
    companie(where: $where) {
      id
      ownedProducts {
        id
        name
      }
      name
      registeredBusinessName
      website
      leadershipPhone
      privateData
      leadershipPhoneCode
      # isBuyer
      typeCompanie
      typeBusinessStructure
      canCreatePhysicalIssuedCard
      typeCreation
      leadershipEmail
      leadershipTitle
      leadershipFirstName
      leadershipLastName
      registrationNumber
      balances {
        id
        testMode
      }
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
    }
  }
`

export const COMPANIE_STRIPE_QUERY = gql`
  query Companie($where: CompanieWhereUniqueInput!) {
    companie(where: $where) {
      id
      name
      maxTransactionValue
      website
      isPersonal
      valueSpent

      isTrustedPayment

      hideAddBank
      addStripeBank
      addPaypal
      deletedLogically
      hideDebitCredit
      hideCashOut
      disableCrossBorderFee
      disableForeignExchangeFee
      stripe_cus_id
      stripe_cus_test_id
      userStripe {
        id
        default_source
        currency
        email
        sources {
          object
          data {
            id
            object
            account_holder_name
            account_holder_type
            bank_name
            exp_month
            exp_year
            last4
            metadata {
              nickname
            }
            brand
            country
            funding
            status
            receiver {
              address
              amount_received
              amount_charged
              amount_returned
              refund_attributes_status
              refund_attributes_method
            }

            ach_credit_transfer {
              account_number
              routing_number
              fingerprint
              bank_name
              swift_code
            }
          }
        }
      }
    }
  }
`

export const UPDATE_DATE_INVITATION_IN_COMPANIE = gql`
  mutation UpdateDateInvitationInCompanie($userId: ID!, $userRoleCompanieId: ID!) {
    updateDateInvitationInCompanie(userId: $userId, userRoleCompanieId: $userRoleCompanieId) {
      id
    }
  }
`
export const CREATE_TEST_COMPANIE_IN_STRIPE = gql`
  mutation CreateTestCompanieInStripe($companieId: ID!) {
    createTestCompanieInStripe(companieId: $companieId) {
      id
    }
  }
`

export const COMPANIE_QUERY_TEAM = gql`
  query Companie($where: CompanieWhereUniqueInput!) {
    companie(where: $where) {
      id
      name
      # isBuyer
      typeCompanie
      isPersonal
      isTrustedPayment
      website
      userRoleCompanies(orderBy: createdAt_DESC) {
        id
        isInvitationApproved

        lastDateInvitationSent
        permissions
        companieRole
        user {
          id
          firstName
          email
          lastName
          lastLogin
          nameFile
          resetPasswordExpires
        }
      }
    }
  }
`
