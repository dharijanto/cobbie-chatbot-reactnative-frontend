import axios from 'axios'
import { FrontendResponse } from '../types';

const BASE_URL = 'http://192.168.43.154:80'
export default class {
  static getCurrentState (userId: number) {
    return axios.get(`${BASE_URL}/api/v1/chatbot/current-state?userId=${userId}`).then(rawResp => {
      if ('status' in rawResp.data) {
        return rawResp.data
      } else {
        throw new Error(`Unexpected repsonse: ${JSON.stringify(rawResp)}`)
      }
    })
  }

  static postFrontendAction (userId: number, resp: FrontendResponse) {
    return axios.post(`${BASE_URL}/api/v1/chatbot/current-state?userId=${userId}`, resp).then(rawResp => {
      if ('status' in rawResp.data) {
        return rawResp.data
      } else {
        throw new Error(`Unexpected repsonse: ${JSON.stringify(rawResp)}`)
      }
    })
  }
}