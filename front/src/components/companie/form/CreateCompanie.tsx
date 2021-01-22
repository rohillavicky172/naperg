import React from 'react'
import { AppContext } from '../../AppContext'
import { useHistory } from 'react-router-dom'
import { Context } from '../../Context.type'
import { useMutation, useApolloClient } from '@apollo/react-hooks'
import Button from '@material-ui/core/Button'
import { Companie } from '../Companie.type'

import { CREATE_COMPANIE_MUTATION } from '../GraphQL'
import { USER_ROLE_COMPANIE } from '../../../config/config'
import ButtonLoadingAfterClick from '../../nav/ButtonLoadingAfterClick'

type Props = {
  companie: Companie
  userId: string
  showCancelButton: boolean
  redirectAfter: boolean

  onCancel: () => void
}

const CreateCompanie = (props: Props) => {
  const history = useHistory()
  const { context }: { context: Context } = React.useContext(AppContext)
  const [loading, setLoading] = React.useState(false)
  const [message, setMessage] = React.useState('')
  const client = useApolloClient()
  const [createCompanie] = useMutation(CREATE_COMPANIE_MUTATION)

  const createCompanieF = async () => {
    setLoading(true)
    setMessage('')
    let result
    try {
      result = await createCompanie({
        variables: {
          data: {
            ...props.companie,
            userStripe: undefined,
            id: undefined,
            createdAt: undefined,

            stripe_cus_id: '',
            userRoleCompanies: {
              create: {
                companieRole: 'OWNER',
                invitationToken: '',
                isInvitationApproved: true,
                user: {
                  connect: {
                    id: props.userId,
                  },
                },
                invitationRequestedBy: {
                  connect: {
                    id: context.me.id,
                  },
                },
              },
            },
          },
        },
      })
    } catch (e) {
      setLoading(false)
      e.graphQLErrors.some((graphQLError) => setMessage(graphQLError.message))
    }
    setLoading(false)
    if (result) {
      if (result.data.createCompanie.userRoleCompanies.length) {
        const newUserRoleCompanie = result.data.createCompanie.userRoleCompanies[0]

        if (props.redirectAfter) {
          localStorage.setItem(USER_ROLE_COMPANIE, JSON.stringify(newUserRoleCompanie))
          await client.resetStore()
          history.push(`/?companyContext=${newUserRoleCompanie.companie.id}`)
          // context.refreshContext()
        }
      }
    }
  }

  return (
    <>
      <ButtonLoadingAfterClick
        id={'createCompanyButton'}
        icon={''}
        color={'primary'}
        disabled={!props.companie.name.length}
        variant={'outlined'}
        size={'medium'}
        buttonText={'Create'}
        buttonLoadingText={`Loading...`}
        onClick={() => createCompanieF()}
        loading={loading}
      />{' '}
      {props.showCancelButton && <Button onClick={() => props.onCancel()}>{`Cancel`}</Button>}
      <div className="secondary">{message}</div>
    </>
  )
}

export default CreateCompanie
