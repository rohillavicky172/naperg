import React from 'react'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import CategorieProductAutocompleteQuery from './CategorieProductAutocompleteQuery'
import { CategorieProduct } from '../../categorieProduct/CategorieProduct.type'
// import { withRouter } from 'react-router'

type Props = {
  onClick: (categorieProduct: CategorieProduct) => void
}

const CategorieProductAutocomplete = (props: Props) => {
  const [name, setName] = React.useState('')

  return (
    <>
      <FormControl className="width100per">
        <InputLabel htmlFor="nameIssuedCard">{`Category`}</InputLabel>
        <Input id="Category" onChange={(e) => setName(e.target.value)} type="text" value={name} />
      </FormControl>

      <br />
      {name && (
        <>
          <CategorieProductAutocompleteQuery
            onClick={(categorieProduct: CategorieProduct) => {
              props.onClick(categorieProduct)
              setName('')
            }}
            variables={{
              first: 4,
              orderBy: 'name_ASC',
              where: {
                //   visibility_not: 'HIDDEN',
                //   communicationWithSellerType: 'ISSUING_CARD',
                name: { contains: name },
              },
            }}
          />
        </>
      )}
    </>
  )
}

export default CategorieProductAutocomplete
