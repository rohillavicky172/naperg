import gql from 'graphql-tag'

export const SEND_CONTACT_MESSAGE_MUTATION = gql`
  mutation SendContactMessageMutation(
    $name: String!
    $message: String!
    $companieId: String
    $url: String
    $email: String!
    $phoneNumber: String
    $website: String
  ) {
    sendContactMessage(
      name: $name
      message: $message
      email: $email
      url: $url
      phoneNumber: $phoneNumber
      website: $website
      companieId: $companieId
    )
  }
`
