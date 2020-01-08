import { NavigationActions } from 'react-navigation'

let navigator: any
export const setNavigation = (nav: any) => {
  navigator = nav
}

export const navigate = (routeName: string, params: any) => {
  navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params
    })
  )
}
