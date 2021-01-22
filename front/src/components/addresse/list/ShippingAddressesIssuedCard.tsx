import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import Error from '../../nav/error/Error'
import NotFound from '../../nav/error/NotFound'
import Loading from '../../nav/error/Loading'
// import { Product } from '../../product/Product.type'
import { addressClass, Addresse } from '../Addresse.type'
import AddresseForm from '../form/AddresseForm'
import { ADDRESSES_QUERY } from '../GraphQL'

type Props = {
  companieId: string
  userId: string
  onCreate: () => void
  onUpdate: () => void
  onCancel: () => void
}

const ShippingAddressesIssuedCard = (props: Props) => {
  const { loading, error, data } = useQuery(ADDRESSES_QUERY, {
    variables: {
      where: {
        companie: { id: props.companieId },
        user: { id: props.userId },
        type: 'SHIPPING',
      },
    },
  })

  if (error) return <Error message={error.graphQLErrors.length && error.graphQLErrors[0].message} />
  if (loading) return <Loading />
  if (!data.addresses) return <NotFound />

  return (
    <>
      {data.addresses.length === 0 && (
        <>
          <AddresseForm
            className="width100per"
            textButtonUpdate={'Next'}
            textButtonCreate={'Save'}
            textButtonCancel={'Back'}
            companieId={props.companieId}
            userId={props.userId}
            onCreate={props.onCreate}
            onUpdate={props.onUpdate}
            onCancel={props.onCancel}
            addresse={{ ...addressClass, type: 'SHIPPING' }}
          />
        </>
      )}
      {data.addresses.map((addresse: Addresse) => (
        <div key={addresse.id}>
          <AddresseForm
            className="width100per"
            textButtonUpdate={'Next'}
            textButtonCreate={'Save'}
            textButtonCancel={'Back'}
            companieId={''}
            userId={''}
            onCreate={props.onCreate}
            onUpdate={props.onUpdate}
            onCancel={props.onCancel}
            addresse={addresse}
          />
        </div>
      ))}
    </>
  )
}

export default ShippingAddressesIssuedCard
