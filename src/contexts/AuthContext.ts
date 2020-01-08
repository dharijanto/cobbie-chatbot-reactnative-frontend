import { createDataContext, Action, Dispatcher } from '../index'
import { AsyncStorage } from 'react-native'

import CobbieService from '../services/cobbie-service';
import { navigate } from '../utils/navigation-helper'

type ACTION_TYPE = 'LOGIN' | 'REGISTER' | 'ERROR'

const mapReducer = (state: any, action: Action<ACTION_TYPE>) => {
  console.log(`mapReducer() action: ${JSON.stringify(action)}`)
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        userId: action.payload.userId
      }
    case 'REGISTER':
      return {
        ...state
      }
    case 'ERROR':
      return {
        ...state,
        userId: 0,
        errMessage: action.payload
      }
    default:
      return state
  }
}

const apiCalls: any = {}

apiCalls.login = (dispatch: Dispatcher<ACTION_TYPE>) => async (username: string, password: string) => {
  CobbieService.login(username, password).then(resp => {
    if (resp.status && resp.data) {
      const userId = resp.data
      dispatch({ type: 'LOGIN', payload: userId })
      navigate('ChatScreen', {})
    } else {
      throw new Error(resp.errMessage)
    }
  }).catch(err => {
    dispatch({ type: 'ERROR', payload: err.message })
  })
}

apiCalls.tryLocalLogin = (dispatch: Dispatcher<ACTION_TYPE>) => async () => {
  AsyncStorage.getItem('userId').then(result => {
    if (result && parseInt(result, 10) !== 0) {
      dispatch({
        type: 'LOGIN',
        payload: {
          userId: parseInt(result, 10)
        }
      })
      navigate('ChatScreen', {})
    } else {
      throw new Error('Unexpected userId: ' + result)
    }
  }).catch(err => {
    // console.error(err)
    navigate('LoginScreen', {})
  })
}

apiCalls.register = (dispatch: Dispatcher<ACTION_TYPE>) => async (username: string, password: string, companyCode: string) => {
  dispatch({ type: 'LOGIN', payload: { username, password, companyCode } })
}

export const { Provider, Context } = createDataContext(
  mapReducer,
  apiCalls,
  { userId: 0 }
)
