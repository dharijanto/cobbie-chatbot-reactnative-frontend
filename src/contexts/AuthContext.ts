import { createDataContext, Action, Dispatcher } from '../index'
import CobbieService from '../services/cobbie-service';

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
      const userId = resp.data.userId
      dispatch({ type: 'LOGIN', payload: userId })
    } else {
      throw new Error(resp.errMessage)
    }
  }).catch(err => {
    dispatch({ type: 'ERROR', payload: err.message })
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
