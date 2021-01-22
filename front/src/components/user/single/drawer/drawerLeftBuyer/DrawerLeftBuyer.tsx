import React from 'react'
import { User } from '../../../User.type'
import { Companie } from '../../../../companie/Companie.type'
import UseWindowDimensions from '../../../../UseWindowDimensions'
import DrawerLeftBuyerMobile from './DrawerLeftBuyerMobile'
import DrawerLeftBuyerDesktop from './DrawerLeftBuyerDesktop'

type Props = {
  user: User
  companie: Companie
}

const DrawerLeftBuyer = (props: Props) => {
  const isMobile = UseWindowDimensions.isMobile()

  if (isMobile) {
    return <DrawerLeftBuyerMobile user={props.user} companie={props.companie} />
  } else {
    return <DrawerLeftBuyerDesktop user={props.user} companie={props.companie} />
  }
}

export default DrawerLeftBuyer
