import { SET, RESET } from '../constants/user'

export function set(payload){
  return {
    type: SET
  , payload
  }
}

export function reset(){
  return {
    type: RESET
  }
}

