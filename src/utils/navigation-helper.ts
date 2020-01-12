import { NavigationActions, StackActions } from 'react-navigation'

let navigator: any
export const setNavigation = (nav: any) => {
  navigator = nav
}

export const navigate = (routeName: string, params: any) => {
  /* navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params
    })
  ) */

  navigator.dispatch(
    StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName, params })]
    })
  )
}

export const navigateWithStack = (routeName: string, params: any) => {
  navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params
    })
  )
}