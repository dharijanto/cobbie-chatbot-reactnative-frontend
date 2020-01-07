import React, { useReducer } from 'react'
export * from './GiftedChat';

export function createDataContext (reducer: any, actions: any, initialState: any) {
  const Context = React.createContext({})

  const Provider = ({ children }: { children: any }) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const boundActions: any = {}
    // tslint:disable-next-line:forin
    for (const key in actions) {
      boundActions[key] = actions[key](dispatch)
    }
    return (
      <Context.Provider value={{ state, ...boundActions }}>{ children }</Context.Provider>
    )
  }
  return  { Context, Provider }
}
