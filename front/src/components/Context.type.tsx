import { User, userClass } from './user/User.type'
import { AuthDevice } from './authDevice/AuthDevice.type'
import { UserRoleCompanie, userRolecompanieClass } from './userRoleCompanie/UserRoleCompanie.type'

export interface Context {
  // searchProducts: (productsQuery: string) => void,
  toggleDrawerLeft: (toggleDrawerLeft: boolean) => void
  toggleDrawerLeftMobile: (toggleDrawerLeftMobile: boolean) => void
  toggleDrawerRight: (toggleDrawerRight: boolean) => void
  setModeContext: (modeContext: string) => void
  // toggleShowSearchMobile: (showSearchMobile: boolean) => void;
  // toggleDrawerLeftCategories: (toggleDrawerLeftCategories: boolean) => void;
  openSnackBar: (showCloseIcon: boolean, message: string, type: string, time?: number) => void
  // refetchMe: () => void;
  logout: () => void
  // toggleDrawerAdmin: (open: boolean) => void
  me: User
  authDevice: AuthDevice | null
  // isMobile: boolean
  testMode: boolean
  modeContext: string
  isSideBarOpenLeft: boolean
  isSideBarOpenLeftMobile: boolean
  // showSearchMobile: boolean;
  isSideBarOpenRight: boolean
  authState: string
  // isSideBarOpenAdmin: boolean
  // isSideBarOpenLeftCategories: boolean
  userRoleCompanie: UserRoleCompanie
  refreshContext: () => void
  key: number
  // ...ContextData
}

export const contextClass: Context = {
  // isMobile: false,
  testMode: false,
  modeContext: 'buyer',
  authState: '',
  userRoleCompanie: userRolecompanieClass,
  isSideBarOpenRight: false,
  // isSideBarOpenAdmin: false,
  authDevice: null,
  isSideBarOpenLeft: false,
  // isSideBarOpenLeftCategories: false,
  isSideBarOpenLeftMobile: false,
  me: userClass,
  refreshContext: () => {},
  setModeContext: () => {},
  toggleDrawerRight: () => {},
  // toggleDrawerAdmin: () => {},
  toggleDrawerLeft: () => {},
  toggleDrawerLeftMobile: () => {},

  openSnackBar: () => {},
  logout: () => {},
  key: 0,
}

// export interface UserRoleCompanie{
//     id: string,
//     me: User,
//     companie: Companie,
//     permissions: Permission[]
//     // isMobile: boolean,
//     // isSideBarOpenLeft: boolean,
//     // showSearchMobile: boolean,
//     // isSideBarOpenRight: boolean,
//     // isSideBarOpenLeftCategories: boolean,
// }
export interface Permission {
  id: string
}
