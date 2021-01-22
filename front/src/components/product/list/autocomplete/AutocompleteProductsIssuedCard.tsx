import React from 'react'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import ProductsQueryAutocompleteLight from './ProductsQueryAutocompleteLight'
import { Product } from '../../Product.type'
import { IssuedCard } from '../../../issuedCard/IssuedCard.type'
import CustomTooltip from '../../../nav/customTooltip/CustomTooltip'
import { AppContext } from '../../../AppContext'
import { Context } from '../../../Context.type'

type Props = {
  issuedCard: IssuedCard
  onChange: (issuedCard: IssuedCard, product: Product | null) => void
}

const AutocompleteProductsIssuedCard = (props: Props) => {
  const { context }: { context: Context } = React.useContext(AppContext)
  const [issuedCard, setIssuedCard] = React.useState(props.issuedCard)

  const [showResults, setShowResults] = React.useState(false)

  const onClick = (product: Product) => {
    const newIssuedCard = {
      ...issuedCard,
      name: product.name,
    }
    setIssuedCard(newIssuedCard)
    setShowResults(false)

    props.onChange(newIssuedCard, product)
  }

  const onChange = (name: string) => {
    if (name.length <= 20) {
      const newIssuedCard = {
        ...issuedCard,
        name,
      }

      setIssuedCard(newIssuedCard)
      setShowResults(true)
      props.onChange(newIssuedCard, null)
    }
  }

  return (
    <>
      <input type="hidden" value="prayer" />

      <CustomTooltip
        placementDesktop={'bottom'}
        type={'createIssuedCardTooltip'}
        userId={context.me.id}
        text={`
        Give the NachoCard a name, for your own reference. If you are creating the card for a specific vendor, you can enter the name of the vendor.`}>
        <FormControl className="width100per">
          <InputLabel htmlFor="nameIssuedCard">{`Name of card (e.g.: Dropbox) (${issuedCard.name.length}/20)`}</InputLabel>
          <Input autoFocus id="nameIssuedCard" onChange={(e) => onChange(e.target.value)} type="text" value={issuedCard.name} />
        </FormControl>
      </CustomTooltip>

      <br />
      {issuedCard.name && showResults && (
        <>
          <ProductsQueryAutocompleteLight
            onClick={(product: Product) => onClick(product)}
            isActionClickIsLink={true}
            page={1}
            variables={{
              first: 4,
              orderBy: context.userRoleCompanie.companie.isPersonal ? 'levelBtoB_ASC' : 'levelBtoB_DESC',
              where: {
                visibility: 'PUBLIC',
                // typeProduct_in: ['BTOB', 'BTOB_AND_CONSUMER'],
                // productFrequency_in: ['SUBSCRIPTION'],
                OR: [{ name: { contains: issuedCard.name } }, { subName: { contains: issuedCard.name } }],
              },
            }}
          />
        </>
      )}
    </>
  )
}

export default AutocompleteProductsIssuedCard
