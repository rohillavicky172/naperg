import gql from 'graphql-tag'

export const CREATE_INVITATION_MUTATION = gql`
  mutation CreateInvitation($companieId: String!, $email: String!, $companieRole: String!, $timeZone: String!) {
    createInvitation(companieId: $companieId, email: $email, companieRole: $companieRole, timeZone: $timeZone) {
      id
    }
  }
`

export const CREATE_SELLER_INVITATION_MUTATION = gql`
  mutation CreateSellerInvitation($companieId: String!, $email: String!, $companieRole: String!, $timeZone: String!) {
    createSellerInvitation(companieId: $companieId, email: $email, companieRole: $companieRole, timeZone: $timeZone) {
      id
    }
  }
`

export const INVITATIONS_QUERY = gql`
  query Invitations($where: InvitationWhereInput!) {
    invitations(where: $where) {
      id
      createdAt
      email
      companieRole
    }
  }
`

export const DELETE_INVITATION_MUTATION = gql`
  mutation DeleteInvitation($where: InvitationWhereUniqueInput!) {
    deleteInvitation(where: $where) {
      id
    }
  }
`
