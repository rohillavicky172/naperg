import React from 'react'
import Button from '@material-ui/core/Button'
import { Companie } from '../Companie.type'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const EMAIL_AFTER_COMPANIE_IS_VERIFIED_MUTATION = gql`
  mutation EmailAfterCompanieIsVerified($where: CompanieWhereUniqueInput!) {
    emailAfterCompanieIsVerified(where: $where) {
      id
    }
  }
`

type Props = {
  companie: Companie
}

const EmailAfterCompanieIsVerified = (props: Props) => {
  const [message, setMessage] = React.useState('')
  const [emailAfterCompanieIsVerified] = useMutation(EMAIL_AFTER_COMPANIE_IS_VERIFIED_MUTATION)

  const updateCompanie = async () => {
    let newCompanie
    try {
      newCompanie = await emailAfterCompanieIsVerified({
        variables: {
          where: {
            id: props.companie.id,
          },
        },
      })
    } catch (e) {
      e.graphQLErrors.some((graphQLError) => setMessage(graphQLError.message))
    }
    if (newCompanie) {
      setMessage('Mail sent!')
    }
  }
  return (
    <>
      <Button color="default" variant="outlined" onClick={() => updateCompanie()}>
        {`Send Email Validation after company is verified`}
      </Button>{' '}
      <p className="secondary">{message}</p>
    </>
  )
}

export default EmailAfterCompanieIsVerified
